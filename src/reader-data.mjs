// Reader pilot: static, manually annotated texts; no runtime dictionary or AI.
// All visible fragments, including spaces and punctuation, are explicit parts.
export const lexicon=Object.freeze({
  "ru-eto":{lemma:"это",it:"questo, questa (in frasi come «questo è…»)",status:"da_verificare"},
  "ru-iskra":{lemma:"искра",it:"scintilla; «Iskra» come nome proprio",status:"da_verificare"},
  "ru-slovo":{lemma:"слово",it:"parola",status:"da_verificare"},
  "ru-gazeta":{lemma:"газета",it:"giornale",status:"da_verificare"},
  "ru-nazyvatsya":{lemma:"называться",it:"chiamarsi, essere chiamato",status:"da_verificare"}
});

export const cards=[{
  id:"iskra-01",
  title:"Искра — La scintilla",
  recommendedAfter:[],
  introduces:["ru-eto","ru-iskra","ru-slovo","ru-gazeta","ru-nazyvatsya"],
  revisits:[],
  targets:["frase nominale con это", "nome proprio e nome comune"],
  introduction:"La parola искра significa «scintilla». È anche il nome di un giornale russo. Leggi le frasi una alla volta: la traduzione è facoltativa.",
  sentences:[
    {id:"iskra-01-s1",ru:"Это искра.",it:"Questa è una scintilla.",parts:[
      {text:"Это",lemmaId:"ru-eto",gloss:"questo è / questa è"},{text:" "},
      {text:"искра",lemmaId:"ru-iskra",gloss:"scintilla"},{text:"."}]},
    {id:"iskra-01-s2",ru:"«Искра» — это слово.",it:"«Iskra» è una parola.",parts:[
      {text:"«"},{text:"Искра",lemmaId:"ru-iskra",gloss:"«Iskra», il nome della parola"},{text:"» — "},
      {text:"это",lemmaId:"ru-eto",gloss:"è / questo è"},{text:" "},
      {text:"слово",lemmaId:"ru-slovo",gloss:"parola"},{text:"."}]},
    {id:"iskra-01-s3",ru:"«Искра» — это газета.",it:"«Iskra» è un giornale.",parts:[
      {text:"«"},{text:"Искра",lemmaId:"ru-iskra",gloss:"«Iskra», titolo del giornale"},{text:"» — "},
      {text:"это",lemmaId:"ru-eto",gloss:"è / questo è"},{text:" "},
      {text:"газета",lemmaId:"ru-gazeta",gloss:"giornale"},{text:"."}]},
    {id:"iskra-01-s4",ru:"Газета называется «Искра».",it:"Il giornale si chiama «Iskra».",parts:[
      {text:"Газета",lemmaId:"ru-gazeta",gloss:"il giornale"},{text:" "},
      {text:"называется",lemmaId:"ru-nazyvatsya",gloss:"si chiama",note:"Da называться (chiamarsi); la forma è alla terza persona."},{text:" «"},
      {text:"Искра",lemmaId:"ru-iskra",gloss:"«Iskra», nome proprio"},{text:"»."}]}
  ],
  grammar:{title:"Una struttura da riconoscere",text:"In «Искра — это газета» la parola это collega il nome a ciò che è: «Iskra è un giornale». Non occorre aggiungere un verbo «essere» al presente."},
  exercises:[
    {id:"iskra-01-e1",type:"choice",prompt:"Nel testo, oltre a «scintilla», che cosa indica «Искра»?",options:[
      {value:"газета",label:"Un giornale"},{value:"город",label:"Una città"},{value:"человек",label:"Una persona"}],
      accepted:["газета"],targetLemmaIds:["ru-iskra","ru-gazeta"],
      hint:"Rileggi la terza frase.",explanation:"«Искра» — это газета: il nome del giornale significa «scintilla»."},
    {id:"iskra-01-e2",type:"write",prompt:"Completa con una parola russa: «Искра» — это _____.",
      accepted:["газета"],targetLemmaIds:["ru-gazeta"],hint:"La parola è nella terza frase.",
      explanation:"Газета è «giornale»: con это puoi dire «X è Y» senza un verbo essere al presente."},
    {id:"iskra-01-e3",type:"pick-token",prompt:"In questa frase nuova, tocca la parola che significa «giornale».",
      contextRu:"Это газета.",options:[{value:"Это",label:"Это"},{value:"газета",label:"газета"}],
      accepted:["газета"],targetLemmaIds:["ru-gazeta"],
      hint:"La prima parola «это» significa «questo è».",explanation:"Газета significa «giornale» anche in una frase diversa da quella della scheda."}
  ],
  original:{
    ru:"Из искры возгорится пламя.",
    it:"Dalla scintilla divamperà la fiamma.",
    attribution:"Aleksandr Odoevskij, risposta poetica a Puškin; verso adottato come epigrafe di «Iskra».",
    note:"Questo è un frammento autentico, non ancora graduato. La forma искры non è stata spiegata: osserva soltanto la parentela con искра."
  },
  verification:"da_verificare" // Revisione linguistica e fonetica umana ancora richiesta.
}];

export function normalizeAnswer(value){
  return String(value??"").normalize("NFC").toLocaleLowerCase("ru-RU").replace(/[.,!?;:«»“”]/g,"").replace(/\s+/g," ").trim();
}
export function checkReaderAnswer(exercise,value){
  // Accepted alternatives are declared per question: no global е/ё substitution.
  return exercise.accepted.some(accepted=>normalizeAnswer(value)===normalizeAnswer(accepted));
}
export function validateReaderCards(items=cards,dictionary=lexicon){
  const ids=new Set();
  const register=id=>{
    if(typeof id!=="string"||!id||ids.has(id))throw Error("Missing or duplicate reader ID: "+id);
    ids.add(id);
  };
  for(const card of items){
    register(card.id);
    if(card.sentences.length<3||card.sentences.length>6)throw Error("Reader card must have 3–6 sentences");
    if(card.exercises.length<3)throw Error("Reader card requires 3 exercise types");
    for(const lemmaId of [...card.introduces,...card.revisits])if(!dictionary[lemmaId])throw Error("Unknown lemma: "+lemmaId);
    const types=new Set();
    for(const sentence of card.sentences){
      register(sentence.id);
      if(!sentence.ru||sentence.parts.map(p=>p.text).join("")!==sentence.ru)throw Error("Reader tokens do not match "+sentence.id);
      for(const part of sentence.parts){
        if(part.lemmaId&&!dictionary[part.lemmaId])throw Error("Unknown token lemma: "+part.lemmaId);
        if(part.lemmaId&&!part.gloss)throw Error("Missing gloss in "+sentence.id);
      }
    }
    if(!card.original?.ru||!card.original?.attribution)throw Error("Missing attributed original: "+card.id);
    for(const ex of card.exercises){
      register(ex.id);
      types.add(ex.type);
      if(!["choice","write","pick-token"].includes(ex.type))throw Error("Unsupported exercise type: "+ex.type);
      if(!Array.isArray(ex.accepted)||!ex.accepted.length)throw Error("Missing answer in "+ex.id);
      if(ex.type!=="write"){
        const vals=ex.options.map(o=>o.value);
        if(new Set(vals.map(normalizeAnswer)).size!==vals.length)throw Error("Duplicate options in "+ex.id);
        if(!ex.accepted.every(answer=>vals.some(v=>normalizeAnswer(v)===normalizeAnswer(answer))))throw Error("Answer missing among options in "+ex.id);
      }
      for(const lemmaId of ex.targetLemmaIds||[])if(!dictionary[lemmaId])throw Error("Unknown target lemma: "+lemmaId);
    }
    if(types.size<3)throw Error("Reader card must vary exercise types");
  }
  return true;
}
