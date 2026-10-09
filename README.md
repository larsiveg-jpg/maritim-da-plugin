# Maritimt DS – Penpot-plugin

Lager OpenBridge-komponenter i Designsystemet-struktur i Penpot, bundet til design tokens fra `penpot-tokens.json`.

## Bruk

1. Importer `penpot-tokens.json` i Penpot-filen og slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.
2. I Penpot: **Plugins** (Ctrl/Cmd + Alt + P) → lim inn
   `https://larsiveg-jpg.github.io/maritim-da-plugin/manifest.json` → **Install**.
3. Åpne pluginet og trykk **Generer** ved komponenten du vil lage.

## Innhold

| Komponent | Varianter |
|---|---|
| Knapp | Variant (Normal, Raised, Flat) × Tilstand (Hvile, Hover, Trykket, Fokus, Deaktivert, Aktivert) × Innhold (Tekst, Ikon og tekst) |

Regler og mål følger OpenBridge sin `button`-komponent. Strukturen følger Designsystemet: semantiske tokens og komponent-tokens.
