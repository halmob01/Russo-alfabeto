#!/usr/bin/env python3
"""Produce static Piper MP3s. Runs only in GitHub Actions, not on student phones."""
from __future__ import annotations
import argparse
import hashlib
import json
import logging
import subprocess
import tempfile
import wave
from pathlib import Path
from imageio_ffmpeg import get_ffmpeg_exe
from piper import PiperVoice

logging.basicConfig(level=logging.INFO,format="%(levelname)s: %(message)s")
log=logging.getLogger("piper-ru")

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--inventory",default="audio/inventory.json")
    parser.add_argument("--model",required=True)
    parser.add_argument("--config",required=True)
    parser.add_argument("--out",default="audio/generated")
    args=parser.parse_args()
    data=json.loads(Path(args.inventory).read_text(encoding="utf-8"))
    if data.get("version")!=1 or data.get("voice")!="ru_RU-denis-medium":
        raise ValueError("Unsupported inventory")
    out=Path(args.out)
    out.mkdir(parents=True,exist_ok=True)
    voice=PiperVoice.load(args.model,config_path=args.config)
    clips={}
    with tempfile.TemporaryDirectory() as temp:
        wav=Path(temp)/"utterance.wav"
        for i,entry in enumerate(data["entries"],1):
            key,text=entry["key"],entry["text"]
            name=hashlib.sha256(key.encode("utf-8")).hexdigest()[:20]+".mp3"
            target=out/name
            if not target.is_file():
                with wave.open(str(wav),"wb") as output:
                    voice.synthesize_wav(text,output)
                subprocess.run([get_ffmpeg_exe(),"-nostdin","-hide_banner","-loglevel","error","-y",
                    "-i",str(wav),"-ar","22050","-ac","1","-codec:a","libmp3lame","-b:a","48k",
                    str(target)],check=True)
            if target.stat().st_size<300:
                raise RuntimeError("Empty or invalid MP3: "+key)
            clips[key]=name
            if i%20==0 or i==len(data["entries"]):
                log.info("Generated %d/%d audio files",i,len(data["entries"]))
    if len(clips)!=len(data["entries"]):
        raise RuntimeError("Incomplete audio inventory")
    manifest={"schema":1,"voice":"Piper ru_RU-denis-medium","source":"rhasspy/piper-voices",
              "generated":True,"clips":clips}
    (out/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    log.info("Audio manifest ready: %d MP3s",len(clips))

if __name__=="__main__":
    main()
