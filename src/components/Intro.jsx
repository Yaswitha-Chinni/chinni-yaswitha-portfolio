import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const greetings = [
  "Hello",
  "नमस्ते",
  "నమస్కారం",
  "வணக்கம்",
  "ನಮಸ್ಕಾರ",
  "こんにちは",
  "Hola",
];

export default function IntroScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = window.setTimeout(() => setIndex((value) => value + 1), 360);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            key={greetings[index]}
            className="intro-word"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.2 }}
          >
            {greetings[index]}
          </motion.div>
          <div className="intro-progress">
            <span style={{ width: `${((index + 1) / greetings.length) * 100}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
