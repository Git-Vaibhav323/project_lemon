export default function BotanicGrid() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(70,100,50,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(70,100,50,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(70,100,50,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(70,100,50,0.028) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
    </>
  );
}
