export default function GlobalGrid() {
  const lineColor = "rgba(255, 255, 255, 0.06)";

  return (
    <div
      className="pointer-events-none fixed inset-0 top-11 z-[15]"
      aria-hidden="true"
      style={{
        left: "105px",
        right: "105px",
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `calc(100% / 19) calc((100vw - 210px) / 19)`,
      }}
    />
  );
}