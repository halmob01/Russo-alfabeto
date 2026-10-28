// Riproduzione MP3 Piper con fallback alla voce ru-RU del browser.
const normalize=text=>String(text??"").trim().replace(/\s+/g," ").toLocaleUpperCase("ru-RU");
export function createAudioPlayer({nativeFallback,baseUrl="../audio/generated/"}) {
  let clips=null,loading=null,active=null,generation=0;
  const root=new URL(baseUrl,import.meta.url);
  function prepare(){
    if(loading)return loading;
    loading=fetch(new URL("manifest.json",root),{cache:"no-cache"})
      .then(response=>{if(!response.ok)throw new Error("Audio manifest unavailable");return response.json()})
      .then(manifest=>{
        clips=manifest?.schema===1&&manifest?.voice==="Piper ru_RU-denis-medium"&&manifest.clips&&typeof manifest.clips==="object" ? manifest.clips : null;
        return !!clips&&Object.keys(clips).length>0;
      })
      .catch(()=>{clips=null;return false});
    return loading;
  }
  function stop(){
    generation++;
    if(active){
      const previous=active;active=null;
      previous.pause();previous.removeAttribute("src");previous.load();
    }
  }
  function available(text){return !!clips&&Object.prototype.hasOwnProperty.call(clips,normalize(text))}
  function play(text){
    stop();const current=generation;
    const fallback=()=>{if(current!==generation)return;active=null;nativeFallback(text)};
    const file=available(text) ? clips[normalize(text)] : null;
    if(typeof file==="string"&&/^[0-9a-f]{20}\.mp3$/.test(file)){
      const audio=new Audio(new URL(file,root).href);
      active=audio;
      audio.onended=()=>{if(current===generation)active=null};
      audio.onerror=fallback;
      try{
        // play() è chiamato direttamente dal click: requisito di Safari iOS.
        const attempt=audio.play();
        if(attempt&&typeof attempt.catch==="function")attempt.catch(fallback);
        return "neural";
      }catch{fallback();return "device"}
    }
    fallback();return "device";
  }
  return {prepare,play,stop,available,isReady:()=>!!clips,count:()=>Object.keys(clips||{}).length};
}
