# 08 — Mapa biblioteca→tarefa (o cérebro do compositor)

> Origem: análise de um material sobre **Claude Code + Remotion + bibliotecas de animação web**.
> Lição central: o valor não é "usar Remotion" — é saber **qual biblioteca usar em cada tipo de conteúdo**.
> E esse mapa é **agnóstico de motor**: vale no Remotion (React) e no HyperFrames (HTML, embute qualquer lib web).
> É exatamente a lógica de seleção do **compositor** do videoprodutor.

## A matriz (biblioteca → quando usar)

| Biblioteca | Melhor para | Camada | Observação p/ render |
|---|---|---|---|
| **GSAP** | timeline/coreografia precisa, texto cinético, reveals, stagger, easing, intros SaaS, walkthroughs | 2 (texto cinético) | usar `paused`+seek (frame-determinístico). É o que já usamos. |
| **D3** | dados viram conteúdo: gráficos animados, mapas, diagramas, dashboards, viz informativa | 3 (ilustração de tópico) | "os dados são o conteúdo" — dar dados limpos + mensagem. Nosso chip/count-up é a versão embrião. |
| **Three.js** | 3D: produto girando, fly-through, câmera orbital, visualização espacial | 1 (cinema) | **Vanilla Three.js > React-Three-Fiber** p/ render (menos abstração, frame previsível). É o que o pixflow faz. |
| **Lottie** | ícone/microanimação simples, onboarding, social clip, marca | 1/3 (ilustração leve) | caminho mais rápido prompt→ícone limpo. **≈ nosso fallback SVG.** |
| **Framer Motion** | UI interativa: hover, drag, layout, protótipo, demo | — | **NÃO serve p/ vídeo renderizado** (depende de interação). Fica fora do compositor. |

## Regras de seleção (para o compositor)

- beat de **dado/comparação/número** → D3 (ou count-up GSAP p/ casos simples).
- beat **3D/produto/espaço** → Three.js (vanilla) — camada 1 (pixflow).
- beat de **texto/ênfase/sequência** → GSAP — camada 2.
- beat de **ícone/microilustração** → Lottie ou **SVG** (fallback determinístico).
- **nunca** Framer Motion p/ saída renderizada.

## Técnicas práticas (aplicáveis a qualquer motor)

1. **Motion path por imagem desenhada** — desenhar a curva numa imagem, mandar o Claude rastrear e animar por ela. Precisão de trajetória sem descrever em palavras. (Útil no **mdd** p/ câmera/movimento.)
2. **Render com alpha** — title cards/overlays transparentes: **ProRes 4444 / PNG** (última opção do dropdown de formato). Sem isso o alpha é achatado. (Útil p/ exportar camadas e compor.)
3. **Remotion Skills** — `npx skills @remotion-dev/skills` injeta padrões de componente/transição/spring/áudio no Claude (sobe a qualidade do `remotion-templates`).
4. **Processo** — começar simples → iterar **no mesmo chat** → conferir frames → expandir. (Já é nossa disciplina.)

## Como cai em cada projeto

| Projeto | Aplicação |
|---|---|
| **videoprodutor** (compositor) | a matriz acima = a lógica de "como realizar cada beat". |
| **motor de render** | evidência pró-Remotion + determinismo; mas o mapa é agnóstico → escolhe só *onde hospedar* as libs. |
| **pixflow** (camada 1) | valida Three.js vanilla + frame-determinismo; usar alpha render p/ exportar a cena cinema. |
| **remotion-templates** | instalar Remotion Skills; expandir categorias seguindo a matriz (D3/Three/Lottie). |
| **video-explicativo** (HyperFrames+GSAP) | GSAP/spring/start-simple já aplicam; como é HTML, pode **embutir D3/Three/Lottie** sem trocar de motor. SVG fallback = nicho do Lottie. |
| **mdd** | técnica de motion path por imagem; matriz informa o motor por tomada. |
| **promptprof/KairoBoost** | "como promptar por biblioteca" → presets de prompt (um por lib/uso). |
| **vpe** | estender `motion/recipes.md` com matriz "lib por beat" (hoje só GSAP). |
| **fontefilm** | adicionar beat tipo "viz/dados" (D3) ao contrato. |
| **inemaimg** | imagem é input/textura (camada 1); movimento é código. Confirma "imagem padrão, SVG fallback". |
| **inemavox/Kokoro** | áudio é área das Remotion Skills; "timing vem do áudio" já alinhado. |

## A lição em uma linha
O compositor que faltava ao videoprodutor ganha um **mapa pronto**: biblioteca certa por tipo de conteúdo, agnóstico de motor — D3 (dados), Three vanilla (3D), GSAP (texto/timeline), Lottie/SVG (ícone). Framer Motion fica de fora do render.
