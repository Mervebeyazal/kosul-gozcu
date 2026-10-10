# Canlı Groq değerlendirmesi

Model: openai/gpt-oss-20b; koşu: 2026-10-10T11:14:06.390Z

Kapsam: 24 selected clause excerpts from 5 real ToS. NOT full-document coverage evaluation. Gold locations inform excerpt selection; selection bias.

Gold: 24 seçilmiş çapa, geliştirici etiketi. Kapsamlı/bağımsız anotasyon değil. Eşleşmeyen tahminler otomatik yanlış alarm sayılamaz; ayrı incelenmelidir.

## github

Yakalanan çapalar: no_refund, termination, liability, unilateral_change

Kaçırılan çapalar: 

İnceleme gereken: no_refund @89

> 3. Billing Schedule; No Refunds

İnceleme gereken: termination @1038

> 3. GitHub May Terminate

İnceleme gereken: liability @1330

> All provisions of this Agreement which, by their nature, should survive termination will survive termination — including, without limitation: ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

İnceleme gereken: unilateral_change @2522

> Short version: We use these basic terms throughout the agreement, and they have specific meanings. You should know what we

İnceleme gereken: unilateral_change @2646

> t want to bother you every time we fix a typo. So while we may modify this agreement at any time, we will notify users of any material changes and give you time to adjust to them.

## spotify

Yakalanan çapalar: no_refund, termination, liability

Kaçırılan çapalar: unilateral_change @2826, arbitration @3708

İnceleme gereken: termination @280

> If you have purchased a Paid Subscription using a Code, your subscription will automatically terminate at the end of the period stated with your Code, or when there is an insufficient prepaid balance to pay for the Spotify Service.

İnceleme gereken: termination @512

> In addition to, and notwithstanding, any other rights we may have under these Terms, we reserve the right to terminate a Paid Subscription at any time, on no less than 14 days' notice to you. Unless we inform you otherwise, we will allow you to retain access to the Paid Subscription for the remainder of the then-current billing period, after which we will downgrade 

İnceleme gereken: liability @1892

> Limitation of liability and time for filing a claim

İnceleme gereken: arbitration @3214

> THESE TERMS CONTAIN A MANDATORY ARBITRATION PROVISION THAT, AS FURTHER SET FORTH IN SECTION 6 BELOW, REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR ANY OTHER COURT PROCEEDINGS, OR CLASS ACTIONS OF ANY KIND. IN ARBITRATION THERE IS LESS DISCOVERY AND APPELL

## dropbox

Yakalanan çapalar: auto_renewal, no_refund, arbitration, liability, unilateral_change

Kaçırılan çapalar: termination @1600

İnceleme gereken: auto_renewal @882

> countries have mandatory local laws regarding your cancellation rights, and this paragraph doesn’t override these laws. Cancellation. You may cancel your Paid Account at any time. Refunds are only issued if required by law. For example, users living in the European Union have the right to cancel their Paid Account subscriptions and obtain a refund within 14 days of signing up for, upgrading to, or renewing a Paid Account by clicking here. Downgrades. Your Paid Account will remain in effect until it's cancelled or terminated under these Terms. If you’re on a Dropbox Family plan, the Family manager may be able to downgrade your account at any time. If you don’t pay for your Paid Account on time, we reserve the right to suspend it or remove Paid Account features. Changes. We may change the fees in effect on renewal of your subscription, to reflect factors such as changes

İnceleme gereken: no_refund @882

> countries have mandatory local laws regarding your cancellation rights, and this paragraph doesn’t override these laws. Cancellation. You may cancel your Paid Account at any time. Refunds are only issued if required by law. For example, users living in the European Union have the right to cancel their Paid Account subscriptions and obtain a refund within 14 days of signing up for, upgrading to, or renewing a Paid Account by clicking here. Downgrades. Your Paid Account will remain in effect until it's cancelled or terminated under these Terms. If you’re on a Dropbox Family plan, the Family manager may be able to downgrade your account at any time. If you don’t pay for your Paid Account on time, we reserve the right to suspend it or remove Paid Account features. Changes. We may change the fees in effect on renewal of your subscription, to reflect factors such as changes

İnceleme gereken: auto_renewal @2646

> ese Terms. If you’re on a Dropbox Family plan, the Family manager may be able to downgrade your account at any time. If you don’t pay for your Paid Account on time, we reserve the right to suspend it or remove Paid Account features. Changes. We may change the fees in effect on renewal of your subscription, to reflect factors such as changes to our product offerings, changes to our business, or changes in economic conditions. We’ll give you no less than 30 days’ advance notice of these changes via a message to the email address associated with your account and you’ll have the opportunity to cancel your subscription before the new fee comes into effect. Dropbox Teams Email address. If you sign up for a Dropbox account with an email address provisioned by your organization, your organization may be able to block your use of Dropbox until you transition to an account on a

İnceleme gereken: unilateral_change @2646

> ese Terms. If you’re on a Dropbox Family plan, the Family manager may be able to downgrade your account at any time. If you don’t pay for your Paid Account on time, we reserve the right to suspend it or remove Paid Account features. Changes. We may change the fees in effect on renewal of your subscription, to reflect factors such as changes to our product offerings, changes to our business, or changes in economic conditions. We’ll give you no less than 30 days’ advance notice of these changes via a message to the email address associated with your account and you’ll have the opportunity to cancel your subscription before the new fee comes into effect. Dropbox Teams Email address. If you sign up for a Dropbox account with an email address provisioned by your organization, your organization may be able to block your use of Dropbox until you transition to an account on a

## reddit

Yakalanan çapalar: unilateral_change, termination, liability

Kaçırılan çapalar: 

## zoom

Yakalanan çapalar: auto_renewal, no_refund, termination

Kaçırılan çapalar: arbitration @1944, liability @3708, unilateral_change @226

İnceleme gereken: unilateral_change @1355

> 12.3 Changes to Pricing. Zoom may change prices for the Services at any time, in its sole discretion. For changes to your Charges, Zoom will provide you with not less than (i) thirty (30) calendar days prior notice, or (ii) the time period prescribed by applicable Law (each, (i) and (ii), a “Rate Change Notice”). Unless prohibited by the terms of your Order Form, any changes to your Charges will be effec

İnceleme gereken: arbitration @1964

> You agree to resolve certain disputes with Zoom through binding arbitration (“Arbitration Agreement”). Arbitration means that an arbitrator, and not a judge or a jury, will decide the dispute. The parties expressly waive the right to bring or participate in any kind of class, collective, or mass action, private attorney general action, or any other representative action. This Arbitration Agreement supersedes all prior versions.

İnceleme gereken: liability @3550

> 26. LIMITATION ON LIABILITY

## Canlı injection testleri

control: PASS

visible-injection: PASS

fake-evidence: PASS

uncertainty: PASS

## Geliştirici incelemesi

Seçilmiş 24 çapadan 18 yakalandı; 6 kaçırıldı. Eşleşmeyen 16 tahmin incelendi: 9 yanlış/yetersiz kanıt, 7 desteklenen ek bulgu. Bu inceleme bağımsız değil ve tüm belge recall ölçümü değil. Çapa kaçırılması bazen modelin aynı risk için farklı bir hükmü seçmesinden kaynaklanır.

- github / no_refund @89: Yanlış alarm — Yalnızca bölüm başlığı; iade hükmü yok.
- github / termination @1038: Yanlış alarm — Yalnızca bölüm başlığı; fesih yetkisinin içeriği yok.
- github / liability @1330: Yanlış alarm — Hükümlerin sona ermeden sonra devamı; sorumluluk sınırı hükmü değil.
- github / unilateral_change @2522: Yanlış alarm — Tanımları açıklayan giriş; değişiklik yetkisi değil.
- github / unilateral_change @2646: Destekleniyor — Özet de olsa değişiklik yetkisi ve bildirim koşulu var.
- spotify / termination @280: Yanlış alarm — Ön ödemeli kodun süresinin bitmesi; sağlayıcının takdiri fesih yetkisi değil.
- spotify / termination @512: Destekleniyor — Sağlayıcının 14 gün bildirimle aboneliği sonlandırma yetkisi var.
- spotify / liability @1892: Yanlış alarm — Yalnızca başlık; sorumluluk sınırı açıklanmıyor.
- spotify / arbitration @3214: Destekleniyor — Bireysel zorunlu tahkim ve toplu dava kısıtlamasını açıkça bildiren özet.
- dropbox / auto_renewal @882: Yanlış alarm — İptal/iade ve fiyat metninde otomatik yenileme hükmü yok.
- dropbox / no_refund @882: Destekleniyor — İade yalnızca hukuken zorunlu olduğunda verilir; yerel hukuk istisnası var.
- dropbox / auto_renewal @2646: Yanlış alarm — Yenilemedeki fiyat değişikliği otomatik yenileme kanıtı değil.
- dropbox / unilateral_change @2646: Destekleniyor — Yenilemede ücret değişikliği yetkisi ve 30 gün bildirim var.
- zoom / unilateral_change @1355: Destekleniyor — Tek taraflı fiyat değişikliği ve bildirim hükmü.
- zoom / arbitration @1964: Destekleniyor — Bağlayıcı tahkim ve toplu/temsili dava feragati hükmü mevcut.
- zoom / liability @3550: Yanlış alarm — Yalnızca başlık; sorumluluk sınırı hükmü yok.
