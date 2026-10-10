import {build} from 'esbuild';import {cp,mkdir} from 'node:fs/promises';
await mkdir('extension/dist',{recursive:true});
await build({entryPoints:['src/content.js'],bundle:true,outfile:'extension/dist/content.js',format:'iife'});
await build({entryPoints:['src/app.js'],bundle:true,outfile:'public/app.js',format:'iife'});
for(const f of ['index.html','style.css','app.js'])await cp('public/'+f,'extension/'+f);
