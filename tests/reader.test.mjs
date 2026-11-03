import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {cards,lexicon,validateReaderCards,normalizeAnswer,checkReaderAnswer} from "../src/reader-data.mjs";
import {READER_PROGRESS_KEY,loadReaderProgress,recordReaderOpen,recordReaderAttempt,readerSummary} from "../src/reader-progress.mjs";

function memoryStorage(){
  const map=new Map();
  return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v))};
}

test("pilot has unique, valid references and lossless annotated phrases",()=>{
  assert.equal(validateReaderCards(),true);
  assert.equal(cards.length,1);
  const c=cards[0];
  assert.equal(c.sentences.length,4);
  assert.equal(c.exercises.length,3);
  assert.equal(c.introduces.length,5);
  for(const s of c.sentences){
    assert.equal(s.parts.map(p=>p.text).join(""),s.ru);
    assert.ok(s.parts.some(p=>p.lemmaId));
  }
  assert.ok(Object.keys(lexicon).length>=5);
});

test("invalid texts or lemma references fail before release",()=>{
  const c=structuredClone(cards);
  c[0].sentences[0].ru="Different text";
  assert.throws(()=>validateReaderCards(c),/tokens do not match/);
  c[0].sentences[0].ru=cards[0].sentences[0].ru;
  c[0].sentences[0].parts[0].lemmaId="missing";
  assert.throws(()=>validateReaderCards(c),/Unknown token lemma/);
});

test("three exercise types accept only explicitly permitted answers",()=>{
  const [choice,write,pick]=cards[0].exercises;
  assert.deepEqual([choice.type,write.type,pick.type],["choice","write","pick-token"]);
  assert.equal(checkReaderAnswer(choice,"газета"),true);
  assert.equal(checkReaderAnswer(choice,"город"),false);
  assert.equal(checkReaderAnswer(write," Газета. "),true);
  assert.equal(checkReaderAnswer(write,"искра"),false);
  assert.equal(checkReaderAnswer(pick,"ГАЗЕТА"),true);
  assert.notEqual(normalizeAnswer("все"),normalizeAnswer("всё")); // Distinction is not erased globally.
});

test("old localStorage keys stay intact and repeated opening never awards knowledge",()=>{
  const storage=memoryStorage();
  storage.setItem("russo-alphabet-done","[1,2]");
  storage.setItem("russo-phrases-done","[0]");
  for(let i=0;i<10;i++)recordReaderOpen(storage,cards[0].id);
  const progress=loadReaderProgress(storage);
  assert.equal(progress.schema,1);
  assert.equal(progress.opened.length,1);
  assert.equal(progress.attempts.length,0);
  assert.equal(readerSummary(progress,cards[0]).correctWithoutHelp,0);
  assert.equal(storage.getItem("russo-alphabet-done"),"[1,2]");
  assert.equal(storage.getItem("russo-phrases-done"),"[0]");
  assert.ok(storage.getItem(READER_PROGRESS_KEY));
});

test("help and autonomous attempts are distinguishable, retries are preserved",()=>{
  const storage=memoryStorage(),c=cards[0];
  recordReaderAttempt(storage,{cardId:c.id,exerciseId:c.exercises[0].id,correct:true,usedHelp:true});
  recordReaderAttempt(storage,{cardId:c.id,exerciseId:c.exercises[0].id,correct:false,usedHelp:false});
  let summary=readerSummary(loadReaderProgress(storage),c);
  assert.equal(summary.attempts,2);
  assert.equal(summary.correctWithHelp,1);
  assert.equal(summary.correctWithoutHelp,0);
  recordReaderAttempt(storage,{cardId:c.id,exerciseId:c.exercises[0].id,correct:true,usedHelp:false});
  summary=readerSummary(loadReaderProgress(storage),c);
  assert.equal(summary.correctWithoutHelp,1);
});

test("new reader is integrated without removing the original four sections",()=>{
  const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
  for(const view of ["letters","quiz","words","phrases","reader"])
    assert.ok(html.includes('data-view="'+view+'"'),view);
  assert.match(html,/createReaderView/);
  const ui=readFileSync(new URL("../src/reader-ui.mjs",import.meta.url),"utf8");
  assert.match(ui,/recordReaderAttempt/);
  assert.match(ui,/scrollIntoView/);
  assert.match(ui,/speak\(sentence\.ru\)/);
});
