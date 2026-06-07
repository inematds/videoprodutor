# 06 — Decisões pendentes e backlog

## Decisões a cravar (do usuário)

1. **Motor de render** (ver `docs/05`): Remotion único (paramétrico, mas paga maturidade) × HyperFrames primeiro
   (maduro, mas menos paramétrico) × caminho intermediário (HyperFrames agora, migra depois).
2. **Timing de palavra** (para karaokê/keyword): **forced alignment** (whisperX/aeneas, preciso, +dependência)
   × **estimativa proporcional** (simples, barato) no v1.
3. **video-explicativo:** continua renderer próprio (e empresta vocabulário) × é absorvido pelo motor único.
4. **Voz padrão:** Kokoro `pf_dora` (bella) grátis × inemavox clonada × ElevenLabs (pago).

## Backlog priorizado (quando começar a construir)

### P0 — o esqueleto da fábrica
- **Contrato único** (`plano-edicao.json` estendido): + `caption` cinético, + `illustration` por beat,
  + `duration_mode`, + presets por referência, + assets (imagem/seed/depth + áudio). Fundir com panels.json/movie spec.
- **Orquestrador** `videoprodutor`: link/fonte → chama vpe → preenche o plano.
- **Integrador de b-roll**: `gen_prompt` → flux2-klein (seed/cache). Base: `genimg.mjs` (pixflow).
- **TTS**: roteiro → WAV (Kokoro/inemavox) + durações + timestamps.
- **Compositor**: plano → seleciona archetype/motion/tokens → monta a composição no motor escolhido.

### P1 — qualidade (as camadas 2 e 3)
- Camada 2 (texto cinético): adaptar componentes do `remotion-templates` (typewriter, char-stagger, text-highlight, count-up…).
- Camada 3 (ilustração de tópico): bullets, ícones draw-on, micro-diagramas (funil/seta/barra), spotlight sobre a imagem.
- **Design system único**: tokens/eases/ícones compartilhados (resolve divergência de presets — ex.: "noir").
- **Prompt fiel ao conceito + revisão semântica** (mdd/promptprof) — evitar o erro "café com amigo".

### P2 — acabamento
- Variedade de transições (glitch/whip/zoom-blur — já speccadas em pixflow `docs/efeitos/`).
- Partículas, light leaks em overlay, LUT .cube real, beat-sync musical (librosa).
- Multi-formato (16:9 / 9:16 / 1:1), pós-produção (trim/cut/merge), trilha sonora.
- Export OpenTimelineIO (abre Premiere/Resolve/FCPX).

## Faxinas de consolidação (do mapa do ecossistema)

- **Tripé HyperFrames** (video-explicativo + demonstrativo + cursos-inema) → 1 motor com adaptadores de entrada.
- **3 contratos → 1** (panels.json + movie spec + plano-edicao.json).
- **seedance-loop-prompt** → preset "loop" do mdd (reduz duplicação futura).
- **Registro de presets único** (`presets.v1.json`) referenciado por todos.

## Estado atual das peças

| Peça | Onde | Estado |
|---|---|---|
| Render cinema (parallax 2.5D + efeitos) | `~/projetos/pixflow/skill` | MVP funcional |
| Legendas (embrião) | `pixflow/skill/src/Caption.jsx` | básico (fade) |
| Geração de imagem | `pixflow/skill/cli/genimg.mjs` + `inemaimg` (flux2-klein) | funcional |
| Depth (sem torch) | `pixflow/skill/cli/depth.mjs` (transformers.js) | funcional |
| Plano | `skill-video-plan-editor` (CLI `vpe`) | pronto |
| Direção | `mdd` | pronto |
| Prompt | `promptprof` (KairoBoost) | pronto |
| Protótipo de pipeline | `fontefilm` (panels.json + caso Hormozi) | protótipo |
| Componentes de motion | `remotion-templates` (54 TSX) | prontos |
| Render flat + TTS | `cchyperframes` + `inemavox`/Kokoro | produção |

## Referências cruzadas

- Análise original do ecossistema e padrão de interoperação ficaram em `~/projetos/pixflow/docs/research/04-ecossistema.md`
  e `~/projetos/pixflow/docs/padroes/01-padrao-geral.md` (OTIO, .cube/ASC CDL, presets).
- Biblioteca de efeitos (receitas GLSL/Three.js/Remotion) em `~/projetos/pixflow/docs/efeitos/`.
