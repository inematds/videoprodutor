// COM A SKILL remotion-best-practices — segue rules/timing.md + text-animations.md.
// Mesmo brief. Diferenças: spring() fps-aware com config nomeada, interpolate
// com extrapolate clamp, delay por spring, frame-based puro (sem CSS transition),
// sem opacity por caractere (skill: "Never use per-character opacity").
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";

const SMOOTH = { damping: 200 };            // reveal suave, sem bounce (rules/timing.md)
const SNAPPY = { damping: 20, stiffness: 200 }; // entrada com leve pop

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // título: escala+sobe com spring (motion natural, fps-aware)
  const enter = spring({ frame, fps, config: SNAPPY });
  const titleY = interpolate(enter, [0, 1], [40, 0]);
  const titleOpacity = interpolate(enter, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // subtítulo: spring com DELAY (rules/timing.md → delay), sem CSS transition
  const sub = spring({ frame, fps, delay: 18, config: SMOOTH });
  const subOpacity = interpolate(sub, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY = interpolate(sub, [0, 1], [16, 0]);

  return (
    <AbsoluteFill style={{ background: "#0D1321", justifyContent: "center", alignItems: "center" }}>
      {/* uma transform no bloco inteiro (sem opacity por caractere) */}
      <h1 style={{ fontSize: 120, fontWeight: 800, color: "#FFC300", opacity: titleOpacity, transform: `translateY(${titleY}px) scale(${0.9 + 0.1 * enter})` }}>
        INEMA
      </h1>
      <p style={{ fontSize: 32, color: "#748CAB", marginTop: 24, opacity: subOpacity, transform: `translateY(${subY}px)` }}>
        do texto ao vídeo
      </p>
    </AbsoluteFill>
  );
};
