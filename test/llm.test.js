import {test} from 'node:test';import assert from 'node:assert/strict';import {analyzeWithLLM,evidenceBlocks,resolveEvidence} from '../src/llm.js';
test('model çıktısı gerçek üretim hattında alıntı doğrulamasından geçer',async()=>{
 const savedFetch=globalThis.fetch,savedURL=process.env.LLM_URL,savedKey=process.env.LLM_API_KEY;
 process.env.LLM_URL='https://provider.example/chat';process.env.LLM_API_KEY='test-only-key';
 const text='Your subscription will automatically renew monthly.';
 try{globalThis.fetch=async(url,options)=>{const body=JSON.parse(options.body);assert.equal(body.response_format.json_schema.strict,true);assert.ok(!options.body.includes('test-only-key'));return {ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({uncertain:false,risks:[{category:'auto_renewal',evidence_id:0}]})}}]})};};const r=await analyzeWithLLM(text);assert.equal(r.score,18);assert.equal(r.risks[0].quote,text);
 globalThis.fetch=async()=>({ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({uncertain:false,risks:[{category:'auto_renewal',evidence_id:99}]})}}]})});await assert.rejects(()=>analyzeWithLLM(text),/kanıt şeması geçersiz/);
 }finally{globalThis.fetch=savedFetch;if(savedURL===undefined)delete process.env.LLM_URL;else process.env.LLM_URL=savedURL;if(savedKey===undefined)delete process.env.LLM_API_KEY;else process.env.LLM_API_KEY=savedKey;}
});
test('kanıt blokları kaynakta birebir kalır; model serbest alıntı ekleyemez',()=>{const text='A legal subscription sentence. '.repeat(100);const blocks=evidenceBlocks(text);assert.ok(blocks.every(b=>text.includes(b.text)));assert.throws(()=>resolveEvidence({uncertain:false,risks:[{category:'liability',evidence_id:0,quote:'fabricated'}]},blocks,text));});
test('başlık kanıtı listeden çıkarılır ve belirsizlik korunur; gerçek madde kalır',()=>{
 const text='3. GitHub May Terminate\nWe may terminate your account for breach of these terms.\n5. Amendments; Complete Agreement';
 const blocks=text.split('\n').map((text,id)=>({id,text}));
 const r=resolveEvidence({uncertain:false,risks:[{category:'termination',evidence_id:0},{category:'termination',evidence_id:1},{category:'unilateral_change',evidence_id:2}]},blocks,text);
 assert.equal(r.risks.length,1);assert.equal(r.suppressed.length,2);assert.equal(r.score,null);assert.equal(r.uncertain,true);assert.ok(text.includes(r.risks[0].quote));
});
test('DOM kısa satırları bağlamıyla gruplanır ve alıntılar birebir korunur',()=>{
 const text='We will not be liable for damages that result from\nyour use of the Service;\nunauthorized access to your data;\nany other matter relating to the Service.';
 const blocks=evidenceBlocks(text);assert.equal(blocks.length,1);assert.equal(blocks[0].text,text);
 const long=text.repeat(30);assert.ok(evidenceBlocks(long).every(b=>b.text.length<=1400&&long.includes(b.text)));assert.equal(evidenceBlocks(long).map(b=>b.text).join(''),long);
});
test('survival hükmü sonlandırma yetkisi değildir; yetki içeren bağlam korunur',()=>{
 const quote='All provisions of this Agreement which, by their nature, should survive termination';
 const r=resolveEvidence({uncertain:false,risks:[{category:'termination',evidence_id:0}]},[{id:0,text:quote}],quote);
 assert.equal(r.risks.length,0);assert.equal(r.score,null);assert.equal(r.suppressed.length,1);
 const context='GitHub has the right to suspend or terminate your access.\n'+quote;
 const actual=resolveEvidence({uncertain:false,risks:[{category:'termination',evidence_id:0}]},[{id:0,text:context}],context);
 assert.equal(actual.risks.length,1);
});
