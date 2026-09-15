import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import clickSoundFile from "./mouse-click.mp3";

const items = ["Home", "Skills", "Projects", "Education", "Experience", "Testimonials", "Contact"];

export default function Menu({ isOpen, onClose }) {
  const close = (index) => {
    const sound = new Audio(clickSoundFile);
    sound.play().catch(() => {});
    window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { index } }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          initial={{ clipPath: "circle(0% at 8% 8%)" }}
          animate={{ clipPath: "circle(150% at 8% 8%)" }}
          exit={{ clipPath: "circle(0% at 8% 8%)" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <button type="button" onClick={onClose} className="absolute right-6 top-6 rounded-full border border-white/10 p-3 text-2xl text-white hover:border-pink-400 hover:text-pink-300" aria-label="Close menu">
            <FiX />
          </button>

          <ul className="space-y-4 text-center">
            {items.map((item, index) => (
              <motion.li key={item} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 + index * .06 }}>
                <button type="button" onClick={() => close(index)} className="text-4xl font-bold tracking-tight text-white transition hover:text-pink-300 md:text-6xl">
                  {item}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
