# 07 — Caso de exemplo: pipeline funcional ("12 Regras do Hormozi")

> **Primeira execução end-to-end da fábrica que deu certo.** Produzido em 2026-06-07 sob o `videoprodutor`,
> em `videos/hormozi-12-dicas/`. Saídas: `renders/hormozi-12-16x9.mp4` e `renders/hormozi-12-9x16.mp4`
> (~107s, 15 cenas, áudio embutido). Este doc registra **por que funcionou** e **como repetir**.

## Contexto

Assunto: lista das 12 dicas de negócios do Alex Hormozi. Objetivo: vídeo punchy/viral. Feito pela skill
`video-explicativo` (HyperFrames HTML→MP4 + Kokoro TTS), tudo **local, sem chave de API**. É a contraprova do
fracasso registrado em `docs/03` (o teste no pixflow — "lindo de ver, vazio de ensinar").

## Por que deu certo desta vez (vs. os 5 erros do docs/03)

| Erro antigo (docs/03) | O que foi feito agora |
|---|---|
| 1. Sem narração | Roteiro → **TTS Kokoro** (voz `pf_dora`), 15 faixas |
| 2. Só camada 1 (fundo), repetitivo | **As 3 camadas juntas** em cada cena |
| 3. Imagem não batia ("café com amigo") | **Conferência de cada imagem** + regen das 2 ruins (texto) → fidelidade semântica |
| 4. Legenda = rótulo estático | **Texto cinético + count-up** animado |
| 5. Não mostrava o que narra | **Ilustração por tópico** (camada 3, chip de dado) |

Três decisões de método foram o que realmente fechou:

1. **Timing de fonte única.** Um array `AUDIO[]` com durações **reais** (medidas via `ffprobe`) governa
   cena + animação + áudio ao mesmo tempo → voz e movimento sempre batidos (sem ajuste no olho).
2. **Validar antes de gastar render.** `lint` (0 erros) + `inspect` (0 overflow) + **frames extraídos de draft**
   conferidos antes de cada render em alta. Erro de layout aparece num PNG, não num MP4 de 7 min.
3. **Piloto antes de escalar.** 1 cena com as 3 camadas → aprovação do estilo → só então as 12.

## As 3 camadas (implementação concreta)

- **Camada 1 — fundo ilustrado:** 13 imagens flux2-klein (`assets/img/*.png`), estilo flat/editorial âmbar
  fiel ao conceito, com **véu + parallax/ken-burns**. No 9:16 a imagem vira **faixa inferior** (hero band)
  pra não ser engolida pelo véu. fecho/CTA ficam **sem imagem** (fundo glow).
- **Camada 2 — texto cinético:** número + título + barra + essência (GSAP).
- **Camada 3 — ilustração de tópico:** **chip de dado com count-up** por regra (Receita ▲ 37%, Alcance ▲ 10×,
  Foco 1·1·1…). Números **ilustrativos/figurativos** (decisão registrada com o usuário: opção "c").

## O pipeline (ordem exata)

```
1. PLANO     vpe scaffold "<assunto>" --preset viral > plano-edicao.json
2. ROTEIRO   SCRIPT.md → 15 textos em assets/txt/sN.txt (expandir siglas/números p/ fala)
3. VOZ       npx hyperframes tts assets/txt/sN.txt --voice pf_dora --speed 0.98 → assets/audio/sN.wav
             ffprobe mede as durações reais → array AUDIO[]
4. IMAGEM    node gen-imgs.mjs → flux2-klein (:8000) → assets/img/*.png  (+ conferir cada uma / regerar)
5. COMPOR    node build-index.mjs  (monta index.html; 3 camadas; timing do AUDIO[])
             node build-index.mjs --vertical  (9:16)
6. VALIDAR   npx hyperframes lint  (0 erros) ; npx hyperframes inspect --samples 16  (0 overflow)
             extrair frames de um draft e conferir visual
7. RENDER    npx hyperframes render --quality high --output renders/<nome>-16x9.mp4
             (gerar vertical, renderizar, restaurar 16:9)
```

## Dependências (e pontos frágeis)

| Dependência | Papel | Como checar | Cuidado |
|---|---|---|---|
| Node 22+ (usado: 24) | runtime | `node -v` | — |
| FFmpeg (6.1) | mede áudio / monta MP4 | `ffmpeg -version` | git-bash/Windows: usar `-nostdin` |
| HyperFrames 0.6.80 | HTML→MP4 (Chrome+FFmpeg) | `npx hyperframes doctor` | render baixa **GSAP via CDN** → exige **internet no render** |
| Kokoro TTS | narração local | `python3 -c "import kokoro_onnx"` | 1ª vez ~340MB; voz `pf_dora` |
| **inemaimg (servidor)** | gera imagens flux2-klein | `curl localhost:8000/health` → `status:ok` | **tem que estar no ar** (Docker/GPU). Elo mais frágil |
| flux2-klein (modelo) | ilustração | `curl localhost:8000/models` | às vezes mete **texto embaralhado** → conferir/regerar; evitar calendário/cupom/cards no prompt |
| vpe (video-plan-editor) | plano/estratégia | `which vpe` | — |
| skill `video-explicativo` | templates + house style | — | base (fontes, CSS dark premium, CTA INEMA) |
| GPU (DGX/GB10) | roda flux2 + kokoro | `nvidia-smi` | sem ela, geração inviável |

**Pré-flight (3 checagens antes de começar):**
```bash
npx hyperframes doctor
curl -s localhost:8000/health
python3 -c "import kokoro_onnx, soundfile"
```

### Política de fallback de imagem (regra)

A geração de imagem é **opcional, com fallback**. Se `curl -s localhost:8000/health` falhar (servidor inemaimg
fora do ar, sem GPU, ou qualquer API de imagem indisponível), **não travar** — gerar as artes como **SVG**:

- **Camada 3** (ícones/diagramas de tópico): **sempre pode ser SVG** (preferível — animável, leve, sem risco de
  texto embaralhado, determinístico/versionável).
- **Camada 1** (fundo): com inemaimg/API → flux2-klein (look editorial 3D); sem ele → **fundo SVG flat/editorial**
  (formas + `linearGradient` + glow `feGaussianBlur`), no mesmo espírito visual.

Assim o vídeo sai mesmo sem gerador de imagem. SVG nasce determinístico, nítido em qualquer resolução, ~KB por arquivo,
versionável (texto no git) e animável nativamente no HyperFrames/GSAP (draw-on, morph).

## Como repetir com outro assunto

A pasta `videos/hormozi-12-dicas/` é o **template funcional**. Para um novo vídeo:
1. copiar a pasta; trocar os arrays **`TIPS` / `CHIPS` / `CAPTIONS`** em `build-index.mjs`;
2. reescrever `assets/txt/sN.txt` e regerar os WAVs (Kokoro);
3. ajustar assuntos + **seeds** das imagens em `gen-imgs.mjs` e rodar (conferindo cada uma);
4. atualizar `AUDIO[]` com as durações novas (`ffprobe`);
5. `lint` + `inspect` + frames → `render` 16:9 e 9:16.

## Artefatos reutilizáveis (na pasta do caso)

`build-index.mjs` (gerador v2) · `gen-imgs.mjs` (geração reprodutível por seed) · `build-pilot.mjs` (piloto 1 cena) ·
`assets/img/` (13 ilustrações) · `assets/audio/` + `assets/txt/` (narração) · `SCRIPT.md` · `plano-edicao.json` · `README.md`.
