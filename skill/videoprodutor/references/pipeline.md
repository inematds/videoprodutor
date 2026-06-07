# Pipeline detalhado + dependências

## Passos (do zero ao MP4)

**0. Pré-flight**
```bash
npx hyperframes doctor
curl -s localhost:8000/health   # imagem (opcional, fallback SVG)
python3 -c "import kokoro_onnx, soundfile"
node -v ; ffmpeg -version | head -1 ; which vpe
```

**1. Plano** — `vpe scaffold "<assunto>" --preset <suave|promo|vendas|viral|acao> --title "<t>" > plano-edicao.json` → `vpe validate`.

**2. Roteiro** — `SCRIPT.md` + um `assets/txt/sN.txt` por cena (expandir p/ fala: "10×"→"dez vezes", "R$500 mil"→"quinhentos mil reais").

**3. Fontes (1ª vez)** — `node scripts/fetch-fonts.mjs`.

**4. Voz + timing**
```bash
for i in $(seq 1 N); do npx hyperframes tts "assets/txt/s$i.txt" --voice pf_dora --speed 0.98 --output "assets/audio/s$i.wav"; done
for i in $(seq 1 N); do ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "assets/audio/s$i.wav"; done
```
→ colar durações no `AUDIO[]` do gerador.

**5. Arte (camada 1)** — AUTO: servidor up → `node scripts/gen-imgs.mjs` (flux2-klein); fora → modo SVG. **Conferir cada arte.**

**6. Compor + validar**
```bash
node build-index.mjs                 # 16:9 (cópia de composition-template.mjs)
npx hyperframes lint                 # 0 erros
npx hyperframes inspect --samples 16 # 0 overflow
```
Conferir frames de um draft antes do render caro.

**7. Render final**
```bash
node build-index.mjs            && npx hyperframes render --quality high --output renders/<nome>-16x9.mp4
node build-index.mjs --vertical && npx hyperframes render --quality high --output renders/<nome>-9x16.mp4
```

## Dependências

| Dependência | Papel | Obrigatória? |
|---|---|---|
| Node 22+ | runtime | ✅ |
| FFmpeg | mede áudio / monta MP4 | ✅ |
| HyperFrames (npx) | HTML→MP4 (Chrome+FFmpeg) | ✅ |
| Internet no render | baixa GSAP via CDN | ✅ |
| Kokoro TTS + GPU | narração local | ✅ p/ voz |
| vpe (video-plan-editor) | plano | ➖ opcional |
| inemaimg :8000 + flux2-klein + GPU | imagem (camada 1) | ⚠️ opcional → fallback SVG |

Mínimo p/ um vídeo (modo SVG): Node + FFmpeg + HyperFrames + internet + Kokoro/GPU (voz).

## Regras de ouro
Timing de fonte única (`AUDIO[]`); validar/conferir frames antes do render; piloto antes de escalar;
imagem fiel ao conceito (conferir cada uma); imagem padrão / SVG fallback (auto); safe zones no 9:16.
