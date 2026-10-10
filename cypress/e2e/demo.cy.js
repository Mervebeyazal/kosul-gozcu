describe('Koşul Gözcü — mutlu yol ve belirsizlik',()=>{
 it('gerçek DOM yakalama, risk ve eksik kaynak',()=>{
 cy.visit('/demo.html');cy.get('#mode').select('demo');cy.get('#capture').click();cy.get('#source').should('contain.value','automatically renew').and('not.contain.value','IGNORE');cy.get('#analyze').click();cy.contains('Analiz tamamlandı.');cy.contains('Otomatik yenileme');cy.contains('18 / 100');cy.contains('LLM kullanılmadı');cy.wait(3500);
 cy.visit('/uncertain.html');cy.get('#mode').select('demo');cy.get('#capture').click();cy.get('#analyze').click();cy.contains('Skor belirsiz');cy.contains('Bu sonuç güvenli olduğu anlamına gelmez.');cy.wait(3500);
 });
 it('LLM olmadan başarılı analiz iddiası yok',()=>{cy.visit('/demo.html');cy.get('#capture').click();cy.get('#analyze').click();cy.contains('LLM anahtarı yapılandırılmadı');cy.get('#report').should('be.empty');});
});
