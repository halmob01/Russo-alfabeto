import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildInventory} from "../scripts/audio-inventory.mjs";
import {createAudioPlayer} from "../src/audio-player.mjs";

test("inventory covers all 33 letters, 16 words and 13 phrases without duplicates",()=>{
  const data=buildInventory();
  assert.equal(data.entries.length,62);
  for(const [kind,n] of [["letter",33],["word",16],["phrase",13]]){
    assert.equal(data.entries.filter(x=>x.kind===kind).length,n);
  }
  assert.equal(new Set(data.entries.map(x=>x.key)).size,62);
  assert.equal(data.entries.find(x=>x.key==="М").text,"эм");
  assert.equal(data.entries.find(x=>x.key==="СССР").text,"эс эс эс эр");
});

test("the web page uses the shared audio player and data",()=>{
  const html=readFileSync(new URL("../index.html",import.meta.url),"utf-8");
  assert.match(html,/type="module"/);
  assert.match(html,/neuralAudio\.play\(t\)/);
  assert.match(html,/letterAudioText\[letter\]/);
});

test("a valid Piper manifest plays an MP3 instead of device TTS",async()=>{
  const fallback=[];
  const played=[];
  const name="abcdef0123456789abcd.mp3";
  const app=createAudioPlayer({
    nativeFallback:t=>fallback.push(t),
    fetcher:async()=>({ok:true,json:async()=>({schema:1,voice:"ru_RU-denis-medium",clips:{"ПРИВЕТ":name}})}),
    makeAudio:url=>{
      played.push(url);
      return {play:()=>Promise.resolve(),pause(){},removeAttribute(){},load(){}};
    }
  });
  assert.equal(await app.prepare(),true);
  assert.equal(app.play("привет"),"neural");
  assert.equal(played.length,1);
  assert.ok(played[0].endsWith("/audio/generated/"+name));
  assert.deepEqual(fallback,[]);
});

test("failed MP3 playback falls back once, and missing utterances use device TTS",async()=>{
  const fallback=[];
  const audio={play:()=>Promise.reject(new Error("unplayable")),pause(){},removeAttribute(){},load(){}};
  const app=createAudioPlayer({
    nativeFallback:t=>fallback.push(t),
    fetcher:async()=>({ok:true,json:async()=>({schema:1,voice:"ru_RU-denis-medium",clips:{"ДА":"abcdef0123456789abcd.mp3"}})}),
    makeAudio:()=>audio
  });
  await app.prepare();
  assert.equal(app.play("нет"),"device");
  app.play("да");
  await new Promise(resolve=>setImmediate(resolve));
  audio.onerror?.();
  assert.deepEqual(fallback,["нет","да"]);
});

test("invalid manifests preserve the browser fallback",async()=>{
  const fallback=[];
  const app=createAudioPlayer({
    nativeFallback:t=>fallback.push(t),
    fetcher:async()=>({ok:true,json:async()=>({schema:1,voice:"other",clips:{"ДА":"abc.mp3"}})})
  });
  assert.equal(await app.prepare(),false);
  assert.equal(app.play("да"),"device");
  assert.deepEqual(fallback,["да"]);
});
