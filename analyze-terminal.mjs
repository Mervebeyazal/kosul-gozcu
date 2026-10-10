import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {analyzeWithLLM} from './src/llm.js';

try {
 const sourcePath=resolve(process.argv[2]||'eval/sources/github.txt');
 const text=await readFile(sourcePath,'utf8');
 if(!text.trim()||text.length>120000)throw Error('Kaynak boş veya 120.000 karakter sınırını aşıyor.');
 console.log(`Kaydedilmiş kaynak okunuyor: ${text.length} karakter. Bu işlem yeni bir LLM analizi yapar.`);
 const report=await analyzeWithLLM(text,{onProgress:message=>console.log(message)});
 const output=resolve('kosul-raporu.json');
 await writeFile(output,JSON.stringify({...report,source:{text,localFile:sourcePath,note:'Kaydedilmiş metin; bu koşuda Chrome sayfası yakalanmadı.'},analyzedAt:new Date().toISOString()},null,2),'utf8');
 console.log(`Analiz tamamlandı. Skor: ${report.score===null?'belirsiz':report.score}; madde sayısı: ${report.risks.length}`);
 console.log(`JSON kaydedildi: ${output}`);
} catch(error) {
 console.error(`Analiz tamamlanamadı: ${error.message}`);
 process.exitCode=1;
}
