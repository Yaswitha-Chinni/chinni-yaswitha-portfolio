import React, { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionVariants = {
  enter: (direction) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FullPageScroll({ children }) {
  const sections = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const cooldown = useRef(false);
  const activeRef = useRef(0);
  const touchY = useRef(0);

  useEffect(() => { activeRef.current = activeIndex; }, [activeIndex]);

  const goTo = useCallback((newIndex, dir = newIndex > activeRef.current ? 1 : -1) => {
    if (cooldown.current || newIndex < 0 || newIndex >= sections.length || newIndex === activeRef.current) return;
    cooldown.current = true;
    setDirection(dir);
    setActiveIndex(newIndex);
    window.setTimeout(() => { cooldown.current = false; }, 950);
  }, [sections.length]);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 0) goTo(activeRef.current + 1, 1);
      else if (event.deltaY < 0) goTo(activeRef.current - 1, -1);
    };
    const handleKey = (event) => {
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        goTo(activeRef.current + 1, 1);
      }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(event.key)) {
        event.preventDefault();
        goTo(activeRef.current - 1, -1);
      }
    };
    const handleNavigate = (event) => goTo(Number(event.detail?.index ?? 0));
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("portfolio:navigate", handleNavigate);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("portfolio:navigate", handleNavigate);
    };
  }, [goTo]);

  return (
    <div
      onTouchStart={(event) => { touchY.current = event.touches[0].clientY; }}
      onTouchEnd={(event) => {
        const diff = touchY.current - event.changedTouches[0].clientY;
        if (Math.abs(diff) < 60) return;
        goTo(activeRef.current + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
      }}
      style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#050505" }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", willChange: "transform, opacity" }}
        >
          <Suspense fallback={<div className="h-full bg-[#050505]" />}>{sections[activeIndex]}</Suspense>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 font-mono text-[9px] tracking-[0.35em] text-white/30">
        {String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
      </div>
    </div>
  );
}
