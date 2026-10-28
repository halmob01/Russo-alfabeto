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

## Principi

1. **Leggere e capire subito.** Ogni testo deve poter essere compreso parola per parola, senza uscire dall'app.
2. **Produrre invece di riconoscere.** Esercizi di completamento e scrittura nell'app, non scelte a occhio.
3. **Tutto sempre aperto.** Nessuno sblocco: si entra in qualsiasi unità quando si vuole.
4. **Ripasso mirato.** Una scheda che ripropone ciò che si sbaglia di più.
5. **Audio facoltativo.** Resta un tasto "come si dice?" nelle schermate di lettura. Niente esercizi di ascolto né dettato.
6. **Scrivere solo online.** Con la tastiera cirillica a schermo (o quella del telefono). Niente quaderno e foto.

### Cosa dice la ricerca (e quanto è solido)

- Ripetizione dilazionata e richiamo attivo migliorano l'apprendimento in molti contesti, ma i benefici calano con materiali complessi e il trasferimento non è garantito. Fonte: [Carpenter, Pan e Butler, *Nature Reviews Psychology*, 2022](https://www.nature.com/articles/s44159-022-00089-1). Ho letto solo l'abstract e l'elenco dei riferimenti.
- Nella lettura estensiva si suggerisce di conoscere almeno il **95% delle parole** del testo. I guadagni di vocabolario dalla sola lettura sono fragili e vanno uniti a studio diretto. Servono mesi o anni. I dati vengono soprattutto da studi sull'inglese e su bambini. Fonte: [JALT, benefici della lettura estensiva](https://jalt-publications.org/tlt/articles/2134-language-learning-benefits-extensive-reading).
- Come lavorano altre app (Anki, Clozemaster, LingQ, Readlang, Duolingo) l'ho descritto dalla mia conoscenza: non ho potuto verificare le loro pagine.

Conseguenza pratica: Dostoevskij è oggi fuori scala. Serve una scala di testi, dagli slogan alle quartine fino a singole frasi di prosa.

## Struttura dei contenuti

**Home = mappa.** Una lista di unità con uno stato calcolato dalle risposte (da iniziare, in corso, sicura) e un'indicazione "riprendi da qui" o "da ripassare". Non c'è nessun blocco.

**Schema di ogni unità:**

1. **Impara:** 3-5 lettere nuove con audio facoltativo, forma maiuscola e minuscola e una riga sul trucco per ricordarle.
2. **Leggi con quello che sai:** parole vere che usano solo le lettere viste finora, con il significato subito disponibile.
3. **Esercizi:** 5-8 domande che mescolano 2-3 tipi.
4. **Mini-test:** serve a mostrare come si va, non a sbloccare.
5. **Un frammento vero da leggere** (un cartello o uno slogan) interamente leggibile con le lettere imparate.

**Ordine suggerito (solo visivo):**

1. Alfabeto in 6 unità (le lezioni attuali, ma con spiegazione ed esercizi dentro).
2. Insegne e parole internazionali.
3. Parole di tutti i giorni.
4. Frasi (le attuali, collegate alle parole viste prima).
5. Testi da leggere: slogan, quartine, frasi di prosa.

**Scheda Ripasso:** pesca domande dalle unità in cui si sbaglia di più. È l'unico pezzo di ripetizione dilazionata previsto.

## Esercizi

**Completare**

- Lettera mancante: `КО_` → Т.
- Parola mancante: «Меня ___ Джанлука» con зовут / зовёт / звать. Prima con opzioni, poi scrivendo.
- Desinenza mancante: «Я читаю книг_» → у. Porta dentro la grammatica dei casi.
- Sillabe da riordinare: МА + МА, КО + Т.

**Leggere**

- Cosa significa?: parola in cirillico e quattro significati, senza traslitterazione.
- Insegna da decifrare: РЕСТОРАН, АПТЕКА, МЕТРО.
- Testo con tocco sulla parola (vedi sotto).

**Abbinare**

- Coppie parola-significato: КОТ ↔ gatto, МИР ↔ mondo / pace.
- Maiuscola e minuscola.
- Suono → lettera (l'inverso del quiz attuale, come uno dei tanti tipi).

**Scrivere (leggero)**

- Copiare e traslitterare parole.
- Completare con la tastiera a schermo.

**Regole di controllo:** si accetta **е al posto di ё** (nei testi veri si scrive quasi sempre così) e si ignorano maiuscole e punteggiatura. Ogni unità non usa lo stesso tipo di esercizio per tutte le domande.

**Esclusi:** esercizi di ascolto, dettato, scrittura su carta con foto.

## Lettore di testi

Una piccola **biblioteca annotata a mano**: 10-15 testi brevi, nei quali per ogni parola sono scritti forma del testo, forma base, significato e accento. Niente server né dizionario nell'app: sono dati nella repo, come `src/data.mjs`.

Nell'app: testo in cirillico, tocco su una parola per vederne il significato, un tasto per la traduzione intera, un tasto audio facoltativo.

Esempio di formato per una frase già presente nell'app:

```js
{ id: 'leggo-un-libro',
  ru: 'Я читаю книгу.',
  it: 'Leggo un libro.',
  parole: [
    { f: 'Я',     base: 'я',      it: 'io' },
    { f: 'читаю', base: 'читать', it: 'leggo', acc: 'чита́ю' },
    { f: 'книгу', base: 'книга',  it: 'libro (complemento oggetto)', acc: 'кни́гу' }
  ] }
```

**Primi quattro testi proposti**, di difficoltà crescente: due slogan di manifesti (Окна РОСТА o sovietici), una quartina breve di poesia e la frase iniziale di un romanzo di Dostoevskij.

**Possibile estensione:** un indicatore di difficoltà ("conosci il 71% delle parole di questo testo"), calcolato sulle parole già incontrate. Il 95% diventa l'obiettivo per leggere con comodità.

**Rischi e limiti:**

- Le glosse e gli accenti li scrivo io e possono contenere errori, soprattutto nella poesia. Per un uso personale si controlla a campione su Wiktionary.
- La repo è pubblica e il sito si pubblica su GitHub Pages: ogni testo committato è pubblico. Per questo conviene mettere nella repo solo testi di pubblico dominio (da verificare per ciascun autore) oppure tenere i testi personali fuori dalla repo.

## Idee scartate o rimandate

- Sblocco lineare delle unità: scartato, si preferisce tutto aperto.
- Esercizi di ascolto e dettato: scartati.
- Quaderno e foto: scartato.
- Ripetizione dilazionata completa: rimandata, basta il Ripasso mirato.
- Dizionario e analizzatore automatico di forme: rimandati (troppo pesanti per un'app statica).
- Accenti automatici: rimandati.
- Corpus nazionale della lingua russa: non verificato né previsto.

## Piano di lavoro e dimensioni

L'app oggi è un solo `index.html` (circa 22 KB) più `src/data.mjs`, senza build né dipendenze. Non è un progetto grande. Il costo maggiore non è il codice ma **scrivere i contenuti** (testi annotati ed esercizi). Non stimo ore.

| Fase | Contenuto | PR |
|---|---|---|
| 0 | Questo documento | 1 (solo documentale) |
| 1 | Struttura a unità e mappa; esercizi di completamento e abbinamento sui contenuti esistenti | 1 |
| 2 | Lettore con tocco sulla parola e 4 testi annotati | 1 |
| 3 | Altri testi e unità, solo come dati | commit piccoli, anche in un'unica PR |

In tutto **3 PR di codice più quella documentale**. Le fasi 1 e 2 si possono unire se si preferisce una sola PR più grande.

## Domande aperte

- Quali sono i primi quattro testi? Quali autori e quali manifesti?
- Quante unità di alfabeto e di parole? Il quiz attuale viene sostituito o resta come un tipo tra gli altri?
- I progressi restano in `localStorage` (da iOS va bene) oppure serve un backup esportabile?
- Come si trattano gli accenti nei testi: sempre visibili o solo al tocco?
