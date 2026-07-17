# Fallback SVG — imagem é o padrão, SVG é o reserva

**PADRÃO FIXO: camada 1 = IMAGEM (flux2-klein) por padrão; SVG só quando a imagem não está disponível.**

No pré-flight, `curl -s localhost:8000/health`:
- **OK** → camada 1 = imagem raster (look editorial 3D), via `scripts/gen-imgs.mjs`.
- **fora do ar / sem API de imagem** → **não travar** → camada 1 = **SVG** (`scripts/svg-icons.mjs`).

O gerador (`composition-template.mjs`) faz isso **automático**: sem flag, ele sonda `/health` e escolhe.
Flags forçam: `--img` (imagem), `--svg` (vetor), `--noimg` (só fundo glow).

## Por que SVG é um bom fallback
- Determinístico, ~KB por arquivo, nítido em qualquer resolução, versionável (texto no git).
- **Sem risco de texto embaralhado** (problema do raster).
- **Animável** nativamente (GSAP): cada ícone tem animação própria em `SVG_ANIM` (foguete sobe, alvo crava, etc.).

## Camada 3 sempre pode ser SVG
Ícones/diagramas de tópico (seta, alvo, funil, megafone, contador) são geométricos → **preferir SVG** mesmo
quando há imagem de fundo. É o nicho do Lottie (ver mapa-libs-motion.md).

## Regra de ouro
Conferir CADA arte antes de aceitar (raster às vezes mete texto/elemento errado → regerar/trocar seed;
no prompt, evitar calendário/cupom/cards que induzem texto).
