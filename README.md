# videoprodutor — o Orquestrador

> **Norte:** entro com **um link / fonte de dados** → sai o **plano + a execução** de um **vídeo profissional** (propaganda ou explicativo). Uma coisa só, ponta a ponta.

Este projeto é o **orquestrador** ("o Produtor") do ecossistema de vídeo do usuário. Ele não reinventa
render nem geração — ele **coordena as peças que já existem** (planejamento, direção, prompt, imagem, voz,
render) numa linha de montagem única.

## Por que existe

O usuário já tem ~11 skills e 6 motores de vídeo espalhados (ver `docs/01`). **~70% da fábrica já existe**,
mas falta a peça que **conecta o link à execução automática**. Este projeto é essa peça.

Decisão estratégica registrada: **não refazer do zero, não manter silos** — montar a fábrica reusando o que
já funciona, com Remotion como motor de render unificado (camada cinema do pixflow + 54 componentes do
remotion-templates para texto cinético e ilustração de tópico).

## A linha de montagem

```
LINK / FONTE
  → entender (tema, dados, ângulo)
  → PLANO        (video-plan-editor → plano-edicao.json: roteiro, beats, tópicos, CTA)
  → DIREÇÃO+IMG  (mdd/promptprof brief fiel → flux2-klein imagem)
  → VOZ+TIMING   (inemavox/Kokoro narração + durações + timestamps)
  → RENDER       (Remotion: camada 1 parallax/cinema + camadas 2/3 texto cinético + ilustração)
  → VÍDEO PROFISSIONAL  (preset: propaganda | explicativo)
```

## Documentos (todos os relatórios desta análise)

- [`docs/00-norte-e-proposito.md`](docs/00-norte-e-proposito.md) — o objetivo e o propósito do produto.
- [`docs/01-mapa-ecossistema-skills.md`](docs/01-mapa-ecossistema-skills.md) — 11 skills, 6 motores, sobreposições, lacunas.
- [`docs/02-deep-dive-6-projetos.md`](docs/02-deep-dive-6-projetos.md) — mdd, fontefilm, promptprof, vpe, remotion-templates, hyperframes: ativos reaproveitáveis.
- [`docs/03-camadas-de-movimento.md`](docs/03-camadas-de-movimento.md) — as 3 camadas (cinema / texto cinético / ilustração) e onde cada uma já existe.
- [`docs/04-arquitetura-fabrica.md`](docs/04-arquitetura-fabrica.md) — a fábrica, quem faz o quê, contrato único.
- [`docs/05-decisao-motor.md`](docs/05-decisao-motor.md) — Remotion × HyperFrames (recomendação com evidência).
- [`docs/06-decisoes-pendentes-e-backlog.md`](docs/06-decisoes-pendentes-e-backlog.md) — o que falta decidir e construir.

## Estado

Projeto recém-criado (fase de arquitetura). Nada de código ainda — a base é a análise consolidada em `docs/`.
Peças reusáveis vivem em projetos próprios: `~/projetos/pixflow` (render cinema), `~/projetos/skill-video-plan-editor`,
`~/projetos/mdd`, `~/projetos/promptprof`, `~/projetos/fontefilm`, `~/projetos/remotion-templates`, `~/projetos/inemaimg` (flux2-klein), `~/projetos/inemavox` (voz).
