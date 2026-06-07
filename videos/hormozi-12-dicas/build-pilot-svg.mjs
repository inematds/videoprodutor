// ============================================================================
// PILOTO SVG — Regra 10 "Foco radical" (alvo 100% vetorial e animado).
// Demonstra o FALLBACK SVG: a ilustração do tópico é um <svg> inline, nítido,
// leve e ANIMADO (anéis surgem de dentro pra fora; flecha crava no centro;
// centro pulsa) — sem servidor de imagem. + camada 2 (texto) e chip.
// Escreve index.html. Uso: node build-pilot-svg.mjs  (depois restaure com build-index.mjs)
// ============================================================================
import { writeFileSync, readFileSync } from "node:fs";

const FONT_CSS = readFileSync(new URL("./assets/fonts/fonts.css", import.meta.url), "utf8")
  .replace(/\.\/fonts\//g, "assets/fonts/");

const W = 1920, H = 1080;
const AUDIO = 4.821333;            // s11.wav (Regra 10)
const LEAD = 0.5, TAIL = 0.9, FADE = 0.45;
const DUR = round(LEAD + AUDIO + TAIL), END = DUR;
function round(n){ return Math.round(n*1000)/1000; }
const at = (d) => round(d);

// alvo SVG (concêntrico, centro 200,200)
const TARGET = `
  <svg id="tg" viewBox="0 0 400 400" width="720" height="720" xmlns="http://www.w3.org/2000/svg">
    <circle class="ring" id="r1" cx="200" cy="200" r="186" fill="#FCA311"/>
    <circle class="ring" id="r2" cx="200" cy="200" r="150" fill="#16263f"/>
    <circle class="ring" id="r3" cx="200" cy="200" r="116" fill="#FFC300"/>
    <circle class="ring" id="r4" cx="200" cy="200" r="82"  fill="#16263f"/>
    <circle class="ring" id="r5" cx="200" cy="200" r="50"  fill="#FFC300"/>
    <circle class="ring" id="rc" cx="200" cy="200" r="24"  fill="#FFE39A"/>
    <g id="arrow">
      <line x1="352" y1="48" x2="210" y2="190" stroke="#2EC4B6" stroke-width="13" stroke-linecap="round"/>
      <polygon points="196,204 232,196 208,172" fill="#2EC4B6"/>
      <line x1="352" y1="48" x2="330" y2="40" stroke="#2EC4B6" stroke-width="9" stroke-linecap="round"/>
      <line x1="352" y1="48" x2="360" y2="70" stroke="#2EC4B6" stroke-width="9" stroke-linecap="round"/>
    </g>
  </svg>`;

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
      html,body{width:${W}px;height:${H}px;overflow:hidden;background:var(--bg);color:var(--fg);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
      .mono{font-family:"JetBrains Mono",ui-monospace,monospace}
      #root{position:relative;width:${W}px;height:${H}px;overflow:hidden}
      .bg-layer{position:absolute;inset:0;z-index:0;pointer-events:none}
      #glow{position:absolute;top:-260px;left:-180px;width:1100px;height:1100px;border-radius:50%;background:radial-gradient(circle,rgba(255,195,0,.16),rgba(255,195,0,0) 62%);filter:blur(8px)}
      #grid{position:absolute;inset:-2px;opacity:.5;background-image:linear-gradient(rgba(116,140,171,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(116,140,171,.07) 1px,transparent 1px);background-size:64px 64px}
      #grain{position:absolute;inset:0;z-index:6;opacity:.05;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
      #progress{position:absolute;left:0;bottom:0;height:6px;width:100%;transform:scaleX(0);transform-origin:left center;background:linear-gradient(90deg,var(--accent),var(--accent2));z-index:40;box-shadow:0 0 18px rgba(255,195,0,.5)}

      /* camada 1 (SVG) — à direita, com glow atrás */
      .art{position:absolute;right:90px;top:50%;transform:translateY(-50%);z-index:1}
      .tglow{position:absolute;right:120px;top:50%;width:780px;height:780px;transform:translateY(-50%);z-index:0;border-radius:50%;
        background:radial-gradient(circle,rgba(255,195,0,.18),rgba(255,195,0,0) 60%);filter:blur(6px)}
      .ring{transform-box:fill-box;transform-origin:center}
      #arrow{transform-box:fill-box;transform-origin:center}

      .scene{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:120px 150px 150px}
      .scene-inner{position:relative;z-index:2;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center}
      .pcol{max-width:980px}
      .accent{color:var(--accent)}.dim{color:var(--muted)}
      .tipcount{font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.3em;color:var(--accent);font-weight:600;margin-bottom:18px;text-transform:uppercase}
      .tipnumrow{display:flex;align-items:flex-end;gap:36px}
      .tipnum{font-family:Sora,sans-serif;font-weight:800;font-size:300px;line-height:.78;letter-spacing:-.05em;background:linear-gradient(160deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .tiptitle{font-family:Sora,sans-serif;font-weight:800;font-size:96px;line-height:1;letter-spacing:-.02em;padding-bottom:22px}
      .tipbar{height:7px;width:220px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:28px 0}
      .tipess{font-size:40px;color:var(--muted);max-width:820px;line-height:1.32}
      .statchip{display:inline-flex;align-items:center;gap:22px;margin-top:38px;background:rgba(10,18,30,.62);border:2px solid var(--bg3);border-radius:18px;padding:20px 32px;backdrop-filter:blur(4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
      .statarrow{color:var(--accent);font-size:44px;line-height:1}
      .statlbl{font-family:"JetBrains Mono",monospace;font-size:23px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase}
      .statnum{font-family:Sora,sans-serif;font-weight:800;font-size:60px;color:var(--accent);line-height:1}
      .caption{position:absolute;left:50%;transform:translateX(-50%);bottom:64px;z-index:30;max-width:1500px;text-align:center;font-size:36px;font-weight:600;color:var(--fg);background:rgba(10,18,30,.72);border:1px solid var(--bg3);border-radius:14px;padding:18px 40px;backdrop-filter:blur(6px);text-shadow:0 2px 10px rgba(0,0,0,.6)}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${END}" data-width="${W}" data-height="${H}">
      <div class="bg-layer" data-layout-ignore><div id="glow"></div><div id="grid"></div></div>

      <section id="s1" class="scene clip" data-start="0" data-duration="${DUR}" data-track-index="1">
        <div class="tglow" id="tglow" data-layout-ignore></div>
        <div class="art" id="art" data-layout-ignore>${TARGET}</div>
        <div class="scene-inner" id="scene-inner-1">
          <div class="pcol">
            <div class="tipcount" id="p-c">REGRA 10 <span class="dim">/ 12</span></div>
            <div class="tipnumrow"><div class="tipnum" id="p-num">10</div><h2 class="tiptitle" id="p-t">Foco radical</h2></div>
            <div class="tipbar" id="p-bar"></div>
            <p class="tipess" id="p-e">Abaixo de R$1M/ano: um canal, um avatar, um produto.</p>
            <div class="statchip" id="p-stat"><span class="statarrow" id="p-arrow">▲</span><div><div class="statlbl">Foco</div><div><span class="statnum">1·1·1</span></div></div></div>
          </div>
        </div>
      </section>

      <div class="caption clip" id="cap-1" data-start="0" data-duration="${DUR}" data-track-index="2">Regra 10 — Foco radical: 1 canal, 1 avatar, 1 produto</div>
      <div id="grain" data-layout-ignore></div>
      <div id="progress"></div>
      <audio id="a1" data-start="${LEAD}" data-duration="${AUDIO}" data-track-index="20" src="assets/audio/s11.wav"></audio>

      <script>
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const TOTAL = ${END};
        tl.to("#glow",{scale:1.2,opacity:.5,duration:4.5,yoyo:true,repeat:Math.ceil(TOTAL/4.5)+1,ease:"sine.inOut"},0);
        tl.fromTo("#progress",{scaleX:0},{scaleX:1,duration:TOTAL,ease:"none"},0);
        tl.fromTo("#scene-inner-1",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},0);
        tl.to("#scene-inner-1",{opacity:0,duration:${FADE},ease:"power2.in"},${round(END-FADE)});
        tl.set("#scene-inner-1",{opacity:0},${round(END)});

        // CAMADA 1 (SVG) — ken-burns leve no alvo
        tl.fromTo("#art",{opacity:0},{opacity:1,duration:${FADE}},0);
        tl.to("#art",{opacity:0,duration:${FADE}},${round(END-FADE)});
        tl.fromTo("#tg",{scale:1.06},{scale:1.0,duration:TOTAL,ease:"none",transformOrigin:"50% 50%"},0);
        tl.fromTo("#tglow",{opacity:0,scale:.8},{opacity:1,scale:1,duration:.9,ease:"power2.out"},${at(0.3)});
        // anéis surgem de DENTRO pra fora (draw-on vetorial)
        tl.from(["#rc","#r5","#r4","#r3","#r2","#r1"],{scale:0,opacity:0,duration:.5,stagger:.09,ease:"back.out(1.7)",svgOrigin:"200 200"},${at(0.4)});
        // flecha CRAVA no centro
        tl.from("#arrow",{x:150,y:-150,opacity:0,duration:.55,ease:"power3.in"},${at(1.25)});
        tl.fromTo("#arrow",{rotation:-4,svgOrigin:"200 200"},{rotation:0,duration:.5,ease:"elastic.out(1,0.5)"},${at(1.8)});
        // centro pulsa
        tl.fromTo("#rc",{filter:"drop-shadow(0 0 0 rgba(255,195,0,0))"},{filter:"drop-shadow(0 0 22px rgba(255,195,0,.7))",duration:.8,yoyo:true,repeat:4,ease:"sine.inOut"},${at(1.9)});

        // CAMADA 2 + chip
        tl.from("#p-c",{y:-16,opacity:0,duration:.5,ease:"power2.out"},${at(0.3)});
        tl.from("#p-num",{scale:.35,opacity:0,duration:.65,ease:"back.out(1.7)"},${at(0.45)});
        tl.from("#p-t",{x:44,opacity:0,duration:.55,ease:"power3.out"},${at(0.6)});
        tl.fromTo("#p-bar",{scaleX:0},{scaleX:1,duration:.5,ease:"expo.out",transformOrigin:"left center"},${at(1.0)});
        tl.from("#p-e",{y:22,opacity:0,duration:.5,ease:"power2.out"},${at(1.15)});
        tl.from("#p-stat",{y:26,opacity:0,duration:.55,ease:"back.out(1.5)"},${at(2.2)});
        tl.fromTo("#p-arrow",{y:6,opacity:.5},{y:-2,opacity:1,duration:.5,yoyo:true,repeat:4,ease:"sine.inOut"},${at(2.4)});

        tl.fromTo("#cap-1",{opacity:0,y:14},{opacity:1,y:0,duration:.5,ease:"power2.out"},${at(0.4)});
        tl.to("#cap-1",{opacity:0,duration:.4,ease:"power2.in"},${round(END-0.55)});
        tl.set({}, {}, TOTAL);
        window.__timelines["main"] = tl;
      </script>
    </div>
  </body>
</html>
`;

writeFileSync(new URL("./index.html", import.meta.url), html);
console.log(`pilot SVG index.html · ${W}x${H} · DUR=${DUR}s (Regra 10, alvo vetorial animado)`);
