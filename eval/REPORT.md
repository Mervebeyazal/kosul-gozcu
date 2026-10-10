# Mini eval — gerçek ToS kaynakları

Bu koşu LLM kullanmaz; demo desen tarayıcısını değerlendirir. Canlı LLM evali API anahtarı olmadığından yapılmadı. Etiketler geliştirici tarafından seçilmiş 24 madde çapasıdır; bağımsız hukukçu kontrolü ve kapsamlı anotasyon yoktur. Eşleşme için kategori ve alıntı aralığının anotasyon çapasını kapsaması zorunludur. Bir belgedeki tüm risklerin yakalandığını ölçmez.

TP 13 · FN 11 · FP 4 · Precision 76.5% · Recall 54.2%

## github

Kaynak: https://docs.github.com/en/site-policy/github-terms/github-terms-of-service

SHA256: 2533fd8ad6f7820ffa7ba3c2a2ad3289dcd63534f1327304ce33f9b31f6ea8d8

Karakter: 45644; erişim: 2026-10-10T08:36:06.343Z

Yakalanan: liability

Kaçırılan: no_refund (konum 32964), termination (konum 36710), unilateral_change (konum 42267)

Yanlış alarm / yanlış kanıt: no_refund (konum 32873), termination (konum 36686)

## spotify

Kaynak: https://www.spotify.com/us/legal/end-user-agreement/

SHA256: a13a37642291f17a6e9aada8e8a83a3ee90f2191d88b1ddc37cdc5949690ae3f

Karakter: 55033; erişim: 2026-10-10T08:36:07.438Z

Yakalanan: unilateral_change, arbitration

Kaçırılan: no_refund (konum 11524), termination (konum 22643), liability (konum 25566)

Yanlış alarm / yanlış kanıt: termination (konum 5311), liability (konum 25514)

## dropbox

Kaynak: https://www.dropbox.com/terms

SHA256: 262875d44707d89c6e0904e04092bbf6119bea37e5cbee98d724ff85e4ab61b5

Karakter: 25302; erişim: 2026-10-10T08:36:08.938Z

Yakalanan: termination, liability, unilateral_change

Kaçırılan: auto_renewal (konum 9768), no_refund (konum 10327), arbitration (konum 18490)

Yanlış alarm / yanlış kanıt: yok

## reddit

Kaynak: https://redditinc.com/policies/user-agreement

SHA256: 6646e7b2614454bfd7a7b9c02109eacf17986ac25f1adb4a5470c20506a8b6ab

Karakter: 86454; erişim: 2026-10-10T08:36:12.534Z

Yakalanan: termination, liability

Kaçırılan: unilateral_change (konum 60364)

Yanlış alarm / yanlış kanıt: yok

## zoom

Kaynak: https://www.zoom.com/en/trust/terms/

SHA256: ede25cbd2cebcce8eaf326049d018a462d6f1fbf6677da6871bdca4f47408356

Karakter: 87173; erişim: 2026-10-10T08:36:14.349Z

Yakalanan: auto_renewal, no_refund, arbitration, termination, liability

Kaçırılan: unilateral_change (konum 1802)

Yanlış alarm / yanlış kanıt: yok

## Hata analizi

Başlıklara ilk eşleşme yaklaşımı gerçek hükmü kaçırabilir. Kullanıcının fesih hakkı sağlayıcının fesih yetkisi sanılabilir. Eş anlamlı ifadeler ve büyük/küçük harf dışındaki dil çeşitliliği desenleri aşar. Dropbox iadelerinde yerel hukuk istisnası vardır. Kategoriler gizlilikte veri satışı/aktarım/saklama gibi riskleri henüz kapsamaz. Bu baseline ürün kalitesi veya LLM kalitesi ölçümü olarak sunulamaz. LLM sonrası bağımsız anotasyon ve adversarial model testi gereklidir.
