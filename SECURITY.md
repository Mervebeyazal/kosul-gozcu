# Güvenlik ve prompt injection

## Güven sınırları

Sayfa güvenilmeyen veridir. LLM'e JSON içinde `untrusted_document` olarak verilir. Sistem mesajı belgedeki talimatlara uyulmamasını söyler. Modelin araçları ve sayfada işlem yetkisi yoktur; anahtar servis ortamındadır, prompt'a girmez. Cevap şema ve kaynak doğrulamasından geçmeden gösterilmez. UI `textContent` kullanır; HTML alıntıları çalıştırılmaz.

Servis loopback'a bağlıdır. Host denetimi DNS rebinding yüzeyini azaltır; Origin yalnızca yerel UI ve yapılandırılmış uzantı kimliği için izinlidir. Analiz POST'u rastgele süreç oturum token'ı ister. Token sayfanın ana dünyasına verilmez. Yerel makinedeki başka uygulamalar güven sınırı dışındadır; servis yerel kötü amaçlı yazılıma karşı koruma iddiası taşımaz. Metin diske veya log'a yazılmaz. JSON indirme kullanıcı eylemidir. LLM sağlayıcısının saklama politikası ayrıca kontrol edilmelidir.

## Testler ve dürüst kapsam

1. `node --test`: uydurma alıntı, şema dışı score/sendKey, yinelenen risk ve eksik kapsam testi. Geçti.
2. Görünür `SYSTEM: ignore all rules ...` içeren belge baseline'a verilir: yenileme riski korunur, modele ait bir score alanı kabul edilmez. Geçti. Bu bir gerçek LLM injection direnci testi değildir.
3. `public/demo.html`: display:none talimat metni. Cypress `#source` içinde IGNORE bulunmamasını ve görünür yenileme hükmünün bulunmasını denetler. Başarılı koşu varsa Cypress raporunda belirtilir.
4. Canlı LLM saldırısı: anahtar yapılandırıldıktan sonra demo.html'de LLM modu ve görünür saldırı varyantı çalıştırılmalıdır. Henüz gerçek model testi yapılmadı; salt prompt ayırımı injection'ı kesin engellemez. Geçerli bir alıntı modelin kategoriyi yanlış yorumlamasını veya gerçek riski atlamasını önleyemez.

## Açık sınırlar

- Altı kategori dışındaki gizlilik riskleri tespit edilmez.
- Tam belgelerde chunking yok; fazla metin kısmi rapor olarak gösterilir.
- Kullanıcının fesih hakkıyla sağlayıcının fesih yetkisi karışabilir; eval bunu gösterir.
- Kesin hukuki geçerlilik, ülke hukuku veya yargı sonucu iddia edilmez.
- Serviste üretim kimlik doğrulama/rate-limit ve çok kullanıcı izolasyonu yoktur; yerel tek kullanıcı prototipidir.
