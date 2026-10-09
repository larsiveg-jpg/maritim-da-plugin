# Maritimt DS – Penpot-plugin

Lager OpenBridge-komponenter i Designsystemet-struktur i Penpot, bundet til design tokens fra `penpot-tokens.json`.

## Bruk

1. Importer `penpot-tokens.json` i Penpot-filen og slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.
2. I Penpot: **Plugins** (Ctrl/Cmd + Alt + P) → lim inn
   `https://larsiveg-jpg.github.io/maritim-da-plugin/manifest.json` → **Install**.
3. Åpne pluginet og trykk **Generer** ved komponenten du vil lage.

## Oppdatere pluginet

Manifestet peker til `plugin.js?v=<versjon>`, og versjonsnummeret økes ved hver utgivelse. Penpot henter derfor alltid den nye filen.
Hvis Penpot likevel viser en gammel versjon, skyldes det at nettleseren har mellomlagret manifestet. Det varer i opptil 10 minutter.
Lukk og åpne pluginet etter at tiden har gått. **Ikke** legg til noe etter `manifest.json` i adressen, for da finner ikke Penpot pluginet.

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

Tilstander: Hvile, Hover, Trykket, Fokus, Deaktivert, og Aktivert der OpenBridge har det.

Regler og mål følger OpenBridge sine web-komponenter (`button`, `icon-button`, `toggle-switch`, `checkbox`, `radio`, `text-input-field` og alarmfargene). Strukturen følger Designsystemet: semantiske tokens og komponent-tokens.

### Bevisste avvik fra OpenBridge

- **Fokus:** OpenBridge tegner fokus som en `outline`. Penpot har ikke det, så fokus er en 2 px ytre kant i `color.focus.inner`.
- **Inputfelt med feil** bruker `color.alert.error-outline` på kanten, fordi `alert-error` nesten ikke synes i natt-paletten.
- **Alarmbanner:** Ukvitterte alarmer blinker i OpenBridge. Det kan ikke vises statisk, så Aktiv har en kant i alvorlighetsfargen og Kvittert har en nøytral kant.
- **Teller «Varsel» og verktøytips «Forsterket»** bruker `color.neutral.background-default` som tekstfarge. OpenBridge sin `on-selected-active` har nesten samme farge som bakgrunnen i natt-paletten.
- **Valgt fane** får en skillelinje rundt hele fanen. OpenBridge har bare skillelinjer på sidene.
- **Ikoner** er enkle plassholdere. Bytt dem ut med OpenBridge-ikoner i Penpot.

## Versjoner

- **0.3.1:** Pluginet legger selv til primitiver som mangler i filer importert med en eldre token-fil, og stopper ikke lenger hvis ett token ikke kan lages.
- **0.3.0:** Tag, teller, statusindikator, verktøytips, fane, segmentvalg, navigasjonselement og kort.
- **0.2.0:** Ikonknapp, bryter, sjekkboks, radioknapp, inputfelt, alarmbanner og «Generer alle».
- **0.1.0:** Knapp.
