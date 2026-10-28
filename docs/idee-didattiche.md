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
2. **Completa:** esercizi sulle parole e sulle forme della scheda (parola, desinenza e lettera mancante, riordino, abbinamento) e una o due domande di comprensione in russo.
3. **La frase vera:** una frase originale dell'autore o un motto, come gradino verso i testi reali.
4. **Parole nuove:** le 3-5 parole della scheda entrano in "Le mie parole" e nel Ripasso.

### Funzioni per il metodo natura

Idee per rendere la lettura "alla Ørberg" più efficace in un'app. Sono ipotesi di progetto: non ho verificato che funzionino meglio di un testo con glosse semplici, quindi si provano su poche schede prima di estenderle.

**Base (fase 2)**

- **Tocco sulla parola** con significato e forma base. Per le parole nuove della scheda il tocco mostra anche la forma come compare (*книгу*) e quella di base (*книга*).
- **Traduzione italiana nascosta**, si apre con un tasto e solo dopo aver provato a capire.
- **Domande di comprensione in russo** a fine scheda, con risposta a scelta tra parole del testo. In Ørberg si capisce rispondendo a domande sul testo nella lingua stessa. Usano solo parole già viste.

**Più avanti (fase 3)**

- **Indovina prima di sapere.** Alla prima lettura una parola ignota non mostra subito la glossa: chiede «che cosa pensi che voglia dire?» con due o tre ipotesi, poi rivela la risposta. Inferire dal contesto è la parte attiva del metodo.
- **Rilettura progressiva.** Lo stesso testo si rilegge più volte e a ogni giro sparisce qualche parola già incontrata, da completare. È un modo per rileggere senza annoiarsi e rafforza le parole viste.
- **Più livelli dello stesso episodio.** Lo stesso aneddoto in due o tre versioni a lessico crescente (frasi corte e semplici, poi più ricche, poi la frase originale). Si sale di livello restando nella stessa storia.
- **Indicatore di difficoltà.** Prima di leggere si legge «conosci il 71% delle parole di questa scheda», calcolato sulle parole già incontrate. Il 95% è l'obiettivo per leggere con comodità.
- **Desinenze evidenziate.** Nelle forme dei casi la desinenza è colorata e un tocco dice quale caso è e perché. Prima si vede, poi si nomina.
- **Aiuti visivi.** Una piccola immagine (ad esempio un manifesto di pubblico dominio) accanto allo slogan, come nei libri di Ørberg: si capisce anche dal disegno.

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

### Varietà: quali esercizi dove

| Livello | Tipi di esercizio |
|---|---|
| Base (alfabeto e prime schede) | Abbinare coppie, «cosa significa?», lettera mancante, riordino di sillabe, copiare una parola |
| Intermedio | Parola mancante con opzioni, riordino di frase (con ordini accettati), abbinare frase e traduzione, domanda di comprensione |
| Avanzato | Desinenza mancante scrivendo, parola mancante senza opzioni, rilettura progressiva, traslitterare |

Regole di rotazione:

- Nessun tipo compare due volte di fila nella stessa sessione.
- Ogni scheda ha almeno un esercizio di lettura, uno di completamento e uno su parole di schede precedenti (richiamo).
- Il Ripasso mescola i tipi invece di ripetere quello in cui si è sbagliato.

**Ripasso:** pesca domande dalle parole incontrate e sbagliate più spesso. È l'unico pezzo di ripetizione dilazionata previsto.

### Qualità degli esercizi: errori classici da evitare

Ricavato dalla skill `verifiche-didattiche` (repo `laika`, `.agents/skills/verifiche-didattiche`), applicato agli esercizi di ISKRA. Sono gli errori tipici di quiz scritti da un LLM (o di fretta).

1. **Risposta corretta sempre più lunga.** Confrontare la lunghezza della corretta con la più lunga tra le errate. Il rapporto 0,85-1,15 è un indicatore di revisione e non una legge: non si altera la verità per pareggiare i caratteri.
2. **Posizione della corretta troppo concentrata.** Controllare la posizione dopo il mescolamento mostrato nell'app e non nei dati. Con meno di 8 domande la distribuzione è solo indicativa. Il quiz attuale mescola con `sort(() => Math.random() - .5)`, che non è un mescolamento uniforme: va sostituito con Fisher-Yates.
3. **Indizi involontari.** Registro o dettaglio diverso nella corretta, assoluti («sempre», «mai») solo negli errati, grammatica dell'enunciato compatibile con una sola opzione. Nei completamenti con desinenza, tutte le opzioni devono sembrare forme plausibili della stessa parola.
4. **Distrattori assurdi.** Gli errati devono riflettere confusioni vere: per le lettere i falsi amici (Н/N, Р/P, С/C, В/B, У/Y, Х/X), per i casi кошка/кошку/кошки.
5. **Ripetizioni.** Stessa consegna o stesso insieme di opzioni in domande diverse, domande che cambiano solo la parola. Variare l'operazione richiesta e non solo il contenuto.
6. **Più risposte valide.** Il russo ha l'ordine delle parole libero: «Я работаю в школе» e «В школе я работаю» sono entrambe corrette. Nel riordino e nel completamento si definiscono le varianti accettate (ё/е, maiuscole, spazi, ordini equivalenti). Il controllo attuale, un confronto esatto con una sola frase, rifiuta risposte giuste.
7. **Chiedere ciò che non è stato insegnato.** Ogni domanda usa solo lettere e parole già incontrate nelle schede (ancora il criterio del 95%). Una piccola matrice obiettivi → evidenze → esercizi evita di valutare cose mai viste e di duplicare lo stesso obiettivo.
8. **Spiegazioni povere.** Il feedback dice **perché** («кошку perché è il complemento oggetto») e non solo «sbagliato» o la risposta giusta. Non si copia la spiegazione nella risposta.
9. **Dichiarare più di quanto si è verificato.** Gli esercizi generati da un LLM possono contenere errori di accento, di caso o di aspetto verbale. Ogni scheda ha uno stato: *verificata* (controllata su Wiktionary o simili), *non verificabile* o *da correggere*. Un controllo automatico strutturale non sostituisce la revisione umana.

**Controllo automatico previsto (fase 1):** un piccolo test Node (la repo ha già `tests/`) che legge i dati degli esercizi e segnala duplicati, chiave assente tra le opzioni, rapporto di lunghezza, posizione della corretta dopo il mescolamento e varianti accettate mancanti. Severità: bloccante, da correggere, da rivedere, non verificabile. Dove stia la skill originale e come funzioni l'auditor Python è descritto nella repo `laika`.

## Contenuti: un repertorio di vite russe

Come **modello di forma e di spirito** si usano due libri di Paolo Nori: *Repertorio dei matti della letteratura russa* (voci brevissime e titolate, quasi aneddoti) e *I russi sono matti*. Sono solo un modello: schede brevi, autonome, sulle vite strane dei russi. **Non si citano né si riproducono passi.** I testi dell'app sono originali, scritti sui fatti e la repo è pubblica.

**Prima scheda: Iskra**, il nome dell'app (il giornale fondato da Lenin e altri nel 1900). Il suo motto, se ricordo bene «Из искры возгорится пламя» («dalla scintilla divamperà la fiamma»), è una frase brevissima e memorabile con cui aprire il percorso. **Da verificare** la formulazione esatta e l'origine (probabilmente una risposta poetica dei decabristi a Puškin). Poi Lenin e l'esilio, Dostoevskij, Majakovskij, Gogol', Charms e altri.

Perché funziona: dà un filo narrativo, le vite eccentriche si ricordano meglio e i verbi al passato si ripetono di continuo. Le schede sono indipendenti e se ne aggiunge una alla volta.

**Prime schede proposte**, di difficoltà crescente: il motto di Iskra, una breve scheda su Lenin, una su Dostoevskij e un frammento di poesia o uno slogan di manifesto (Окна РОСТА o sovietici).

Cautele:

- I fatti storici devono essere semplici e ben noti e controllati a campione prima di entrare nell'app.
- Il tono è descrittivo: né celebrativo né polemico.
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
  domande: [ /* comprensione in russo: consegna, opzioni, risposta, perché */ ],
  originale: { ru: '…', it: '…', fonte: '…' },
  stato: 'non verificabile' }   // verificata | non verificabile | da correggere
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
| 2 | Percorso Repertorio: lettore con tocco sulla parola e traduzione nascosta, domande di comprensione, prime 4-5 schede, Le mie parole e Ripasso | 1 |
| 3 | Altre schede come dati; funzioni avanzate del metodo natura (indovina prima, rilettura progressiva, livelli, indicatore, desinenze) provate su poche schede | commit piccoli, anche in un'unica PR |

In tutto **3 PR di codice più quella documentale**. Le fasi 1 e 2 si possono unire se si preferisce una sola PR più grande.

## Domande aperte

- Quali personaggi e quali episodi per le prime schede, oltre a Iskra, Lenin e Dostoevskij?
- Quante unità di alfabeto? Il quiz sui suoni resta come un tipo tra gli altri?
- I progressi restano in `localStorage` (da iOS va bene) oppure serve un backup esportabile?
- Come si trattano gli accenti nei testi: sempre visibili o solo al tocco?
- Per gli slogan e le poesie: quali testi di pubblico dominio e dove si trovano?
