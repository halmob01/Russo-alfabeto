# Russo — Alfabeto

Una web app gratuita, mobile-first, per imparare a leggere il cirillico e scrivere le prime frasi russe.

## Contenuti attuali

- **33 lettere** in 6 lezioni, con pronuncia su richiesta.
- **Quiz** di riconoscimento delle lettere.
- **16 parole** con traslitterazione, significato e audio.
- **13 frasi quotidiane** in 4 gruppi: presentarsi, lavoro, animali, lettura.
- Per ogni frase: **riordina le parole** oppure **scrivi in cirillico**, con tastiera virtuale, controllo risposta, ascolto e spiegazione.
- Progressi salvati localmente nel browser. Nessun account o servizio AI.

## Uso

Apri `index.html` tramite un server statico (per esempio `python3 -m http.server 8080`).

### Pubblicazione

È presente `.github/workflows/pages.yml`, che pubblica l'app con GitHub Actions quando GitHub Pages è abilitato. In **Settings → Pages → Build and deployment**, seleziona **GitHub Actions** come origine, se non è già impostata. Controlla **Actions** per lo stato della pubblicazione.

Indirizzo previsto, **da verificare dopo il deploy**: https://halmob01.github.io/Russo-alfabeto/

## Scelte tecniche

Progetto statico HTML/CSS/JavaScript, senza build né dipendenze applicative. Riprende da `m_app` la scelta di un'interfaccia leggera per smartphone, `localStorage`, audio neurale Piper e Web Speech API come fallback. Font Anton (titoli) e Manrope (testo); palette nero, bianco caldo e rosso, senza fotografie.

La voce principale è Piper `ru_RU-denis-medium`, con MP3 generati durante il deploy; in mancanza dei file audio si usa la voce `ru-RU` del dispositivo. La traslitterazione è un aiuto iniziale e non una trascrizione fonetica rigorosa. Le correzioni degli esercizi confrontano la frase attesa, ignorando maiuscole e punteggiatura: non sono un correttore grammaticale generale.

## Prossime migliorie

- Test automatici per sillabo e valutazione.
- Verifica reale su Safari iOS e revisione della fonetica.
- Nuove frasi costruite combinando strutture già apprese.

## Voce russa neurale (Piper)

La voce `ru_RU-denis-medium` è generata da GitHub Actions in file MP3 statici: **33 nomi delle lettere**, **16 parole** e **13 frasi**. Il modello non viene scaricato sul telefono; la sintesi non richiede chiavi API o costi per ascolto. `src/data.mjs` è la fonte unica per testo e inventario, così aggiungere una frase aggiorna automaticamente la banca audio. `src/audio-player.mjs` legge `audio/generated/manifest.json` e ricorre al TTS russo del dispositivo se un MP3 manca o non si riproduce. Le lettere sono pronunciate con il loro **nome russo**, non come fonemi isolati.

La pipeline `.github/workflows/pages.yml` verifica test, modello scaricato (SHA-256), integrità di 62 MP3 e manifest prima della pubblicazione. Apri **Settings → Pages → Source: GitHub Actions** e verifica che il workflow sulla branch `main` sia riuscito. L'indirizzo del sito non cambia. Durante la prima visita i file audio vengono scaricati alla pressione di Ascolta: **funzionamento offline non garantito**.

Il controllo del numero di file non certifica la correttezza della pronuncia: per uso didattico ascoltare e revisionare le 33 lettere e un campione di parole/frasi, in particolare gli accenti, i nomi propri e l'acronimo СССР. Per cambiare voce occorre rigenerare tutti i file e aggiornare la voce attesa nel manifest e nel lettore.

**Fonti e licenze:** modello [rhasspy/piper-voices — denis medium](https://huggingface.co/rhasspy/piper-voices/tree/main/ru/ru_RU/denis/medium); [MODEL_CARD](https://huggingface.co/rhasspy/piper-voices/blob/main/ru/ru_RU/denis/medium/MODEL_CARD) (dataset dichiarato CC0, modello derivato da lessac). Le condizioni relative ai pesi derivati vanno considerate separatamente per riusi commerciali. La dipendenza Piper è eseguita solo durante la build.

Test locali: `node --test tests/*.test.mjs`, quindi `node scripts/audio-inventory.mjs`. La produzione dei file richiede Piper, il modello ONNX e FFmpeg.

## Sintesi vocale neurale Piper

- Modello: [ru_RU-denis-medium](https://huggingface.co/rhasspy/piper-voices/tree/main/ru/ru_RU/denis/medium), repository rhasspy/piper-voices (MIT), dataset indicato nella model card come CC0. Il modello ha SHA-256 verificato nella pipeline.
- Inventario condiviso: `src/data.mjs` → `scripts/voice-inventory.mjs` → `audio/inventory.json`. Include 33 nomi di lettere, 16 parole, 13 frasi.
- Generazione: GitHub Actions usa Piper e FFmpeg, produce `audio/generated/manifest.json` e MP3 hashati. Il modello da 63 MB non è caricato sul telefono.
- Riproduzione: `src/audio-player.mjs` carica il manifest e preferisce l'MP3; in caso di assenza o errore torna alla voce del browser.
- Pubblicazione: **Settings → Pages → Build and deployment → Source: GitHub Actions**. La PR testa gli audio ma non pubblica; il merge su `main` avvia la distribuzione.
- **Revisione necessaria**: ascoltare sul telefono i nomi delle lettere, prestiti e nomi propri; la prosodia della voce sintetica non è garantita.
- Test locali: `node scripts/voice-inventory.mjs && node --test tests/*.test.mjs`. La generazione MP3 richiede il modello ONNX e il comando `python scripts/build-neural-audio.py --model ... --config ...`.
