# Teslim kayıtları — 10 Ekim 2026

## Mevcut

- Kaynak kod, yerel Git deposu, README mimari ve veri akışı.
- Chrome MV3 unpacked uzantı build'i.
- JSON şeması + Ajv; birebir alıntı/offset doğrulama; deterministik skor; Türkçe UI ve hukuki tavsiye değildir ifadesi.
- Çekirdek testleri: 4/4 geçti.
- 5 gerçek ToS indirildi: GitHub, Spotify, Dropbox, Reddit, Zoom. Hash ve kaynak URL manifestte. Seçilmiş 24 madde üzerinde baseline: TP13/FN11/FP4. Bağımsız veya kapsamlı gold değil.
- Cypress senaryosu ve Linux GitHub Actions video kaydı/süre kontrolü otomasyonu.

## Tamamlanamayan doğrulamalar

- GitHub tarayıcısı oturum açma sayfasında. `mervebeyazal/kosul-gozcu` uzak deposu henüz oluşturulmadı ve push yapılmadı.
- Kullanılabilir LLM anahtarı yok. Canlı model çağrısı, gerçek LLM evali ve modelin injection davranışı ölçülmedi. Alibaba demo LLM'i kullanılmadı.
- Cypress 16.1.1 kuruldu fakat çalıştırılınca Windows ortamında çıkış 2147483651 ile çöktü. Cypress 13.17.0 denemesi EPERM ile kurulamadı; son bağımlılık sürümü tekrar 16.1.1'e döndürüldü.
- Aynı süreçte oluşturulan HTTP servisine bile loopback isteği ETIMEDOUT verdi. `npm run test:service` bu ortamda 2 başarısız bağlantı testi verir. Testler silinmedi veya başarılı sayılmadı; normal makinede / CI'da tekrar çalıştırılmalıdır.
- Gizli DOM talimatı fixture'da mevcut; tarayıcıda elendiği henüz çalıştırılmış testle kanıtlanmadı.
- Gerçek Cypress MP4 dosyası üretilmedi; ≤90 saniye video teslimi tamamlanmadı.
- Chrome'da paket yükleme/kabul testi yapılmadı. Bu nedenle çalışan uçtan uca demo teslimi henüz doğrulanmış değildir.

## Devam

1. GitHub girişi sonrası yeni repo oluşturun; yerel main dalını push edin. Actions çalışan Chrome demo videosunu artifact olarak kaydeder ve ≤90sn kontrolünü yapar.
2. `.env` içinde kendi anahtar ve sağlayıcınızı yapılandırın; README'deki uzantı kurulumu adımlarını izleyin.
3. Gerçek LLM ile 5 snapshot'ı yeniden değerlendirin; mevcut baseline sonuçlarını LLM sonuçları diye yeniden adlandırmayın.
4. Görünür ve gizli injection varyantlarında kaynak, risk kaçırma, sahte alıntı ve model belirsizliği kayıtlarını alın.
