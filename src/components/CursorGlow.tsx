"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
    const reduceMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    setPrefersReduced(reduceMotionMedia.matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReduced) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isTouchDevice, prefersReduced, x, y]);

  if (isTouchDevice || prefersReduced) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(247,183,255,0.11) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
