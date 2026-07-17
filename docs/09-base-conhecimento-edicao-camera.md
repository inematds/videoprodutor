# 09 · Base de conhecimento — edição profissional, efeitos e câmera

> Mapa de **onde está o conhecimento** sobre como editar um vídeo profissionalmente
> (linguagem de câmera, efeitos, motion, ritmo, prompting cinematográfico) espalhado
> pelos projetos do ecossistema. Use este doc como índice quando for planejar/dirigir
> um vídeo novo.

## 1. Base central — `~/projetos/skill-video-plan-editor/knowledge/`

A base mais completa. É o conhecimento que a skill `video-plan-editor` consome.

| Área | Arquivos | O que cobre |
|---|---|---|
| **Câmera** | `camera/vocabulary.md` | Linguagem de câmera: vocabulário de movimentos e enquadramentos |
| **Motion** | `motion/eases.md` · `motion/recipes.md` · `motion/textures.md` | Motion graphics premium: curvas de easing, receitas de animação, texturas |
| **Ritmo** | `pacing.md` | Pacing, cortes, ritmo de edição |
| **Planejamento** | `storyboard.md` · `render.md` | Storyboard e pipeline de render |
| **Prompting** | `prompting/clip-direction.md` · `prompting/structures.md` · `prompting/library.md` · `prompting/best-practices.md` | Prompting cinematográfico para geradores de vídeo IA |
| **Estratégia** | `strategy/hooks.md` · `strategy/frameworks.md` · `strategy/formats.md` · `strategy/cases.md` · `strategy/matrix.md` · `strategy/checklist.md` · `strategy/templates.md` | Estratégia de vídeo viral / alta performance |
| **Design** | `tokens.md` · `archetypes/` | Tokens de design e arquétipos de vídeo |

## 2. Gramática de direção — `diretor-animacao`

- `~/.claude/skills/diretor-animacao/references/gramatica-direcao.md`
  — Gramática cinematográfica aplicada: **18 movimentos de câmera**, framing from/to,
  durações por beat, transições, look e parallax (para animar imagens prontas, sem IA de vídeo).
- `~/projetos/diretor-animacao/DICAS-CORRECOES.md`
  — Lições práticas de render: frames pretos em fronteira (Remotion+WebGL),
  fantasma 2.5D, crossfade sobre preto.

## 3. Biblioteca de tomadas — `mdd` (Mestre de Direção Dinâmica)

- `~/projetos/mdd/skill/references/biblioteca-tomadas.md` — biblioteca de tomadas
  (câmera + ação + continuidade) para vídeo dinâmico.
- `~/projetos/mdd/skill/references/presets.md` — presets de direção (produto, imóvel, ação…).
- Instalada também em `~/.claude/skills/mestre-direcao-dinamica/references/`.

## 4. Vocabulário cinematográfico — `promptprof`

- `~/projetos/promptprof/kairoboost/vocabulario.md` — vocabulário cinematográfico
  para refino de prompts.
- `~/projetos/promptprof/kairoboost/presets.md` — presets de estilo.
- `~/projetos/promptprof/kairoboost/SYSTEM-PROMPT.md` — system prompt do refinador.

## 5. Neste repo — `skill-videoprodutor/docs/`

Mais arquitetura da fábrica do que técnica de edição, mas complementa:

- `03-camadas-de-movimento.md` — as camadas de movimento de um vídeo profissional.
- `08-mapa-libs-motion.md` — mapa de libs de motion/efeitos
  (também em `skill/videoprodutor/references/mapa-libs-motion.md`).

## Como usar (ordem sugerida)

1. **Planejar**: estratégia + pacing + storyboard → `skill-video-plan-editor/knowledge/`
   (`strategy/`, `pacing.md`, `storyboard.md`).
2. **Dirigir câmera**: `camera/vocabulary.md` + `gramatica-direcao.md` (diretor-animacao)
   + `biblioteca-tomadas.md` (mdd).
3. **Efeitos e motion**: `motion/` (eases, recipes, textures) + `08-mapa-libs-motion.md`.
4. **Prompting IA** (se for gerador de vídeo): `prompting/` + `kairoboost/vocabulario.md`.
5. **Render sem dor**: `render.md` + `DICAS-CORRECOES.md` (pitfalls reais já vividos).
