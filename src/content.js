import {capture} from './extract.js';
if(!globalThis.__kosulCaptureInstalled){
 globalThis.__kosulCaptureInstalled=true;
 chrome.runtime.onMessage.addListener((msg,sender,reply)=>{if(msg.type==='capture'){capture().then(reply).catch(e=>reply({error:e.message}));return true;}});
}
