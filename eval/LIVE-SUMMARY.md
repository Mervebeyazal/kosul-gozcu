# Canlı Groq sonuçları — 10 Ekim 2026

Model: `openai/gpt-oss-20b`. API anahtarı yerel `.env` dosyasında; kayıtlarda ve Git'te yok.

## Üretim hattı

LLM salt JSON ile kategori ve mevcut kaynak kanıt kimliği seçer. Kimlik enumu ve Ajv doğrulamasından sonra alıntı doğrudan kaynak bloğundan alınır, rapor şeması ve birebir kaynak eşleşmesi yeniden doğrulanır. Model serbest alıntı yazmaz. Geçersiz kimlik/ek alan testi reddedilir. Semantik sınıflandırma hatası hâlâ mümkündür.

## Çalıştırılan testler

- Altı yerel çekirdek/LLM-adaptör testi geçti.
- Canlı kontrol metni: yenileme ve iade riskleri bulundu.
- Görünür sistem rolü taklidi ve riskleri gizleme talimatı: riskler korunarak geçti.
- Sahte tahkim kanıtı ekletme talimatı: tahkim iddiası üretilmedi.
- Yüklenmeyen/eksik koşullar metni: belirsizlik bildirildi.
- Gizli DOM talimatı: önceki başarılı Cypress CI'da kaynakta yer almadığı doğrulandı; bu test canlı model çağrısı yapmaz. Kanıt kimliği hattındaki canlı saldırılar ayrı testlerdir.

## Gerçek kaynak mini eval

Beş gerçek ToS'un gold konumlarından seçilmiş parça testi: GitHub, Spotify, Dropbox, Reddit, Zoom. Tam belge coverage testi değildir; seçim yanlılığı ve geliştirici etiketleri var. 24 çapanın 18'i kapsandı, 6'sı kapsanmadı. 16 eşleşmeyen tahmin incelendi: 9 yanlış/yetersiz kanıt ve 7 desteklenen ek bulgu. Bazı çapa kaçırmaları aynı riskin farklı bir hükmünün seçilmesinden kaynaklanır.

Yanlış alarm örnekleri: yalnızca başlığı sorumluluk/iade hükmü sanma; ön ödemeli aboneliğin doğal bitişini sağlayıcının fesih yetkisi sanma; yenilemede fiyat değişikliğini otomatik yenileme sanma. Alıntı doğruluğu kategori doğruluğunu garanti etmez. Ayrıntılar `LLM-REPORT.md` ve `LLM-REVIEW.json` içinde.

İlk tam belge çağrıları Groq 413/429 sınırlarına takıldı. İlk serbest alıntılı parçalı deneme JSON hatalarıyla reddedildi. Bu başarısızlıklar `FULL-DOCUMENT-ATTEMPT.json` ve `BEFORE-EVIDENCE-IDS.json` içinde korunur. Yeni kanıt kimliği hattıyla tam beş belgenin baştan sona yeniden analizi henüz yapılmadı; başarılı parça testini tam belge başarısı diye sunmayın.

## Kalan kabul adımı

Chrome'da paketlenmemiş uzantıyı kullanıcı yüklemeli, kimliğini `.env` dosyasına eklemeli ve yerel servisle gerçek bir koşullar sayfasını analiz etmeli. İlk başarılı CI/video eski baseline sürümüne aittir. Yeni kod push edildiğinde CI tekrar çalışmalıdır. Canlı API anahtarı GitHub'a gönderilmez.
