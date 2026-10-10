import {test,before,after} from 'node:test';import assert from 'node:assert/strict';import {app} from '../server.mjs';
let server;
before(async()=>{server=await new Promise(resolve=>{const s=app.listen(4317,'127.0.0.1',()=>resolve(s));});});
after(async()=>{await new Promise(resolve=>server.close(resolve));});
const base='http://127.0.0.1:4317';
test('servis kötü niyetli Origin ve tokensız isteği reddeder',async()=>{assert.equal((await fetch(base+'/session',{headers:{Origin:'https://evil.example'}})).status,403);assert.equal((await fetch(base+'/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,403);});
test('gerçek HTTP akışı şemalı ve alıntılı demo raporu üretir',async()=>{const {token}=await(await fetch(base+'/session')).json();const text='Your subscription will automatically renew unless cancelled. '.repeat(5);const response=await fetch(base+'/analyze',{method:'POST',headers:{'Content-Type':'application/json','X-Session-Token':token},body:JSON.stringify({text,partial:false,mode:'demo'})});assert.equal(response.status,200);const r=await response.json();assert.equal(r.score,18);assert.equal(r.mode,'demo');assert.ok(text.includes(r.risks[0].quote));});
