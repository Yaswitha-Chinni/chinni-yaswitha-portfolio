import React, { useMemo, useEffect, useState, useRef } from "react";
import Background from "../components/Background";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Hero from "../components/Hero.jsx";
import clickSoundFile from "../components/key5.wav";

const socials = [
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chinni-yaswitha-097737327/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Yaswitha-Chinni" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/yaswitha.chinni/" },
];

export default function Home() {
  const roles = useMemo(
    () => ["AI/ML Engineer", "Generative AI Builder", "AI Agents Enthusiast"],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const current = roles[index];
    const timeout = window.setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length) setDeleting(true);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else {
        setDeleting(false);
        setIndex((v) => (v + 1) % roles.length);
      }
    }, deleting ? 60 : 90);
    return () => window.clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  const handleClickSound = () => {
    if (!audioRef.current) audioRef.current = new Audio(clickSoundFile);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const goToProjects = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { index: 2 } }));
  };

  return (
    <section id="home" className="sajal-home">
      <Background />

      <div className="home-inner">
        <div className="home-copy">
          <motion.div
            className="role-line sajal-role"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>{roles[index].substring(0, subIndex)}</span>
            <i />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            <span className="hello-gradient">Hello, I'm </span>
            <em>Chinni Yaswitha</em>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            B.Tech AIML student at KITS Warangal who learns by building—exploring
            Generative AI, AI Agents, Machine Learning and intelligent applications.
          </motion.p>

          <div className="hero-actions">
            <a href="/resume.pdf" download onClick={handleClickSound} className="sajal-button sajal-button-solid">
              My Resume
            </a>
            <a href="#projects" onClick={goToProjects} className="sajal-button sajal-button-outline">
              Explore Work
            </a>
          </div>

          <div className="social-row">
            {socials.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" onClick={handleClickSound}>
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="home-visual">
          <Hero />
        </div>
      </div>

      <div className="scroll-cue">
        <span className="scroll-mouse"><i /></span>
        <small>SCROLL</small>
      </div>
    </section>
  );
}
