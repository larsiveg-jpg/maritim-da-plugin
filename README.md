# Maritimt DS – Penpot-plugin

Lager OpenBridge-komponenter i Designsystemet-struktur i Penpot, bundet til design tokens fra `penpot-tokens.json`.

## Bruk

1. Importer `penpot-tokens.json` i Penpot-filen og slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.
2. I Penpot: **Plugins** (Ctrl/Cmd + Alt + P) → lim inn
   `https://larsiveg-jpg.github.io/maritim-da-plugin/manifest.json` → **Install**.
3. Åpne pluginet og trykk **Generer** ved komponenten du vil lage.

## Oppdatere pluginet

Penpot lagrer manifestet når pluginet installeres, og nettleseren mellomlagrer `plugin.js` i opptil 10 minutter.
Etter en ny versjon: vent rundt 10 minutter, og lukk og åpne pluginet. Vil du ha den nye versjonen med en gang,
avinstaller og installer pluginet på nytt med den vanlige adressen. Versjonsnummeret står nederst i pluginvinduet.
**Ikke** legg til noe etter `manifest.json` i adressen, for da finner ikke Penpot pluginet.

## Innhold

| Komponent | Varianter | Egenskaper |
|---|---|---|
| Knapp | 34 | Variant (Normal, Raised, Flat) × Tilstand × Innhold (Tekst, Ikon og tekst) |
| Ikonknapp | 17 | Variant × Tilstand |
| Bryter | 10 | Verdi (Av, På) × Tilstand |
| Sjekkboks | 15 | Verdi (Av, På, Delvis) × Tilstand |
| Radioknapp | 10 | Verdi (Av, På) × Tilstand |
| Inputfelt | 10 | Tilstand (Hvile, Hover, Fokus, Deaktivert, Feil) × Innhold (Tom, Utfylt) |
| Alarmbanner | 10 | Alvorlighet (Kritisk, Alarm, Advarsel, Forsiktighet, Info) × Status (Aktiv, Kvittert) |
| Tag | 40 | Farge (10 OpenBridge-farger) × Størrelse (Regular, Large) × Ikon (Med, Uten) |
| Teller | 16 | Type (Vanlig, Kritisk, Alarm, Advarsel, Forsiktighet, Diagnostikk, Kjører, Varsel) × Størrelse |
| Statusindikator | 6 | Status (Aktiv, Inaktiv, Kjører, Forsiktighet, Advarsel, Alarm) |
| Verktøytips | 12 | Type (Normal, Raised, Forsterket, Forsiktighet, Advarsel, Alarm) × Innhold |
| Fane | 10 | Valgt (Nei, Ja) × Tilstand |
| Segmentvalg | 10 | Valgt (Nei, Ja) × Tilstand |
| Navigasjonselement | 10 | Valgt (Nei, Ja) × Tilstand |
| Kort | 2 | Tittel (Med, Uten) |
| Toppfelt | 4 | Alarm (Nei, Ja) × Aktiv (Ja, Nei) |
| Navigasjonsmeny | 2 | Bredde (Full, Kun ikoner) |
| Dialogvindu | 3 | Størrelse (Liten 349 px, Middels 540 px, Stor 540 px) |
| Tabellrad | 7 | Type (Overskrift, Hvile, Hover, Trykket, Valgt, Stripet, Deaktivert) |
| Glidebryter | 4 | Variant (Vanlig, Forsterket) × Tilstand (Hvile, Deaktivert) |
| Nedtrekksknapp | 10 | Variant (Normal, Flat) × Tilstand |
| Menyvalg | 8 | Valgt (Nei, Ja) × Tilstand |
| Meny | 1 | Nedtrekks- og kontekstmeny med fire valg |

Tilstander: Hvile, Hover, Trykket, Fokus, Deaktivert, og Aktivert der OpenBridge har det.

Regler og mål følger OpenBridge sine web-komponenter (`button`, `icon-button`, `toggle-switch`, `checkbox`, `radio`, `text-input-field` og alarmfargene). Strukturen følger Designsystemet: semantiske tokens og komponent-tokens.

### Bevisste avvik fra OpenBridge

- **Fokus:** OpenBridge tegner fokus som en `outline`. Penpot har ikke det, så fokus er en 2 px ytre kant i `color.focus.inner`.
- **Inputfelt med feil** bruker `color.alert.error-outline` på kanten, fordi `alert-error` nesten ikke synes i natt-paletten.
- **Alarmbanner:** Ukvitterte alarmer blinker i OpenBridge. Det kan ikke vises statisk, så Aktiv har en kant i alvorlighetsfargen og Kvittert har en nøytral kant.
- **Teller «Varsel» og verktøytips «Forsterket»** bruker `color.neutral.background-default` som tekstfarge. OpenBridge sin `on-selected-active` har nesten samme farge som bakgrunnen i natt-paletten.
- **Valgt fane** får en skillelinje rundt hele fanen. OpenBridge har bare skillelinjer på sidene.
- **Sammensatte komponenter** (toppfelt, navigasjonsmeny, dialog, meny) er tegnet med egne lag, ikke med forekomster av de andre komponentene. Bytt gjerne ut delene med forekomster i Penpot.
- **Glidebryteren** viser en fast verdi (60 %). Flytt håndtaket og «Verdi»-laget for å vise andre verdier.
- **Ikoner** er enkle plassholdere. Bytt dem ut med OpenBridge-ikoner i Penpot.

## Versjoner

- **0.4.0:** Toppfelt, navigasjonsmeny, dialogvindu, tabellrad, glidebryter, nedtrekksknapp, menyvalg og meny.
- **0.3.1:** Pluginet legger selv til primitiver som mangler i filer importert med en eldre token-fil, og stopper ikke lenger hvis ett token ikke kan lages.
- **0.3.0:** Tag, teller, statusindikator, verktøytips, fane, segmentvalg, navigasjonselement og kort.
- **0.2.0:** Ikonknapp, bryter, sjekkboks, radioknapp, inputfelt, alarmbanner og «Generer alle».
- **0.1.0:** Knapp.
