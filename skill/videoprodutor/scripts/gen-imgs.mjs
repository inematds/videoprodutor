// Gera as ilustrações de fundo (flux2-klein) — mesmo estilo (camada 1).
// Uso: node gen-imgs.mjs   (servidor inemaimg em :8000)
import { generateImage } from "/home/nmaldaner/projetos/pixflow/skill/cli/genimg.mjs";

const STYLE =
  "Flat editorial vector illustration, minimalist geometric shapes, dark navy background color 0D1321, " +
  "warm amber accent color FFC300 with subtle teal accents, premium fintech poster aesthetic, soft glow, " +
  "cinematic depth, lots of empty negative space on the LEFT, subject placed on the RIGHT side, " +
  "NO text, no words, no letters, no typography, no numbers";

const JOBS = [
  ["hook",  10, "an abstract business empire: ascending golden geometric skyline with upward trajectory lines, mastery and wealth"],
  ["r01",   21, "one single tall premium price tag towering far above several tiny price tags, anchor pricing contrast"],
  ["r02",   22, "a megaphone emitting expanding concentric sound waves spreading across a network of dots"],
  ["r03",   23, "an open glowing gift box, a free pass and open gateway, value handed forward for free"],
  ["r04",   24, "a rising bar chart with a checkmark badge and testimonial proof cards beside a crossed-out empty speech bubble"],
  ["r05",   50, "a bold upward arrow rising over an ascending bar chart with small price tags, pricing growth"],
  ["r06",   26, "a funnel merging two interlocking gears into one single stream, sales and marketing unified"],
  ["r07",   27, "overlapping speech bubbles and a survey clipboard, customer conversation and feedback"],
  ["r08",   28, "a speedometer gauge dashboard with the needle sweeping toward maximum, marketing focus"],
  ["r09",   29, "a rocket launching steeply upward leaving a multiplier trail, one bar far taller than the others, explosive growth"],
  ["r10",   30, "a bullseye target with a single arrow hitting the exact center, one focused beam of light"],
  ["r11",   31, "a steep mountain peak with a small flag at the summit, overcoming a hard climb"],
  ["r12",   32, "a circular refresh loop arrow wrapping around a weekly calendar, repetition and habit cycle"],
];

for (const [name, seed, subject] of JOBS) {
  const prompt = `${subject}. ${STYLE}`;
  process.stdout.write(`gen ${name} (seed ${seed})... `);
  try {
    await generateImage(`assets/img/${name}.png`, prompt, { model: "flux2-klein", width: 1280, height: 720, seed });
    console.log("ok");
  } catch (e) {
    console.log("ERRO:", e.message);
  }
}
console.log("== done ==");
