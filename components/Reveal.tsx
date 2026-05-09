"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: RevealVariant;
  delay?: number; // ms
  className?: string;
  /** trigger once (default true) — set false to re-animate every time it scrolls into view */
  once?: boolean;
  /** rootMargin for the IntersectionObserver */
  rootMargin?: string;
}

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  fade: "reveal-fade",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  once = true,
  rootMargin = "0px 0px -10% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin]);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  // @ts-expect-error — dynamic tag with ref
  return (
    <Tag
      ref={ref}
      style={style}
      className={`${variantClass[variant]} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
