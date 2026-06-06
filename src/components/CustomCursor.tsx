import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx, dy = ry;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']"));
    };

    let raf = 0;
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-[var(--gold)] transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          opacity: hover ? 0.9 : 0.55,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
