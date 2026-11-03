// P1 reader UI: no dependencies beyond the shared static curriculum and audio callback.
import {cards,lexicon,checkReaderAnswer} from "./reader-data.mjs";
import {loadReaderProgress,recordReaderOpen,recordReaderAttempt,readerSummary} from "./reader-progress.mjs";

function node(tag,className,text){
  const element=document.createElement(tag);
  if(className)element.className=className;
  if(text!==undefined)element.textContent=text;
  return element;
}
function button(label,handler,className="btn"){
  const b=node("button",className,label);
  b.type="button";
  b.addEventListener("click",handler);
  return b;
}
export function createReaderView({root,speak,storage=localStorage}){
  const card=cards[0];
  const ui={showTranslations:false,gloss:null,helpUsed:false,hints:new Set(),results:{},drafts:{}};
  function open(){
    recordReaderOpen(storage,card.id);
    render();
  }
  function attempt(ex,value){
    const correct=checkReaderAnswer(ex,value);
    ui.results[ex.id]={correct,value,usedHelp:ui.helpUsed||ui.hints.has(ex.id)};
    recordReaderAttempt(storage,{cardId:card.id,exerciseId:ex.id,correct,usedHelp:ui.results[ex.id].usedHelp});
    render();
  }
  function render(){
    const panel=node("section","panel reader-panel");
    panel.append(node("div","eyebrow","Repertorio · Scheda pilota 01"));
    panel.append(node("h2","sectionTitle reader-title",card.title));
    panel.append(node("p","muted",card.introduction));
    const summary=readerSummary(loadReaderProgress(storage),card);
    panel.append(node("p","reader-status",
      "Prove corrette: "+summary.correctWithHelp+"/"+summary.total+
      " · senza aiuti: "+summary.correctWithoutHelp+"/"+summary.total+
      " · non è una misura di padronanza."));
    const textSection=node("section","reader-text");
    textSection.append(node("h3",null,"Leggi in russo"));
    textSection.append(node("p","muted","Tocca una parola per vedere il significato; ascolta soltanto se serve."));
    const toolbar=node("div","controls");
    toolbar.append(button(ui.showTranslations?"Nascondi traduzioni":"Mostra traduzioni",()=>{
      ui.showTranslations=!ui.showTranslations;
      if(ui.showTranslations)ui.helpUsed=true;
      render();
    },"btn secondary"));
    textSection.append(toolbar);
    card.sentences.forEach(sentence=>{
      const item=node("div","reader-sentence-card");
      const line=node("div","reader-sentence");
      line.lang="ru";
      sentence.parts.forEach((part,index)=>{
        if(!part.lemmaId){line.append(document.createTextNode(part.text));return;}
        const key=sentence.id+":"+index;
        const token=button(part.text,()=>{
          ui.helpUsed=true;
          ui.gloss=ui.gloss===key?null:key;
          render();
        },"reader-token");
        token.lang="ru";
        token.setAttribute("aria-expanded",String(ui.gloss===key));
        token.setAttribute("aria-label","Significato di "+part.text);
        line.append(token);
      });
      item.append(line);
      const selected=sentence.parts.find((p,i)=>ui.gloss===sentence.id+":"+i&&p.lemmaId);
      if(selected){
        const lemma=lexicon[selected.lemmaId];
        item.append(node("div","reader-gloss",selected.text+" → "+selected.gloss+
          " · forma base: "+lemma.lemma+(selected.note?" · "+selected.note:"")));
      }
      const controls=node("div","controls");
      controls.append(button("▶ Ascolta",()=>speak(sentence.ru),"btn secondary"));
      item.append(controls);
      if(ui.showTranslations)item.append(node("p","reader-translation",sentence.it));
      textSection.append(item);
    });
    panel.append(textSection);
    const grammar=node("section","reader-grammar");
    grammar.append(node("h3",null,card.grammar.title));
    grammar.append(node("p","muted",card.grammar.text));
    panel.append(grammar);
    const exercises=node("section","reader-exercises");
    exercises.append(node("h3",null,"Metti alla prova la lettura"));
    exercises.append(node("p","muted","Tre attività diverse. Gli aiuti vengono registrati; puoi riprovare senza perdere il testo."));
    exercises.append(button("Inizia una nuova prova senza suggerimenti",()=>{
      // Reading support is for learning. A fresh attempt records later recall separately.
      ui.showTranslations=false;ui.gloss=null;ui.helpUsed=false;
      ui.hints.clear();ui.results={};ui.drafts={};
      render();
    },"btn secondary"));
    card.exercises.forEach((ex,i)=>{
      const item=node("div","reader-exercise");
      item.append(node("div","eyebrow","Attività "+(i+1)+" / "+card.exercises.length));
      item.append(node("p","reader-question",ex.prompt));
      if(ex.contextRu){
        const context=node("p","reader-context",ex.contextRu);
        context.lang="ru";
        item.append(context);
      }
      const result=ui.results[ex.id];
      if(result){
        item.append(node("p","reader-feedback "+(result.correct?"reader-good":"reader-error"),
          (result.correct?"Corretto. ":"Non ancora. ")+ex.explanation+
          (result.usedHelp?" · Prova registrata con aiuto.":" · Prova senza aiuti.")));
        item.append(button("Riprova",()=>{delete ui.results[ex.id];delete ui.drafts[ex.id];render();},"btn secondary"));
      }else if(ex.type==="write"){
        const field=node("input","reader-input");
        field.type="text";field.lang="ru";field.autocomplete="off";field.spellcheck=false;
        field.placeholder="Scrivi in cirillico";
        field.setAttribute("aria-label",ex.prompt);
        field.value=ui.drafts[ex.id]||"";
        field.addEventListener("input",()=>ui.drafts[ex.id]=field.value);
        field.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();attempt(ex,field.value)}});
        item.append(field);
        item.append(button("Controlla risposta",()=>attempt(ex,field.value)));
      }else{
        const choices=node("div","reader-options");
        ex.options.forEach(opt=>{
          const b=button(opt.label,()=>attempt(ex,opt.value),"reader-option");
          if(ex.type==="pick-token")b.lang="ru";
          choices.append(b);
        });
        item.append(choices);
      }
      if(!result){
        item.append(button(ui.hints.has(ex.id)?"Nascondi suggerimento":"Mostra suggerimento",()=>{
          if(ui.hints.has(ex.id))ui.hints.delete(ex.id);
          else {ui.hints.add(ex.id);ui.helpUsed=true;}
          render();
        },"btn secondary"));
        if(ui.hints.has(ex.id))item.append(node("p","reader-hint",ex.hint));
      }
      exercises.append(item);
    });
    exercises.append(button("↑ Torna al testo",()=>{
      textSection.scrollIntoView({behavior:"smooth",block:"start"});
    },"btn secondary"));
    panel.append(exercises);
    const authentic=node("section","reader-authentic");
    authentic.append(node("div","eyebrow","Il frammento autentico"));
    const fragment=node("p","reader-original",card.original.ru);fragment.lang="ru";
    authentic.append(fragment);
    authentic.append(node("p",null,card.original.it));
    authentic.append(node("p","reader-credit",card.original.attribution));
    authentic.append(node("p","muted",card.original.note));
    authentic.append(button("▶ Ascolta il frammento",()=>speak(card.original.ru),"btn secondary"));
    panel.append(authentic);
    root.replaceChildren(panel);
  }
  return {open,render};
}
