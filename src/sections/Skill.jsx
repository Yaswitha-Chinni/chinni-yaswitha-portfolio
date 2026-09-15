import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaJava, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaPython,
} from "react-icons/fa6";
import {
  SiGooglecloud, SiWordpress, SiNodedotjs, SiC, SiOpenai,
} from "react-icons/si";

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    { icon: <FaPython />, name: "Python" },
    { icon: <FaJava />, name: "Java" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <SiC />, name: "C" },
    { icon: <SiOpenai />, name: "Generative AI" },
    { icon: <SiOpenai />, name: "AI Agents" },
    { icon: <SiOpenai />, name: "Machine Learning" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiGooglecloud />, name: "Google Cloud" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <SiWordpress />, name: "WordPress" },
  ];

  return (
    <section id="skills" className="skills-section" style={{ transform: "translateZ(0)" }}>
      <div className="skill-glow skill-glow-left" />
      <div className="skill-glow skill-glow-right" />

      <motion.h2
        className="original-section-heading"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="original-section-subheading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="skills-marquee">
        <motion.div
          className="skills-marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: isMobile ? skills.length * 0.5 : 45, ease: "linear" }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="original-skill-item"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <span>{skill.icon}</span>
              <small>{skill.name}</small>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="original-scroll-indicator">
        <div className="original-mouse"><i /></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
