import { useEffect, useRef } from "react";

/**
 * Scroll-reveal wrapper: fades + slides content in when it enters the
 * viewport. Direction: "up" (default), "left", "right", "zoom".
 */
export default function Reveal({
  children,
  as: Tag = "div",
  dir = "up",
  delay = 0,
  className = "",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-in");
          } else {
            el.classList.remove("is-in");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -5% 0px",
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      {...props}
      ref={ref}
      className={`reveal reveal--${dir} ${className}`}
    >
      {children}
    </Tag>
  );
}
