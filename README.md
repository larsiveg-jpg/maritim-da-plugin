# Maritimt DS – Penpot-plugin

Lager OpenBridge-komponenter i Designsystemet-struktur i Penpot, bundet til design tokens fra `penpot-tokens.json`.

## Bruk

1. Importer `penpot-tokens.json` i Penpot-filen og slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.
2. I Penpot: **Plugins** (Ctrl/Cmd + Alt + P) → lim inn
   `https://larsiveg-jpg.github.io/maritim-da-plugin/manifest.json` → **Install**.
3. Åpne pluginet og trykk **Generer** ved komponenten du vil lage.

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

Tilstander: Hvile, Hover, Trykket, Fokus, Deaktivert, og Aktivert der OpenBridge har det.

Regler og mål følger OpenBridge sine web-komponenter (`button`, `icon-button`, `toggle-switch`, `checkbox`, `radio`, `text-input-field` og alarmfargene). Strukturen følger Designsystemet: semantiske tokens og komponent-tokens.

### Bevisste avvik fra OpenBridge

- **Fokus:** OpenBridge tegner fokus som en `outline`. Penpot har ikke det, så fokus er en 2 px ytre kant i `color.focus.inner`.
- **Inputfelt med feil** bruker `color.alert.error-outline` på kanten, fordi `alert-error` nesten ikke synes i natt-paletten.
- **Alarmbanner:** Ukvitterte alarmer blinker i OpenBridge. Det kan ikke vises statisk, så Aktiv har en kant i alvorlighetsfargen og Kvittert har en nøytral kant.
- **Ikoner** er enkle plassholdere. Bytt dem ut med OpenBridge-ikoner i Penpot.

## Versjoner

- **0.2.0:** Ikonknapp, bryter, sjekkboks, radioknapp, inputfelt, alarmbanner og «Generer alle».
- **0.1.0:** Knapp.
