export default function AgentSpline() {
  return (
    <div
      className="
        absolute
        top-[550px]
        right-[-150px]
        z-50
        w-[350px]
        h-[350px]
        pointer-events-auto
      "
    >
      <spline-viewer url={import.meta.env.VITE_SPLINE_URL} />
    </div>
  );
}
