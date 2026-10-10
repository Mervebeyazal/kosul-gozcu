chrome.runtime.onMessage.addListener((msg,sender,reply)=>{
 if(msg.type!=='capture')return;
 (async()=>{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});if(!/^https?:/.test(tab?.url||''))throw Error('Bu sayfa yakalanamıyor. Bir HTTP(S) koşullar sayfası açın.');
 await chrome.scripting.executeScript({target:{tabId:tab.id},files:['dist/content.js']});return chrome.tabs.sendMessage(tab.id,{type:'capture'});})().then(reply).catch(e=>reply({error:e.message}));return true;
});
