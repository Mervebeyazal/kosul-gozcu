import {analyzeWithLLM} from "./src/llm.js";
import express from 'express';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {verify,baseline} from './src/core.js';
const app=express();const token=randomBytes(24).toString('hex');
app.use((req,res,next)=>{
 const origin=req.headers.origin;
 const allowed=origin==='http://127.0.0.1:4317'||(process.env.EXTENSION_ID&&origin===`chrome-extension://${process.env.EXTENSION_ID}`);
 if(origin&&!allowed)return res.status(403).json({error:'İzin verilmeyen kaynak'});
 if(allowed){res.set('Access-Control-Allow-Origin',origin);res.set('Vary','Origin');res.set('Access-Control-Allow-Headers','Content-Type,X-Session-Token');}
 if(req.method==='OPTIONS')return res.sendStatus(204);
 if(req.headers.host!=='127.0.0.1:4317')return res.sendStatus(403);
 next();
});
app.use(express.json({limit:'700kb'}));
app.use(express.static('public'));
app.get('/session',(req,res)=>res.json({token}));
app.post('/analyze',async(req,res)=>{
 try{
  const supplied=Buffer.from(req.headers['x-session-token']||'');const expected=Buffer.from(token);
  if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected))return res.sendStatus(403);
  const {text,partial,mode}=req.body;
  if(typeof text!=='string'||text.length>120000||typeof partial!=='boolean'||!['demo','llm'].includes(mode))throw Error('Geçersiz kaynak metin veya analiz yöntemi');
  const report=mode==="demo"?{...verify(baseline(text),text,{partial}),mode:"demo"}:await analyzeWithLLM(text,{partial});
  res.json(report);
 }catch(e){res.status(422).json({error:e.message});}
});
export {app};
if(process.argv[1]===fileURLToPath(import.meta.url))app.listen(4317,'127.0.0.1',()=>console.log('Koşul Gözcü: http://127.0.0.1:4317'));
