#!/usr/bin/env python3
"""Generate Russian neural speech once at build time; the browser only plays MP3s."""
import argparse
import hashlib
import json
import logging
import re
import subprocess
import tempfile
import wave
from pathlib import Path

from imageio_ffmpeg import get_ffmpeg_exe
from piper import PiperVoice

logging.basicConfig(level=logging.INFO,format="%(levelname)s: %(message)s")
log=logging.getLogger("russian-piper")

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--inventory",default="audio/inventory.json")
    p.add_argument("--model",required=True)
    p.add_argument("--config",required=True)
    p.add_argument("--out",default="audio/generated")
    args=p.parse_args()
    inventory=json.loads(Path(args.inventory).read_text(encoding="utf-8"))
    if inventory.get("version")!=1 or inventory.get("voice")!="ru_RU-denis-medium":
        raise ValueError("Unexpected Russian audio inventory format or voice")
    entries=inventory["entries"]
    keys=[entry["key"] for entry in entries]
    if len(keys)!=len(set(keys)) or not keys:
        raise ValueError("Missing or duplicate audio keys")
    config=json.loads(Path(args.config).read_text(encoding="utf-8"))
    if config.get("espeak",{}).get("voice")!="ru":
        raise ValueError("Model configuration does not use Russian phonemization")
    out=Path(args.out)
    out.mkdir(parents=True,exist_ok=True)
    voice=PiperVoice.load(args.model,config_path=args.config)
    clips={}
    with tempfile.TemporaryDirectory() as tmp:
        temporary_wav=Path(tmp)/"sample.wav"
        for i,entry in enumerate(entries,1):
            key=entry["key"]
            spoken=re.sub(r"\s+"," ",entry["text"]).strip()
            if not spoken:
                raise ValueError("Empty utterance for "+key)
            name=hashlib.sha256(key.encode("utf-8")).hexdigest()[:20]+".mp3"
            target=out/name
            if not target.exists() or target.stat().st_size<300:
                with wave.open(str(temporary_wav),"wb") as handle:
                    voice.synthesize_wav(spoken,handle)
                subprocess.run([
                    get_ffmpeg_exe(),"-nostdin","-hide_banner","-loglevel","error","-y",
                    "-i",str(temporary_wav),"-ar","22050","-ac","1",
                    "-codec:a","libmp3lame","-b:a","48k",str(target)
                ],check=True)
            if target.stat().st_size<300:
                raise RuntimeError("Invalid or empty audio for "+key)
            clips[key]=name
            if i%10==0 or i==len(entries):
                log.info("Generated or reused %d/%d Russian clips",i,len(entries))
    manifest={"schema":1,"voice":"ru_RU-denis-medium","source":"rhasspy/piper-voices",
              "generated":True,"clips":clips}
    (out/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    if len(clips)!=len(entries):
        raise RuntimeError("Incomplete Russian audio manifest")
    log.info("Verified %d MP3 files",len(clips))

if __name__=="__main__":
    main()
