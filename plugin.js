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

const VERSJON = '0.3.1';

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
  ["tag.height", "sizing", "{ob.component.tag-visual-target}"],
  ["tag.height-large", "sizing", "{ob.component.tag-visual-target-large}"],
  ["tag.padding-inline", "spacing", "{ob.component.tag-padding-horizontal}"],
  ["tag.padding-inline-large", "spacing", "{ob.component.tag-padding-horizontal-large}"],
  ["tag.gap", "spacing", "{ob.component.tag-label-spacing}"],
  ["tag.icon-size", "sizing", "{ob.component.tag-icon-size}"],
  ["tag.icon-size-large", "sizing", "{ob.component.tag-icon-size-large}"],
  ["tag.border-radius", "borderRadius", "{ob.component.tag-border-radius}"],
  ["badge.padding", "spacing", "{ob.component.badge-padding}"],
  ["badge.border-radius", "borderRadius", "{ob.component.badge-border-radius}"],
  ["badge.min-size-large", "sizing", "{ob.component.badge-min-size-large}"],
  ["status.height", "sizing", "{ob.size.touch-target-min}"],
  ["status.padding", "spacing", "8px"],
  ["status.gap", "spacing", "4px"],
  ["status.indicator-width", "sizing", "16px"],
  ["status.indicator-height", "sizing", "8px"],
  ["status.indicator-radius", "borderRadius", "{ob.border-radius.2}"],
  ["tooltip.height", "sizing", "{ob.component.tooltip-size}"],
  ["tooltip.padding-inline", "spacing", "{ob.component.tooltip-padding-horizontal}"],
  ["tooltip.label-padding", "spacing", "{ob.component.tooltip-label-spacing}"],
  ["tooltip.icon-size", "sizing", "{ob.component.tooltip-icon-size}"],
  ["tooltip.border-radius", "borderRadius", "{ob.component.tooltip-border-radius}"],
  ["tab.height", "sizing", "{ob.component.tab-item-touch-target-size}"],
  ["tab.padding-inline", "spacing", "{ob.component.tab-item-padding-horizontal}"],
  ["tab.gap", "spacing", "{ob.component.tab-item-label-spacing}"],
  ["tab.icon-size", "sizing", "{ob.component.tab-item-icon-size}"],
  ["segment.height", "sizing", "{ob.component.toggle-button-toggle-button-item-touch-target-size}"],
  ["segment.visual-height", "sizing", "{ob.component.toggle-button-toggle-button-item-visual-size}"],
  ["segment.padding-inline", "spacing", "{ob.component.toggle-button-toggle-button-item-padding-horizontal}"],
  ["segment.label-padding", "spacing", "{ob.component.toggle-button-toggle-button-item-label-spacing}"],
  ["segment.border-radius", "borderRadius", "{ob.component.toggle-button-toggle-button-item-border-radius}"],
  ["nav.height", "sizing", "{ob.component.navigation-item-touch-target-size}"],
  ["nav.padding-inline", "spacing", "{ob.component.navigation-item-padding-horizontal}"],
  ["nav.gap", "spacing", "{ob.component.navigation-item-label-spacing}"],
  ["nav.icon-size", "sizing", "{ob.component.navigation-item-icon-size}"],
  ["nav.border-radius", "borderRadius", "{ob.component.navigation-item-border-radius}"],
  ["card.padding", "spacing", "{ob.component.card-padding}"],
  ["card.gap", "spacing", "{ob.component.card-gap}"],
  ["card.border-radius", "borderRadius", "{ob.component.card-border-radius-regular}"],
  ["card.heading-height", "sizing", "{ob.component.card-heading-container-height}"],
  ["card.icon-size", "sizing", "{ob.component.card-leading-icon-size}"],
  ["color.status.active.fill", "color", "{ob.base.blue-500}"],
  ["color.status.active.border", "color", "{ob.base.blue-600}"],
  ["color.tag.blue.text", "color", "{ob.base.blue-600}"],
  ["color.tag.blue.background", "color", "{ob.base.blue-050}"],
  ["color.tag.blue.border", "color", "{ob.base.blue-100}"],
  ["color.tag.blue.icon", "color", "{ob.base.blue-500}"],
  ["color.tag.cyan.text", "color", "{ob.base.cyan-600}"],
  ["color.tag.cyan.background", "color", "{ob.base.cyan-050}"],
  ["color.tag.cyan.border", "color", "{ob.base.cyan-100}"],
  ["color.tag.cyan.icon", "color", "{ob.base.cyan-500}"],
  ["color.tag.teal.text", "color", "{ob.base.teal-600}"],
  ["color.tag.teal.background", "color", "{ob.base.teal-050}"],
  ["color.tag.teal.border", "color", "{ob.base.teal-100}"],
  ["color.tag.teal.icon", "color", "{ob.base.teal-500}"],
  ["color.tag.green.text", "color", "{ob.base.mint-600}"],
  ["color.tag.green.background", "color", "{ob.base.mint-050}"],
  ["color.tag.green.border", "color", "{ob.base.mint-100}"],
  ["color.tag.green.icon", "color", "{ob.base.mint-500}"],
  ["color.tag.yellow.text", "color", "{ob.base.yellow-600}"],
  ["color.tag.yellow.background", "color", "{ob.base.yellow-050}"],
  ["color.tag.yellow.border", "color", "{ob.base.yellow-100}"],
  ["color.tag.yellow.icon", "color", "{ob.base.yellow-500}"],
  ["color.tag.orange.text", "color", "{ob.base.orange-600}"],
  ["color.tag.orange.background", "color", "{ob.base.orange-050}"],
  ["color.tag.orange.border", "color", "{ob.base.orange-100}"],
  ["color.tag.orange.icon", "color", "{ob.base.orange-500}"],
  ["color.tag.red.text", "color", "{ob.base.red-600}"],
  ["color.tag.red.background", "color", "{ob.base.red-050}"],
  ["color.tag.red.border", "color", "{ob.base.red-100}"],
  ["color.tag.red.icon", "color", "{ob.base.red-500}"],
  ["color.tag.purple.text", "color", "{ob.base.purple-600}"],
  ["color.tag.purple.background", "color", "{ob.base.purple-050}"],
  ["color.tag.purple.border", "color", "{ob.base.purple-100}"],
  ["color.tag.purple.icon", "color", "{ob.base.purple-500}"],
  ["color.tag.indigo.text", "color", "{ob.base.indigo-600}"],
  ["color.tag.indigo.background", "color", "{ob.base.indigo-050}"],
  ["color.tag.indigo.border", "color", "{ob.base.indigo-100}"],
  ["color.tag.indigo.icon", "color", "{ob.base.indigo-500}"],
  ["color.neutral.text-disabled", "color", "{ob.element.disabled}"],
  ["color.neutral.text-placeholder", "color", "{ob.element.inactive}"],
  ["color.neutral.symbol", "color", "{ob.element.symbol}"],
];

// Primitivene komponent-tokenene peker til, per sett (generert av bygg-tokens.mjs).
// Fyller hull i filer importert med en eldre token-fil, så du slipper å importere på nytt.
const PRIMITIV_TILLEGG = {"primitiver/palett/dag": [["ob.element.inactive", "color", "#707070"], ["ob.element.disabled", "color", "#bebebe"], ["ob.element.symbol", "color", "#8e8e8e"], ["ob.base.blue-050", "color", "#e4eefd"], ["ob.base.blue-600", "color", "#1d3c67"], ["ob.base.blue-100", "color", "#cadefc"], ["ob.base.blue-500", "color", "#2d548b"], ["ob.base.cyan-050", "color", "#dff0f9"], ["ob.base.cyan-100", "color", "#bfe2f3"], ["ob.base.cyan-500", "color", "#005a7b"], ["ob.base.cyan-600", "color", "#00415b"], ["ob.base.red-050", "color", "#fde9e8"], ["ob.base.red-100", "color", "#fcd2cf"], ["ob.base.red-500", "color", "#863d3c"], ["ob.base.red-600", "color", "#622929"], ["ob.base.orange-050", "color", "#f9ece1"], ["ob.base.orange-100", "color", "#f4d7bf"], ["ob.base.orange-500", "color", "#7c4606"], ["ob.base.orange-600", "color", "#5b3100"], ["ob.base.teal-050", "color", "#e2f2f3"], ["ob.base.teal-100", "color", "#bee4e5"], ["ob.base.teal-500", "color", "#005d61"], ["ob.base.teal-600", "color", "#004346"], ["ob.base.mint-050", "color", "#e2f3eb"], ["ob.base.mint-100", "color", "#bfe5d5"], ["ob.base.mint-500", "color", "#005f43"], ["ob.base.mint-600", "color", "#00452f"], ["ob.base.yellow-050", "color", "#f2efdf"], ["ob.base.yellow-100", "color", "#e4dcb9"], ["ob.base.yellow-500", "color", "#635200"], ["ob.base.yellow-600", "color", "#483a00"], ["ob.base.purple-050", "color", "#f8eaf5"], ["ob.base.purple-100", "color", "#f2d3ec"], ["ob.base.purple-500", "color", "#774070"], ["ob.base.purple-600", "color", "#572c52"], ["ob.base.indigo-050", "color", "#efedfc"], ["ob.base.indigo-100", "color", "#ddd8fa"], ["ob.base.indigo-500", "color", "#584989"], ["ob.base.indigo-600", "color", "#3f3365"]], "primitiver/palett/skumring": [["ob.element.inactive", "color", "#898989"], ["ob.element.disabled", "color", "#4d4d4d"], ["ob.element.symbol", "color", "#6c6c6c"], ["ob.base.blue-050", "color", "#202a37"], ["ob.base.blue-600", "color", "#a9d1ff"], ["ob.base.blue-100", "color", "#283545"], ["ob.base.blue-500", "color", "#80aeea"], ["ob.base.cyan-050", "color", "#182b32"], ["ob.base.cyan-100", "color", "#1e3741"], ["ob.base.cyan-500", "color", "#5ab7d9"], ["ob.base.cyan-600", "color", "#8dd8f6"], ["ob.base.red-050", "color", "#372523"], ["ob.base.red-100", "color", "#452e2c"], ["ob.base.red-500", "color", "#e9968f"], ["ob.base.red-600", "color", "#ffbeb7"], ["ob.base.orange-050", "color", "#33271a"], ["ob.base.orange-100", "color", "#403121"], ["ob.base.orange-500", "color", "#d8a166"], ["ob.base.orange-600", "color", "#f5c593"], ["ob.base.teal-050", "color", "#162c2c"], ["ob.base.teal-100", "color", "#1c3939"], ["ob.base.teal-500", "color", "#4dbcbb"], ["ob.base.teal-600", "color", "#84dcdb"], ["ob.base.mint-050", "color", "#1a2c25"], ["ob.base.mint-100", "color", "#223930"], ["ob.base.mint-500", "color", "#65bc99"], ["ob.base.mint-600", "color", "#94dcbd"], ["ob.base.yellow-050", "color", "#2c2919"], ["ob.base.yellow-100", "color", "#393420"], ["ob.base.yellow-500", "color", "#bdac5e"], ["ob.base.yellow-600", "color", "#ddce8d"], ["ob.base.purple-050", "color", "#332530"], ["ob.base.purple-100", "color", "#412e3c"], ["ob.base.purple-500", "color", "#d897c9"], ["ob.base.purple-600", "color", "#f5bce8"], ["ob.base.indigo-050", "color", "#2a2735"], ["ob.base.indigo-100", "color", "#363144"], ["ob.base.indigo-500", "color", "#b2a1e7"], ["ob.base.indigo-600", "color", "#d3c6ff"]], "primitiver/palett/natt": [["ob.element.inactive", "color", "#9c6a34"], ["ob.element.disabled", "color", "#48341f"], ["ob.element.symbol", "color", "#78532c"], ["ob.base.blue-050", "color", "#0e131c"], ["ob.base.blue-600", "color", "#83b7ff"], ["ob.base.blue-100", "color", "#171e2a"], ["ob.base.blue-500", "color", "#6997d9"], ["ob.base.cyan-050", "color", "#09151a"], ["ob.base.cyan-100", "color", "#0f2027"], ["ob.base.cyan-500", "color", "#2fa1c9"], ["ob.base.cyan-600", "color", "#4fc1ed"], ["ob.base.red-050", "color", "#1b0f12"], ["ob.base.red-100", "color", "#29191c"], ["ob.base.red-500", "color", "#d57b8e"], ["ob.base.red-600", "color", "#fa98ac"], ["ob.base.orange-050", "color", "#191109"], ["ob.base.orange-100", "color", "#271b10"], ["ob.base.orange-500", "color", "#c78842"], ["ob.base.orange-600", "color", "#eaa75e"], ["ob.base.teal-050", "color", "#071414"], ["ob.base.teal-100", "color", "#0d2121"], ["ob.base.teal-500", "color", "#00a6aa"], ["ob.base.teal-600", "color", "#32c7cb"], ["ob.base.mint-050", "color", "#09140f"], ["ob.base.mint-100", "color", "#10211a"], ["ob.base.mint-500", "color", "#38a784"], ["ob.base.mint-600", "color", "#58c8a2"], ["ob.base.yellow-050", "color", "#131309"], ["ob.base.yellow-100", "color", "#1f1f10"], ["ob.base.yellow-500", "color", "#9d993d"], ["ob.base.yellow-600", "color", "#bcb858"], ["ob.base.purple-050", "color", "#191018"], ["ob.base.purple-100", "color", "#261a25"], ["ob.base.purple-500", "color", "#bf80bf"], ["ob.base.purple-600", "color", "#e19ee1"], ["ob.base.indigo-050", "color", "#12121c"], ["ob.base.indigo-100", "color", "#1d1c2a"], ["ob.base.indigo-500", "color", "#938dda"], ["ob.base.indigo-600", "color", "#b2abff"]], "primitiver/palett/sterkt-lys": [["ob.element.inactive", "color", "#343434"], ["ob.element.disabled", "color", "#888888"], ["ob.element.symbol", "color", "#4f4f50"], ["ob.base.blue-050", "color", "#c0d6f2"], ["ob.base.blue-600", "color", "#072346"], ["ob.base.blue-100", "color", "#9cbde8"], ["ob.base.blue-500", "color", "#0f3461"], ["ob.base.cyan-050", "color", "#bad9e5"], ["ob.base.cyan-100", "color", "#90c2d5"], ["ob.base.cyan-500", "color", "#00394e"], ["ob.base.cyan-600", "color", "#002636"], ["ob.base.red-050", "color", "#f2cbcd"], ["ob.base.red-100", "color", "#e7abae"], ["ob.base.red-500", "color", "#5c2028"], ["ob.base.red-600", "color", "#42131a"], ["ob.base.orange-050", "color", "#ebceb7"], ["ob.base.orange-100", "color", "#deb28d"], ["ob.base.orange-500", "color", "#552800"], ["ob.base.orange-600", "color", "#3c1a00"], ["ob.base.teal-050", "color", "#badad9"], ["ob.base.teal-100", "color", "#92c4c3"], ["ob.base.teal-500", "color", "#003b3b"], ["ob.base.teal-600", "color", "#002828"], ["ob.base.mint-050", "color", "#badbcb"], ["ob.base.mint-100", "color", "#92c6ad"], ["ob.base.mint-500", "color", "#003d25"], ["ob.base.mint-600", "color", "#002917"], ["ob.base.yellow-050", "color", "#dcd4b6"], ["ob.base.yellow-100", "color", "#c7ba8a"], ["ob.base.yellow-500", "color", "#413200"], ["ob.base.yellow-600", "color", "#2d2200"], ["ob.base.purple-050", "color", "#e5cbe6"], ["ob.base.purple-100", "color", "#d6aed7"], ["ob.base.purple-500", "color", "#4e2450"], ["ob.base.purple-600", "color", "#361738"], ["ob.base.indigo-050", "color", "#d1d0f2"], ["ob.base.indigo-100", "color", "#b8b6e9"], ["ob.base.indigo-500", "color", "#342d61"], ["ob.base.indigo-600", "color", "#231d45"]], "primitiver/storrelse/regular": [["ob.size.touch-target-min", "dimension", "48px"], ["ob.size.visual-target-min", "dimension", "32px"], ["ob.size.icon-size-regular", "dimension", "24px"], ["ob.size.border-weight-focusframe", "dimension", "2px"], ["ob.size.list-item-padding-horizontal", "dimension", "16px"], ["ob.size.list-item-item-spacing", "dimension", "8px"], ["ob.component.button-label-spacing", "dimension", "8px"], ["ob.component.button-stroke-weight", "dimension", "1px"], ["ob.component.toggle-switch-thumb-size", "dimension", "12px"], ["ob.component.toggle-switch-selection-padding", "dimension", "6px"], ["ob.component.toggle-switch-selection-width", "dimension", "48px"], ["ob.component.toggle-switch-item-border-radius", "dimension", "1000px"], ["ob.component.checkbox-visual-target-size", "dimension", "24px"], ["ob.component.checkbox-border-radius", "dimension", "4px"], ["ob.component.checkbox-label-spacing", "dimension", "8px"], ["ob.component.badge-border-radius", "dimension", "2px"], ["ob.component.navigation-item-icon-size", "dimension", "24px"], ["ob.component.navigation-item-label-spacing", "dimension", "8px"], ["ob.component.navigation-item-touch-target-size", "dimension", "48px"], ["ob.component.navigation-item-padding-horizontal", "dimension", "12px"], ["ob.component.toggle-switch-selection-height", "dimension", "24px"], ["ob.component.icon-button-icon-size", "dimension", "24px"], ["ob.component.badge-padding", "dimension", "2px"], ["ob.component.navigation-item-border-radius", "dimension", "6px"], ["ob.component.radio-button-selection-size", "dimension", "24px"], ["ob.component.radio-button-thumb-size", "dimension", "8px"], ["ob.component.button-visual-size", "dimension", "32px"], ["ob.component.button-border-radius", "dimension", "6px"], ["ob.component.card-border-radius-regular", "dimension", "6px"], ["ob.component.button-touch-target-size", "dimension", "48px"], ["ob.component.button-icon-size", "dimension", "24px"], ["ob.component.icon-button-visual-target-size", "dimension", "32px"], ["ob.component.input-fields-text-input-field-visual-size", "dimension", "32px"], ["ob.component.input-fields-text-input-field-border-radius", "dimension", "6px"], ["ob.component.toggle-button-toggle-button-item-touch-target-size", "dimension", "48px"], ["ob.component.toggle-button-toggle-button-item-visual-size", "dimension", "32px"], ["ob.component.toggle-button-toggle-button-item-label-spacing", "dimension", "8px"], ["ob.component.toggle-button-toggle-button-item-padding-horizontal", "dimension", "4px"], ["ob.component.toggle-button-toggle-button-item-border-radius", "dimension", "6px"], ["ob.component.input-fields-text-input-field-padding-horizontal", "dimension", "8px"], ["ob.component.badge-min-size-large", "dimension", "24px"], ["ob.component.tab-item-touch-target-size", "dimension", "48px"], ["ob.component.tab-item-icon-size", "dimension", "24px"], ["ob.component.tab-item-label-spacing", "dimension", "8px"], ["ob.component.tab-item-padding-horizontal", "dimension", "16px"], ["ob.component.tooltip-icon-size", "dimension", "24px"], ["ob.component.tooltip-size", "dimension", "32px"], ["ob.component.tooltip-label-spacing", "dimension", "8px"], ["ob.component.tooltip-border-radius", "dimension", "4px"], ["ob.component.card-leading-icon-size", "dimension", "16px"], ["ob.component.card-padding", "dimension", "8px"], ["ob.component.card-heading-container-height", "dimension", "32px"], ["ob.component.card-gap", "dimension", "4px"], ["ob.component.input-fields-text-input-field-vertical-spacer", "dimension", "4px"], ["ob.component.tag-icon-size", "dimension", "16px"], ["ob.component.tag-label-spacing", "dimension", "4px"], ["ob.component.tag-padding-horizontal", "dimension", "6px"], ["ob.component.tag-visual-target", "dimension", "24px"], ["ob.component.tag-border-radius", "dimension", "4px"], ["ob.component.tag-visual-target-large", "dimension", "32px"], ["ob.component.tag-padding-horizontal-large", "dimension", "6px"], ["ob.component.tag-icon-size-large", "dimension", "24px"], ["ob.component.tooltip-padding-horizontal", "dimension", "8px"]], "primitiver/storrelse/medium": [["ob.size.touch-target-min", "dimension", "56px"], ["ob.size.visual-target-min", "dimension", "40px"], ["ob.size.icon-size-regular", "dimension", "32px"], ["ob.size.border-weight-focusframe", "dimension", "2px"], ["ob.size.list-item-padding-horizontal", "dimension", "16px"], ["ob.size.list-item-item-spacing", "dimension", "8px"], ["ob.component.button-label-spacing", "dimension", "8px"], ["ob.component.button-stroke-weight", "dimension", "1px"], ["ob.component.toggle-switch-thumb-size", "dimension", "16px"], ["ob.component.toggle-switch-selection-padding", "dimension", "8px"], ["ob.component.toggle-switch-selection-width", "dimension", "64px"], ["ob.component.toggle-switch-item-border-radius", "dimension", "1000px"], ["ob.component.checkbox-visual-target-size", "dimension", "32px"], ["ob.component.checkbox-border-radius", "dimension", "4px"], ["ob.component.checkbox-label-spacing", "dimension", "12px"], ["ob.component.badge-border-radius", "dimension", "2px"], ["ob.component.navigation-item-icon-size", "dimension", "32px"], ["ob.component.navigation-item-label-spacing", "dimension", "8px"], ["ob.component.navigation-item-touch-target-size", "dimension", "56px"], ["ob.component.navigation-item-padding-horizontal", "dimension", "12px"], ["ob.component.toggle-switch-selection-height", "dimension", "32px"], ["ob.component.icon-button-icon-size", "dimension", "32px"], ["ob.component.badge-padding", "dimension", "2px"], ["ob.component.navigation-item-border-radius", "dimension", "6px"], ["ob.component.radio-button-selection-size", "dimension", "32px"], ["ob.component.radio-button-thumb-size", "dimension", "10px"], ["ob.component.button-visual-size", "dimension", "40px"], ["ob.component.button-border-radius", "dimension", "6px"], ["ob.component.card-border-radius-regular", "dimension", "6px"], ["ob.component.button-touch-target-size", "dimension", "56px"], ["ob.component.button-icon-size", "dimension", "32px"], ["ob.component.icon-button-visual-target-size", "dimension", "40px"], ["ob.component.input-fields-text-input-field-visual-size", "dimension", "40px"], ["ob.component.input-fields-text-input-field-border-radius", "dimension", "6px"], ["ob.component.toggle-button-toggle-button-item-touch-target-size", "dimension", "56px"], ["ob.component.toggle-button-toggle-button-item-visual-size", "dimension", "40px"], ["ob.component.toggle-button-toggle-button-item-label-spacing", "dimension", "8px"], ["ob.component.toggle-button-toggle-button-item-padding-horizontal", "dimension", "4px"], ["ob.component.toggle-button-toggle-button-item-border-radius", "dimension", "6px"], ["ob.component.input-fields-text-input-field-padding-horizontal", "dimension", "8px"], ["ob.component.badge-min-size-large", "dimension", "28px"], ["ob.component.tab-item-touch-target-size", "dimension", "56px"], ["ob.component.tab-item-icon-size", "dimension", "32px"], ["ob.component.tab-item-label-spacing", "dimension", "8px"], ["ob.component.tab-item-padding-horizontal", "dimension", "16px"], ["ob.component.tooltip-icon-size", "dimension", "32px"], ["ob.component.tooltip-size", "dimension", "40px"], ["ob.component.tooltip-label-spacing", "dimension", "8px"], ["ob.component.tooltip-border-radius", "dimension", "4px"], ["ob.component.card-leading-icon-size", "dimension", "16px"], ["ob.component.card-padding", "dimension", "8px"], ["ob.component.card-heading-container-height", "dimension", "32px"], ["ob.component.card-gap", "dimension", "4px"], ["ob.component.input-fields-text-input-field-vertical-spacer", "dimension", "4px"], ["ob.component.tag-icon-size", "dimension", "20px"], ["ob.component.tag-label-spacing", "dimension", "4px"], ["ob.component.tag-padding-horizontal", "dimension", "6px"], ["ob.component.tag-visual-target", "dimension", "28px"], ["ob.component.tag-border-radius", "dimension", "4px"], ["ob.component.tag-visual-target-large", "dimension", "40px"], ["ob.component.tag-padding-horizontal-large", "dimension", "6px"], ["ob.component.tag-icon-size-large", "dimension", "32px"], ["ob.component.tooltip-padding-horizontal", "dimension", "8px"]], "primitiver/storrelse/large": [["ob.size.touch-target-min", "dimension", "72px"], ["ob.size.visual-target-min", "dimension", "56px"], ["ob.size.icon-size-regular", "dimension", "40px"], ["ob.size.border-weight-focusframe", "dimension", "4px"], ["ob.size.list-item-padding-horizontal", "dimension", "24px"], ["ob.size.list-item-item-spacing", "dimension", "12px"], ["ob.component.button-label-spacing", "dimension", "12px"], ["ob.component.button-stroke-weight", "dimension", "1px"], ["ob.component.toggle-switch-thumb-size", "dimension", "20px"], ["ob.component.toggle-switch-selection-padding", "dimension", "10px"], ["ob.component.toggle-switch-selection-width", "dimension", "80px"], ["ob.component.toggle-switch-item-border-radius", "dimension", "1000px"], ["ob.component.checkbox-visual-target-size", "dimension", "40px"], ["ob.component.checkbox-border-radius", "dimension", "6px"], ["ob.component.checkbox-label-spacing", "dimension", "12px"], ["ob.component.badge-border-radius", "dimension", "4px"], ["ob.component.navigation-item-icon-size", "dimension", "40px"], ["ob.component.navigation-item-label-spacing", "dimension", "12px"], ["ob.component.navigation-item-touch-target-size", "dimension", "72px"], ["ob.component.navigation-item-padding-horizontal", "dimension", "16px"], ["ob.component.toggle-switch-selection-height", "dimension", "40px"], ["ob.component.icon-button-icon-size", "dimension", "40px"], ["ob.component.badge-padding", "dimension", "3px"], ["ob.component.navigation-item-border-radius", "dimension", "8px"], ["ob.component.radio-button-selection-size", "dimension", "40px"], ["ob.component.radio-button-thumb-size", "dimension", "12px"], ["ob.component.button-visual-size", "dimension", "56px"], ["ob.component.button-border-radius", "dimension", "8px"], ["ob.component.card-border-radius-regular", "dimension", "8px"], ["ob.component.button-touch-target-size", "dimension", "72px"], ["ob.component.button-icon-size", "dimension", "40px"], ["ob.component.icon-button-visual-target-size", "dimension", "56px"], ["ob.component.input-fields-text-input-field-visual-size", "dimension", "56px"], ["ob.component.input-fields-text-input-field-border-radius", "dimension", "8px"], ["ob.component.toggle-button-toggle-button-item-touch-target-size", "dimension", "72px"], ["ob.component.toggle-button-toggle-button-item-visual-size", "dimension", "56px"], ["ob.component.toggle-button-toggle-button-item-label-spacing", "dimension", "12px"], ["ob.component.toggle-button-toggle-button-item-padding-horizontal", "dimension", "8px"], ["ob.component.toggle-button-toggle-button-item-border-radius", "dimension", "8px"], ["ob.component.input-fields-text-input-field-padding-horizontal", "dimension", "12px"], ["ob.component.badge-min-size-large", "dimension", "38px"], ["ob.component.tab-item-touch-target-size", "dimension", "72px"], ["ob.component.tab-item-icon-size", "dimension", "40px"], ["ob.component.tab-item-label-spacing", "dimension", "12px"], ["ob.component.tab-item-padding-horizontal", "dimension", "24px"], ["ob.component.tooltip-icon-size", "dimension", "40px"], ["ob.component.tooltip-size", "dimension", "48px"], ["ob.component.tooltip-label-spacing", "dimension", "12px"], ["ob.component.tooltip-border-radius", "dimension", "6px"], ["ob.component.card-leading-icon-size", "dimension", "16px"], ["ob.component.card-padding", "dimension", "8px"], ["ob.component.card-heading-container-height", "dimension", "32px"], ["ob.component.card-gap", "dimension", "4px"], ["ob.component.input-fields-text-input-field-vertical-spacer", "dimension", "6px"], ["ob.component.tag-icon-size", "dimension", "24px"], ["ob.component.tag-label-spacing", "dimension", "6px"], ["ob.component.tag-padding-horizontal", "dimension", "8px"], ["ob.component.tag-visual-target", "dimension", "32px"], ["ob.component.tag-border-radius", "dimension", "6px"], ["ob.component.tag-visual-target-large", "dimension", "48px"], ["ob.component.tag-padding-horizontal-large", "dimension", "8px"], ["ob.component.tag-icon-size-large", "dimension", "40px"], ["ob.component.tooltip-padding-horizontal", "dimension", "12px"]], "primitiver/storrelse/xl": [["ob.size.touch-target-min", "dimension", "96px"], ["ob.size.visual-target-min", "dimension", "72px"], ["ob.size.icon-size-regular", "dimension", "48px"], ["ob.size.border-weight-focusframe", "dimension", "4px"], ["ob.size.list-item-padding-horizontal", "dimension", "32px"], ["ob.size.list-item-item-spacing", "dimension", "16px"], ["ob.component.button-label-spacing", "dimension", "16px"], ["ob.component.button-stroke-weight", "dimension", "1px"], ["ob.component.toggle-switch-thumb-size", "dimension", "24px"], ["ob.component.toggle-switch-selection-padding", "dimension", "12px"], ["ob.component.toggle-switch-selection-width", "dimension", "96px"], ["ob.component.toggle-switch-item-border-radius", "dimension", "1000px"], ["ob.component.checkbox-visual-target-size", "dimension", "48px"], ["ob.component.checkbox-border-radius", "dimension", "8px"], ["ob.component.checkbox-label-spacing", "dimension", "16px"], ["ob.component.badge-border-radius", "dimension", "4px"], ["ob.component.navigation-item-icon-size", "dimension", "48px"], ["ob.component.navigation-item-label-spacing", "dimension", "16px"], ["ob.component.navigation-item-touch-target-size", "dimension", "96px"], ["ob.component.navigation-item-padding-horizontal", "dimension", "8px"], ["ob.component.toggle-switch-selection-height", "dimension", "48px"], ["ob.component.icon-button-icon-size", "dimension", "48px"], ["ob.component.badge-padding", "dimension", "4px"], ["ob.component.navigation-item-border-radius", "dimension", "12px"], ["ob.component.radio-button-selection-size", "dimension", "48px"], ["ob.component.radio-button-thumb-size", "dimension", "16px"], ["ob.component.button-visual-size", "dimension", "72px"], ["ob.component.button-border-radius", "dimension", "12px"], ["ob.component.card-border-radius-regular", "dimension", "12px"], ["ob.component.button-touch-target-size", "dimension", "96px"], ["ob.component.button-icon-size", "dimension", "48px"], ["ob.component.icon-button-visual-target-size", "dimension", "72px"], ["ob.component.input-fields-text-input-field-visual-size", "dimension", "72px"], ["ob.component.input-fields-text-input-field-border-radius", "dimension", "12px"], ["ob.component.toggle-button-toggle-button-item-touch-target-size", "dimension", "96px"], ["ob.component.toggle-button-toggle-button-item-visual-size", "dimension", "72px"], ["ob.component.toggle-button-toggle-button-item-label-spacing", "dimension", "16px"], ["ob.component.toggle-button-toggle-button-item-padding-horizontal", "dimension", "8px"], ["ob.component.toggle-button-toggle-button-item-border-radius", "dimension", "12px"], ["ob.component.input-fields-text-input-field-padding-horizontal", "dimension", "16px"], ["ob.component.badge-min-size-large", "dimension", "48px"], ["ob.component.tab-item-touch-target-size", "dimension", "96px"], ["ob.component.tab-item-icon-size", "dimension", "48px"], ["ob.component.tab-item-label-spacing", "dimension", "16px"], ["ob.component.tab-item-padding-horizontal", "dimension", "32px"], ["ob.component.tooltip-icon-size", "dimension", "48px"], ["ob.component.tooltip-size", "dimension", "64px"], ["ob.component.tooltip-label-spacing", "dimension", "16px"], ["ob.component.tooltip-border-radius", "dimension", "8px"], ["ob.component.card-leading-icon-size", "dimension", "8px"], ["ob.component.card-padding", "dimension", "8px"], ["ob.component.card-heading-container-height", "dimension", "32px"], ["ob.component.card-gap", "dimension", "4px"], ["ob.component.input-fields-text-input-field-vertical-spacer", "dimension", "8px"], ["ob.component.tag-icon-size", "dimension", "32px"], ["ob.component.tag-label-spacing", "dimension", "8px"], ["ob.component.tag-padding-horizontal", "dimension", "12px"], ["ob.component.tag-visual-target", "dimension", "48px"], ["ob.component.tag-border-radius", "dimension", "8px"], ["ob.component.tag-visual-target-large", "dimension", "64px"], ["ob.component.tag-padding-horizontal-large", "dimension", "12px"], ["ob.component.tag-icon-size-large", "dimension", "48px"], ["ob.component.tooltip-padding-horizontal", "dimension", "16px"]], "primitiver/felles": [["ob.border-radius.2", "borderRadius", "2"], ["ob.border-radius.6", "borderRadius", "6"]]};

// Enkle, generiske ikoner (24×24) tegnet for pluginet. Bytt dem gjerne ut med
// OpenBridge-ikoner i Penpot – komponentene beholder fargekoblingen.
const IKON = {
  pluss: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
  meny: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
  hake: 'M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L21 7.5l-1.4-1.4z',
  strek: 'M6 11h12v2H6z',
  utrop: 'M11 5h2v9h-2zm0 11h2v2h-2z',
  info: 'M11 10h2v8h-2zm0-4h2v2h-2z',
  hjem: 'M12 4 3 11h2v8h5v-5h4v5h5v-8h2z',
  merkelapp: 'M3 5v6l9 9 7-7-9-9H4zm4 1.5A1.5 1.5 0 1 1 7 9.5a1.5 1.5 0 0 1 0-3z',
  pil: 'M0 0h12L6 6z',
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
  const komponentMangler = KOMPONENT_TOKENS.filter(([n]) => !kart.has(n)).length + manglendePrimitiver().length;
  return {
    ok: true,
    komponentMangler,
    melding: komponentMangler ? `Klar. ${komponentMangler} tokens blir lagt til automatisk.` : 'Klar.',
  };
}

/** Primitiver som komponent-tokenene trenger, men som mangler i sine sett. */
function manglendePrimitiver() {
  const katalog = penpot.library.local.tokens;
  const ut = [];
  for (const [settNavn, rader] of Object.entries(PRIMITIV_TILLEGG)) {
    const sett = katalog.sets.find((s) => s.name === settNavn);
    if (!sett) continue;
    const finnes = new Set(sett.tokens.map((t) => t.name));
    for (const rad of rader) if (!finnes.has(rad[0])) ut.push([sett, ...rad]);
  }
  return ut;
}

function leggTilToken(sett, name, type, value) {
  try {
    if (sett.addToken({ type, name, value })) return true;
  } catch (e) {
    logg(`Kunne ikke lage ${name}: ${String(e?.message ?? e).slice(0, 120)}`, 'feil');
    return false;
  }
  logg(`Kunne ikke lage token ${name}`, 'feil');
  return false;
}

/** Fyller inn manglende primitiver og komponent-tokens, og slår settet på. */
async function sikreKomponentTokens() {
  const katalog = penpot.library.local.tokens;

  // 1. Primitiver først, ellers kan ikke komponent-tokenene peke til dem
  let prim = 0;
  for (const [sett, name, type, value] of manglendePrimitiver()) if (leggTilToken(sett, name, type, value)) prim++;
  if (prim) {
    logg(`La til ${prim} manglende primitiver`);
    await vent(300);
  }

  // 2. Komponent-tokens
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
    if (!finnes.has(name) && leggTilToken(sett, name, type, value)) lagt++;
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

// ------------------------------------------------------------------ runde 3
const TAG_FARGER = [
  ['gray', 'Grå'], ['blue', 'Blå'], ['cyan', 'Cyan'], ['teal', 'Blågrønn'], ['green', 'Grønn'],
  ['yellow', 'Gul'], ['orange', 'Oransje'], ['red', 'Rød'], ['purple', 'Lilla'], ['indigo', 'Indigo'],
];
// OpenBridge badge-typer → [navn, bakgrunn, kant, tekst]
const TELLER_TYPER = [
  ['regular', 'Vanlig', 'color.control.normal.enabled-background', 'color.control.normal.enabled-border', 'color.control.normal.on-neutral'],
  ['critical', 'Kritisk', 'color.control.critical.enabled-background', 'color.control.critical.enabled-border', 'color.on.critical'],
  ['alarm', 'Alarm', 'color.alert.alarm', 'color.alert.alarm-outline', 'color.on.alarm'],
  ['warning', 'Advarsel', 'color.alert.warning', 'color.alert.warning-outline', 'color.on.warning'],
  ['caution', 'Forsiktighet', 'color.alert.caution', 'color.alert.caution-outline', 'color.on.caution'],
  ['diagnostic', 'Diagnostikk', 'color.control.notification.enabled-background', 'color.control.notification.enabled-border', 'color.control.notification.on-active'],
  ['running', 'Kjører', 'color.alert.running', 'color.alert.running', 'color.on.running'],
  // Avvik: OpenBridge bruker on-selected-active, som har samme farge som bakgrunnen i natt-paletten
  ['notification', 'Varsel', 'color.instrument.enhanced-primary', 'color.instrument.enhanced-primary', 'color.neutral.background-default'],
];
// OpenBridge status-indicator → [navn, fyll, kant]
const STATUS_TYPER = [
  ['active', 'Aktiv', 'color.status.active.fill', 'color.status.active.border'],
  ['inactive', 'Inaktiv', 'color.neutral.text-disabled', 'color.neutral.text-placeholder'],
  ['running', 'Kjører', 'color.alert.running', 'color.alert.running-outline'],
  ['caution', 'Forsiktighet', 'color.alert.caution', 'color.alert.caution-outline'],
  ['warning', 'Advarsel', 'color.alert.warning', 'color.alert.warning-outline'],
  ['alarm', 'Alarm', 'color.alert.alarm', 'color.alert.alarm-outline'],
];
// OpenBridge tooltip-typer → [navn, bakgrunn, tekst, ikon]
const TIPS_TYPER = [
  ['normal', 'Normal', 'color.neutral.background-default', 'color.control.normal.on-active', 'color.control.normal.on-neutral'],
  ['raised', 'Raised', 'color.control.raised.enabled-background', 'color.control.raised.on-active', 'color.control.raised.on-neutral'],
  // Avvik: OpenBridge sin on-selected-active gir 1,4:1 kontrast her i natt-paletten
  ['enhanced', 'Forsterket', 'color.instrument.enhanced-secondary', 'color.neutral.background-default', 'color.neutral.background-default'],
  ['caution', 'Forsiktighet', 'color.alert.caution', 'color.on.caution', 'color.on.caution'],
  ['warning', 'Advarsel', 'color.alert.warning', 'color.on.warning', 'color.on.warning'],
  ['alarm', 'Alarm', 'color.alert.alarm', 'color.on.alarm', 'color.on.alarm'],
];
const VALGT = [['nei', 'Nei'], ['ja', 'Ja']];

Object.assign(KOMPONENTER, {
  tag: {
    navn: 'Tag',
    egenskaper: ['Farge', 'Størrelse', 'Ikon'],
    kombinasjoner() {
      const ut = [];
      let rad = 0;
      for (const [str, strNavn] of [['regular', 'Regular'], ['large', 'Large']]) {
        for (const [ik, ikNavn] of [['nei', 'Uten'], ['ja', 'Med']]) {
          TAG_FARGER.forEach(([f, fNavn], kol) => {
            ut.push({ verdier: [fNavn, strNavn, ikNavn], rad, kol, bygg: (V) => byggTag(V, f, str === 'large', ik === 'ja') });
          });
          rad++;
        }
      }
      return ut;
    },
    kolonne: 110,
    radhoyde: 56,
  },
  teller: {
    navn: 'Teller',
    egenskaper: ['Type', 'Størrelse'],
    kombinasjoner() {
      const ut = [];
      [['regular', 'Regular'], ['large', 'Large']].forEach(([str, strNavn], rad) => {
        TELLER_TYPER.forEach(([type, tNavn], kol) => {
          ut.push({ verdier: [tNavn, strNavn], rad, kol, bygg: (V) => byggTeller(V, type, str === 'large') });
        });
      });
      return ut;
    },
    kolonne: 70,
    radhoyde: 56,
  },
  statusindikator: {
    navn: 'Statusindikator',
    egenskaper: ['Status'],
    kombinasjoner() {
      return STATUS_TYPER.map(([type, navn], kol) => ({ verdier: [navn], rad: 0, kol, bygg: (V) => byggStatus(V, type) }));
    },
    kolonne: 160,
  },
  verktoytips: {
    navn: 'Verktøytips',
    egenskaper: ['Type', 'Innhold'],
    kombinasjoner() {
      const ut = [];
      [['tekst', 'Tekst'], ['ikon', 'Ikon og tekst']].forEach(([inn, innNavn], rad) => {
        TIPS_TYPER.forEach(([type, tNavn], kol) => {
          ut.push({ verdier: [tNavn, innNavn], rad, kol, bygg: (V) => byggTips(V, type, inn === 'ikon') });
        });
      });
      return ut;
    },
    kolonne: 180,
    radhoyde: 72,
  },
  fane: {
    navn: 'Fane',
    egenskaper: ['Valgt', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      VALGT.forEach(([v, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggFane(V, v === 'ja', t) });
        });
      });
      return ut;
    },
    kolonne: 200,
    radhoyde: 72,
  },
  segment: {
    navn: 'Segmentvalg',
    egenskaper: ['Valgt', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      VALGT.forEach(([v, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggSegment(V, v === 'ja', t) });
        });
      });
      return ut;
    },
    kolonne: 140,
  },
  navigasjon: {
    navn: 'Navigasjonselement',
    egenskaper: ['Valgt', 'Tilstand'],
    kombinasjoner() {
      const ut = [];
      VALGT.forEach(([v, vNavn], rad) => {
        KONTROLL_TILSTANDER.forEach((t, kol) => {
          ut.push({ verdier: [vNavn, TILSTAND[t]], rad, kol, bygg: (V) => byggNavigasjon(V, v === 'ja', t) });
        });
      });
      return ut;
    },
    kolonne: 280,
  },
  kort: {
    navn: 'Kort',
    egenskaper: ['Tittel'],
    kombinasjoner() {
      return [['ja', 'Med'], ['nei', 'Uten']].map(([t, tNavn], kol) => ({ verdier: [tNavn], rad: 0, kol, bygg: (V) => byggKort(V, t === 'ja') }));
    },
    kolonne: 360,
  },
});

function byggTag(V, farge, stor, medIkon) {
  const C = farge === 'gray' ? null : `color.tag.${farge}`;
  const tekstFarge = C ? `${C}.text` : 'color.control.indent.on-active';
  const tag = V.boks('Tag', { b: 64, h: 24, sizingV: 'fix' });
  V.bind(tag, stor ? 'tag.height-large' : 'tag.height', ['height']);
  V.bind(tag, stor ? 'tag.padding-inline-large' : 'tag.padding-inline', ['paddingLeft', 'paddingRight']);
  V.bind(tag, 'tag.gap', ['columnGap']);
  V.flate(tag, {
    fyll: C ? `${C}.background` : 'color.control.indent.enabled-background',
    kant: C ? `${C}.border` : 'color.control.indent.enabled-border',
    kantbredde: 'border-width.default',
    radius: 'tag.border-radius',
  });
  if (medIkon) V.leggTil(tag, V.ikon('Ikon', IKON.merkelapp, stor ? 'tag.icon-size-large' : 'tag.icon-size', C ? `${C}.icon` : 'color.control.indent.on-neutral'));
  const t = V.tekst('Tag', stor ? 'typography.ui.body' : 'typography.ui.label', tekstFarge, 'Etikett');
  if (t) V.leggTil(tag, t);
  return tag;
}

function byggTeller(V, type, stor) {
  const [, , fyll, kant, tekst] = TELLER_TYPER.find(([t]) => t === type);
  const teller = V.boks('Teller', { b: 20, h: 20 });
  V.bind(teller, 'badge.padding', ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']);
  if (stor) V.bind(teller, 'badge.min-size-large', ['height']);
  V.flate(teller, { fyll, kant, kantbredde: 'border-width.default', radius: 'badge.border-radius' });
  const t = V.tekst('3', stor ? 'typography.ui.body-active' : 'typography.ui.label-active', tekst, 'Antall');
  if (t) V.leggTil(teller, t);
  return teller;
}

function byggStatus(V, type) {
  const [, navn, fyll, kant] = STATUS_TYPER.find(([t]) => t === type);
  const status = V.boks('Statusindikator', { b: 120, h: 48, sizingV: 'fix', justify: 'start' });
  V.bind(status, 'status.height', ['height']);
  V.bind(status, 'status.padding', ['paddingLeft', 'paddingRight']);
  V.bind(status, 'status.gap', ['columnGap']);
  const ramme = V.boks('Indikator', { b: 24, h: 24, sizingH: 'fix', sizingV: 'fix' });
  const lampe = V.boks('Lampe', { b: 16, h: 8, sizingH: 'fix', sizingV: 'fix', layout: false });
  V.bind(lampe, 'status.indicator-width', ['width']);
  V.bind(lampe, 'status.indicator-height', ['height']);
  V.flate(lampe, { fyll, kant, kantbredde: 'border-width.default', radius: 'status.indicator-radius' });
  V.leggTil(ramme, lampe);
  V.leggTil(status, ramme);
  const inaktiv = type === 'inactive';
  const t = V.tekst(navn, inaktiv ? 'typography.ui.body' : 'typography.ui.button', inaktiv ? 'color.neutral.text-subtle' : 'color.neutral.text-default', 'Etikett');
  if (t) V.leggTil(status, t);
  return status;
}

function byggTips(V, type, medIkon) {
  const [, , fyll, tekst, ikonFarge] = TIPS_TYPER.find(([t]) => t === type);
  const tips = V.boks('Verktøytips', { dir: 'column', b: 120, h: 40 });
  const boble = V.boks('Boble', { b: 120, h: 32, sizingV: 'fix' });
  V.bind(boble, 'tooltip.height', ['height']);
  V.bind(boble, 'tooltip.padding-inline', ['paddingLeft', 'paddingRight']);
  V.flate(boble, { fyll, radius: 'tooltip.border-radius' });
  if (medIkon) V.leggTil(boble, V.ikon('Ikon', IKON.info, 'tooltip.icon-size', ikonFarge));
  const etikett = V.boks('Etikett', { b: 40, h: 24 });
  V.bind(etikett, 'tooltip.label-padding', ['paddingLeft', 'paddingRight']);
  const t = V.tekst('Hjelpetekst', 'typography.ui.button', tekst);
  if (t) V.leggTil(etikett, t);
  V.leggTil(boble, etikett);
  V.leggTil(tips, boble);
  // Pil under boblen (OpenBridge .bottom-arrow, 12 × 6)
  const pil = penpot.createShapeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path d="' + IKON.pil + '" fill="#000000"/></svg>');
  if (pil) {
    pil.name = 'Pil';
    V.leggTil(tips, pil);
    for (const s of pil.children?.length ? pil.children : [pil]) V.bind(s, fyll, ['fill']);
  }
  return tips;
}

function byggFane(V, valgt, t) {
  const deaktivert = t === 'disabled';
  const fane = V.boks('Fane', { b: 160, h: 48, sizingV: 'fix' });
  V.bind(fane, 'tab.height', ['height']);
  V.bind(fane, 'tab.padding-inline', ['paddingLeft', 'paddingRight']);
  V.bind(fane, 'tab.gap', ['columnGap']);
  // OpenBridge: valgt fane får container-global-flate og skillelinjer
  if (valgt && !deaktivert && t !== 'focused') {
    V.flate(fane, { fyll: 'color.neutral.surface-default', kant: 'color.neutral.border-subtle', kantbredde: 'border-width.default' });
  } else {
    V.flate(fane, { fyll: `color.control.flat.${t}-background`, kant: `color.control.flat.${t}-border`, fokus: t === 'focused' });
  }
  V.leggTil(fane, V.ikon('Ikon', IKON.meny, 'tab.icon-size', deaktivert ? 'color.control.flat.on-disabled' : 'color.control.flat.on-neutral'));
  const tx = V.tekst('Fane', valgt ? 'typography.ui.body-active' : 'typography.ui.body', deaktivert ? 'color.control.flat.on-disabled' : 'color.control.flat.on-active', 'Tittel');
  if (tx) V.leggTil(fane, tx);
  return fane;
}

function byggSegment(V, valgt, t) {
  const S = `color.control.${valgt ? 'selected' : 'flat'}`;
  const deaktivert = t === 'disabled';
  const wrapper = V.boks('Segmentvalg', { b: 96, h: 48, sizingV: 'fix' });
  V.bind(wrapper, 'segment.height', ['height']);
  const flate = V.boks('Flate', { b: 80, h: 32, sizingV: 'fix' });
  V.bind(flate, 'segment.visual-height', ['height']);
  V.bind(flate, 'segment.padding-inline', ['paddingLeft', 'paddingRight']);
  V.flate(flate, { fyll: `${S}.${t}-background`, kant: `${S}.${t}-border`, radius: 'segment.border-radius', fokus: t === 'focused' });
  const etikett = V.boks('Etikett', { b: 40, h: 24 });
  V.bind(etikett, 'segment.label-padding', ['paddingLeft', 'paddingRight']);
  const tx = V.tekst('Valg', valgt ? 'typography.ui.body-active' : 'typography.ui.body', `${S}.${deaktivert ? 'on-disabled' : 'on-active'}`);
  if (tx) V.leggTil(etikett, tx);
  V.leggTil(flate, etikett);
  V.leggTil(wrapper, flate);
  return wrapper;
}

function byggNavigasjon(V, valgt, t) {
  // OpenBridge: vanlig = flat, valgt (checked) = amplified
  const S = `color.control.${valgt ? 'amplified' : 'flat'}`;
  const deaktivert = t === 'disabled';
  const element = V.boks('Navigasjonselement', { b: 240, h: 48, sizingH: 'fix', sizingV: 'fix', justify: 'start' });
  V.bind(element, 'nav.height', ['height']);
  V.bind(element, 'nav.padding-inline', ['paddingLeft', 'paddingRight']);
  V.bind(element, 'nav.gap', ['columnGap']);
  V.flate(element, { fyll: `${S}.${t}-background`, kant: `${S}.${t}-border`, radius: 'nav.border-radius', fokus: t === 'focused' });
  V.leggTil(element, V.ikon('Ikon', IKON.hjem, 'nav.icon-size', `${S}.${deaktivert ? 'on-disabled' : 'on-neutral'}`));
  const tx = V.tekst('Oversikt', 'typography.ui.body', `${S}.${deaktivert ? 'on-disabled' : 'on-active'}`, 'Etikett');
  if (tx) V.leggTil(element, tx);
  return element;
}

function byggKort(V, medTittel) {
  const kort = V.boks('Kort', { dir: 'column', b: 320, h: 160, sizingH: 'fix', align: 'start', justify: 'start' });
  V.bind(kort, 'card.padding', ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']);
  V.bind(kort, 'card.gap', ['rowGap']);
  V.flate(kort, { fyll: 'color.neutral.background-default', kant: 'color.neutral.border-default', kantbredde: 'border-width.default', radius: 'card.border-radius' });
  if (medTittel) {
    const topp = V.boks('Tittel', { b: 200, h: 32, sizingV: 'fix', justify: 'start' });
    V.bind(topp, 'card.heading-height', ['height']);
    V.bind(topp, 'card.gap', ['columnGap']);
    V.leggTil(topp, V.ikon('Ikon', IKON.info, 'card.icon-size', 'color.neutral.text-subtle'));
    const tx = V.tekst('TITTEL', 'typography.ui.overline', 'color.neutral.text-subtle');
    if (tx) V.leggTil(topp, tx);
    V.leggTil(kort, topp);
  }
  const innhold = V.boks('Innhold', { b: 300, h: 96, sizingH: 'fix', sizingV: 'fix' });
  const tx = V.tekst('Innhold', 'typography.ui.body', 'color.neutral.text-subtle', 'Plassholder');
  if (tx) V.leggTil(innhold, tx);
  V.leggTil(kort, innhold);
  V.fyllBredde(innhold);
  return kort;
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
