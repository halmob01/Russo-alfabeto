import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {raw,words,phrases,letterNames} from "../src/data.mjs";
import {createAudioPlayer} from "../src/audio-player.mjs";

test("all alphabet letters have Russian spoken names",()=>{
  assert.equal(raw.length,33);
  assert.equal(letterNames.length,33);
  assert.equal(new Set(raw.map(x=>x[0])).size,33);
});
test("inventory has a unique entry for every letter, word and phrase",()=>{
  const data=JSON.parse(fs.readFileSync(new URL("../audio/inventory.json",import.meta.url),"utf8"));
  assert.equal(data.entries.length,raw.length+words.length+phrases.length);
  assert.equal(new Set(data.entries.map(x=>x.key)).size,data.entries.length);
  for(const text of [...raw.map(x=>x[0]),...words.map(x=>x[0]),...phrases.map(x=>x.ru)]){
    assert.ok(data.entries.some(x=>x.key===text.toLocaleUpperCase("ru-RU")),text);
  }
  assert.ok(data.entries.every(x=>x.text.length>0));
});
test("player falls back when no audio manifest was prepared",()=>{
  const spoken=[];
  const player=createAudioPlayer({nativeFallback:text=>spoken.push(text)});
  assert.equal(player.play("МАМА"),"device");
  assert.deepEqual(spoken,["МАМА"]);
});
test("HTML exposes a single module and the new spoken status",()=>{
  const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
  const script=html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(script);
  const javascript=script[1].replace(/^import .*;\s*$/gm,"");
  assert.doesNotThrow(()=>new Function(javascript));
  assert.match(html,/id="audio-status"/);
});
