# Teslim kayıtları — 10 Ekim 2026

Repo: https://github.com/Mervebeyazal/kosul-gozcu

## Doğrulanmış teslim parçaları

- Chrome MV3 uzantısı kullanıcı tarafından kuruldu. Gerçek GitHub koşulları, kullanıcıya ait Groq anahtarıyla analiz edildi; JSON indirme kullanıcı tarafından tamamlandı ve dosya doğrulandı.
- README mimari/veri akışı, Alibaba PageController salt DOM okuma, JSON şema + Ajv, mevcut kanıt kimliği seçimi, birebir alıntı/offset doğrulama ve deterministik skor belgeleniyor.
- Son sürümün beş gerçek ToS'tan seçilmiş parça evali: 18/24 çapa yakalandı, 6 kaçırıldı. Ek tahmin incelemesi: 3 yanlış alarm, 4 desteklenen bulgu. `eval/LIVE-SUMMARY.md` ve ayrıntılı sonuçlar.
- Son sürümün dört canlı injection/belirsizlik kontrolü geçti. Gizli DOM talimatının çıkarılması Cypress ile doğrulandı.
- fd67877 için CI başarılı: https://github.com/Mervebeyazal/kosul-gozcu/actions/runs/38063720997. Derleme, birim/HTTP testleri, baseline eval, Cypress demo kaydı ve <=90 saniye süre kontrolü geçti.
- Video, koşunun `demo-and-eval` artifact'inde `cypress/videos/demo.cy.js.mp4` olarak mevcut. Senaryoda açıkça Demo etiketiyle mutlu yol ve belirsizlik anı gösterilir. Video canlı LLM veya kurulmuş MV3 paketinin kaydı değildir; MV3 kabulü kullanıcı akışıyla ayrı doğrulandı.

## Açık sınırlar

Yeni rapor geri açma HTTP/Cypress regresyonları sonraki CI koşusuyla doğrulanmalıdır. Kullanıcı raporu geri açıp JSON indirdi; otomatik regresyonlar sonradan eklendi.

Tam belge LLM evali, bağımsız hukuki anotasyon ve kapsamlı saldırı testi yok. Dropbox'ta üç otomatik yenileme yanlış alarmı sürüyor. Alıntı doğruluğu anlam doğruluğunu garanti etmez. Gizlilikte veri satışı, aktarım ve saklama kategorileri MVP kapsamında yok. Üretim için hazır veya hukuken güvenilir şeklinde sunulmamalıdır.

## Yerel çıktılar

Kaynak ve Chrome ZIP paketleri, kontrol edilmiş kullanıcı raporu ve repo içindeki eval kayıtları. `.env`, kullanıcının kişisel raporları ve üçüncü taraf tam metin snapshot'ları Git dışında tutulur. Kaynakları yeniden indirmek için `node eval/fetch.mjs`; canlı eval için `npm run eval:llm` (API kullanımı ve bekleme gerektirir).
