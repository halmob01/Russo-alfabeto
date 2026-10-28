// Lightweight player for pre-generated Piper Russian clips.
// No neural model or paid API is loaded on the student's phone.
export function createAudioPlayer({
  nativeFallback,
  baseUrl="../audio/generated/",
  fetcher=(...args)=>fetch(...args),
  makeAudio=url=>new Audio(url)
}={}){
  if(typeof nativeFallback!=="function")throw new TypeError("nativeFallback is required");
  const root=new URL(baseUrl,import.meta.url);
  const normalize=text=>String(text??"").trim().replace(/\s+/g," ").toLocaleUpperCase("ru-RU");
  let clips=null;
  let pending=null;
  let active=null;
  let generation=0;

  function prepare(){
    if(pending)return pending;
    pending=fetcher(new URL("manifest.json",root),{cache:"no-cache"})
      .then(r=>{if(!r.ok)throw new Error("Audio manifest unavailable");return r.json()})
      .then(data=>{
        clips=data?.schema===1&&data?.voice==="ru_RU-denis-medium"&&data?.clips&&
          typeof data.clips==="object"&&!Array.isArray(data.clips)?data.clips:null;
        return !!clips&&Object.keys(clips).length>0;
      })
      .catch(()=>{clips=null;return false});
    return pending;
  }

  function stop(){
    generation++;
    if(active){
      active.pause();
      active.removeAttribute("src");
      active.load();
      active=null;
    }
  }

  function available(text){
    return !!clips&&Object.hasOwn(clips,normalize(text));
  }

  function play(text){
    stop();
    const request=generation;
    const file=clips?.[normalize(text)];
    if(typeof file==="string"&&/^[a-f0-9]{20}\.mp3$/.test(file)){
      const audio=makeAudio(new URL(file,root).href);
      active=audio;
      let completed=false;
      const fallback=()=>{
        if(request!==generation||completed)return;
        completed=true;
        active=null;
        nativeFallback(text);
      };
      audio.onerror=fallback;
      audio.onended=()=>{if(request===generation)active=null};
      try{
        const promise=audio.play(); // remains in the original click gesture on iOS
        if(promise&&typeof promise.catch==="function")promise.catch(fallback);
        return "neural";
      }catch{
        fallback();
        return "device";
      }
    }
    nativeFallback(text);
    return "device";
  }

  return {prepare,play,stop,available,ready:()=>!!clips,count:()=>Object.keys(clips||{}).length};
}
