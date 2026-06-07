# 12 Regras do Hormozi — vídeo

Primeiro vídeo produzido **sob o `videoprodutor`** (exemplo end-to-end da fábrica). Gerado pela skill
`video-explicativo` (HyperFrames HTML→MP4 + TTS Kokoro local). Dark premium, accent âmbar, CTA INEMA.CLUB.

**v2 — as 3 camadas de movimento** (ver `docs/03` do projeto):
- **Camada 1** — fundo ILUSTRADO por cena (flux2-klein, `assets/img/*.png`) + véu + parallax/ken-burns.
  No 9:16 a imagem vira faixa inferior (hero band). fecho/CTA ficam sem imagem (fundo glow).
- **Camada 2** — texto cinético (número + título + barra + essência).
- **Camada 3** — ilustração de tópico: chip de dado por regra (count-up / valor; números ILUSTRATIVOS).

## Entregáveis
- `renders/hormozi-12-16x9.mp4` — YouTube (1920×1080)
- `renders/hormozi-12-9x16.mp4` — Shorts/Reels (1080×1920)
- Duração: ~107s · 15 cenas (hook + 12 cards numerados + fecho + CTA) · voz `pf_dora`

## Como regerar
```bash
node build-index.mjs            # 16:9  → index.html
node build-index.mjs --vertical # 9:16  → index.html
npx hyperframes render --quality high --output renders/<nome>.mp4
```
Editar conteúdo: arrays `TIPS`/`CHIPS`/`CAPTIONS` em `build-index.mjs`. Narração: `assets/txt/sN.txt`
(regerar WAV com `npx hyperframes tts ... --voice pf_dora`). Timing vem de `AUDIO[]` (durações reais via ffprobe).
Regerar as ilustrações: `node gen-imgs.mjs` (servidor inemaimg/flux2-klein em :8000; seeds fixos = reprodutível).

## Pipeline
plano (`plano-edicao.json`, preset viral) → roteiro (`SCRIPT.md`) → TTS (`assets/audio/sN.wav`) →
composição (`build-index.mjs`) → render (`renders/`).

## Passos necessários (do zero ao MP4)

**0. Pré-flight — checar dependências (tudo local, sem chave de API):**
```bash
npx hyperframes doctor                      # motor de render (Chrome+FFmpeg)
curl -s localhost:8000/health               # servidor inemaimg/flux2-klein no ar? (precisa GPU) — elo mais frágil
python3 -c "import kokoro_onnx, soundfile"  # TTS Kokoro ok?
node -v ; ffmpeg -version | head -1 ; which vpe
```

**1. Plano (estratégia):**
```bash
vpe scaffold "<assunto>" --preset viral --title "<título>" > plano-edicao.json
vpe validate plano-edicao.json
```

**2. Roteiro:** escrever `SCRIPT.md` e um `assets/txt/sN.txt` por cena
(expandir siglas/números para a fala: "10×" → "dez vezes", "R$500 mil" → "quinhentos mil reais").

**3. Fontes (1ª vez):** `node fetch-fonts.mjs` (baixa .woff2 → `assets/fonts/fonts.css`).

**4. Narração + timing:**
```bash
for i in $(seq 1 15); do npx hyperframes tts "assets/txt/s$i.txt" --voice pf_dora --speed 0.98 --output "assets/audio/s$i.wav"; done
for i in $(seq 1 15); do ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "assets/audio/s$i.wav"; done
```
→ colar as durações no array `AUDIO[]` do `build-index.mjs`.

**5. Imagens (camada 1):** ajustar assuntos/seeds em `gen-imgs.mjs` e rodar `node gen-imgs.mjs`.
**CONFERIR cada PNG** (flux às vezes mete texto embaralhado → regerar com outro seed; evitar calendário/cupom/cards no prompt).

> **Fallback (regra):** se o servidor inemaimg/API de imagem **não** estiver no ar (`curl localhost:8000/health` falha),
> **não travar** — usar **SVG** no lugar. Camada 3 (ícones/diagramas) sempre pode ser SVG; camada 1 (fundo) vira
> SVG flat/editorial (formas + gradiente + glow). Ver `../../docs/07-caso-pipeline-funcional.md`.

**6. Compor + validar:**
```bash
node build-index.mjs                         # 16:9 → index.html
npx hyperframes lint                         # 0 erros
npx hyperframes inspect --samples 16         # 0 overflow
```
Conferir frames de um draft antes do render caro:
`npx hyperframes render --quality draft --output renders/draft.mp4` → extrair PNGs com `ffmpeg -ss <t> -vframes 1`.

**7. Render final (os 2 formatos):**
```bash
node build-index.mjs            && npx hyperframes render --quality high --output renders/<nome>-16x9.mp4
node build-index.mjs --vertical && npx hyperframes render --quality high --output renders/<nome>-9x16.mp4
node build-index.mjs            # restaura o index.html em 16:9
```

> **Regras de ouro:** timing de fonte única (`AUDIO[]` governa cena+animação+áudio); validar/conferir frames
> antes do render em alta; fazer 1 cena-piloto antes de escalar. Detalhes em `../../docs/07-caso-pipeline-funcional.md`.
