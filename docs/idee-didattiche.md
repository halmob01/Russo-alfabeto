# ISKRA: idee didattiche e piano di lavoro

Stato: bozza di brainstorming, 28 ottobre 2026. Documento di sola progettazione: nessuna modifica al codice.

## Obiettivo

Imparare a **leggere testi russi veri**: manifesti del Novecento, poesie, prosa (Dostoevskij). L'app è per uso personale. Parlare e capire l'ascolto non sono obiettivi. Scrivere serve solo se aiuta a riconoscere le forme che poi si leggono.

## Cosa non funziona oggi

- La "lezione" è una griglia di lettere con un suggerimento ("come in casa"). Non spiega niente e non ha un seguito.
- Le schede Lettere, Esercizi, Parole e Frasi sono scollegate: non c'è un ordine né una ragione per passare dall'una all'altra.
- Le parole hanno già un numero di lezione nei dati (`words`, quarto campo) ma l'interfaccia lo ignora e le mostra tutte insieme.
- "Lezione completata" si segna a mano: non si guadagna con niente.
- L'unico quiz è a scelta multipla tra quattro lettere. Si risolve per eliminazione e non obbliga a produrre nulla.
- Le 13 frasi sono fisse e il controllo è un confronto esatto: dopo due giri si sanno a memoria senza capire la struttura.
- La grammatica (per esempio кошка → кошку) esiste solo nelle note e nessun esercizio la fa usare.
- Dopo l'alfabeto non c'è un ponte verso testi veri.

## Idea guida: ISKRA come il tuo Ørberg

Il latino è già stato imparato con il **metodo "natura"** del *Lingua Latina per se illustrata* di Ørberg: si capisce a poco a poco dal contesto, senza tradurre ogni frase. Quel metodo funziona perché il testo è **costruito a gradini**: pochi vocaboli nuovi per capitolo, ripetuti subito, con aiuti vicini. Con testi reali non graduati non regge (torna la regola del 95% di parole note, vedi sotto).

Quindi il compito centrale di ISKRA è **fornire i testi graduati**: una serie di schede brevi, a difficoltà crescente, che portano dall'alfabeto fino a frasi originali di autori russi. Gli esercizi non sono il centro: sostengono le schede.

Differenze rispetto al latino:

- All'inizio il significato si dà **in italiano, al tocco**: non c'è ancora abbastanza russo per spiegare russo con russo.
- Servono spiegazioni brevi su ciò che il latino non ha: accento che cambia posto e aspetto verbale.
- I casi si introducono come in Ørberg: prima si vedono in frasi chiare e solo dopo si dà l'etichetta.

## Principi

1. **Leggere e capire subito.** Ogni testo si capisce parola per parola, senza uscire dall'app.
2. **Testi graduati.** Ogni scheda riusa parole già viste e ne aggiunge poche (3-5).
3. **Produrre invece di riconoscere.** Esercizi di completamento e scrittura nell'app, non scelte a occhio.
4. **Tutto sempre aperto.** Nessuno sblocco: si entra in qualsiasi scheda quando si vuole.
5. **Ripasso mirato.** Ripropone le parole che si sbagliano di più.
6. **Audio facoltativo.** Resta un tasto "come si dice?" nelle schermate di lettura. Niente esercizi di ascolto né dettato.
7. **Scrivere solo online.** Con la tastiera cirillica a schermo (o quella del telefono). Niente quaderno e foto.

### Cosa dice la ricerca (e quanto è solido)

- Ripetizione dilazionata e richiamo attivo migliorano l'apprendimento in molti contesti, ma i benefici calano con materiali complessi e il trasferimento non è garantito. Fonte: [Carpenter, Pan e Butler, *Nature Reviews Psychology*, 2022](https://www.nature.com/articles/s44159-022-00089-1). Ho letto solo l'abstract e l'elenco dei riferimenti.
- Nella lettura estensiva si suggerisce di conoscere almeno il **95% delle parole** del testo. I guadagni di vocabolario dalla sola lettura sono fragili e vanno uniti a studio diretto. Servono mesi o anni. I dati vengono soprattutto da studi sull'inglese e su bambini. Fonte: [JALT, benefici della lettura estensiva](https://jalt-publications.org/tlt/articles/2134-language-learning-benefits-extensive-reading).
- Come lavorano altre app (Anki, Clozemaster, LingQ, Readlang, Duolingo) l'ho descritto dalla mia conoscenza: non ho potuto verificare le loro pagine.

Conseguenza pratica: Dostoevskij è oggi fuori scala. Serve una scala di testi, dagli slogan alle quartine fino a singole frasi di prosa.

## Disegno dell'app

### La home è una mappa con due percorsi

- **Alfabeto:** la rampa iniziale, 6 unità brevi (le lezioni attuali, ma con spiegazione ed esercizi dentro).
- **Repertorio di vite russe:** il cuore. Schede brevi e indipendenti, ordinate per difficoltà.
- **Ripasso** e **Le mie parole:** accessi fissi, sempre disponibili.

Tutto aperto. Ogni elemento mostra uno stato calcolato dalle risposte (da iniziare, in corso, sicura) e la home suggerisce "riprendi da qui" o "da ripassare". Per le schede si può mostrare il livello come numero di parole nuove o, più avanti, come percentuale di parole già note.

### Unità dell'alfabeto

1. **Impara:** 3-5 lettere nuove con audio facoltativo, forma maiuscola e minuscola e una riga sul trucco per ricordarle.
2. **Leggi con quello che sai:** parole vere che usano solo le lettere viste finora (РЕСТОРАН, МЕТРО, АПТЕКА appena possibile), con il significato subito disponibile.
3. **Esercizi:** 5-8 domande che mescolano 2-3 tipi.
4. **Un frammento vero** (un cartello o una parola da un'insegna) interamente leggibile con le lettere imparate.

### Scheda del repertorio

1. **Leggi:** 3-6 frasi semplici in russo (di solito al passato), con tocco sulla parola per il significato e traduzione italiana nascosta dietro un tasto.
2. **Completa:** esercizi sulle parole e sulle forme della scheda (parola, desinenza e lettera mancante, riordino, abbinamento).
3. **La frase vera:** una frase originale dell'autore o un motto, come gradino verso i testi reali.
4. **Parole nuove:** le 3-5 parole della scheda entrano in "Le mie parole" e nel Ripasso.

### Dove vanno a finire le schede attuali

- **Parole:** non esiste più come elenco separato. Le parole si incontrano nelle schede e si raccolgono in "Le mie parole".
- **Frasi:** le 13 frasi attuali diventano le prime schede, di base (presentarsi, lavoro, animali, libri), con i loro esercizi.
- **Quiz sui suoni:** resta, ma come uno dei tanti tipi di esercizio.

## Esercizi

**Completare**

- Lettera mancante: `КО_` → Т.
- Parola mancante: «Меня ___ Джанлука» con зовут / зовёт / звать. Prima con opzioni, poi scrivendo.
- Desinenza mancante: «Я читаю книг_» → у. Porta dentro la grammatica dei casi.
- Sillabe da riordinare: МА + МА, КО + Т.

**Leggere**

- Cosa significa?: parola in cirillico e quattro significati, senza traslitterazione.
- Insegna da decifrare: РЕСТОРАН, АПТЕКА, МЕТРО.
- Testo con tocco sulla parola (vedi schede).

**Abbinare**

- Coppie parola-significato: КОТ ↔ gatto, МИР ↔ mondo / pace.
- Maiuscola e minuscola.
- Suono → lettera (l'inverso del quiz attuale).

**Scrivere (leggero)**

- Copiare e traslitterare parole.
- Completare con la tastiera a schermo.

**Regole di controllo:** si accetta **е al posto di ё** (nei testi veri si scrive quasi sempre così) e si ignorano maiuscole e punteggiatura. Nessuna scheda usa lo stesso tipo di esercizio per tutte le domande.

**Esclusi:** esercizi di ascolto, dettato, scrittura su carta con foto.

**Ripasso:** pesca domande dalle parole incontrate e sbagliate più spesso. È l'unico pezzo di ripetizione dilazionata previsto.

## Contenuti: un repertorio di vite russe

Come **modello di forma e di spirito** si usano due libri di Paolo Nori: *Repertorio dei matti della letteratura russa* (voci brevissime e titolate, quasi aneddoti) e *I russi sono matti*. Sono solo un modello: schede brevi, autonome, sulle vite strane dei russi. **Non si citano né si riproducono passi.** I testi dell'app sono originali, scritti sui fatti, e la repo è pubblica.

**Prima scheda: Iskra**, il nome dell'app (il giornale fondato da Lenin e altri nel 1900). Il suo motto, se ricordo bene «Из искры возгорится пламя» («dalla scintilla divamperà la fiamma»), è una frase brevissima e memorabile con cui aprire il percorso. **Da verificare** la formulazione esatta e l'origine (probabilmente una risposta poetica dei decabristi a Puškin). Poi Lenin e l'esilio, Dostoevskij, Majakovskij, Gogol', Charms e altri.

Perché funziona: dà un filo narrativo, le vite eccentriche si ricordano meglio e i verbi al passato si ripetono di continuo. Le schede sono indipendenti e se ne aggiunge una alla volta.

**Prime schede proposte**, di difficoltà crescente: il motto di Iskra, una breve scheda su Lenin, una su Dostoevskij e un frammento di poesia o uno slogan di manifesto (Окна РОСТА o sovietici).

Cautele:

- I fatti storici devono essere semplici e ben noti, e controllati a campione prima di entrare nell'app.
- Il tono è descrittivo, né celebrativo né polemico.
- «Matti» si usa con ironia solo come titolo del percorso: nelle schede si resta precisi sui fatti.

## Formato dei dati

Come `src/data.mjs` oggi, i contenuti sono dati nella repo: niente server né dizionario nell'app. Per ogni parola sono scritti forma del testo, forma base, significato e accento. Esempio illustrativo (frasi non verificate):

```js
{ id: 'iskra',
  titolo: 'Искра',
  livello: 2,
  frasi: [
    { ru: 'Искра — это газета.',
      it: '«Iskra» è un giornale.',
      parole: [
        { f: 'Искра',  base: 'искра',  it: 'scintilla; nome del giornale' },
        { f: 'это',    base: 'это',    it: 'questo è' },
        { f: 'газета', base: 'газета', it: 'giornale' }
      ] }
  ],
  originale: { ru: '…', it: '…', fonte: '…' } }
```

I progressi (schede fatte, parole incontrate, errori) restano in `localStorage`.

## Rischi e limiti

- Le glosse, gli accenti e i fatti storici li scrivo io e possono contenere errori, soprattutto nella poesia. Per un uso personale si controlla a campione su Wiktionary e su fonti storiche.
- La repo è pubblica e il sito si pubblica su GitHub Pages: ogni testo committato è pubblico. Nella repo vanno solo testi propri o di pubblico dominio (da verificare per ciascun autore). Testi di altri autori e libri restano fuori.

## Idee scartate o rimandate

- Sblocco lineare delle unità: scartato, si preferisce tutto aperto.
- Esercizi di ascolto e dettato: scartati.
- Quaderno e foto: scartato.
- Ripetizione dilazionata completa: rimandata, basta il Ripasso mirato.
- Dizionario e analizzatore automatico di forme: rimandati (troppo pesanti per un'app statica).
- Accenti automatici: rimandati.
- Corpus nazionale della lingua russa: non verificato né previsto.

## Piano di lavoro e dimensioni

L'app oggi è un solo `index.html` (circa 22 KB) più `src/data.mjs`, senza build né dipendenze. Non è un progetto grande. Il costo maggiore non è il codice ma **scrivere i contenuti** (schede ed esercizi). Non stimo ore.

| Fase | Contenuto | PR |
|---|---|---|
| 0 | Questo documento | 1 (solo documentale) |
| 1 | Home a mappa; alfabeto in unità con esercizi di completamento e abbinamento; le 13 frasi attuali trasformate in schede di base | 1 |
| 2 | Percorso Repertorio: lettore con tocco sulla parola, prime 4-5 schede, Le mie parole e Ripasso | 1 |
| 3 | Altre schede, solo come dati | commit piccoli, anche in un'unica PR |

In tutto **3 PR di codice più quella documentale**. Le fasi 1 e 2 si possono unire se si preferisce una sola PR più grande.

## Domande aperte

- Quali personaggi e quali episodi per le prime schede, oltre a Iskra, Lenin e Dostoevskij?
- Quante unità di alfabeto? Il quiz sui suoni resta come un tipo tra gli altri?
- I progressi restano in `localStorage` (da iOS va bene) oppure serve un backup esportabile?
- Come si trattano gli accenti nei testi: sempre visibili o solo al tocco?
- Per gli slogan e le poesie: quali testi di pubblico dominio e dove si trovano?
