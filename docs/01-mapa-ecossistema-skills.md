# 01 — Mapa do ecossistema (11 skills, 6 motores)

Inventário das skills de vídeo/imagem/motion e dos motores de render, com sobreposições e lacunas.

## Motores de render distintos (6)

| Motor | Stack | Skills que usam | Estágio |
|---|---|---|---|
| **HyperFrames** (HTML→Chrome headless→FFmpeg) | HTML + GSAP + CLI + Kokoro TTS | video-explicativo, video-demonstrativo, videos-cursos-inema | produção |
| **pixflow** (próprio) | YAML spec + imagens → MP4 (Remotion/WebGL/GLSL) | pixflow-motion | alpha/WIP |
| **Remotion** (React) | React + TSX + WebGL/Canvas | remotion (referência) + remotion-templates | produção (templates) |
| **Framer Motion** | React + CSS | animation-designer | padrões/referência |
| **Canvas scroll-driven** | FFmpeg frames + Canvas 2D + scroll | 3d-animation-creator | produção |
| **p5.js** | generative art | algorithmic-art | produção |

**Crítico:** 3 skills (video-explicativo, video-demonstrativo, videos-cursos-inema) usam **exatamente o mesmo motor** (HyperFrames + Kokoro) — só muda a entrada.

## Sobreposições

- 🔴 **Vídeo narrado PT-BR** — video-explicativo (assunto), video-demonstrativo (URL de app), videos-cursos-inema (curso INEMA): mesmo motor, mesma identidade. Consolidável em 1 motor com 3 adaptadores de entrada.
- 🟡 **Prompt p/ vídeo IA** — mdd (geral) × seedance-loop-prompt (loop de produto): contextos distintos, sobreposição leve.
- ✅ **Camadas sequenciais sem conflito** — vpe (plano) → mdd (direção) → render: não competem.

## Camadas repetidas em várias skills

| Camada | Skills | Duplicação |
|---|---|---|
| Roteiro/narrativa | explicativo, demonstrativo, cursos, vpe, mdd | 🔴 alta (5 skills) |
| TTS | explicativo, demonstrativo, cursos | 🔴 alta (Kokoro) — já centralizado em inemavox |
| Captions/legendas | explicativo, demonstrativo, cursos | 🟡 poderia ser módulo |
| Motion graphics | explicativo, demonstrativo, cursos, pixflow, animation-designer, 3d | média (escopos distintos) |
| Geração de imagem IA | — | 🟠 lacuna (existe inemaimg, sem skill exposta) |
| Prompt p/ IA | mdd, seedance-loop-prompt | ✅ bem separados |

## Único de cada skill

- **video-explicativo** — assunto narrado 16:9/9:16.
- **video-demonstrativo** — captura real de app + cursor animado.
- **videos-cursos-inema** — pipeline de curso (landing + trilhas + módulos).
- **video-plan-editor** — plano JSON renderer-agnóstico (não renderiza).
- **mestre-direcao-dinamica** — storyboard cinematográfico + 7 blocos.
- **seedance-loop-prompt** — prompt p/ loop seamless.
- **pixflow-motion** — parallax 2.5D + 6 looks + 8 câmeras (render cinema).
- **3d-animation-creator** — scroll-driven (Apple-style).
- **animation-designer** — padrões Framer Motion.
- **canvas-design** — design estático.
- **algorithmic-art** — arte generativa p5.js.

## Lacunas

1. 🟠 **Imagem IA sem skill** (existe `inemaimg`/flux2-klein, sem skill que integre a vídeo) — parcialmente coberto agora pelo `genimg.mjs` do pixflow.
2. 🟠 **plano → execução** não conectado (vpe gera JSON; nenhum motor consome automaticamente).
3. 🟠 **Pós-produção** (trim/cut/merge) inexistente.
4. 🟠 **Música/trilha** (só TTS hoje).

## Veredito

Não são 11 produtos — são **estágios de uma linha de montagem espalhada**. A consolidação imediata óbvia:
fundir o "tripé HyperFrames" e conectar plano→render. Detalhe da fábrica em `docs/04`.
