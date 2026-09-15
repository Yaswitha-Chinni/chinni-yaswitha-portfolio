import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function Hero() {
  return (
    <div className="hero-visual">
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-orbit orbit-three" />

      <motion.div
        className="hero-ai-label"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>AI / ML</span>
        <small>LEARNING · BUILDING · EXPLORING</small>
      </motion.div>

      <div className="spline-robot" aria-label="Interactive futuristic robot">
        <Spline scene={SCENE_URL} />
      </div>

      <div className="hero-system">
        <span>INTERACTIVE SYSTEM</span>
        <strong>AI / 01</strong>
      </div>
    </div>
  );
}
