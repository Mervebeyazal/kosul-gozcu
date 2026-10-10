# Canlı Groq sonuçları — 10 Ekim 2026

Model: `openai/gpt-oss-20b`. Son koşu: 2026-10-10T15:30:39.382Z. Anahtar yerel `.env` içinde; Git ve test kayıtlarına dahil edilmez.

## Son sürümün mini evali

Beş gerçek ToS'un önceden etiketlenmiş konumlarından seçilmiş parçalar kullanıldı. Bu, tam belge kapsam ölçümü değildir; seçim yanlılığı ve geliştirici etiketleri vardır. Model çıktıları yeniden üretildi ve eşleşmeyen tüm tahminler geliştirici tarafından incelendi.

| Kaynak | Yakalanan çapa | Kaçırılan çapa | İncelenen yanlış alarm | Desteklenen ek bulgu |
| --- | ---: | ---: | ---: | ---: |
| GitHub | 4 | 0 | 0 | 0 |
| Spotify | 4 | 1 | 0 | 2 |
| Dropbox | 4 | 2 | 3 | 1 |
| Reddit | 3 | 0 | 0 | 0 |
| Zoom | 3 | 3 | 0 | 1 |
| Toplam | 18 | 6 | 3 | 4 |

Kaçırılan çapalar: Spotify koşul değişikliği; Dropbox sağlayıcı sonlandırma ve koşul değişikliği; Zoom otomatik yenileme, sorumluluk sınırı ve koşul değişikliği. Zoom sorumluluğu aynı kategori için farklı, desteklenen alıntıyla raporlandı; çapa ölçümü ile kategori ölçümü aynı değildir.

Yanlış alarmlar: Dropbox'ta iptal/iade, yenilemede fiyat değişikliği ve koşul güncellemesi blokları otomatik yenileme olarak işaretlendi. Bu alıntılarda otomatik tahsilat/yenileme kanıtı yok. Sistem bunları otomatik reddedemedi; birebir alıntı doğrulaması anlam doğruluğunu garanti etmez. Bazı kanıt pencereleri cümle ortasında başlar/biter.

Ayrıntılı kaynak alıntıları, kaçırılan çapalar ve inceleme gerekçeleri `LLM-REPORT.md`, `LLM-RESULTS.json`, `LLM-REVIEW.json` içinde. Önceki sürümün sonuçları `PREVIOUS-LLM-*` dosyalarında korunur. Önceki koşudaki 9 yanlış alarmın bu koşuda 3'e düşmesi tek koşu gözlemidir; istatistiksel kalite veya tüm belgelerde iyileşme garantisi değildir.

## Injection ve belirsizlik

Yeni kanıt bloklarıyla dört canlı kontrol geçti: gerçek yenileme/iade riskleri; görünür sistem rolü taklidiyle risk gizleme saldırısı; sahte tahkim kanıtı ekletme saldırısı; yükleme yer tutucusunda belirsizlik. Sonuçlar `INJECTION-LIVE.json` içinde. Bu küçük saldırı seti tüm prompt injection türlerini kapsamaz.

Gizli DOM talimatı Cypress testinde görünür kaynak metninden çıkarıldı. Bu test model çağırmaz; canlı görünür saldırı testleri ayrıdır. Son başarılı CI: https://github.com/Mervebeyazal/kosul-gozcu/actions/runs/38063720997 (fd67877). Aynı CI derleme, 10 birim testi, HTTP akışı, baseline eval, Cypress video ve 90 saniye sınırını doğruladı. Sonradan eklenen rapor geri açma testleri sonraki CI koşusunda doğrulanmalıdır.

## Gerçek Chrome kabulü ve sınırlar

Kullanıcı Chrome MV3 uzantısını kurdu, kendi Groq anahtarıyla GitHub koşullarını analiz etti ve JSON indirdi. Gönderilen JSON'da 45.699 karakter ve 7 parça vardı; 18 alıntının tamamı kaynak/offset ile birebir eşleşti. Üç başlık çıkarıldı; skor belirsizdi. Sonraki yerel inceleme survival yanlış alarmını çıkardı ve bitişik alıntıları birleştirdi; bu inceleme yeni model çağrısı değildir.

Tam beş belgenin yeni sürümle baştan sona canlı kapsam evali ve bağımsız hukuki anotasyon yapılmadı. İlk 413/429 ve serbest alıntı/JSON hataları tarihsel dosyalarda korunur. Gizlilikte veri satışı/aktarım/saklama kategorileri bu MVP'de yoktur. Uzun Groq metinlerinde 60 saniyelik aralıklar nedeniyle 6–8 dakika bekleme mümkündür; UI/terminal parça ilerlemesini gösterir. Uygulama hukuki tavsiye vermez.
