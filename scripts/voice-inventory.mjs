// Estrae tutti i contenuti pronunciabili dal sillabo effettivamente usato dall'app.
import fs from "node:fs";
import {raw,words,phrases,letterNames} from "../src/data.mjs";
const items=new Map();
const normalize=text=>String(text??"").trim().replace(/\s+/g," ").toLocaleUpperCase("ru-RU");
function collect(label,spoken,category){
  const key=normalize(label),text=String(spoken).trim();
  if(!key||!text||text.length>240)throw new Error("Invalid audio content: "+label);
  if(items.has(key))throw new Error("Duplicate audio key: "+key);
  items.set(key,{key,text,category});
}
if(raw.length!==33||letterNames.length!==raw.length)throw new Error("Russian alphabet must have 33 names");
raw.forEach((letter,index)=>collect(letter[0],letterNames[index],"letter"));
words.forEach(word=>collect(word[0],word[0]==="СССР"?"эс эс эс эр":word[0].toLocaleLowerCase("ru-RU"),"word"));
phrases.forEach(phrase=>collect(phrase.ru,phrase.ru,"phrase"));
const entries=[...items.values()].sort((a,b)=>a.key.localeCompare(b.key,"ru"));
const out=new URL("../audio/inventory.json",import.meta.url);
fs.mkdirSync(new URL("../audio/",import.meta.url),{recursive:true});
fs.writeFileSync(out,JSON.stringify({version:1,voice:"ru_RU-denis-medium",entries},null,2)+"\n");
console.log("Piper Russian audio: "+raw.length+" letters, "+words.length+" words, "+phrases.length+" phrases; "+entries.length+" clips");
