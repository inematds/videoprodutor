// Ícones/diagramas SVG por regra (fallback vetorial) — COM MOVIMENTO RICO (animação própria por ícone).
// SVG_ICONS: markup (ids prefixados pela regra, únicos no doc). SVG_ANIM[key](t,dur): linhas GSAP.
// Strokes que "desenham" usam stroke-dasharray/offset (sem plugin pago). Escalas usam svgOrigin (coords do viewBox).
const A = "#FFC300", A2 = "#FCA311", T = "#2EC4B6", N = "#16263f", L = "#FFE39A";

export const SVG_ICONS = {
  hook: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <rect id="hook-b1" x="70" y="120" width="26" height="56" rx="5" fill="${A2}"/>
    <rect id="hook-b2" x="106" y="96" width="26" height="80" rx="5" fill="${T}"/>
    <rect id="hook-b3" x="142" y="68" width="26" height="108" rx="5" fill="${A}"/>
    <path id="hook-arrow" d="M58 132 L120 90 L182 52" stroke="${A}" stroke-width="11" fill="none" stroke-linecap="round" stroke-dasharray="260" stroke-dashoffset="260"/>
    <polygon id="hook-head" points="160,44 192,48 176,78" fill="${A}"/></svg>`,

  r01: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <rect id="r01-big" x="150" y="34" width="44" height="142" rx="7" fill="${A}"/>
    <rect id="r01-s1" x="54" y="120" width="32" height="56" rx="6" fill="${T}"/>
    <rect id="r01-s2" x="98" y="138" width="32" height="38" rx="6" fill="${A2}"/></svg>`,

  r02: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <g id="r02-mega"><polygon points="48,92 120,66 120,134 48,108" fill="${A}"/>
    <rect x="120" y="74" width="34" height="52" rx="7" fill="${A2}"/></g>
    <path id="r02-w1" d="M168 78 A34 34 0 0 1 168 122" stroke="${T}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path id="r02-w2" d="M184 62 A54 54 0 0 1 184 138" stroke="${T}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`,

  r03: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <g id="r03-box"><rect x="80" y="98" width="86" height="70" rx="7" fill="${A2}"/>
    <rect x="72" y="80" width="102" height="26" rx="7" fill="${A}"/>
    <rect x="116" y="80" width="14" height="88" fill="${T}"/></g>
    <g id="r03-coin"><circle cx="123" cy="52" r="22" fill="${A}"/><circle cx="123" cy="52" r="13" fill="${N}"/></g></svg>`,

  r04: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <rect id="r04-b1" x="62" y="120" width="24" height="56" rx="4" fill="${A2}"/>
    <rect id="r04-b2" x="94" y="98" width="24" height="78" rx="4" fill="${T}"/>
    <rect id="r04-b3" x="126" y="74" width="24" height="102" rx="4" fill="${A}"/>
    <circle id="r04-badge" cx="172" cy="60" r="28" fill="${A}"/>
    <path id="r04-check" d="M159 60 l9 10 18 -20" stroke="${N}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="60" stroke-dashoffset="60"/></svg>`,

  r05: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <path id="r05-arrow" d="M54 156 L120 104 L182 50" stroke="${A}" stroke-width="13" fill="none" stroke-linecap="round" stroke-dasharray="260" stroke-dashoffset="260"/>
    <polygon id="r05-head" points="158,42 192,48 172,80" fill="${A}"/>
    <g id="r05-tag"><rect x="92" y="120" width="34" height="50" rx="7" fill="${T}"/><circle cx="109" cy="134" r="5" fill="${N}"/></g></svg>`,

  r06: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <polygon id="r06-funnel" points="64,56 176,56 138,108 138,150 102,168 102,108" fill="${A}"/>
    <circle id="r06-drop" cx="120" cy="176" r="9" fill="${T}"/></svg>`,

  r07: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <g id="r07-b1"><rect x="50" y="58" width="100" height="64" rx="16" fill="${A}"/>
    <polygon points="74,118 74,148 102,118" fill="${A}"/>
    <circle id="r07-d1" cx="80" cy="90" r="6" fill="${N}"/><circle id="r07-d2" cx="100" cy="90" r="6" fill="${N}"/><circle id="r07-d3" cx="120" cy="90" r="6" fill="${N}"/></g>
    <g id="r07-b2"><rect x="132" y="100" width="78" height="54" rx="14" fill="${T}"/>
    <polygon points="188,150 188,176 166,150" fill="${T}"/></g></svg>`,

  r08: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M56 152 A66 66 0 0 1 184 152" stroke="${N}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path id="r08-arc" d="M56 152 A66 66 0 0 1 120 86" stroke="${A}" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="150" stroke-dashoffset="150"/>
    <line id="r08-needle" x1="120" y1="152" x2="162" y2="110" stroke="${T}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="120" cy="152" r="11" fill="${A}"/></svg>`,

  r09: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <g id="r09-rocket"><path d="M120 36 C152 68 152 112 136 144 L104 144 C88 112 88 68 120 36 Z" fill="${A}"/>
    <circle cx="120" cy="86" r="13" fill="${N}"/>
    <polygon points="104,132 82,156 104,150" fill="${T}"/>
    <polygon points="136,132 158,156 136,150" fill="${T}"/></g>
    <polygon id="r09-flame" points="110,150 130,150 120,182" fill="${A2}"/></svg>`,

  r10: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <circle id="r10-r1" cx="116" cy="104" r="66" fill="${A2}"/>
    <circle id="r10-r2" cx="116" cy="104" r="47" fill="${N}"/>
    <circle id="r10-r3" cx="116" cy="104" r="29" fill="${A}"/>
    <circle id="r10-rc" cx="116" cy="104" r="11" fill="${L}"/>
    <g id="r10-arrow"><line x1="184" y1="44" x2="122" y2="100" stroke="${T}" stroke-width="9" stroke-linecap="round"/>
    <polygon points="114,108 136,100 122,86" fill="${T}"/></g></svg>`,

  r11: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <polygon id="r11-m1" points="48,166 104,78 148,166" fill="${A2}"/>
    <polygon id="r11-m2" points="116,166 168,90 206,166" fill="${A}"/>
    <g id="r11-flag"><rect x="103" y="50" width="5" height="34" fill="${T}"/>
    <polygon points="108,52 140,62 108,74" fill="${T}"/></g></svg>`,

  r12: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <path id="r12-arc" d="M158 70 A48 48 0 1 1 100 60" stroke="${A}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="300" stroke-dashoffset="300"/>
    <polygon id="r12-head" points="158,50 158,90 186,70" fill="${A}"/>
    <polygon id="r12-star" points="120,82 130,106 156,106 135,121 143,146 120,131 97,146 105,121 84,106 110,106" fill="${A2}"/></svg>`,
};

// repeat finito que cobre a cena (loops de "vida")
const rep = (dur, period) => Math.max(1, Math.ceil(dur / period));

export const SVG_ANIM = {
  hook: (t, d) => [
    `tl.from(["#hook-b1","#hook-b2","#hook-b3"],{scaleY:0,duration:.5,stagger:.12,ease:"power3.out",svgOrigin:"0 176"},${t + 0.4});`,
    `tl.to("#hook-arrow",{strokeDashoffset:0,duration:.7,ease:"power2.out"},${t + 1.0});`,
    `tl.from("#hook-head",{scale:0,opacity:0,duration:.4,ease:"back.out(2)",svgOrigin:"176 60"},${t + 1.55});`,
  ].join("\n      "),
  r01: (t, d) => [
    `tl.from("#r01-big",{scaleY:0,duration:.6,ease:"power3.out",svgOrigin:"0 176"},${t + 0.4});`,
    `tl.from(["#r01-s1","#r01-s2"],{scaleY:0,duration:.5,stagger:.12,ease:"power2.out",svgOrigin:"0 176"},${t + 0.7});`,
    `tl.to("#r01-big",{y:-8,duration:1.1,yoyo:true,repeat:${rep(d, 1.1)},ease:"sine.inOut"},${t + 1.3});`,
  ].join("\n      "),
  r02: (t, d) => [
    `tl.from("#r02-mega",{scale:0,opacity:0,duration:.55,ease:"back.out(1.6)",svgOrigin:"100 100"},${t + 0.4});`,
    `tl.to("#r02-mega",{rotation:-5,duration:.5,yoyo:true,repeat:${rep(d, 0.5)},ease:"sine.inOut",svgOrigin:"60 100"},${t + 1.0});`,
    `tl.fromTo(["#r02-w1","#r02-w2"],{opacity:0},{opacity:1,duration:.5,stagger:.18,yoyo:true,repeat:${rep(d, 0.9)},ease:"sine.inOut"},${t + 1.0});`,
  ].join("\n      "),
  r03: (t, d) => [
    `tl.from("#r03-box",{scale:0,opacity:0,duration:.55,ease:"back.out(1.6)",svgOrigin:"123 130"},${t + 0.4});`,
    `tl.from("#r03-coin",{y:30,opacity:0,duration:.5,ease:"power3.out"},${t + 0.95});`,
    `tl.to("#r03-coin",{y:-10,duration:1,yoyo:true,repeat:${rep(d, 1)},ease:"sine.inOut"},${t + 1.5});`,
  ].join("\n      "),
  r04: (t, d) => [
    `tl.from(["#r04-b1","#r04-b2","#r04-b3"],{scaleY:0,duration:.5,stagger:.12,ease:"power3.out",svgOrigin:"0 176"},${t + 0.4});`,
    `tl.from("#r04-badge",{scale:0,duration:.45,ease:"back.out(2)",svgOrigin:"172 60"},${t + 1.1});`,
    `tl.to("#r04-check",{strokeDashoffset:0,duration:.4,ease:"power2.out"},${t + 1.5});`,
  ].join("\n      "),
  r05: (t, d) => [
    `tl.to("#r05-arrow",{strokeDashoffset:0,duration:.8,ease:"power2.out"},${t + 0.45});`,
    `tl.from("#r05-head",{scale:0,opacity:0,duration:.4,ease:"back.out(2)",svgOrigin:"176 60"},${t + 1.15});`,
    `tl.from("#r05-tag",{y:24,opacity:0,duration:.5,ease:"back.out(1.5)"},${t + 0.9});`,
    `tl.to("#r05-tag",{y:-8,duration:1,yoyo:true,repeat:${rep(d, 1)},ease:"sine.inOut"},${t + 1.5});`,
  ].join("\n      "),
  r06: (t, d) => [
    `tl.from("#r06-funnel",{scale:0,opacity:0,duration:.55,ease:"back.out(1.5)",svgOrigin:"120 56"},${t + 0.4});`,
    `tl.fromTo("#r06-drop",{y:-26,opacity:0},{y:0,opacity:1,duration:.6,repeat:${rep(d, 1.2)},ease:"power1.in"},${t + 1.0});`,
  ].join("\n      "),
  r07: (t, d) => [
    `tl.from("#r07-b1",{scale:0,opacity:0,duration:.5,ease:"back.out(1.6)",svgOrigin:"100 90"},${t + 0.4});`,
    `tl.from("#r07-b2",{scale:0,opacity:0,duration:.5,ease:"back.out(1.6)",svgOrigin:"170 126"},${t + 0.75});`,
    `tl.fromTo(["#r07-d1","#r07-d2","#r07-d3"],{opacity:.2},{opacity:1,duration:.35,stagger:.18,yoyo:true,repeat:${rep(d, 1)},ease:"sine.inOut"},${t + 1.2});`,
  ].join("\n      "),
  r08: (t, d) => [
    `tl.to("#r08-arc",{strokeDashoffset:0,duration:.7,ease:"power2.out"},${t + 0.4});`,
    `tl.from("#r08-needle",{rotation:-72,duration:.9,ease:"back.out(1.3)",svgOrigin:"120 152"},${t + 0.6});`,
    `tl.to("#r08-needle",{rotation:6,duration:.8,yoyo:true,repeat:${rep(d, 0.8)},ease:"sine.inOut",svgOrigin:"120 152"},${t + 1.6});`,
  ].join("\n      "),
  r09: (t, d) => [
    `tl.from("#r09-rocket",{y:40,opacity:0,duration:.6,ease:"power3.out"},${t + 0.4});`,
    `tl.to("#r09-rocket",{y:-12,duration:1.2,yoyo:true,repeat:${rep(d, 1.2)},ease:"sine.inOut"},${t + 1.1});`,
    `tl.to("#r09-flame",{scaleY:.55,opacity:.7,duration:.18,yoyo:true,repeat:${rep(d, 0.18)},ease:"sine.inOut",svgOrigin:"120 150"},${t + 1.1});`,
  ].join("\n      "),
  r10: (t, d) => [
    `tl.from(["#r10-rc","#r10-r3","#r10-r2","#r10-r1"],{scale:0,opacity:0,duration:.5,stagger:.09,ease:"back.out(1.7)",svgOrigin:"116 104"},${t + 0.4});`,
    `tl.from("#r10-arrow",{x:120,y:-120,opacity:0,duration:.55,ease:"power3.in"},${t + 1.15});`,
    `tl.fromTo("#r10-rc",{scale:1},{scale:1.25,duration:.6,yoyo:true,repeat:${rep(d, 0.6)},ease:"sine.inOut",svgOrigin:"116 104"},${t + 1.8});`,
  ].join("\n      "),
  r11: (t, d) => [
    `tl.from(["#r11-m1","#r11-m2"],{scaleY:0,duration:.6,stagger:.14,ease:"power3.out",svgOrigin:"0 166"},${t + 0.4});`,
    `tl.from("#r11-flag",{scale:0,opacity:0,duration:.45,ease:"back.out(2)",svgOrigin:"105 84"},${t + 1.1});`,
    `tl.to("#r11-flag",{rotation:-6,duration:.7,yoyo:true,repeat:${rep(d, 0.7)},ease:"sine.inOut",svgOrigin:"105 60"},${t + 1.6});`,
  ].join("\n      "),
  r12: (t, d) => [
    `tl.to("#r12-arc",{strokeDashoffset:0,duration:.9,ease:"power2.out"},${t + 0.4});`,
    `tl.from("#r12-head",{scale:0,opacity:0,duration:.4,ease:"back.out(2)",svgOrigin:"168 70"},${t + 1.2});`,
    `tl.from("#r12-star",{scale:0,rotation:-40,duration:.6,ease:"back.out(1.6)",svgOrigin:"120 116"},${t + 0.8});`,
    `tl.to("#r12-star",{scale:1.12,duration:.7,yoyo:true,repeat:${rep(d, 0.7)},ease:"sine.inOut",svgOrigin:"120 116"},${t + 1.6});`,
  ].join("\n      "),
};
