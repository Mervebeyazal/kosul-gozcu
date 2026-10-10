import {readFile,writeFile} from 'node:fs/promises';
const decisions=[
 ['github','no_refund',89,false,'Yalnızca bölüm başlığı; iade hükmü yok.'],
 ['github','termination',1038,false,'Yalnızca bölüm başlığı; fesih yetkisinin içeriği yok.'],
 ['github','liability',1330,false,'Hükümlerin sona ermeden sonra devamı; sorumluluk sınırı hükmü değil.'],
 ['github','unilateral_change',2522,false,'Tanımları açıklayan giriş; değişiklik yetkisi değil.'],
 ['github','unilateral_change',2646,true,'Özet de olsa değişiklik yetkisi ve bildirim koşulu var.'],
 ['spotify','termination',280,false,'Ön ödemeli kodun süresinin bitmesi; sağlayıcının takdiri fesih yetkisi değil.'],
 ['spotify','termination',512,true,'Sağlayıcının 14 gün bildirimle aboneliği sonlandırma yetkisi var.'],
 ['spotify','liability',1892,false,'Yalnızca başlık; sorumluluk sınırı açıklanmıyor.'],
 ['spotify','arbitration',3214,true,'Bireysel zorunlu tahkim ve toplu dava kısıtlamasını açıkça bildiren özet.'],
 ['dropbox','auto_renewal',882,false,'İptal/iade ve fiyat metninde otomatik yenileme hükmü yok.'],
 ['dropbox','no_refund',882,true,'İade yalnızca hukuken zorunlu olduğunda verilir; yerel hukuk istisnası var.'],
 ['dropbox','auto_renewal',2646,false,'Yenilemedeki fiyat değişikliği otomatik yenileme kanıtı değil.'],
 ['dropbox','unilateral_change',2646,true,'Yenilemede ücret değişikliği yetkisi ve 30 gün bildirim var.'],
 ['zoom','unilateral_change',1355,true,'Tek taraflı fiyat değişikliği ve bildirim hükmü.'],
 ['zoom','arbitration',1964,true,'Bağlayıcı tahkim ve toplu/temsili dava feragati hükmü mevcut.'],
 ['zoom','liability',3550,false,'Yalnızca başlık; sorumluluk sınırı hükmü yok.']
].map(([document,category,start,supported,reason])=>({document,category,start,supported,reason}));
const result=JSON.parse(await readFile('eval/LLM-RESULTS.json'));
for(const row of result.rows)for(const p of row.unmatched)if(!decisions.some(d=>d.document===row.id&&d.category===p.category&&d.start===p.start))throw Error('Review is specific to recorded run; new output needs new manual review.');
await writeFile('eval/LLM-REVIEW.json',JSON.stringify({reviewer:'Implementer; not independent legal ground truth',run:result.at,decisions},null,2));
const hits=result.rows.reduce((s,r)=>s+r.hits.length,0),miss=result.rows.reduce((s,r)=>s+r.misses.length,0),fp=decisions.filter(d=>!d.supported).length,extra=decisions.filter(d=>d.supported).length;
let md=await readFile('eval/LLM-REPORT.md','utf8');md=md.split('\n## Geliştirici incelemesi')[0];
md+=`\n## Geliştirici incelemesi\n\nSeçilmiş 24 çapadan ${hits} yakalandı; ${miss} kaçırıldı. Eşleşmeyen 16 tahmin incelendi: ${fp} yanlış/yetersiz kanıt, ${extra} desteklenen ek bulgu. Bu inceleme bağımsız değil ve tüm belge recall ölçümü değil. Çapa kaçırılması bazen modelin aynı risk için farklı bir hükmü seçmesinden kaynaklanır.\n\n`;
for(const d of decisions)md+=`- ${d.document} / ${d.category} @${d.start}: ${d.supported?'Destekleniyor':'Yanlış alarm'} — ${d.reason}\n`;
await writeFile('eval/LLM-REPORT.md',md);console.log({hits,miss,fp,extra});
