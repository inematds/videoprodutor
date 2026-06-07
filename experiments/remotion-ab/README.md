# Teste A/B — Remotion Skills (mesmo brief, com × sem skill)

Brief: title card "INEMA" entra + subtítulo aparece embaixo (90 frames @30fps).
Skill testada: `remotion-best-practices` (instalada via `npx skills add remotion-dev/skills`).

> Obs: `remotion-templates` aqui **não é projeto Remotion executável** (sem node_modules/Root.tsx),
> então o A/B é **no nível do código** — que é exatamente onde a skill atua (muda o código gerado).
> Para prova visual, é preciso scaffold de um projeto Remotion + `npm install` + render (oferecido à parte).

## Diferenças que a skill força (baseline → com-skill)

| Aspecto | Baseline (sem) | Com a skill | Regra |
|---|---|---|---|
| Movimento | `interpolate` linear na mão / magic numbers | **`spring({frame, fps})`** fps-aware | timing.md |
| Configuração | bounce aleatório/duro | configs nomeadas **`{damping:200}` / `{damping:20,stiffness:200}`** | timing.md |
| Range | sem clamp (estoura fora de 0–1) | **`extrapolate*: 'clamp'`** | timing.md |
| Delay | comparações `frame > 30` | **`spring({delay})`** | timing.md |
| Texto | **opacity por caractere** (❌) | bloco único, sem per-char opacity | text-animations.md ("Never use per-character opacity") |
| Timing do subtítulo | **CSS `transition`** (quebra em render frame-seek) | tudo frame-based | animations.md |

## Veredito
A skill **muda concretamente o código**: troca interpolação linear+CSS por `spring` fps-aware
com configs nomeadas, clamps e delays — e remove anti-padrões (opacity por caractere, CSS transition).
É o mesmo salto que o vídeo descreve ("genérico → spring correto, timing natural"), só que verificável
no código. Próximo passo p/ prova visual: render real num projeto Remotion (scaffold + install).
