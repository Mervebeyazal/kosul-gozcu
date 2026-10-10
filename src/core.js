import Ajv from 'ajv';
export const categories = {
 auto_renewal: ['Otomatik yenileme', 18, 'Abonelik siz iptal edene kadar yenilenebilir; ücret ve iptal tarihini kontrol edin.'],
 no_refund: ['İade kısıtlaması', 16, 'Bazı ödemeler geri verilmeyebilir; istisnaları ve yerel haklarınızı kontrol edin.'],
 arbitration: ['Tahkim / toplu dava kısıtlaması', 22, 'Uyuşmazlık çözüm yolu veya toplu dava imkânı sınırlanabilir.'],
 unilateral_change: ['Tek taraflı değişiklik', 14, 'Hizmet sağlayıcı koşulları değiştirebilir; bildirim ve itiraz şartlarını kontrol edin.'],
 termination: ['Hesap / hizmet sonlandırma', 14, 'Hesap veya hizmet erişimi sağlayıcı tarafından sonlandırılabilir.'],
 liability: ['Sorumluluk sınırı', 16, 'Zararlar için sağlayıcının sorumluluğu sınırlandırılabilir.']
};
export const schema = {type:'object',additionalProperties:false,required:['risks','uncertain'],properties:{uncertain:{type:'boolean'},risks:{type:'array',maxItems:40,items:{type:'object',additionalProperties:false,required:['category','quote'],properties:{category:{type:'string',enum:Object.keys(categories)},quote:{type:'string',minLength:20,maxLength:1600}}}}}};
const validate = new Ajv({allErrors:true}).compile(schema);
export function verify(candidate,text,{partial=false}={}) {
 if(!validate(candidate)) throw new Error('JSON şeması geçersiz; rapor üretilmedi.');
 const seen = new Set();
 const risks = candidate.risks.map(r=>{
  const start=text.indexOf(r.quote);
  if(start<0) throw new Error('Kaynakta bulunmayan alıntı; rapor reddedildi.');
  const [title,weight,explanation]=categories[r.category];
  return {...r,title,weight,explanation,start,end:start+r.quote.length};
 }).filter(r=>{const k=r.category+':'+r.start;if(seen.has(k))return false;seen.add(k);return true;});
 const score=Math.min(100,[...new Set(risks.map(r=>r.category))].reduce((s,c)=>s+categories[c][1],0));
 return {score:partial||candidate.uncertain?null:score,observedScore:score,risks,uncertain:candidate.uncertain||partial,disclaimer:'Bu uygulama hukuki tavsiye vermez.',note:'Alıntının doğrulanması, yorumun hukuken doğru olduğunu kanıtlamaz. Risk bulunmaması güvenli olduğu anlamına gelmez.'};
}
export const rules={auto_renewal:/automatic(?:ally)? renew|renew(?:s|ed)? automatically|auto-renew/i,no_refund:/non.refundable|no refunds|not refundable/i,arbitration:/binding arbitration|class action waiver|waive.{0,60}class action/i,unilateral_change:/may (?:modify|change|revise|update) (?:these|the|our) (?:terms|agreement)/i,termination:/may (?:suspend|terminate)|right to (?:suspend|terminate)/i,liability:/limitation of liability|shall not be liable|will not be liable/i};
export function baseline(text){return {uncertain:text.length<150,risks:Object.entries(rules).flatMap(([category,re])=>{const m=re.exec(text);if(!m)return [];const lineStart=Math.max(0,text.lastIndexOf('\n',m.index)+1);const start=Math.max(lineStart,m.index-120);let end=text.indexOf('\n',m.index);if(end<0)end=text.length;return [{category,quote:text.slice(start,Math.min(end,m.index+550))}];})};}
