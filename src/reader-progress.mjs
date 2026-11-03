// Versioned reader-only progress; older alphabet/phrase localStorage keys are untouched.
export const READER_PROGRESS_KEY="iskra-reader-progress-v1";
const EMPTY=()=>({schema:1,opened:[],attempts:[]});
export function loadReaderProgress(storage){
  try{
    const value=JSON.parse(storage.getItem(READER_PROGRESS_KEY)||"null");
    if(value?.schema===1&&Array.isArray(value.opened)&&Array.isArray(value.attempts))return value;
  }catch{}
  return EMPTY();
}
function persist(storage,data){
  try{storage.setItem(READER_PROGRESS_KEY,JSON.stringify(data));}catch{} // Private/limited storage still allows reading.
  return data;
}
export function recordReaderOpen(storage,cardId){
  const data=loadReaderProgress(storage);
  if(!data.opened.includes(cardId))data.opened.push(cardId);
  return persist(storage,data);
}
export function recordReaderAttempt(storage,{cardId,exerciseId,correct,usedHelp}){
  const data=loadReaderProgress(storage);
  data.attempts.push({cardId,exerciseId,correct:!!correct,usedHelp:!!usedHelp,at:Date.now()});
  data.attempts=data.attempts.slice(-200);
  return persist(storage,data);
}
export function readerSummary(data,card){
  const attempts=data.attempts.filter(a=>a.cardId===card.id);
  const correctWithoutHelp=new Set(attempts.filter(a=>a.correct&&!a.usedHelp).map(a=>a.exerciseId));
  const correctWithHelp=new Set(attempts.filter(a=>a.correct).map(a=>a.exerciseId));
  return {opened:data.opened.includes(card.id),attempts:attempts.length,
    correctWithHelp:correctWithHelp.size,correctWithoutHelp:correctWithoutHelp.size,
    total:card.exercises.length}; // Evidence, never a claim of word mastery.
}
