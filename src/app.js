import {capture} from './extract.js';
const $=id=>document.getElementById(id);
const extension=!!globalThis.chrome?.runtime?.id;
if(extension)document.body.classList.add('popup');
let snapshot=null,report=null;
const base='http://127.0.0.1:4317';
function el(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function render(r){$('report').replaceChildren();$('report').append(el('div',r.score===null?'Skor belirsiz':`${r.score} / 100`,'score'),el('p',r.mode==='demo'?'DEMO • LLM kullanılmadı. Sınırlı desen taraması.':'LLM • Alıntılar kaynakta doğrulandı.','badge'));
 if(r.uncertain)$('report').append(el('p','Metin eksik veya yorum belirsiz. Kesin bir risk skoru verilemiyor.'));
 for(const risk of r.risks){const card=el('article','','card');card.append(el('h2',risk.title),el('p',risk.explanation),el('blockquote',risk.quote),el('small',`Kaynak aralığı: ${risk.start}–${risk.end}`));$('report').append(card);}
 if(!r.risks.length)$('report').append(el('p','Doğrulanmış risk maddesi bulunamadı. Bu sonuç güvenli olduğu anlamına gelmez.'));
 $('export').disabled=false;
}
$('capture').onclick=async()=>{try{report=null;$('export').disabled=true;$('report').replaceChildren();
 snapshot=extension?await chrome.runtime.sendMessage({type:'capture'}):await capture();
 if(snapshot.error)throw Error(snapshot.error);
 $('source').value=snapshot.text;$('status').textContent=`${snapshot.title} • ${snapshot.text.length} karakter • ${snapshot.partial?'Kapsam eksik':'Görünür DOM yakalandı'}`;
 }catch(e){$('status').textContent=e.message;}};
$('analyze').onclick=async()=>{if(!snapshot){$('status').textContent='Önce açık sayfayı yakalayın.';return;}
 $('analyze').disabled=true;$('export').disabled=true;report=null;$('report').replaceChildren();$('status').textContent=$('mode').value==='demo'?'Kaynak ve alıntılar doğrulanıyor…':'Model metni analiz ediyor. Uzun metinler birkaç dakika sürebilir; alıntılar tamamlandığında doğrulanacak.';
 try{const {token}=await(await fetch(base+'/session')).json();const response=await fetch(base+'/analyze',{method:'POST',headers:{'Content-Type':'application/json','X-Session-Token':token},body:JSON.stringify({...snapshot,mode:$('mode').value})});const r=await response.json();if(!response.ok)throw Error(r.error||'Analiz başarısız');report={...r,source:{url:snapshot.url,title:snapshot.title,text:snapshot.text,capturedAt:new Date().toISOString()}};render(r);$('status').textContent='Analiz tamamlandı.';}catch(e){$('status').textContent=e.message;}finally{$('analyze').disabled=false;}};
$('export').onclick=()=>{if(!report)return;const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));const a=el('a','');a.href=url;a.download='kosul-raporu.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
