/*
 * Maritimt DS – komponentgenerator for Penpot
 *
 * Lager komponenter med varianter og binder alle egenskaper til de semantiske
 * tokenene fra penpot-tokens.json. Komponentene følger derfor med når du bytter
 * Palett (Dag/Skumring/Natt/Sterkt lys) eller Størrelse (Regular … XL).
 *
 * Regler og mål: OpenBridge (button.css i @oicl/openbridge-webcomponents 2.0.0)
 * Struktur og navngiving: Designsystemet (semantiske tokens, komponent-tokens)
 */

const VERSJON = '0.1.0';

// ------------------------------------------------------------------ oppsett
// Komponent-tokens (Designsystemets tredje lag). Opprettes automatisk hvis
// token-filen ble importert før de fantes.
const KOMPONENT_SETT = 'semantikk/komponent';
const KOMPONENT_TOKENS = [
  ['button.height', 'sizing', '{ob.component.button-touch-target-size}'],
  ['button.min-width', 'sizing', '{ob.component.button-touch-target-size}'],
  ['button.visual-height', 'sizing', '{ob.component.button-visual-size}'],
  ['button.padding-inline', 'spacing', '{ob.component.button-label-spacing}'],
  ['button.label-padding', 'spacing', '{ob.component.button-label-spacing}'],
  ['button.icon-size', 'sizing', '{ob.component.button-icon-size}'],
  ['button.border-radius', 'borderRadius', '{ob.component.button-border-radius}'],
  ['button.border-width', 'borderWidth', '{ob.component.button-stroke-weight}'],
  ['focus.width', 'borderWidth', '{ob.size.border-weight-focusframe}'],
];

// OpenBridge-knappen: variant × tilstand × innhold
const VARIANTER = [
  { id: 'normal', navn: 'Normal' },
  { id: 'raised', navn: 'Raised' },
  { id: 'flat', navn: 'Flat' },
];
const TILSTANDER = [
  { id: 'enabled', navn: 'Hvile' },
  { id: 'hover', navn: 'Hover' },
  { id: 'pressed', navn: 'Trykket' },
  { id: 'focused', navn: 'Fokus' },
  { id: 'disabled', navn: 'Deaktivert' },
  { id: 'activated', navn: 'Aktivert', kunFor: ['normal', 'flat'] }, // finnes ikke for raised i OpenBridge
];
const INNHOLD = [
  { id: 'tekst', navn: 'Tekst', ikon: false },
  { id: 'ikon-tekst', navn: 'Ikon og tekst', ikon: true },
];
const EGENSKAPER = ['Variant', 'Tilstand', 'Innhold'];

// Et enkelt, generisk plussikon (24×24). Bytt det ut med OpenBridge-ikoner i Penpot.
const IKON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
  '<path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="#000000"/></svg>';

// ------------------------------------------------------------------ hjelpere
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

/** Tokennavnene knappen trenger, for kontroll før generering. */
function nodvendigeTokens() {
  const navn = new Set(KOMPONENT_TOKENS.map(([n]) => n));
  navn.add('typography.ui.button');
  navn.add('color.focus.inner');
  navn.add('color.focus.outer');
  for (const v of VARIANTER) {
    for (const t of TILSTANDER) {
      if (t.kunFor && !t.kunFor.includes(v.id)) continue;
      navn.add(`color.control.${v.id}.${t.id}-background`);
      navn.add(`color.control.${v.id}.${t.id}-border`);
    }
    for (const r of ['on-active', 'on-neutral', 'on-disabled']) navn.add(`color.control.${v.id}.${r}`);
  }
  return [...navn];
}

function sjekk() {
  const katalog = penpot.library.local.tokens;
  if (!katalog || katalog.sets.length === 0) {
    return { ok: false, melding: 'Fant ingen tokens i denne filen. Importer penpot-tokens.json først.' };
  }
  const kart = tokenKart();
  const komponentMangler = KOMPONENT_TOKENS.some(([n]) => !kart.has(n));
  const mangler = nodvendigeTokens().filter((n) => !kart.has(n) && !KOMPONENT_TOKENS.some(([k]) => k === n));
  if (mangler.length) {
    return { ok: false, melding: `Mangler ${mangler.length} tokens, f.eks. ${mangler.slice(0, 3).join(', ')}. Importer siste penpot-tokens.json.` };
  }
  const uloste = nodvendigeTokens().filter((n) => kart.has(n) && kart.get(n).resolvedValueString === undefined);
  if (uloste.length) {
    return {
      ok: false,
      melding: 'Noen tokens peker til sett som ikke er aktive. Slå på temaene Grunnlag/Standard, Palett/Dag og Størrelse/Regular.',
    };
  }
  return { ok: true, komponentMangler, melding: komponentMangler ? 'Klar. Komponent-tokens blir lagt til automatisk.' : 'Klar.' };
}

/** Oppretter settet «semantikk/komponent» hvis det mangler, og slår det på. */
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
  for (const [name, type, value] of KOMPONENT_TOKENS) {
    if (finnes.has(name)) continue;
    const t = sett.addToken({ type, name, value });
    if (!t) logg(`Kunne ikke lage token ${name}`, 'feil');
  }
  // Legg settet til i temaet Grunnlag/Standard, så det følger med når temaer byttes
  const grunnlag = katalog.themes.find((t) => t.group === 'Grunnlag' && t.name === 'Standard');
  if (grunnlag && !grunnlag.activeSets.some((s) => s.name === KOMPONENT_SETT)) grunnlag.addSet(sett);
  await vent(300);
}

/** Binder et token til en eller flere egenskaper på en figur. */
function bind(figur, tokenNavn, egenskaper, kart, feil) {
  const token = kart.get(tokenNavn);
  if (!token) {
    feil.push(tokenNavn);
    return;
  }
  try {
    figur.applyToken(token, egenskaper);
  } catch (e) {
    feil.push(`${tokenNavn} → ${egenskaper.join(',')}: ${e.message ?? e}`);
  }
}

function flex(board, { dir = 'row', sizingH = 'auto', sizingV = 'auto' } = {}) {
  const f = board.addFlexLayout();
  f.dir = dir;
  f.alignItems = 'center';
  f.justifyContent = 'center';
  f.horizontalSizing = sizingH;
  f.verticalSizing = sizingV;
  return f;
}

function nyBoard(navn, b = 48, h = 48) {
  const board = penpot.createBoard();
  board.name = navn;
  board.resize(b, h);
  board.fills = [];
  return board;
}

// ------------------------------------------------------------------ knapp
function lagKnapp(v, t, inn, kart, feil) {
  const S = `color.control.${v.id}`;
  const deaktivert = t.id === 'disabled';
  const fokus = t.id === 'focused';

  // Ytterste lag: usynlig berøringsflate (OpenBridge .wrapper)
  const wrapper = nyBoard(`Knapp / ${v.navn} / ${t.navn} / ${inn.navn}`, 96, 48);
  const fw = flex(wrapper, { sizingH: 'auto', sizingV: 'fix' });
  bind(wrapper, 'button.height', ['height'], kart, feil);

  // Synlig flate (OpenBridge .visible-wrapper)
  const flate = nyBoard('Flate', 80, 32);
  const ff = flex(flate, { sizingH: 'auto', sizingV: 'fix' });
  flate.strokes = [{ strokeColor: '#000000', strokeOpacity: 1, strokeWidth: 1, strokeStyle: 'solid', strokeAlignment: fokus ? 'outer' : 'inner' }];
  bind(flate, 'button.visual-height', ['height'], kart, feil);
  bind(flate, 'button.padding-inline', ['paddingLeft', 'paddingRight'], kart, feil);
  bind(flate, 'button.border-radius', ['borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomRight', 'borderRadiusBottomLeft'], kart, feil);
  bind(flate, `${S}.${t.id}-background`, ['fill'], kart, feil);
  if (fokus) {
    // OpenBridge: 2px fokusramme i border-focus utenfor flaten
    bind(flate, 'color.focus.inner', ['strokeColor'], kart, feil);
    bind(flate, 'focus.width', ['strokeWidth'], kart, feil);
  } else {
    bind(flate, `${S}.${t.id}-border`, ['strokeColor'], kart, feil);
    bind(flate, 'button.border-width', ['strokeWidth'], kart, feil);
  }

  // Ikon
  if (inn.ikon) {
    const ikon = nyBoard('Ikon', 24, 24);
    const symbol = penpot.createShapeFromSvg(IKON_SVG);
    if (symbol) {
      symbol.name = 'Symbol';
      ikon.appendChild(symbol);
      symbol.x = ikon.x;
      symbol.y = ikon.y;
      symbol.resize(24, 24);
      const stier = 'children' in symbol && symbol.children?.length ? symbol.children : [symbol];
      for (const sti of stier) {
        sti.constraintsHorizontal = 'scale';
        sti.constraintsVertical = 'scale';
        bind(sti, `${S}.${deaktivert ? 'on-disabled' : 'on-neutral'}`, ['fill'], kart, feil);
      }
      symbol.constraintsHorizontal = 'scale';
      symbol.constraintsVertical = 'scale';
    }
    bind(ikon, 'button.icon-size', ['width', 'height'], kart, feil);
    ff.appendChild(ikon);
  }

  // Etikett med luft på sidene (OpenBridge .label)
  const etikett = nyBoard('Etikett', 40, 24);
  flex(etikett);
  bind(etikett, 'button.label-padding', ['paddingLeft', 'paddingRight'], kart, feil);
  const tekst = penpot.createText('Knapp');
  if (tekst) {
    tekst.name = 'Tekst';
    tekst.growType = 'auto-width';
    bind(tekst, 'typography.ui.button', ['typography'], kart, feil);
    bind(tekst, `${S}.${deaktivert ? 'on-disabled' : 'on-active'}`, ['fill'], kart, feil);
    etikett.appendChild(tekst);
  }
  ff.appendChild(etikett);
  fw.appendChild(flate);
  return wrapper;
}

async function genererKnapp() {
  const status = sjekk();
  if (!status.ok) throw new Error(status.melding);
  if (status.komponentMangler) await sikreKomponentTokens();

  const kart = tokenKart();
  const feil = [];
  const side = penpot.currentPage;

  // Plasser til høyre for alt som allerede ligger på siden
  let startX = 0;
  const startY = 0;
  for (const s of side.root?.children ?? []) startX = Math.max(startX, s.x + s.width);
  startX = startX ? startX + 200 : 0;

  const KOL = 220;
  const RAD = 96;
  const hoveder = [];
  const egenskaperFor = new Map();
  let rad = 0;
  for (const v of VARIANTER) {
    for (const inn of INNHOLD) {
      let kol = 0;
      for (const t of TILSTANDER) {
        if (t.kunFor && !t.kunFor.includes(v.id)) {
          kol++;
          continue;
        }
        const k = lagKnapp(v, t, inn, kart, feil);
        k.x = startX + kol * KOL;
        k.y = startY + rad * RAD;
        // Navnet «Knapp / Variant / Tilstand / Innhold» gir Penpot riktig
        // beholdernavn («Knapp») når komponentene slås sammen til varianter.
        penpot.library.local.createComponent([k]);
        hoveder.push(k);
        egenskaperFor.set(k.id, [v.navn, t.navn, inn.navn]);
        kol++;
      }
      rad++;
    }
  }
  logg(`Laget ${hoveder.length} knapper`);
  await vent(400);

  // Slå sammen til én komponent med varianter
  const [forste, ...resten] = hoveder;
  const beholder = forste.combineAsVariants(resten.map((h) => h.id));
  await vent(800);
  if (beholder) beholder.name = 'Knapp';

  const varianter = beholder?.variants ?? forste.component()?.variants;
  if (!varianter) throw new Error('Penpot laget ikke variantene. Prøv å kjøre pluginet på nytt på en tom side.');
  while (varianter.properties.length < EGENSKAPER.length) {
    varianter.addProperty();
    await vent(150);
  }
  EGENSKAPER.forEach((n, i) => varianter.renameProperty(i, n));
  await vent(200);

  for (const h of hoveder) {
    const komp = h.component();
    if (!komp || !komp.isVariant()) continue;
    egenskaperFor.get(h.id).forEach((verdi, i) => komp.setVariantProperty(i, verdi));
  }
  await vent(200);

  if (feil.length) {
    logg(`${feil.length} token-koblinger feilet:`, 'feil');
    for (const f of feil.slice(0, 15)) logg(`• ${f}`, 'feil');
  }
  penpot.viewport.zoomIntoView(beholder ? [beholder] : hoveder);
  return { antall: hoveder.length, feil: feil.length };
}

// ------------------------------------------------------------------ UI
penpot.ui.open('Maritimt DS – komponenter', 'index.html', { width: 360, height: 520 });

penpot.ui.onMessage(async (melding) => {
  if (!melding || typeof melding !== 'object') return;
  if (melding.type === 'klar') {
    penpot.ui.sendMessage({ type: 'status', versjon: VERSJON, ...sjekk() });
  }
  if (melding.type === 'generer' && melding.komponent === 'knapp') {
    try {
      const r = await genererKnapp();
      penpot.ui.sendMessage({ type: 'ferdig', ...r });
    } catch (e) {
      penpot.ui.sendMessage({ type: 'feil', tekst: e?.message ?? String(e) });
    }
  }
});

penpot.on('themechange', (tema) => penpot.ui.sendMessage({ type: 'tema', tema }));
