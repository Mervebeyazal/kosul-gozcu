import {readFile,writeFile} from 'node:fs/promises';
const decisions=[
 ['spotify','termination',0,true,'Aynı blokta sağlayıcının en az 14 gün bildirimle ücretli aboneliği sonlandırma yetkisi var; doğal kod bitişi tek başına gerekçe değil.'],
 ['spotify','no_refund',969,true,'Spotify sona erdirdiğinde, belirtilen istisnalar dışında önceden ödenen tutarları iade etmeyeceği yazıyor.'],
 ['dropbox','auto_renewal',882,false,'İptal/iade ve fiyat metninde otomatik yenileme hükmü yok.'],
 ['dropbox','no_refund',882,true,'İade yalnızca hukuken zorunlu olduğunda verilir; yerel hukuk istisnası var.'],
 ['dropbox','auto_renewal',2646,false,'Yenilemedeki fiyat değişikliği otomatik yenileme kanıtı değil.'],
 ['dropbox','auto_renewal',4410,false,'Koşul güncellemesi, bildirim ve iptal metni; otomatik tahsilat veya yenileme hükmü yok.'],
 ['zoom','liability',4035,true,'Blokta bazı zararları talep etme hakkından feragat açıkça belirtiliyor; önceki sınır listesinin giriş cümlesi kesilmiş olduğundan bağlam sınırlı.']
].map(([document,category,start,supported,reason])=>({document,category,start,supported,reason}));
const result=JSON.parse(await readFile('eval/LLM-RESULTS.json'));
for(const row of result.rows)for(const p of row.unmatched)if(!decisions.some(d=>d.document===row.id&&d.category===p.category&&d.start===p.start))throw Error('Review is specific to recorded run; new output needs new manual review.');
await writeFile('eval/LLM-REVIEW.json',JSON.stringify({reviewer:'Implementer; not independent legal ground truth',run:result.at,decisions},null,2));
const hits=result.rows.reduce((s,r)=>s+r.hits.length,0),miss=result.rows.reduce((s,r)=>s+r.misses.length,0),fp=decisions.filter(d=>!d.supported).length,extra=decisions.filter(d=>d.supported).length;
const unmatched=result.rows.reduce((s,r)=>s+r.unmatched.length,0);
let md=await readFile('eval/LLM-REPORT.md','utf8');md=md.split('\n## Geliştirici incelemesi')[0];
md+=`\n## Geliştirici incelemesi\n\nSeçilmiş 24 çapadan ${hits} yakalandı; ${miss} kaçırıldı. Eşleşmeyen ${unmatched} tahmin incelendi: ${fp} yanlış/yetersiz kanıt, ${extra} desteklenen ek bulgu. Bu inceleme bağımsız değil ve tüm belge recall ölçümü değil. Çapa kaçırılması bazen modelin aynı risk için farklı bir hükmü seçmesinden kaynaklanır.\n\n`;
for(const d of decisions)md+=`- ${d.document} / ${d.category} @${d.start}: ${d.supported?'Destekleniyor':'Yanlış alarm'} — ${d.reason}\n`;
await writeFile('eval/LLM-REPORT.md',md);console.log({hits,miss,fp,extra});
