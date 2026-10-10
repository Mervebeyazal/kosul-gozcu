import {parseHTML} from 'linkedom';import {readFile} from 'node:fs/promises';
// Structural fixture checks, not a substitute for a browser visibility test.
const {document}=parseHTML(await readFile('public/demo.html','utf8'));
if(!document.querySelector('main span[style="display:none"]'))throw Error('Injection fixture missing');
console.log('Hidden injection fixture present; browser extraction must be checked separately.');
