import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:net';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
test('port doluyken başarı mesajı yazılmaz ve süreç hatayla çıkar',async()=>{
 const blocker=createServer();
 await new Promise((resolve,reject)=>{blocker.once('error',reject);blocker.listen(4317,'127.0.0.1',resolve);});
 try{await assert.rejects(promisify(execFile)(process.execPath,['server.mjs'],{timeout:10000}),error=>{
  assert.equal(error.code,1);assert.match(error.stderr,/4317 portu/);assert.doesNotMatch(error.stdout,/Koşul Gözcü: http/);return true;
 });}finally{await new Promise(resolve=>blocker.close(resolve));}
});
