# Changelog — videoprodutor

Versionamento: **`vX.yy.xxx`** — `yy` = recurso (feature), `xxx` = correção (bug).

## 0.2.0 — Revisão de texto + pronúncia de inglês
Recurso: nova etapa **antes** da voz e dos textos de tela, fechando um buraco (o texto ia direto pra
tela e pro TTS sem revisão de acentuação/ortografia).

- **Passo REVISÃO** inserido na linha de montagem (após ROTEIRO, antes de VOZ+TIMING) e no "Como usar".
- **Contrato de duas formas por frase**: **tela** (texto cinético da camada 2 + `caption`) = PT-BR
  acentuado + inglês na grafia original; **fala** (`txt/sN.txt`) = números/siglas expandidos + inglês
  reescrito foneticamente (ex.: `deploy`→"deplói", `funnel`→"fânel").
- **Pronúncia de termos em inglês**: como PT-BR usa muito termo em inglês e o Kokoro fonemiza pela
  grafia escrita, a forma-fala troca por grafia fonética. Na dúvida, gerar WAV de teste e o usuário ouvir.
- Nova referência [`references/revisao-texto.md`](references/revisao-texto.md) (checklist + léxico
  inglês→PT + como testar). Regra de ouro nova no `SKILL.md`; `pipeline.md` atualizado.

## 0.1.0 — Release inicial
- Orquestrador **link/assunto → vídeo profissional** ponta a ponta, reusando o ecossistema; autocontido
  (traz o molde testado de 3 camadas). Tudo local, **sem chave de API**. 16:9 **e** 9:16, CTA INEMA.CLUB.
- **3 camadas**: cinema (imagem flux2-klein com véu + parallax/ken-burns), texto cinético (GSAP),
  ilustração do tópico (ícone/diagrama/contador).
- **Imagem é padrão; SVG é fallback automático** (via `/health`); **safe zones no 9:16**; timing de
  fonte única (`AUDIO[]` via ffprobe).
- Destilação executável do caso de referência "Hormozi 12 dicas" + análise de arquitetura do ecossistema.
