# 04 — Arquitetura da fábrica (quem faz o quê)

## A linha de montagem

```
LINK / FONTE
   ↓  ENTENDER       extrai tema, dados, ângulo, objetivo
   ↓  PLANO          video-plan-editor → plano-edicao.json (roteiro, beats, tópicos, captions, CTA)
   ↓  DIREÇÃO+IMG    mdd/promptprof (brief fiel ao conceito) → flux2-klein (imagem) [+ revisão semântica]
   ↓  VOZ+TIMING     inemavox/Kokoro (narração) → durações + timestamps de palavra
   ↓  RENDER         motor único: camada 1 (parallax/cinema) + camadas 2/3 (texto cinético + ilustração)
   ↓                 timing de fonte única: durações do TTS governam cenas/texto/cortes
   VÍDEO PROFISSIONAL  (preset: propaganda | explicativo)
```

## Quem faz o quê

| Estágio | Peça | Novo / reuso |
|---|---|---|
| Orquestrar | **videoprodutor** (este projeto; evolução do agente `diretor-ecossistema`) | 🆕 novo |
| Entender o input | leitor de link/fonte | 🆕 pequeno |
| Plano + estrutura + roteiro | **video-plan-editor** (`plano-edicao.json`) | ✅ reuso |
| Direção de cena | **mdd** (storyboard, prompt final + negativo) | ✅ reuso |
| Refino de prompt | **promptprof/KairoBoost** | ✅ reuso |
| Imagem | **flux2-klein** (inemaimg) — helper `genimg.mjs` (pixflow) | ✅ reuso |
| Voz + timing | **inemavox / Kokoro** (+ alignment/estimativa de palavra) | ✅ reuso |
| Vocabulário/design (eases, tokens, ícones) | base do **video-explicativo / vpe** | ♻️ extrair p/ design system único |
| Componentes de render (camadas 2/3) | **remotion-templates** (54 TSX) | ♻️ adaptar |
| Render cinema (camada 1) | **pixflow-motion** | 🔧 aprimorar |
| Compositor (plano → composição) | **videoprodutor** | 🆕 peça-chave |

## Composição de uma cena (no Remotion, motor candidato)

```
<Sequence durationInFrames={dur_da_narração}>
  ① <ParallaxCanvas image depth camera effects/>      ← camada 1 (WebGL / pixflow)
  ② <Atmosfera leaks particles/>                       ← overlay atmosférico (futuro)
  ③ <ContentLayer>                                     ← camadas 2 e 3
       <Illustration kind="funil|seta|contador|bullets" progress/>   (camada 3 — remotion-templates)
       <KineticText caption timings accent/>                          (camada 2 — remotion-templates)
  ④ <Audio src={narração.wav}/>                        ← voz (Kokoro/inemavox)
</Sequence>
```

## O contrato único (faxina nº 1)

Hoje há 3 contratos quase iguais: `panels.json` (fontefilm), movie spec (pixflow), `plano-edicao.json` (vpe).
**Fundir num só**, com o `plano-edicao.json` como espinha (é o mais rico) + os campos que faltam:

- `caption` → vira spec de **texto cinético** (estilo, timings de palavra).
- bloco `illustration` por beat (kind do diagrama/ícone/bullets) — **mostrar o que se narra**.
- `duration_mode: locked|flexible` por cena (trava timing crítico contra beat-sync).
- `look`/preset herdado de um **registro de presets único** (resolve o problema "noir significa coisas diferentes").
- referência a assets de imagem (file/depth/prompt/seed) + áudio (track/narração por cena).

Interoperação de mercado (opcional, já analisada): exportar para **OpenTimelineIO** abre Premiere/Resolve/FCPX.

## As 3 fronteiras que evitam pisar no pé um do outro

1. **vpe ESPECIFICA, render IMPLEMENTA.** O plano diz "cena 9: ilustração=seta, motion=punch, keyword='10×'";
   o render tem o **componente** que realiza. Plano não traz código; render não inventa conteúdo.
2. **Design é COMPARTILHADO, não duplicado.** Tokens, eases, ícones num design system único que o vpe referencia
   e o render renderiza — senão "âmbar" e "punch" divergem entre skills.
3. **Imagem fiel ao conceito** (mdd/promptprof) + **revisão semântica** antes de aceitar — o erro do "café com amigo"
   foi pular essa validação.
