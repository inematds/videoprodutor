// BASELINE — como sai SEM a skill (palpite "primeira tentativa CSS").
// Brief: title card "INEMA" entra + subtítulo aparece embaixo (90f @30fps).
// Problemas típicos: opacity por caractere, interpolate linear sem clamp,
// transform com magic numbers, sem spring/fps, easing inexistente.
import { useCurrentFrame, AbsoluteFill } from "remotion";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const word = "INEMA";

  return (
    <AbsoluteFill style={{ background: "#0D1321", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 4 }}>
        {word.split("").map((c, i) => (
          // ❌ opacity por caractere (a própria skill desaconselha)
          <span
            key={i}
            style={{
              fontSize: 120,
              color: "#FFC300",
              fontWeight: 800,
              // ❌ interpolate "na mão" sem clamp → estoura fora do range
              opacity: Math.min(1, Math.max(0, (frame - i * 5) / 20)),
              // ❌ magic numbers, sem spring, movimento linear "duro"
              transform: `translateY(${Math.max(0, 40 - frame * 2)}px)`,
            }}
          >
            {c}
          </span>
        ))}
      </div>
      {/* ❌ subtítulo com transição CSS (não funciona em render frame-seek) */}
      <p style={{ color: "#748CAB", fontSize: 32, marginTop: 24, transition: "opacity .5s", opacity: frame > 30 ? 1 : 0 }}>
        do texto ao vídeo
      </p>
    </AbsoluteFill>
  );
};
