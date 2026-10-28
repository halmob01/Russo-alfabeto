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

Progetto statico HTML/CSS/JavaScript, senza build né dipendenze applicative. Riprende da `m_app` la scelta di un'interfaccia leggera per smartphone, `localStorage` e Web Speech API. Font Anton (titoli) e Manrope (testo); palette nero, bianco caldo e rosso, senza fotografie.

La voce russa dipende dal dispositivo: verificare la disponibilità di una voce `ru-RU` su iPhone. La traslitterazione è un aiuto iniziale e non una trascrizione fonetica rigorosa. Le correzioni degli esercizi confrontano la frase attesa, ignorando maiuscole e punteggiatura: non sono un correttore grammaticale generale.

## Prossime migliorie

- Test automatici per sillabo e valutazione.
- Verifica reale su Safari iOS e revisione della fonetica.
- Nuove frasi costruite combinando strutture già apprese.
