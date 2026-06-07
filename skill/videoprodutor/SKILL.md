---
name: videoprodutor
version: 0.1.0
description: O Produtor — orquestra link/assunto → vídeo profissional ponta a ponta (plano, direção, imagem/SVG, voz, render em 3 camadas), 16:9 e 9:16, dark premium INEMA.CLUB, tudo local. Use quando o usuário der um link/assunto/fonte e quiser o VÍDEO PROFISSIONAL completo (propaganda ou explicativo) saindo de uma vez — não só roteiro, não só imagem, não só prompt. Acione para "produz o vídeo", "do link ao vídeo", "vídeo profissional disso", "monta o vídeo inteiro", "fábrica de vídeo".
---

# videoprodutor (o Produtor)

Orquestrador que transforma **um link/assunto** em **um vídeo profissional** (propaganda ou explicativo),
ponta a ponta, **reusando** as peças do ecossistema. Autocontido: traz o molde testado (gerador de 3 camadas).
Tudo roda local, **sem chave de API**. Padrão do usuário (Nei): PT-BR, dark premium âmbar, 16:9 **e** 9:16, CTA INEMA.CLUB.

## As 3 camadas (o que faz um vídeo "profissional", não slideshow)
1. **Cinema (camada 1)** — fundo com profundidade: imagem (flux2-klein) com véu + parallax/ken-burns.
2. **Texto cinético (camada 2)** — número/título/barra/ênfase animados (GSAP).
3. **Ilustração do tópico (camada 3)** — ícone/diagrama/contador que MOSTRA o que se narra.
Detalhe e quando usar cada lib em [references/mapa-libs-motion.md](references/mapa-libs-motion.md).

## Linha de montagem (sempre nesta ordem)
```
LINK/ASSUNTO
 → PLANO        skill video-plan-editor (vpe) → plano-edicao.json (preset, beats, tópicos, CTA)
 → ROTEIRO      SCRIPT.md + assets/txt/sN.txt (expandir siglas/números p/ fala)
 → VOZ+TIMING   Kokoro pf_dora → assets/audio/sN.wav ; ffprobe → array AUDIO[]
 → ARTE camada1 AUTO: servidor de imagem no ar → flux2-klein (gen-imgs.mjs); fora → SVG (svg-icons.mjs)
 → COMPOR       scripts/composition-template.mjs (3 camadas; timing do AUDIO[])
 → VALIDAR      hyperframes lint (0 erros) + inspect (0 overflow) + conferir frames de draft
 → RENDER       hyperframes render --quality high → 16:9 e 9:16
 → VÍDEO PROFISSIONAL
```

## Pré-flight (checar dependências)
```bash
npx hyperframes doctor                      # motor de render (Chrome+FFmpeg)
curl -s localhost:8000/health               # servidor de imagem (flux2-klein) — OPCIONAL, tem fallback SVG
python3 -c "import kokoro_onnx, soundfile"  # TTS local
node -v ; ffmpeg -version | head -1 ; which vpe
```

## Regras de ouro (não-negociáveis)
- **Camada 1 = imagem por padrão; SVG é fallback** (auto via `/health`). Nunca travar por falta de imagem. Ver [references/fallback-svg.md](references/fallback-svg.md).
- **Safe zones no 9:16**: imagem/ilustração na faixa de topo (entra direita→esquerda), **mensagem no meio**, **base e lateral-direita livres** da UI do app, caption do vídeo oculta. Ver [references/safe-zones.md](references/safe-zones.md).
- **Timing de fonte única**: o array `AUDIO[]` (durações reais via ffprobe) governa cena + animação + áudio.
- **Imagem fiel ao conceito + revisão semântica**: conferir CADA arte antes de aceitar (flux às vezes mete texto; evitar calendário/cupom/cards no prompt).
- **Movimento é do código (GSAP), não da imagem**; a imagem/SVG é execução fiel do conceito.
- **Sempre conferir frames** (não dá pra ouvir o áudio — pedir validação da locução ao usuário).
- **Começar simples → 1 cena-piloto → aprovar estilo → escalar.**

## Como usar (resumo)
1. Pré-flight. 2. `vpe scaffold "<assunto>" --preset <...>` → preencher o plano.
3. Roteiro + `assets/txt/sN.txt` → gerar WAVs (Kokoro) → medir durações → `AUDIO[]`.
4. `node scripts/gen-imgs.mjs` (se servidor up) **ou** deixar o modo SVG; conferir as artes.
5. `node scripts/composition-template.mjs` (16:9) e `--vertical` (9:16); `--svg`/`--noimg`/`--img` forçam o modo (sem flag = AUTO).
6. `hyperframes lint` + `inspect` + frames de draft → `render --quality high` nos 2 formatos.

## Scripts (molde testado — caso Hormozi)
- `scripts/composition-template.mjs` — gerador das 3 camadas (auto imagem→SVG, safe zones 9:16). Copie como `build-index.mjs`.
- `scripts/gen-imgs.mjs` — gera as ilustrações no flux2-klein (seeds fixos = reprodutível).
- `scripts/svg-icons.mjs` — ícones SVG animados por tema (fallback vetorial; `SVG_ICONS` + `SVG_ANIM`).
- `scripts/fetch-fonts.mjs` — baixa as .woff2 (Sora/Inter/JetBrains).

## Referências
- [references/pipeline.md](references/pipeline.md) — passo a passo detalhado e dependências.
- [references/mapa-libs-motion.md](references/mapa-libs-motion.md) — qual lib por tarefa (GSAP/D3/Three/Lottie/SVG).
- [references/safe-zones.md](references/safe-zones.md) — layout 9:16 p/ redes.
- [references/fallback-svg.md](references/fallback-svg.md) — imagem padrão, SVG fallback.

> Caso de referência completo e funcional: `videoprodutor/videos/hormozi-12-dicas/` (3 camadas, 16:9 + 9:16, com/sem/SVG).
> Decisões de arquitetura em `videoprodutor/docs/` (00–08). Motor: HyperFrames hoje; ver `docs/05`.
