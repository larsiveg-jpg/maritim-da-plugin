/*
 * Maritimt DS – komponentgenerator for Penpot
 *
 * Lager komponenter med varianter og binder alle egenskaper til de semantiske
 * tokenene fra penpot-tokens.json. Komponentene følger derfor med når du bytter
 * Palett (Dag/Skumring/Natt/Sterkt lys) eller Størrelse (Regular … XL).
 *
 * Regler og mål: OpenBridge (@oicl/openbridge-webcomponents 2.0.0)
 * Struktur og navngiving: Designsystemet (semantiske tokens, komponent-tokens)
 */

const VERSJON = '0.2.0';

// ================================================================== tokens
// Komponent-tokens (Designsystemets tredje lag). Opprettes automatisk i settet
// «semantikk/komponent» hvis token-filen ble importert før de fantes.
// Holdes i takt med scripts/bygg-tokens.mjs (testen sjekker det).
const KOMPONENT_SETT = 'semantikk/komponent';
const KOMPONENT_TOKENS = [
  ["button.height", "sizing", "{ob.component.button-touch-target-size}"],
  ["button.min-width", "sizing", "{ob.component.button-touch-target-size}"],
  ["button.visual-height", "sizing", "{ob.component.button-visual-size}"],
  ["button.padding-inline", "spacing", "{ob.component.button-label-spacing}"],
  ["button.label-padding", "spacing", "{ob.component.button-label-spacing}"],
  ["button.icon-size", "sizing", "{ob.component.button-icon-size}"],
  ["button.border-radius", "borderRadius", "{ob.component.button-border-radius}"],
  ["button.border-width", "borderWidth", "{ob.component.button-stroke-weight}"],
  ["focus.width", "borderWidth", "{ob.size.border-weight-focusframe}"],
  ["icon-button.visual-size", "sizing", "{ob.component.icon-button-visual-target-size}"],
  ["icon-button.icon-size", "sizing", "{ob.component.icon-button-icon-size}"],
  ["control.height", "sizing", "{ob.size.touch-target-min}"],
  ["control.label-spacing", "spacing", "{ob.component.checkbox-label-spacing}"],
  ["toggle.width", "sizing", "{ob.component.toggle-switch-selection-width}"],
  ["toggle.height", "sizing", "{ob.component.toggle-switch-selection-height}"],
  ["toggle.padding", "spacing", "{ob.component.toggle-switch-selection-padding}"],
  ["toggle.thumb-size", "sizing", "{ob.component.toggle-switch-thumb-size}"],
  ["toggle.border-radius", "borderRadius", "{ob.component.toggle-switch-item-border-radius}"],
  ["checkbox.size", "sizing", "{ob.component.checkbox-visual-target-size}"],
  ["checkbox.border-radius", "borderRadius", "{ob.component.checkbox-border-radius}"],
  ["radio.size", "sizing", "{ob.component.radio-button-selection-size}"],
  ["radio.thumb-size", "sizing", "{ob.component.radio-button-thumb-size}"],
  ["input.height", "sizing", "{ob.component.input-fields-text-input-field-visual-size}"],
  ["input.padding-inline", "spacing", "{ob.component.input-fields-text-input-field-padding-horizontal}"],
  ["input.border-radius", "borderRadius", "{ob.component.input-fields-text-input-field-border-radius}"],
  ["input.gap", "spacing", "{ob.component.input-fields-text-input-field-vertical-spacer}"],
  ["banner.height", "sizing", "{ob.size.touch-target-min}"],
  ["banner.padding-inline", "spacing", "{ob.size.list-item-padding-horizontal}"],
  ["banner.gap", "spacing", "{ob.size.list-item-item-spacing}"],
  ["banner.badge-size", "sizing", "{ob.size.visual-target-min}"],
  ["banner.icon-size", "sizing", "{ob.size.icon-size-regular}"],
  ["banner.border-radius", "borderRadius", "{ob.border-radius.6}"],
  ["color.neutral.text-disabled", "color", "{ob.element.disabled}"],
  ["color.neutral.text-placeholder", "color", "{ob.element.inactive}"],
  ["color.neutral.symbol", "color", "{ob.element.symbol}"],
];

// Enkle, generiske ikoner (24×24) tegnet for pluginet. Bytt dem gjerne ut med
// OpenBridge-ikoner i Penpot – komponentene beholder fargekoblingen.
const IKON = {
  pluss: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
  meny: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
  hake: 'M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L21 7.5l-1.4-1.4z',
  strek: 'M6 11h12v2H6z',
  utrop: 'M11 5h2v9h-2zm0 11h2v2h-2z',
};
const svg = (d) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${d}" fill="#000000"/></svg>`;

// Felles tilstander (OpenBridge sine state-tokens)
const TILSTAND = {
  enabled: 'Hvile', hover: 'Hover', pressed: 'Trykket', focused: 'Fokus', disabled: 'Deaktivert', activated: 'Aktivert',
};
const KONTROLL_TILSTANDER = ['enabled', 'hover', 'pressed', 'focused', 'disabled'];

// ================================================================== hjelpere
const vent = (ms) => new Promise((r) => setTimeout(r, ms));

function logg(tekst, nivaa = 'info') {
  penpot.ui.sendMessage({ type: 'logg', tekst, nivaa });
}

/** Alle tokens etter navn. Tokens i aktive sett vinner over inaktive. */
function tokenKart() {
  const kart = new Map();
  const katalog = penpot.library.local.tokens;
  if (!katalog) return kart;
  const sett = [...katalog.sets].sort((a, b) => Number(a.active) - Number(b.active));
  for (const s of sett) for (const t of s.tokens) kart.set(t.name, t);
  return kart;
}

const NOKKELTOKENS = [
  'color.neutral.text-default', 'color.neutral.surface-default', 'color.control.normal.enabled-background',
  'color.danger.base-default', 'color.focus.inner', 'typography.ui.body', 'typography.ui.button', 'border-radius.full',
];

function sjekk() {
  const katalog = penpot.library.local.tokens;
  if (!katalog || katalog.sets.length === 0) {
    return { ok: false, melding: 'Fant ingen tokens i denne filen. Importer penpot-tokens.json først.' };
  }
  const kart = tokenKart();
  const mangler = NOKKELTOKENS.filter((n) => !kart.has(n));
  if (mangler.length) {
    return { ok: false, melding: `Mangler tokens som ${mangler.slice(0, 3).join(', ')}. Importer siste penpot-tokens.json.` };
  }
  if (NOKKELTOKENS.some((n) => kart.get(n).resolvedValueString === undefined)) {
    return { ok: false, melding: 'Noen tokens peker til sett som ikke er aktive. Slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.' };
  }
  const komponentMangler = KOMPONENT_TOKENS.filter(([n]) => !kart.has(n)).length;
  return {
    ok: true,
    komponentMangler,
    melding: komponentMangler ? `Klar. ${komponentMangler} komponent-tokens blir lagt til automatisk.` : 'Klar.',
  };
}

/** Oppretter manglende komponent-tokens i «semantikk/komponent» og slår settet på. */
async function sikreKomponentTokens() {
  const katalog = penpot.library.local.tokens;
  let sett = katalog.sets.find((s) => s.name === KOMPONENT_SETT);
  if (!sett) {
    sett = katalog.addSet({ name: KOMPONENT_SETT, active: true });
    await vent(150);
    logg(`La til settet ${KOMPONENT_SETT}`);
  }
  if (!sett.active) sett.active = true;
  const finnes = new Set(sett.tokens.map((t) => t.name));
  let lagt = 0;
  for (const [name, type, value] of KOMPONENT_TOKENS) {
    if (finnes.has(name)) continue;
    const t = sett.addToken({ type, name, value });
    if (t) lagt++;
    else logg(`Kunne ikke lage token ${name}`, 'feil');
  }
  if (lagt) logg(`La til ${lagt} komponent-tokens`);
  const grunnlag = katalog.themes.find((t) => t.group === 'Grunnlag' && t.name === 'Standard');
  if (grunnlag && !grunnlag.activeSets.some((s) => s.name === KOMPONENT_SETT)) grunnlag.addSet(sett);
  await vent(300);
}

/** Byggeverktøy som samler token-feil underveis. */
function lagVerktoy(kart) {
  const feil = [];
  const flexFor = new Map(); // board.id → FlexLayout (Penpot-objektene tåler ikke egne felt)

  function bind(figur, tokenNavn, egenskaper) {
    const token = kart.get(tokenNavn);
    if (!token) return feil.push(`mangler token ${tokenNavn}`);
    try {
      figur.applyToken(token, egenskaper);
    } catch (e) {
      feil.push(`${tokenNavn} → ${egenskaper.join(',')}: ${e?.message ?? e}`);
    }
  }

  function boks(navn, { dir = 'row', b = 48, h = 48, sizingH = 'auto', sizingV = 'auto', align = 'center', justify = 'center', layout = true } = {}) {
    const board = penpot.createBoard();
    board.name = navn;
    board.resize(b, h);
    board.fills = [];
    if (layout) {
      const f = board.addFlexLayout();
      f.dir = dir;
      f.alignItems = align;
      f.justifyContent = justify;
      f.horizontalSizing = sizingH;
      f.verticalSizing = sizingV;
      flexFor.set(board.id, f);
    }
    return board;
  }

  function leggTil(forelder, barn) {
    const f = flexFor.get(forelder.id) ?? forelder.flex;
    if (f && typeof f.appendChild === 'function') f.appendChild(barn);
    else forelder.appendChild(barn);
  }

  function strek(figur, { ytre = false } = {}) {
    figur.strokes = [{ strokeColor: '#000000', strokeOpacity: 1, strokeWidth: 1, strokeStyle: 'solid', strokeAlignment: ytre ? 'outer' : 'inner' }];
  }

  /** Flate med fyll, strek og radius. Fokus gir OpenBridge sin 2px fokusramme. */
  function flate(figur, { fyll, kant, kantbredde = 'button.border-width', radius, fokus = false }) {
    strek(figur, { ytre: fokus });
    if (fyll) bind(figur, fyll, ['fill']);
    if (fokus) {
      bind(figur, 'color.focus.inner', ['strokeColor']);
      bind(figur, 'focus.width', ['strokeWidth']);
    } else if (kant) {
      bind(figur, kant, ['strokeColor']);
      bind(figur, kantbredde, ['strokeWidth']);
    }
    if (radius) bind(figur, radius, ['borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomRight', 'borderRadiusBottomLeft']);
  }

  function ikon(navn, sti, storrelse, farge) {
    const ramme = boks(navn, { b: 24, h: 24, layout: false });
    const symbol = penpot.createShapeFromSvg(svg(sti));
    if (symbol) {
      symbol.name = 'Symbol';
      ramme.appendChild(symbol);
      symbol.x = ramme.x;
      symbol.y = ramme.y;
      symbol.resize(24, 24);
      symbol.constraintsHorizontal = 'scale';
      symbol.constraintsVertical = 'scale';
      const stier = symbol.children?.length ? symbol.children : [symbol];
      for (const s of stier) {
        s.constraintsHorizontal = 'scale';
        s.constraintsVertical = 'scale';
        bind(s, farge, ['fill']);
      }
    }
    bind(ramme, storrelse, ['width', 'height']);
    return ramme;
  }

  function tekst(innhold, typografi, farge, navn = 'Tekst') {
    const t = penpot.createText(innhold);
    if (!t) {
      feil.push(`kunne ikke lage tekst «${innhold}»`);
      return null;
    }
    t.name = navn;
    t.growType = 'auto-width';
    bind(t, typografi, ['typography']);
    bind(t, farge, ['fill']);
    return t;
  }

  function sirkel(navn, storrelse, farge) {
    const e = penpot.createEllipse();
    e.name = navn;
    e.resize(12, 12);
    e.fills = [];
    bind(e, storrelse, ['width', 'height']);
    bind(e, farge, ['fill']);
    return e;
  }

  function fyllBredde(figur) {
    if (figur.layoutChild) figur.layoutChild.horizontalSizing = 'fill';
  }

  return { feil, bind, boks, leggTil, flate, ikon, tekst, sirkel, fyllBredde };
}

// ================================================================== komponenter
// Hver komponent: navn, egenskaper og en liste kombinasjoner. Hver kombinasjon
// har verdier (én per egenskap), plassering i rutenettet og en byggefunksjon.

const KNAPP_VARIANTER = [['normal', 'Normal'], ['raised', 'Raised'], ['flat', 'Flat']];
const KNAPP_TILSTANDER = ['enabled', 'hover', 'pressed', 'focused', 'disabled', 'activated'];
const harTilstand = (variant, tilstand) => !(tilstand === 'activated' && variant === 'raised');

const KOMPONENTER = {
  // ---------------------------------------------------------------- Knapp
  knapp: {
    navn: 'Knapp',
    egenskaper: ['Variant', 'Tilstand', 'Innhold'],
    kombinasjoner() {
      const ut = [];
      let rad = 0;
      for (const [v, vNavn] of KNAPP_VARIANTER) {
        for (const [inn, innNavn] of [['tekst', 'Tekst'], ['ikon', 'Ikon og tekst']]) {
          KNAPP_TILSTANDER.forEach((t, kol) => {
            if (!harTilstand(v, t)) return;
            ut.push({ verdier: [vNavn, TILSTAND[t], innNavn], rad, kol, bygg: (V) => byggKnapp(V, v, t, inn === 'ikon') });
          });
          rad++;
        }
      }
      return ut;
    },
  },

  // ---------------------------------------------------------------- Ikonknapp
  ikonknapp: {
    navn: 'Ikonknapp',
    egenskaper: ['Variant', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      KNAPP_VARIANTER.forEach(([v, vNavn], rad) => {
        KNAPP_TILSTANDER.forEach((t, kol) => {
          if (!harTilstand(v, t)) return;
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggIkonknapp(V, v, t) });
        });
      });
      return ut;
    },
    kolonne: 120,
  },

  // ---------------------------------------------------------------- Bryter (toggle)
  bryter: {
    navn: 'Bryter',
    egenskaper: ['Verdi', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      [['av', 'Av'], ['pa', 'På']].forEach(([verdi, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggBryter(V, verdi === 'pa', t) });
        });
      });
      return ut;
    },
  },

  // ---------------------------------------------------------------- Sjekkboks
  sjekkboks: {
    navn: 'Sjekkboks',
    egenskaper: ['Verdi', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      [['av', 'Av'], ['pa', 'På'], ['delvis', 'Delvis']].forEach(([verdi, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggSjekkboks(V, verdi, t) });
        });
      });
      return ut;
    },
    kolonne: 160,
  },

  // ---------------------------------------------------------------- Radioknapp
  radio: {
    navn: 'Radioknapp',
    egenskaper: ['Verdi', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      [['av', 'Av'], ['pa', 'På']].forEach(([verdi, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggRadio(V, verdi === 'pa', t) });
        });
      });
      return ut;
    },
    kolonne: 160,
  },

  // ---------------------------------------------------------------- Inputfelt
  inputfelt: {
    navn: 'Inputfelt',
    egenskaper: ['Tilstand', 'Innhold'],
    kombinasjoner() {
      const ut = [];
      [['tom', 'Tom'], ['verdi', 'Utfylt']].forEach(([inn, innNavn], rad) => {
        [['enabled', 'Hvile'], ['hover', 'Hover'], ['focused', 'Fokus'], ['disabled', 'Deaktivert'], ['feil', 'Feil']].forEach(([t, tNavn], kol) => {
          ut.push({ verdier: [tNavn, innNavn], rad, kol, bygg: (V) => byggInputfelt(V, t, inn === 'verdi') });
        });
      });
      return ut;
    },
    kolonne: 300,
    radhoyde: 130,
  },

  // ---------------------------------------------------------------- Alarmbanner
  alarmbanner: {
    navn: 'Alarmbanner',
    egenskaper: ['Alvorlighet', 'Status'],
    kombinasjoner() {
      const ut = [];
      ALVORLIGHET.forEach(([kat, navn], rad) => {
        [['aktiv', 'Aktiv'], ['kvittert', 'Kvittert']].forEach(([s, sNavn], kol) => {
          ut.push({ verdier: [navn, sNavn], rad, kol, bygg: (V) => byggAlarmbanner(V, kat, navn, s === 'kvittert') });
        });
      });
      return ut;
    },
    kolonne: 420,
  },
};

// OpenBridge-alvorlighet → Designsystemet-kategori
const ALVORLIGHET = [
  ['critical', 'Kritisk', 'Kritisk feil', 'Styremaskin 1 · ingen respons'],
  ['danger', 'Alarm', 'Høy temperatur', 'Motor 2 · kjølevann 96 °C'],
  ['warning', 'Advarsel', 'Lavt nivå', 'Dagtank SB · 18 %'],
  ['caution', 'Forsiktighet', 'Service forfaller', 'Generator 1 · om 12 t'],
  ['info', 'Info', 'Ny melding', 'Fra maskinkontroll'],
];

// ------------------------------------------------------------------ byggere
function byggKnapp(V, v, t, medIkon) {
  const S = `color.control.${v}`;
  const deaktivert = t === 'disabled';
  const wrapper = V.boks('Knapp', { b: 96, h: 48, sizingV: 'fix' });
  V.bind(wrapper, 'button.height', ['height']);

  const flate = V.boks('Flate', { b: 80, h: 32, sizingV: 'fix' });
  V.bind(flate, 'button.visual-height', ['height']);
  V.bind(flate, 'button.padding-inline', ['paddingLeft', 'paddingRight']);
  V.flate(flate, { fyll: `${S}.${t}-background`, kant: `${S}.${t}-border`, radius: 'button.border-radius', fokus: t === 'focused' });

  if (medIkon) V.leggTil(flate, V.ikon('Ikon', IKON.pluss, 'button.icon-size', `${S}.${deaktivert ? 'on-disabled' : 'on-neutral'}`));
  const etikett = V.boks('Etikett', { b: 40, h: 24 });
  V.bind(etikett, 'button.label-padding', ['paddingLeft', 'paddingRight']);
  const txt = V.tekst('Knapp', 'typography.ui.button', `${S}.${deaktivert ? 'on-disabled' : 'on-active'}`);
  if (txt) V.leggTil(etikett, txt);
  V.leggTil(flate, etikett);
  V.leggTil(wrapper, flate);
  return wrapper;
}

function byggIkonknapp(V, v, t) {
  const S = `color.control.${v}`;
  const wrapper = V.boks('Ikonknapp', { b: 48, h: 48, sizingH: 'fix', sizingV: 'fix' });
  V.bind(wrapper, 'button.height', ['width', 'height']);
  const flate = V.boks('Flate', { b: 32, h: 32, sizingH: 'fix', sizingV: 'fix' });
  V.bind(flate, 'icon-button.visual-size', ['width', 'height']);
  V.flate(flate, { fyll: `${S}.${t}-background`, kant: `${S}.${t}-border`, radius: 'button.border-radius', fokus: t === 'focused' });
  V.leggTil(flate, V.ikon('Ikon', IKON.meny, 'icon-button.icon-size', `${S}.${t === 'disabled' ? 'on-disabled' : 'on-neutral'}`));
  V.leggTil(wrapper, flate);
  return wrapper;
}

/** Etikett ved siden av en valgkontroll. */
function kontrollRad(V, navn, kontroll, deaktivert, aktiv = false) {
  const rad = V.boks(navn, { b: 120, h: 48, sizingV: 'fix', justify: 'start' });
  V.bind(rad, 'control.height', ['height']);
  V.bind(rad, 'control.label-spacing', ['columnGap']);
  V.leggTil(rad, kontroll);
  const txt = V.tekst('Valg', aktiv ? 'typography.ui.body-active' : 'typography.ui.body', deaktivert ? 'color.neutral.text-disabled' : 'color.neutral.text-default', 'Etikett');
  if (txt) V.leggTil(rad, txt);
  return rad;
}

function byggBryter(V, pa, t) {
  const deaktivert = t === 'disabled';
  // OpenBridge: av = indent-flate med element-inactive-kant, på = selected
  const sett = pa ? 'selected' : 'indent';
  const spor = V.boks('Spor', { b: 48, h: 24, sizingH: 'fix', sizingV: 'fix', justify: pa ? 'end' : 'start' });
  V.bind(spor, 'toggle.width', ['width']);
  V.bind(spor, 'toggle.height', ['height']);
  V.bind(spor, 'toggle.padding', ['paddingLeft', 'paddingRight']);
  const kant = !pa && (t === 'enabled' || t === 'hover') ? 'color.neutral.border-strong' : `color.control.${sett}.${t}-border`;
  V.flate(spor, { fyll: `color.control.${sett}.${t}-background`, kant, radius: 'toggle.border-radius', fokus: t === 'focused' });
  const knott = pa
    ? (deaktivert ? 'color.control.selected.on-disabled' : 'color.control.selected.on-active')
    : (deaktivert ? 'color.neutral.text-disabled' : 'color.neutral.text-subtle');
  V.leggTil(spor, V.sirkel('Knott', 'toggle.thumb-size', knott));
  return kontrollRad(V, 'Bryter', spor, deaktivert, pa);
}

function byggSjekkboks(V, verdi, t) {
  const deaktivert = t === 'disabled';
  // OpenBridge: av = indent, på = selected, delvis = amplified
  const sett = { av: 'indent', pa: 'selected', delvis: 'amplified' }[verdi];
  const boks = V.boks('Boks', { b: 24, h: 24, sizingH: 'fix', sizingV: 'fix' });
  V.bind(boks, 'checkbox.size', ['width', 'height']);
  const kant = verdi === 'av' && !deaktivert ? 'color.neutral.symbol' : `color.control.${sett}.${t}-border`;
  V.flate(boks, { fyll: `color.control.${sett}.${t}-background`, kant, radius: 'checkbox.border-radius', fokus: t === 'focused' });
  if (verdi !== 'av') {
    V.leggTil(boks, V.ikon('Merke', verdi === 'pa' ? IKON.hake : IKON.strek, 'checkbox.size', `color.control.${sett}.${deaktivert ? 'on-disabled' : 'on-active'}`));
  }
  return kontrollRad(V, 'Sjekkboks', boks, deaktivert);
}

function byggRadio(V, pa, t) {
  const deaktivert = t === 'disabled';
  const sett = pa ? 'selected' : 'indent';
  const ring = V.boks('Ring', { b: 24, h: 24, sizingH: 'fix', sizingV: 'fix' });
  V.bind(ring, 'radio.size', ['width', 'height']);
  const kant = !pa && !deaktivert ? 'color.neutral.border-strong' : `color.control.${sett}.${t}-border`;
  V.flate(ring, { fyll: `color.control.${sett}.${t}-background`, kant, radius: 'border-radius.full', fokus: t === 'focused' });
  if (pa) V.leggTil(ring, V.sirkel('Prikk', 'radio.thumb-size', `color.control.selected.${deaktivert ? 'on-disabled' : 'on-active'}`));
  return kontrollRad(V, 'Radioknapp', ring, deaktivert, pa);
}

function byggInputfelt(V, t, utfylt) {
  const deaktivert = t === 'disabled';
  const feil = t === 'feil';
  const tilstand = feil ? 'enabled' : t;
  const felt = V.boks('Inputfelt', { dir: 'column', b: 240, h: 100, sizingH: 'fix', align: 'start', justify: 'start' });
  V.bind(felt, 'input.gap', ['rowGap']);

  const etikett = V.tekst('Etikett', 'typography.ui.label', deaktivert ? 'color.neutral.text-disabled' : 'color.neutral.text-subtle', 'Etikett');
  if (etikett) V.leggTil(felt, etikett);

  const boks = V.boks('Felt', { b: 240, h: 32, sizingH: 'fix', sizingV: 'fix', justify: 'start' });
  V.bind(boks, 'input.height', ['height']);
  V.bind(boks, 'input.padding-inline', ['paddingLeft', 'paddingRight']);
  // OpenBridge: tomt felt har container-bakgrunn til det får fokus
  const fyll = !utfylt && !deaktivert && t !== 'focused' ? 'color.neutral.background-default' : `color.control.normal.${tilstand}-background`;
  // OpenBridge: feil gir 2px kant i alert-error i stedet for vanlig kant
  V.flate(boks, { fyll, kant: feil ? null : `color.control.normal.${tilstand}-border`, radius: 'input.border-radius', fokus: t === 'focused' });
  if (feil) {
    // error-outline i stedet for error: OpenBridge sin «error» er nesten usynlig i natt-paletten
    V.bind(boks, 'color.alert.error-outline', ['strokeColor']);
    V.bind(boks, 'focus.width', ['strokeWidth']);
  }
  const fargeVerdi = deaktivert ? 'color.control.normal.on-disabled' : utfylt ? 'color.control.normal.on-active' : 'color.neutral.text-placeholder';
  const verdi = V.tekst(utfylt ? '12,5 knop' : 'Skriv inn verdi', 'typography.ui.body', fargeVerdi, 'Verdi');
  if (verdi) V.leggTil(boks, verdi);
  V.leggTil(felt, boks);
  V.fyllBredde(boks);

  const hjelp = V.tekst(feil ? 'Verdien må være mellom 0 og 30' : 'Hjelpetekst', 'typography.ui.label',
    feil ? 'color.alert.error-outline' : deaktivert ? 'color.neutral.text-disabled' : 'color.neutral.text-subtle', 'Hjelpetekst');
  if (hjelp) V.leggTil(felt, hjelp);
  return felt;
}

function byggAlarmbanner(V, kat, navn, kvittert) {
  const info = ALVORLIGHET.find(([k]) => k === kat);
  const C = `color.${kat}`;
  const banner = V.boks('Alarmbanner', { b: 360, h: 48, sizingH: 'fix', sizingV: 'fix', justify: 'start' });
  V.bind(banner, 'banner.height', ['height']);
  V.bind(banner, 'banner.padding-inline', ['paddingLeft', 'paddingRight']);
  V.bind(banner, 'banner.gap', ['columnGap']);
  // Aktiv: kant i alvorlighetsfarge. Kvittert: nøytral kant. Merket beholder fargen –
  // i OpenBridge er forskjellen ellers at ukvitterte alarmer blinker.
  V.flate(banner, {
    fyll: 'color.neutral.surface-default',
    kant: kvittert ? 'color.neutral.border-default' : `${C}.border-default`,
    kantbredde: kvittert ? 'border-width.default' : 'focus.width',
    radius: 'banner.border-radius',
  });

  const merke = V.boks('Merke', { b: 32, h: 32, sizingH: 'fix', sizingV: 'fix' });
  V.bind(merke, 'banner.badge-size', ['width', 'height']);
  V.flate(merke, { fyll: `${C}.base-default`, radius: 'border-radius.md' });
  V.leggTil(merke, V.ikon('Ikon', IKON.utrop, 'banner.icon-size', `${C}.base-contrast-default`));
  V.leggTil(banner, merke);

  const tekster = V.boks('Tekst', { dir: 'column', b: 200, h: 40, align: 'start', justify: 'center' });
  const tittel = V.tekst(info[2], 'typography.ui.body-active', 'color.neutral.text-default', 'Tittel');
  const beskr = V.tekst(info[3], 'typography.ui.label', 'color.neutral.text-subtle', 'Beskrivelse');
  if (tittel) V.leggTil(tekster, tittel);
  if (beskr) V.leggTil(tekster, beskr);
  V.leggTil(banner, tekster);
  V.fyllBredde(tekster);

  const tid = V.tekst('12:04', 'typography.ui.label', 'color.neutral.text-subtle', 'Tid');
  if (tid) V.leggTil(banner, tid);
  return banner;
}

// ================================================================== generering
async function generer(id) {
  const def = KOMPONENTER[id];
  if (!def) throw new Error(`Ukjent komponent: ${id}`);
  const status = sjekk();
  if (!status.ok) throw new Error(status.melding);
  if (status.komponentMangler) await sikreKomponentTokens();

  const V = lagVerktoy(tokenKart());
  const side = penpot.currentPage;
  let startX = 0;
  for (const s of side?.root?.children ?? []) startX = Math.max(startX, s.x + s.width);
  startX = startX ? startX + 200 : 0;

  const KOL = def.kolonne ?? 220;
  const RAD = def.radhoyde ?? 96;
  const hoveder = [];
  const verdierFor = new Map();
  for (const k of def.kombinasjoner()) {
    const figur = k.bygg(V);
    // Navnet «Komponent / verdi / verdi …» gir riktig beholdernavn ved sammenslåing
    figur.name = [def.navn, ...k.verdier].join(' / ');
    figur.x = startX + k.kol * KOL;
    figur.y = k.rad * RAD;
    penpot.library.local.createComponent([figur]);
    hoveder.push(figur);
    verdierFor.set(figur.id, k.verdier);
  }
  logg(`${def.navn}: laget ${hoveder.length} varianter`);
  await vent(400);

  const [forste, ...resten] = hoveder;
  const beholder = forste.combineAsVariants(resten.map((h) => h.id));
  await vent(800);
  if (beholder) beholder.name = def.navn;

  const varianter = beholder?.variants ?? forste.component()?.variants;
  if (!varianter) throw new Error(`${def.navn}: Penpot laget ikke variantene. Prøv igjen på en tom side.`);
  while (varianter.properties.length < def.egenskaper.length) {
    varianter.addProperty();
    await vent(150);
  }
  def.egenskaper.forEach((n, i) => varianter.renameProperty(i, n));
  await vent(200);
  for (const h of hoveder) {
    const komp = h.component();
    if (komp?.isVariant()) verdierFor.get(h.id).forEach((verdi, i) => komp.setVariantProperty(i, verdi));
  }
  await vent(200);

  if (V.feil.length) {
    logg(`${def.navn}: ${V.feil.length} token-koblinger feilet`, 'feil');
    for (const f of [...new Set(V.feil)].slice(0, 10)) logg(`• ${f}`, 'feil');
  }
  return { navn: def.navn, antall: hoveder.length, feil: V.feil.length, beholder: beholder ?? forste };
}

// ================================================================== UI
penpot.ui.open('Maritimt DS – komponenter', 'index.html', { width: 380, height: 640 });

penpot.ui.onMessage(async (melding) => {
  if (!melding || typeof melding !== 'object') return;
  if (melding.type === 'klar') {
    penpot.ui.sendMessage({
      type: 'status', versjon: VERSJON, ...sjekk(),
      komponenter: Object.entries(KOMPONENTER).map(([id, d]) => ({ id, navn: d.navn, antall: d.kombinasjoner().length, egenskaper: d.egenskaper })),
    });
  }
  if (melding.type === 'generer') {
    const ider = melding.komponent === 'alle' ? Object.keys(KOMPONENTER) : [melding.komponent];
    const laget = [];
    try {
      for (const id of ider) {
        const r = await generer(id);
        laget.push(r);
        penpot.ui.sendMessage({ type: 'ferdig', id, navn: r.navn, antall: r.antall, feil: r.feil });
      }
      if (laget.length) penpot.viewport.zoomIntoView(laget.map((r) => r.beholder));
      penpot.ui.sendMessage({ type: 'alt-ferdig' });
    } catch (e) {
      penpot.ui.sendMessage({ type: 'feil', tekst: e?.message ?? String(e) });
    }
  }
});

penpot.on('themechange', (tema) => penpot.ui.sendMessage({ type: 'tema', tema }));
