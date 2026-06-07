// ============================================================================
// CENA-PILOTO (Regra 05 "Suba os preços") — demonstra as 3 CAMADAS:
//   1) fundo ILUSTRADO (flux2-klein) + véu + parallax/ken-burns
//   2) texto cinético (número + título + barra + essência)
//   3) ilustração de tópico: count-up de receita (▲ +37%)
// Escreve index.html (renderize, depois rode build-index.mjs pra restaurar o final).
// Uso: node build-pilot.mjs [--vertical]
// ============================================================================
import { writeFileSync, readFileSync } from "node:fs";

const FONT_CSS = readFileSync(new URL("./assets/fonts/fonts.css", import.meta.url), "utf8")
  .replace(/\.\/fonts\//g, "assets/fonts/");

const VERT = process.argv.includes("--vertical");
const W = VERT ? 1080 : 1920;
const H = VERT ? 1920 : 1080;

const AUDIO = 6.528;          // s5.wav real
const LEAD = 0.5, TAIL = 0.9, FADE = 0.45;
const DUR = round(LEAD + AUDIO + TAIL);
const END = DUR;
const aStart = LEAD;
function round(n) { return Math.round(n * 1000) / 1000; }
const at = (d) => round(d);

const IMG = "assets/img/r05.png";

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

      /* CAMADA 1 — fundo ilustrado */
      .bgwrap{position:absolute;inset:0;z-index:1;overflow:hidden}
      #bgimg{position:absolute;inset:-6%;width:112%;height:112%;object-fit:cover;object-position:center right;will-change:transform}
      .veil{position:absolute;inset:0;z-index:2;
        background:linear-gradient(90deg,rgba(13,19,33,.98) 0%,rgba(13,19,33,.92) 32%,rgba(13,19,33,.5) 66%,rgba(13,19,33,.18) 100%),
                   linear-gradient(0deg,rgba(13,19,33,.85) 0%,rgba(13,19,33,0) 42%)}
      #grain{position:absolute;inset:0;z-index:3;opacity:.05;mix-blend-mode:overlay;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
      #progress{position:absolute;left:0;bottom:0;height:6px;width:100%;transform:scaleX(0);transform-origin:left center;
        background:linear-gradient(90deg,var(--accent),var(--accent2));z-index:40;box-shadow:0 0 18px rgba(255,195,0,.5)}

      /* cena */
      .scene{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:120px 150px 150px}
      .scene-inner{position:relative;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
      .pcol{max-width:1040px}
      .accent{color:var(--accent)}.dim{color:var(--muted)}

      /* CAMADA 2 — texto cinético */
      .tipcount{font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.3em;color:var(--accent);font-weight:600;margin-bottom:18px;text-transform:uppercase}
      .tipnumrow{display:flex;align-items:flex-end;gap:36px}
      .tipnum{font-family:Sora,sans-serif;font-weight:800;font-size:300px;line-height:.78;letter-spacing:-.05em;
        background:linear-gradient(160deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .tiptitle{font-family:Sora,sans-serif;font-weight:800;font-size:104px;line-height:1.0;letter-spacing:-.02em;padding-bottom:22px}
      .tipbar{height:7px;width:220px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:30px 0}
      .tipess{font-size:40px;color:var(--muted);max-width:900px;line-height:1.32}

      /* CAMADA 3 — ilustração de tópico (count-up) */
      .statchip{display:inline-flex;align-items:center;gap:22px;margin-top:40px;background:rgba(10,18,30,.62);
        border:2px solid var(--bg3);border-radius:18px;padding:22px 34px;backdrop-filter:blur(4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
      .statarrow{color:var(--accent);font-size:46px;line-height:1}
      .statlbl{font-family:"JetBrains Mono",monospace;font-size:24px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase}
      .statnumwrap{display:flex;align-items:flex-end;gap:6px}
      .statnum{font-family:Sora,sans-serif;font-weight:800;font-size:64px;color:var(--accent);line-height:1}
      .statunit{font-size:32px;color:var(--accent);line-height:1;padding-bottom:6px}

      /* caption */
      .caption{position:absolute;left:50%;transform:translateX(-50%);bottom:64px;z-index:30;max-width:1500px;text-align:center;
        font-size:36px;font-weight:600;color:var(--fg);background:rgba(10,18,30,.72);border:1px solid var(--bg3);border-radius:14px;
        padding:18px 40px;backdrop-filter:blur(6px);text-shadow:0 2px 10px rgba(0,0,0,.6)}

      /* 9:16 */
      body.v .scene{padding:200px 70px 240px;justify-content:flex-start}
      body.v #bgimg{object-position:center}
      body.v .veil{background:linear-gradient(0deg,rgba(13,19,33,.97) 0%,rgba(13,19,33,.86) 38%,rgba(13,19,33,.35) 72%,rgba(13,19,33,.5) 100%)}
      body.v .tipnum{font-size:240px}
      body.v .tiptitle{font-size:78px}
      body.v .tipess{font-size:36px;max-width:920px}
      body.v .statnum{font-size:58px}
      body.v .caption{bottom:150px;max-width:920px;font-size:33px;padding:16px 32px}
    </style>
  </head>
  <body class="${VERT ? "v" : ""}">
    <div id="root" data-composition-id="main" data-start="0" data-duration="${END}" data-width="${W}" data-height="${H}">
      <div class="bgwrap" data-layout-ignore>
        <img id="bgimg" src="${IMG}" alt="" />
        <div class="veil"></div><div id="grain"></div>
      </div>

      <section id="s1" class="scene clip" data-start="0" data-duration="${DUR}" data-track-index="1">
        <div class="scene-inner" id="scene-inner-1">
          <div class="pcol">
            <div class="tipcount" id="p-c">REGRA 05 <span class="dim">/ 12</span></div>
            <div class="tipnumrow">
              <div class="tipnum" id="p-num">05</div>
              <h2 class="tiptitle" id="p-t">Suba os<br/>preços</h2>
            </div>
            <div class="tipbar" id="p-bar"></div>
            <p class="tipess" id="p-e">Menos clientes, cada um vale mais — e quase sempre, mais receita.</p>
            <div class="statchip" id="p-stat">
              <span class="statarrow" id="p-arrow">▲</span>
              <div>
                <div class="statlbl">Receita</div>
                <div class="statnumwrap"><span class="statnum" id="p-statnum">0</span><span class="statunit">%</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="caption clip" id="cap-1" data-start="0" data-duration="${DUR}" data-track-index="2">Regra 05 — Suba os preços</div>
      <div id="progress"></div>
      <audio id="a1" data-start="${aStart}" data-duration="${AUDIO}" data-track-index="20" src="assets/audio/s5.wav"></audio>

      <script>
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const TOTAL = ${END};
        // CAMADA 1 — parallax/ken-burns no fundo + leve drift do véu
        tl.fromTo("#bgimg",{scale:1.14,xPercent:3,yPercent:1},{scale:1.0,xPercent:-3,yPercent:-1,duration:TOTAL,ease:"none"},0);
        tl.fromTo("#progress",{scaleX:0},{scaleX:1,duration:TOTAL,ease:"none"},0);
        // entrada/saída da cena
        tl.fromTo("#scene-inner-1",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},0);
        tl.to("#scene-inner-1",{opacity:0,duration:${FADE},ease:"power2.in"},${round(END - FADE)});
        tl.set("#scene-inner-1",{opacity:0},${round(END)});
        // CAMADA 2 — texto cinético
        tl.from("#p-c",{y:-16,opacity:0,duration:.5,ease:"power2.out"},${at(0.3)});
        tl.from("#p-num",{scale:.35,opacity:0,duration:.65,ease:"back.out(1.7)"},${at(0.45)});
        tl.fromTo("#p-num",{filter:"drop-shadow(0 0 0 rgba(255,195,0,0))"},{filter:"drop-shadow(0 0 30px rgba(255,195,0,.4))",duration:.9,yoyo:true,repeat:1,ease:"sine.inOut"},${at(0.8)});
        tl.from("#p-t",{x:44,opacity:0,duration:.55,ease:"power3.out"},${at(0.7)});
        tl.fromTo("#p-bar",{scaleX:0},{scaleX:1,duration:.5,ease:"expo.out",transformOrigin:"left center"},${at(1.05)});
        tl.from("#p-e",{y:22,opacity:0,duration:.5,ease:"power2.out"},${at(1.2)});
        // CAMADA 3 — count-up (ilustração do tópico)
        tl.from("#p-stat",{y:26,opacity:0,duration:.55,ease:"back.out(1.5)"},${at(2.4)});
        const cnt = {v:0};
        tl.to(cnt,{v:37,duration:1.5,ease:"power2.out",snap:{v:1},onUpdate:function(){var el=document.getElementById("p-statnum");if(el)el.textContent=Math.round(cnt.v);}},${at(2.8)});
        tl.fromTo("#p-arrow",{y:6,opacity:.5},{y:-2,opacity:1,duration:.5,yoyo:true,repeat:5,ease:"sine.inOut"},${at(2.9)});
        // caption
        tl.fromTo("#cap-1",{opacity:0,y:14},{opacity:1,y:0,duration:.5,ease:"power2.out"},${at(0.4)});
        tl.to("#cap-1",{opacity:0,duration:.4,ease:"power2.in"},${round(END - 0.55)});
        tl.set({}, {}, TOTAL);
        window.__timelines["main"] = tl;
      </script>
    </div>
  </body>
</html>
`;

writeFileSync(new URL("./index.html", import.meta.url), html);
console.log(`pilot index.html · ${W}x${H} · DUR=${DUR}s (Regra 05, 3 camadas)`);
