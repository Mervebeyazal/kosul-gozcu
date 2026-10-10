import { PageController } from '@page-agent/page-controller';
export async function capture(doc=document){
 const root=doc.querySelector('main,article,[role=main]')||doc.body;
 const out=[];const walker=doc.createTreeWalker(root,4);
 while(walker.nextNode()){
  const n=walker.currentNode,p=n.parentElement;
  if(!p||p.closest('script,style,noscript,template,nav,footer,header,[hidden],[aria-hidden=true],input,textarea,select,[data-kosul-ui]'))continue;
  let visible=true;
  for(let a=p;a;a=a.parentElement){const s=getComputedStyle(a);if(s.display==='none'||s.visibility==='hidden'||s.opacity==='0'){visible=false;break;}}
  if(visible&&p.getClientRects().length&&n.textContent.trim())out.push(n.textContent.trim());
 }
 const text=out.join('\n');
 const controller=new PageController({viewportExpansion:-1});
 let agentRead=false;
 try{await controller.getBrowserState();agentRead=true;}finally{await controller.cleanUpHighlights();}
 return {text:text.slice(0,120000),partial:text.length>120000||!!doc.querySelector('iframe')||text.length<150,url:doc.location.href,title:doc.title,agentRead};
}
