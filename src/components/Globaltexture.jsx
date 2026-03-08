export default function GlobalTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 mix-blend-lighten z-[20] opacity-50"
      style={{
        backgroundImage: "url('/images/textures.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden="true"
    />
  );
}