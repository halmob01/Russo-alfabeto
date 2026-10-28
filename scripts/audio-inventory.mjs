// All spoken items are drawn directly from the site's shared curriculum.
import fs from "node:fs";
import {fileURLToPath} from "node:url";
import {raw,words,phrases,letterAudioText} from "../src/data.mjs";

const keyOf=s=>String(s).trim().replace(/\s+/g," ").toLocaleUpperCase("ru-RU");
export function buildInventory(){
  const entries=[];
  const keys=new Set();
  function add(text,spoken,kind){
    const key=keyOf(text);
    if(!key||keys.has(key))throw new Error("Missing/duplicate Russian speech key: "+key);
    if(!spoken||typeof spoken!=="string")throw new Error("No pronunciation for "+key);
    keys.add(key);
    entries.push({key,text:spoken,kind});
  }
  for(const [upper] of raw)add(upper,letterAudioText[upper],"letter");
  for(const word of words){
    // Acronyms must be spelled, not read as words.
    add(word[0],word[0]==="СССР"?"эс эс эс эр":word[0].toLocaleLowerCase("ru-RU"),"word");
  }
  for(const phrase of phrases)add(phrase.ru,phrase.ru,"phrase");
  return {version:1,voice:"ru_RU-denis-medium",entries};
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===fs.realpathSync(process.argv[1])){
  const destination=process.argv[2]||"audio/inventory.json";
  const data=buildInventory();
  fs.mkdirSync(destination.substring(0,destination.lastIndexOf("/"))||".",{recursive:true});
  fs.writeFileSync(destination,JSON.stringify(data,null,2)+"\n");
  console.log("Russian neural audio: "+data.entries.length+" items -> "+destination);
}
