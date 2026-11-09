import { useRef, useEffect } from "react";

/**
 * 3D tilt wrapper: the child tilts in 3D toward the cursor (perspective
 * transform + glare highlight). Falls back to a flat card on touch devices
 * and respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  max = 10,
  className = "",
  glare = true,
  ...rest
}) {
  const ref = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    function onMove(e) {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateZ(0)`;
        el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf.current);
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} {...rest}>
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  );
}
