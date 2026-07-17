# Revisão de texto (antes da voz e dos textos de tela)

Etapa obrigatória **antes** de gerar os WAVs (`assets/txt/sN.txt`) e **antes** de fixar os
textos de tela (camada 2 — texto cinético: número/título/barra/ênfase — e `caption`).
Acento errado contamina os **dois** lados: vira typo visível na tela **e** muda a tônica/pronúncia
no Kokoro (ele fonemiza pela grafia escrita).

## Princípio: cada frase tem DUAS formas

| Forma | Onde vai | Como escrever |
|---|---|---|
| **Tela** | texto cinético (camada 2) + `caption` | PT-BR com acentuação **correta**; termos em inglês na **grafia original** (`deploy`, `design`, `prompt`). |
| **Fala** | `assets/txt/sN.txt` (vai pro TTS) | Mesma frase, mas (a) números/siglas/URLs **expandidos** ("10×"→"dez vezes", "R$500 mil"→"quinhentos mil reais") e (b) termos em inglês **reescritos foneticamente** em PT-BR. |

## Checklist de revisão

1. **Acentuação** — varrer **cada** palavra (á à â ã · é ê · í · ó ô õ · ú · ç · crase).
2. **Ortografia / digitação / concordância**.
3. **Números/siglas/URLs (forma-fala)** — "10×"→"dez vezes"; "R$500 mil"→"quinhentos mil reais"; `inema.club`→"inema ponto club".
4. **Termos em inglês** — manter a grafia original **na tela**; na **forma-fala**, trocar pela grafia fonética (tabela abaixo). Na dúvida, **gerar um WAV de teste** e o usuário ouvir.

### Acentos que mais escapam (PT-BR)
vídeo · você · é · só · está · três · código · página · conteúdo · princípio · mecânica · ícone ·
áudio · até · também · então · número · análise · fácil · rápido · automático · específico ·
inteligência · experiência · usuário · próprio · já · não.

## Termos em inglês → grafia fonética (forma-fala)

Léxico-semente (IA / dev / marketing / vendas). **Só na forma-fala** (`txt/sN.txt`); na tela fica
o original. Aproximações — quando não bater de primeira, ajustar pelo teste de WAV.

| Inglês (tela) | Forma-fala (txt) | | Inglês (tela) | Forma-fala (txt) |
|---|---|---|---|---|
| skill / skills | skiu / skiuz | | deploy | deplói |
| prompt | prompt *(testar; senão "prónpti")* | | design | dizáin |
| framework | frêimuork | | software | sóftuer |
| cloud | claud | | update | âpdeit |
| release | rilís | | feature | fítcher |
| review | rivíu | | dashboard | déshbord |
| workflow | uórkflôu | | startup | stártâp |
| insight | ínsait | | mindset | máindset |
| funnel | fânel | | lead | líid |
| copy | cópi | | landing page | lénding peidj |
| upsell | âpsel | | branding | brénding |

**Geralmente NÃO precisam respelling** (o fonemizador PT já lê aceitável): `link`, `site`, `web`,
`online`, `email` (imêiu), `player`, `kit`. Não force — respelling demais piora.

### Como testar uma pronúncia (quando em dúvida)
```bash
printf '%s\n' "a forma-fala da palavra aqui" > /tmp/probe.txt
npx -y hyperframes tts /tmp/probe.txt --voice pf_dora --speed 0.98 --output /tmp/probe.wav
```
Pedir o usuário ouvir e escolher a grafia que soa certo (eu não ouço áudio). Fixar a vencedora no `txt/sN.txt`.

## Saída da etapa
- `txt/sN.txt` revisados (acentos OK + números/inglês na forma-fala) → prontos pro Kokoro.
- Texto cinético + `caption` revisados (acentos OK + inglês na grafia original) → prontos pra tela.
