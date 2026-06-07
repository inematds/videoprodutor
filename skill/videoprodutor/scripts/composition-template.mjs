// ============================================================================
// 12 Regras do Hormozi — gerador HyperFrames v2 (3 CAMADAS).
//   Camada 1: fundo ILUSTRADO (flux2-klein) + véu + parallax/ken-burns
//   Camada 2: texto cinético (número + título + barra + essência)
//   Camada 3: ilustração de tópico — chip de dado (count-up / valor)
// 15 cenas: hook + 12 cards + fecho + CTA INEMA.CLUB (fecho/CTA sem imagem).
// Uso: node build-index.mjs (16:9) | node build-index.mjs --vertical (9:16).
// ============================================================================
import { writeFileSync, readFileSync } from "node:fs";
import { SVG_ICONS, SVG_ANIM } from "./svg-icons.mjs";

const FONT_CSS = readFileSync(new URL("./assets/fonts/fonts.css", import.meta.url), "utf8")
  .replace(/\.\/fonts\//g, "assets/fonts/");

const VERT = process.argv.includes("--vertical");
let NOIMG = process.argv.includes("--noimg");   // camada 1 OFF (fundo glow / sem arte)
let SVG = process.argv.includes("--svg");        // camada 1 = ícone SVG por regra (fallback vetorial)
const FORCE_IMG = process.argv.includes("--img");// força imagem (pula auto)

// AUTO: PADRÃO = imagem (flux2-klein); se o servidor de imagem estiver fora do ar → fallback SVG.
if (!NOIMG && !SVG && !FORCE_IMG) {
  const up = await probeImg();
  if (up) { console.log("[auto] servidor de imagem OK → camada 1 = imagem"); }
  else { SVG = true; console.log("[auto] servidor de imagem fora do ar → fallback SVG"); }
}
async function probeImg() {
  const url = (process.env.INEMAIMG_URL || "http://localhost:8000") + "/health";
  try { const c = new AbortController(); const id = setTimeout(() => c.abort(), 2500);
    const r = await fetch(url, { signal: c.signal }); clearTimeout(id); return r.ok;
  } catch { return false; }
}
const W = VERT ? 1080 : 1920;
const H = VERT ? 1920 : 1080;
const OUT = "index.html";

const AUDIO = [6.805333, 6.997333, 5.248, 6.464, 6.528, 5.568, 5.226667, 5.184, 6.101333, 5.930667, 4.821333, 5.632, 6.336, 5.205333, 3.84];
const LEAD = 0.5, TAIL = 0.9, FADE = 0.45;

let t = 0;
const S = AUDIO.map((a, i) => {
  const dur = LEAD + a + TAIL;
  const o = { i: i + 1, start: round(t), dur: round(dur), audioStart: round(t + LEAD), audioDur: round(a), end: round(t + dur) };
  t += dur; return o;
});
const TOTAL = round(t);
function round(n) { return Math.round(n * 1000) / 1000; }

const TIPS = [
  { t: "Oferta âncora",        e: "Tenha algo caríssimo à venda — faz o pacote principal parecer barato." },
  { t: "Anuncie mais",         e: "O problema não é o produto. É que ninguém sabe que você existe." },
  { t: "Comece de graça",      e: "Entregue o primeiro resultado sem cobrar. Derruba a barreira e gera prova." },
  { t: "Prova vence promessa", e: "Não diga que é o melhor. Mostre números, prints, antes e depois." },
  { t: "Suba os preços",       e: "Menos clientes, cada um vale mais — e quase sempre, mais receita." },
  { t: "Vendas + marketing",   e: "Um funil só: o marketing traz o lead, a venda fecha." },
  { t: "Fale com clientes",    e: "Eles dizem o que querem comprar — e por que cancelam." },
  { t: "Foco em marketing",    e: "Até R$500 mil/mês não é hora de processo. É hora de vender." },
  { t: "10× no que funciona",  e: "Antes de tentar algo novo, multiplique o que já converte." },
  { t: "Foco radical",         e: "Abaixo de R$1M/ano: um canal, um avatar, um produto." },
  { t: "Enfrente o difícil",   e: "O trabalho que você evita é o que te mantém estagnado." },
  { t: "Lembrar vence ensinar",e: "Você já sabe o que fazer. Revise até virar hábito." },
];

// Camada 3 — chip por regra (números ILUSTRATIVOS/figurativos). to => count-up; val => estático.
const CHIPS = [
  { lbl: "Percepção",    to: 3,   unit: "×" },
  { lbl: "Alcance",      to: 10,  unit: "×" },
  { lbl: "Custo inicial",val: "R$0" },
  { lbl: "Confiança",    to: 100, unit: "%" },
  { lbl: "Receita",      to: 37,  unit: "%" },
  { lbl: "Funil",        val: "1", unit: " só" },
  { lbl: "Respostas",    to: 120, unit: "+" },
  { lbl: "Foco até",     val: "R$500", unit: "k" },
  { lbl: "Multiplique",  to: 10,  unit: "×" },
  { lbl: "Foco",         val: "1·1·1" },
  { lbl: "Crescimento",  to: 100, unit: "%" },
  { lbl: "Revisão",      val: "7", unit: " dias" },
];

const CAPTIONS = [
  "12 regras de quem construiu negócios de 9 dígitos",
  "Regra 01 — Oferta âncora",
  "Regra 02 — Anuncie mais",
  "Regra 03 — Comece de graça",
  "Regra 04 — Prova vence promessa",
  "Regra 05 — Suba os preços",
  "Regra 06 — Vendas + marketing num funil só",
  "Regra 07 — Fale com seus clientes",
  "Regra 08 — Até R$500 mil/mês: foco em marketing",
  "Regra 09 — 10× no que já funciona",
  "Regra 10 — Foco radical: 1 canal, 1 avatar, 1 produto",
  "Regra 11 — Enfrente o difícil",
  "Regra 12 — Lembrar vence ensinar",
  "Execução vence informação",
  "Mais conteúdo em inema.club",
];

function imgFor(i) {
  if (NOIMG || SVG) return null;     // sem imagem raster (fallback usa glow ou SVG)
  if (i === 1) return "hook";
  if (i >= 2 && i <= 13) return "r" + String(i - 1).padStart(2, "0"); // i=2 -> r01
  return null; // fecho/cta sem imagem
}
function svgFor(i) {
  if (!SVG) return null;
  if (i === 1) return "hook";
  if (i >= 2 && i <= 13) return "r" + String(i - 1).padStart(2, "0");
  return null; // fecho/cta sem arte
}

// ---------- HTML por cena ----------
function hook() {
  return `
    <div class="eyebrow" id="s1-eyebrow"><span class="dot"></span>ALEX HORMOZI</div>
    <h1 class="title">
      <span class="word" id="s1-w1">12 regras</span>
      <span class="word accent" id="s1-w2">do Hormozi</span>
    </h1>
    <div class="rule" id="s1-rule"></div>
    <p class="subhead" id="s1-sub">negócios de 9 dígitos, sem enrolação<span class="cursor" id="s1-cur"></span></p>
    <div class="reg tl" id="s1-r1"></div><div class="reg br" id="s1-r2"></div>`;
}
function chipHTML(i) {
  const c = CHIPS[i - 2];
  const start = c.to != null ? "0" : c.val;
  const unit = c.unit || "";
  return `
        <div class="statchip" id="s${i}-stat">
          <span class="statarrow" id="s${i}-arrow">▲</span>
          <div>
            <div class="statlbl">${c.lbl}</div>
            <div class="statnumwrap"><span class="statnum" id="s${i}-statnum">${start}</span><span class="statunit">${unit}</span></div>
          </div>
        </div>`;
}
function tipCard(i) {
  const idx = i - 2;
  const tip = TIPS[idx];
  const num = String(idx + 1).padStart(2, "0");
  return `
      <div class="pcol">
        <div class="tipcount" id="s${i}-c">REGRA ${num} <span class="dim">/ 12</span></div>
        <div class="tipnumrow">
          <div class="tipnum" id="s${i}-num">${num}</div>
          <h2 class="tiptitle" id="s${i}-t">${tip.t}</h2>
        </div>
        <div class="tipbar" id="s${i}-bar"></div>
        <p class="tipess" id="s${i}-e">${tip.e}</p>
        ${chipHTML(i)}
      </div>`;
}
function fecho() {
  return `
    <p class="closer-sub" id="s14-sub">12 regras. Uma só verdade.</p>
    <h1 class="closer" id="s14-h">Execução vence<br/><span class="accent">informação</span></h1>
    <div class="rule center" id="s14-rule"></div>
    <p class="sig mono" id="s14-sig">escolha uma · comece hoje</p>`;
}
function cta() {
  return `
    <div class="cta-eyebrow" id="s15-eye">CONTINUA EM</div>
    <div class="cta-brand" id="s15-brand"><span class="b1">INEMA</span><span class="bdotsep">.</span><span class="b2">CLUB</span></div>
    <div class="rule center" id="s15-rule"></div>
    <div class="cta-url mono" id="s15-url"><span class="cta-globe">🌐</span>inema.club</div>
    <div class="reg tl" id="s15-r1"></div><div class="reg br" id="s15-r2"></div>`;
}
function sceneBody(i) {
  if (i === 1) return hook();
  if (i >= 2 && i <= 13) return tipCard(i);
  if (i === 14) return fecho();
  return cta();
}

// ---------- animação por cena ----------
function anim(i, t) {
  const L = []; const P = (s) => L.push(s);
  const at = (d) => round(t + d);
  const img = imgFor(i), sv = svgFor(i);
  // camada 1: fade + entrada da arte da cena (imagem raster ou ícone SVG)
  if (img || sv) {
    if (VERT) {
      // 9:16: faixa de topo ENTRA da direita→esquerda
      P(`tl.fromTo("#sbg-${i}",{opacity:0,xPercent:18},{opacity:1,xPercent:0,duration:.6,ease:"power3.out"},${t});`);
    } else {
      P(`tl.fromTo("#sbg-${i}",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},${t});`);
    }
    P(`tl.to("#sbg-${i}",{opacity:0,duration:${FADE},ease:"power2.in"},${round(S[i-1].end - FADE)});`);
    P(`tl.set("#sbg-${i}",{opacity:0},${round(S[i-1].end)});`);
    if (img) P(`tl.fromTo("#bg-${i}",{scale:1.14,xPercent:3,yPercent:1},{scale:1.0,xPercent:-3,yPercent:-1,duration:${S[i-1].dur},ease:"none"},${t});`);
    if (sv) {
      P(`tl.from("#svgw-${i}",{opacity:0,duration:.4,ease:"power2.out"},${t});`);
      if (SVG_ANIM[sv]) P(SVG_ANIM[sv](round(t + 0.1), S[i-1].dur)); // movimento rico por ícone
    }
  }
  // fade do conteúdo
  P(`tl.fromTo("#scene-inner-${i}",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},${t});`);
  P(`tl.to("#scene-inner-${i}",{opacity:0,duration:${FADE},ease:"power2.in"},${round(S[i-1].end - FADE)});`);
  P(`tl.set("#scene-inner-${i}",{opacity:0},${round(S[i-1].end)});`);

  if (i === 1) {
    P(`tl.from("#s1-eyebrow",{y:-24,opacity:0,duration:.55,ease:"power3.out"},${at(0.15)});`);
    P(`tl.from("#s1-w1",{y:70,opacity:0,duration:.7,ease:"power4.out"},${at(0.35)});`);
    P(`tl.from("#s1-w2",{y:70,opacity:0,duration:.7,ease:"power4.out"},${at(0.55)});`);
    P(`tl.fromTo("#s1-rule",{scaleX:0},{scaleX:1,duration:.7,ease:"expo.out",transformOrigin:"left center"},${at(0.95)});`);
    P(`tl.from("#s1-sub",{y:20,opacity:0,duration:.6,ease:"power2.out"},${at(1.15)});`);
    P(`tl.fromTo("#s1-cur",{opacity:1},{opacity:0,duration:.5,repeat:14,yoyo:true,ease:"none"},${at(1.6)});`);
    P(`tl.from(["#s1-r1","#s1-r2"],{opacity:0,scale:.5,duration:.6,stagger:.12,ease:"back.out(2)"},${at(0.5)});`);
  } else if (i >= 2 && i <= 13) {
    const c = CHIPS[i - 2];
    P(`tl.from("#s${i}-c",{y:-16,opacity:0,duration:.5,ease:"power2.out"},${at(0.3)});`);
    P(`tl.from("#s${i}-num",{scale:.35,opacity:0,duration:.65,ease:"back.out(1.7)"},${at(0.45)});`);
    P(`tl.fromTo("#s${i}-num",{filter:"drop-shadow(0 0 0 rgba(255,195,0,0))"},{filter:"drop-shadow(0 0 30px rgba(255,195,0,.4))",duration:.9,yoyo:true,repeat:1,ease:"sine.inOut"},${at(0.8)});`);
    P(`tl.from("#s${i}-t",{x:44,opacity:0,duration:.55,ease:"power3.out"},${at(0.6)});`);
    P(`tl.fromTo("#s${i}-bar",{scaleX:0},{scaleX:1,duration:.5,ease:"expo.out",transformOrigin:"left center"},${at(1.0)});`);
    P(`tl.from("#s${i}-e",{y:22,opacity:0,duration:.5,ease:"power2.out"},${at(1.15)});`);
    P(`tl.from("#s${i}-stat",{y:26,opacity:0,duration:.55,ease:"back.out(1.5)"},${at(2.2)});`);
    if (c.to != null) {
      P(`var cnt${i}={v:0};`);
      P(`tl.to(cnt${i},{v:${c.to},duration:1.4,ease:"power2.out",snap:{v:1},onUpdate:function(){var el=document.getElementById("s${i}-statnum");if(el)el.textContent=Math.round(cnt${i}.v);}},${at(2.6)});`);
    }
    P(`tl.fromTo("#s${i}-arrow",{y:6,opacity:.5},{y:-2,opacity:1,duration:.5,yoyo:true,repeat:4,ease:"sine.inOut"},${at(2.7)});`);
  } else if (i === 14) {
    P(`tl.from("#s14-sub",{y:-16,opacity:0,duration:.55,ease:"power2.out"},${at(0.2)});`);
    P(`tl.from("#s14-h",{scale:.85,opacity:0,duration:.8,ease:"power3.out"},${at(0.55)});`);
    P(`tl.fromTo("#s14-rule",{scaleX:0},{scaleX:1,duration:.7,ease:"expo.out"},${at(1.3)});`);
    P(`tl.from("#s14-sig",{opacity:0,letterSpacing:"0.5em",duration:.9,ease:"power2.out"},${at(1.6)});`);
  } else {
    P(`tl.from("#s15-eye",{y:-18,opacity:0,duration:.5,ease:"power2.out"},${at(0.2)});`);
    P(`tl.from("#s15-brand",{scale:.7,opacity:0,duration:.7,ease:"back.out(1.7)"},${at(0.5)});`);
    P(`tl.fromTo("#s15-rule",{scaleX:0},{scaleX:1,duration:.6,ease:"expo.out"},${at(1.1)});`);
    P(`tl.from("#s15-url",{y:20,opacity:0,duration:.55,ease:"power2.out"},${at(1.3)});`);
    P(`tl.fromTo("#s15-brand",{filter:"drop-shadow(0 0 0px rgba(255,195,0,0))"},{filter:"drop-shadow(0 0 26px rgba(255,195,0,.55))",duration:1.1,repeat:3,yoyo:true,ease:"sine.inOut"},${at(1.4)});`);
    P(`tl.from(["#s15-r1","#s15-r2"],{opacity:0,scale:.5,duration:.6,stagger:.12,ease:"back.out(2)"},${at(0.6)});`);
  }
  P(`tl.fromTo("#cap-${i}",{opacity:0,y:14},{opacity:1,y:0,duration:.5,ease:"power2.out"},${at(0.35)});`);
  P(`tl.to("#cap-${i}",{opacity:0,duration:.4,ease:"power2.in"},${round(S[i-1].end - 0.55)});`);
  return L.join("\n      ");
}

// ---------- montagem ----------
function sbgHTML(i) {
  const img = imgFor(i);
  if (img) return `
      <div class="sbg" id="sbg-${i}" data-layout-ignore><img class="bgimg" id="bg-${i}" src="assets/img/${img}.png" alt=""/><div class="veil"></div></div>`;
  const sv = svgFor(i);
  if (sv) return `
      <div class="sbg svgbg" id="sbg-${i}" data-layout-ignore><div class="svgwrap" id="svgw-${i}">${SVG_ICONS[sv]}</div></div>`;
  return "";
}
const scenesHTML = S.map((s) => `
    <section id="s${s.i}" class="scene clip${(imgFor(s.i) || svgFor(s.i)) ? " hasimg" : ""}" data-start="${s.start}" data-duration="${s.dur}" data-track-index="${s.i % 2 === 1 ? 1 : 3}">${sbgHTML(s.i)}
      <div class="scene-inner" id="scene-inner-${s.i}">${sceneBody(s.i)}</div>
    </section>`).join("");

const captionsHTML = S.map((s, idx) => `
    <div class="caption clip" id="cap-${s.i}" data-start="${s.start}" data-duration="${s.dur}" data-track-index="${s.i % 2 === 1 ? 2 : 4}">${CAPTIONS[idx]}</div>`).join("");

const audioHTML = S.map((s) => `
    <audio id="a${s.i}" data-start="${s.audioStart}" data-duration="${s.audioDur}" data-track-index="20" src="assets/audio/s${s.i}.wav"></audio>`).join("");

const animJS = S.map((s) => anim(s.i, s.start)).join("\n      ");

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      ${FONT_CSS}
      :root{--bg:#0D1321;--bg2:#1D2D44;--bg3:#3E5C76;--fg:#F0EBD8;--muted:#748CAB;--accent:#FFC300;--accent2:#FCA311;--code:#2EC4B6;}
      *{margin:0;padding:0;box-sizing:border-box}
      html,body{width:${W}px;height:${H}px;overflow:hidden;background:var(--bg);color:var(--fg);
        font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
      .mono{font-family:"JetBrains Mono",ui-monospace,monospace}
      #root{position:relative;width:${W}px;height:${H}px;overflow:hidden}

      /* fundo global (cenas sem imagem: fecho/CTA) */
      .bg-layer{position:absolute;inset:0;z-index:0;pointer-events:none}
      #glow{position:absolute;top:-260px;left:-180px;width:1100px;height:1100px;border-radius:50%;
        background:radial-gradient(circle,rgba(255,195,0,.18),rgba(255,195,0,0) 62%);filter:blur(8px)}
      #glow2{position:absolute;bottom:-360px;right:-240px;width:1200px;height:1200px;border-radius:50%;
        background:radial-gradient(circle,rgba(46,196,182,.10),rgba(46,196,182,0) 62%)}
      #grid{position:absolute;inset:-2px;opacity:.5;
        background-image:linear-gradient(rgba(116,140,171,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(116,140,171,.07) 1px,transparent 1px);
        background-size:64px 64px}
      #grain{position:absolute;inset:0;z-index:6;opacity:.05;mix-blend-mode:overlay;pointer-events:none;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
      #progress{position:absolute;left:0;bottom:0;height:6px;width:100%;transform:scaleX(0);transform-origin:left center;
        background:linear-gradient(90deg,var(--accent),var(--accent2));z-index:40;box-shadow:0 0 18px rgba(255,195,0,.5)}

      /* cena + camada 1 (imagem) */
      .scene{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:120px 150px 150px}
      .sbg{position:absolute;inset:0;z-index:0;overflow:hidden}
      .bgimg{position:absolute;inset:-6%;width:112%;height:112%;object-fit:cover;object-position:center right;will-change:transform}
      .veil{position:absolute;inset:0;
        background:linear-gradient(90deg,rgba(13,19,33,.98) 0%,rgba(13,19,33,.92) 32%,rgba(13,19,33,.55) 66%,rgba(13,19,33,.18) 100%),
                   linear-gradient(0deg,rgba(13,19,33,.85) 0%,rgba(13,19,33,0) 42%)}
      .svgbg{display:flex;align-items:center;justify-content:center}
      .svgwrap{width:44%;max-width:520px}
      .svgwrap svg{width:100%;height:auto;display:block;filter:drop-shadow(0 18px 40px rgba(0,0,0,.45))}
      .scene-inner{position:relative;z-index:2;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center}
      .pcol{max-width:1080px}
      .accent{color:var(--accent)}.dim{color:var(--muted)}

      /* hook */
      .eyebrow{display:inline-flex;align-items:center;gap:14px;font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.3em;color:var(--muted);font-weight:600}
      .eyebrow .dot{width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 16px var(--accent)}
      .title{font-family:Sora,sans-serif;font-weight:800;font-size:172px;line-height:.95;letter-spacing:-.03em;margin:24px 0}
      .title .word{display:block}
      .rule{height:7px;width:520px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:10px 0 30px}
      .rule.center{margin:34px auto}
      .subhead{font-size:40px;color:var(--muted)}
      .cursor{display:inline-block;width:18px;height:38px;background:var(--accent);margin-left:10px;vertical-align:-4px;border-radius:2px}
      .reg{position:absolute;width:48px;height:48px;border:3px solid var(--bg3)}
      .reg.tl{top:0;left:0;border-right:none;border-bottom:none}
      .reg.br{bottom:0;right:0;border-left:none;border-top:none}

      /* card de regra (camada 2) */
      .tipcount{font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.3em;color:var(--accent);font-weight:600;margin-bottom:18px;text-transform:uppercase}
      .tipnumrow{display:flex;align-items:flex-end;gap:36px}
      .tipnum{font-family:Sora,sans-serif;font-weight:800;font-size:300px;line-height:.78;letter-spacing:-.05em;
        background:linear-gradient(160deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .tiptitle{font-family:Sora,sans-serif;font-weight:800;font-size:90px;line-height:1.0;letter-spacing:-.02em;padding-bottom:24px;max-width:640px}
      .tipbar{height:7px;width:220px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:28px 0}
      .tipess{font-size:40px;color:var(--muted);max-width:900px;line-height:1.32}

      /* camada 3 — chip */
      .statchip{display:inline-flex;align-items:center;gap:22px;margin-top:38px;background:rgba(10,18,30,.62);
        border:2px solid var(--bg3);border-radius:18px;padding:20px 32px;backdrop-filter:blur(4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
      .statarrow{color:var(--accent);font-size:44px;line-height:1}
      .statlbl{font-family:"JetBrains Mono",monospace;font-size:23px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase}
      .statnumwrap{display:flex;align-items:flex-end;gap:6px}
      .statnum{font-family:Sora,sans-serif;font-weight:800;font-size:60px;color:var(--accent);line-height:1}
      .statunit{font-size:30px;color:var(--accent);line-height:1;padding-bottom:6px}

      /* fecho */
      .closer-sub{text-align:center;font-size:34px;color:var(--muted);margin-bottom:20px}
      .closer{text-align:center;font-family:Sora,sans-serif;font-weight:800;font-size:128px;line-height:1.02;letter-spacing:-.02em}
      .sig{text-align:center;font-size:30px;color:var(--accent);letter-spacing:.3em;text-transform:uppercase;margin-top:20px}

      /* CTA */
      .cta-eyebrow{text-align:center;font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.36em;color:var(--muted);text-transform:uppercase;margin-bottom:30px}
      .cta-brand{text-align:center;font-family:Sora,sans-serif;font-weight:800;font-size:150px;line-height:.95;letter-spacing:-.02em}
      .cta-brand .b1{color:var(--fg)}.cta-brand .b2{color:var(--accent)}.cta-brand .bdotsep{color:var(--accent)}
      .cta-url{display:flex;align-items:center;justify-content:center;gap:16px;font-size:46px;color:var(--muted);margin-top:32px}
      .cta-globe{font-size:38px;filter:grayscale(.2)}

      /* caption */
      .caption{position:absolute;left:50%;transform:translateX(-50%);bottom:64px;z-index:30;max-width:1500px;text-align:center;
        font-size:36px;font-weight:600;color:var(--fg);background:rgba(10,18,30,.72);border:1px solid var(--bg3);border-radius:14px;
        padding:18px 40px;backdrop-filter:blur(6px);text-shadow:0 2px 10px rgba(0,0,0,.6)}

      /* ============ 9:16 ============ */
      /* SAFE ZONES 9:16: IMAGEM no TOPO (entra direita→esquerda); MENSAGEM no MEIO; base livre p/ a UI do app */
      body.v .scene{padding:150px 70px 320px;justify-content:center}
      body.v .scene.hasimg{padding-top:700px}        /* cenas com imagem: mensagem no meio, abaixo da faixa de topo */
      /* imagem (ou futura arte SVG) = FAIXA SUPERIOR */
      body.v .sbg{inset:0 0 auto 0;top:0;height:34%}
      body.v .bgimg{inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
      body.v .veil{background:linear-gradient(0deg,rgba(13,19,33,1) 0%,rgba(13,19,33,0) 58%,rgba(13,19,33,.12) 100%)}
      body.v .eyebrow{font-size:22px}
      body.v .title{font-size:118px;margin:20px 0}
      body.v .rule{width:360px;margin-bottom:24px}
      body.v .subhead{font-size:34px}
      body.v .pcol{max-width:920px}
      body.v .svgwrap{width:62%;max-width:560px}
      body.v .tipnum{font-size:230px}
      body.v .tiptitle{font-size:72px;max-width:880px;padding-bottom:14px}
      body.v .tipbar{margin:24px 0}
      body.v .tipess{font-size:36px;max-width:900px}
      body.v .statnum{font-size:56px}
      body.v .closer-sub{font-size:30px}
      body.v .closer{font-size:100px}
      body.v .sig{font-size:28px}
      body.v .cta-brand{font-size:116px}
      body.v .cta-url{font-size:42px}
      body.v .caption{display:none}   /* 9:16: base livre p/ a UI do app; o título já está na tela */
      body.v #glow{top:-200px;left:-160px;width:900px;height:900px}
      body.v #glow2{bottom:-300px;right:-200px;width:1000px;height:1000px}
    </style>
  </head>
  <body class="${VERT ? "v" : ""}${NOIMG ? " noimg" : ""}">
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
      <div class="bg-layer" data-layout-ignore>
        <div id="glow"></div><div id="glow2"></div><div id="grid"></div>
      </div>
${scenesHTML}
${captionsHTML}
      <div id="grain" data-layout-ignore></div>
      <div id="progress"></div>
${audioHTML}
      <script>
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const TOTAL = ${TOTAL};
        tl.to("#glow",{scale:1.22,opacity:.55,duration:4.5,yoyo:true,repeat:Math.ceil(TOTAL/4.5)+1,ease:"sine.inOut"},0);
        tl.to("#glow2",{scale:1.18,duration:6,yoyo:true,repeat:Math.ceil(TOTAL/6)+1,ease:"sine.inOut"},0);
        tl.to("#grid",{backgroundPositionX:"+=128",backgroundPositionY:"+=128",duration:18,repeat:Math.ceil(TOTAL/18)+1,ease:"none"},0);
        tl.fromTo("#progress",{scaleX:0},{scaleX:1,duration:TOTAL,ease:"none"},0);
      ${animJS}
        tl.set({}, {}, TOTAL);
        window.__timelines["main"] = tl;
      </script>
    </div>
  </body>
</html>
`;

writeFileSync(new URL("./" + OUT, import.meta.url), html);
console.log(`${OUT} gerado · ${W}x${H} · TOTAL = ${TOTAL}s · ${S.length} cenas (3 camadas)`);
