# videoprodutor — o Produtor 🎬

> **Norte:** entra um **link / assunto** → sai o **vídeo profissional** (propaganda ou explicativo), ponta a ponta. Uma coisa só.

Orquestrador do ecossistema de vídeo: não reinventa render nem geração — **coordena as peças que já existem**
(plano, roteiro, revisão, voz, imagem, render) numa linha de montagem única. Tudo roda **local, sem chave de API**.
Padrão: PT-BR, dark premium âmbar, 16:9 **e** 9:16, CTA INEMA.CLUB.

📖 **[Guia de uso completo →](https://inematds.github.io/videoprodutor/guia/)**

## A skill (fonte única)

A skill vive em **[`skills/videoprodutor/`](skills/videoprodutor/)** — é a **fonte única** do projeto.
Ela veio do repo `skill-videoprodutor`, que **será aposentado**; não edite cópias fora daqui.

```
skills/videoprodutor/
├── SKILL.md                      # o orquestrador (v0.2.0)
├── CHANGELOG.md
├── references/
│   ├── revisao-texto.md          # acentuação PT-BR + pronúncia de inglês (tela × fala)
│   ├── pipeline.md               # passo a passo detalhado + dependências
│   ├── mapa-libs-motion.md       # qual lib por tarefa (GSAP/D3/Three/Lottie/SVG)
│   ├── safe-zones.md             # layout 9:16 para redes
│   └── fallback-svg.md           # imagem padrão, SVG fallback
└── scripts/
    ├── composition-template.mjs  # gerador das 3 camadas (auto imagem→SVG, safe zones)
    ├── gen-imgs.mjs              # ilustrações no flux2-klein (seeds fixos)
    ├── svg-icons.mjs             # ícones SVG animados (fallback vetorial)
    ├── fetch-fonts.mjs           # baixa as .woff2 (Sora/Inter/JetBrains)
    └── assets/fonts/             # fontes já baixadas
```

## As 3 camadas

1. **Cinema** — fundo com profundidade: imagem (flux2-klein) com véu + parallax/ken-burns.
2. **Texto cinético** — número/título/barra/ênfase animados com GSAP.
3. **Ilustração do tópico** — ícone/diagrama/contador que MOSTRA o que se narra.

## A linha de montagem

```
LINK/ASSUNTO
 → PLANO        vpe (video-plan-editor) → plano-edicao.json
 → ROTEIRO      SCRIPT.md + assets/txt/sN.txt
 → REVISÃO      tela (PT-BR acentuado) × fala (inglês foneticamente)
 → VOZ+TIMING   Kokoro pf_dora → assets/audio/sN.wav ; ffprobe → AUDIO[]
 → ARTE         AUTO: servidor de imagem up → flux2-klein ; fora → SVG
 → COMPOR       composition-template.mjs (3 camadas, timing do AUDIO[])
 → VALIDAR      hyperframes lint + inspect + frames de draft
 → RENDER       hyperframes render --quality high → 16:9 e 9:16
```

## Estrutura do repo

| Pasta | O que é |
|---|---|
| `skills/videoprodutor/` | **a skill** — fonte única (SKILL.md + references + scripts). |
| `guia/` | página landing + guia de uso (GitHub Pages). |
| `docs/` | a análise de arquitetura que originou o projeto (00–09). |
| `videos/hormozi-12-dicas/` | o caso de referência funcional de onde a skill foi destilada. |
| `experiments/remotion-ab/` | teste A/B (nível de código) da skill `remotion-best-practices`. |
| `capa/` | capa oficial do catálogo. |

## Pré-flight

```bash
npx hyperframes doctor                      # motor de render (Chrome+FFmpeg)
curl -s localhost:8000/health               # servidor de imagem — OPCIONAL, tem fallback SVG
python3 -c "import kokoro_onnx, soundfile"  # TTS local
node -v ; ffmpeg -version | head -1 ; which vpe
```

Mínimo para um vídeo (modo SVG): Node 22+ · FFmpeg · HyperFrames · internet no render (GSAP via CDN) · Kokoro/GPU (voz).

## Documentos de arquitetura

- [`docs/00-norte-e-proposito.md`](docs/00-norte-e-proposito.md) — objetivo e propósito.
- [`docs/01-mapa-ecossistema-skills.md`](docs/01-mapa-ecossistema-skills.md) — skills, motores, sobreposições, lacunas.
- [`docs/02-deep-dive-6-projetos.md`](docs/02-deep-dive-6-projetos.md) — ativos reaproveitáveis.
- [`docs/03-camadas-de-movimento.md`](docs/03-camadas-de-movimento.md) — as 3 camadas e onde já existem.
- [`docs/04-arquitetura-fabrica.md`](docs/04-arquitetura-fabrica.md) — a fábrica e o contrato único.
- [`docs/05-decisao-motor.md`](docs/05-decisao-motor.md) — Remotion × HyperFrames.
- [`docs/06-decisoes-pendentes-e-backlog.md`](docs/06-decisoes-pendentes-e-backlog.md) — o que falta decidir/construir.
- [`docs/07-caso-pipeline-funcional.md`](docs/07-caso-pipeline-funcional.md) — o caso Hormozi 12 e como repetir.
- [`docs/08-mapa-libs-motion.md`](docs/08-mapa-libs-motion.md) — mapa biblioteca→tarefa.
- [`docs/09-base-conhecimento-edicao-camera.md`](docs/09-base-conhecimento-edicao-camera.md) — base de edição e câmera.

## Estado

Skill **v0.2.0**, funcional: produz o vídeo ponta a ponta com o molde testado. Motor de render hoje: **HyperFrames**.
Backlog e decisões em aberto (motor a longo prazo, timing por palavra, voz padrão): `docs/06`.

---

[INEMA.CLUB](https://inema.club)
