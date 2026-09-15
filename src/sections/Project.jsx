import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa6";

const projects = [
  {
    id: 1,
    title: "Smart Hostel Allocation System",
    description: "A full-stack campus solution for student registration, room allocation, availability tracking, booking confirmation and admin management.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL", "JWT", "Google Cloud Run"],
    github: "https://github.com/Yaswitha-Chinni/Smart-Hostel-Allocation-System",
    accent: "242, 47, 168",
    label: "FULL STACK / CAMPUS SYSTEM",
  },
  {
    id: 2,
    title: "NetShieldAI",
    description: "A network security and threat-monitoring project focused on anomaly detection, traffic analysis and security monitoring.",
    tags: ["AI", "Python", "Security", "Anomaly Detection"],
    github: "https://github.com/Yaswitha-Chinni",
    accent: "87, 185, 255",
    label: "AI / SECURITY",
  },
  {
    id: 3,
    title: "AI Viral Reel Creator",
    description: "An AI-powered content creation project for generating viral reel concepts and content ideas.",
    tags: ["Generative AI", "Automation", "Content"],
    github: "https://github.com/Yaswitha-Chinni/ai_viral_reel_creator",
    accent: "255, 62, 150",
    label: "GENERATIVE AI",
  },
  {
    id: 4,
    title: "Skill Gap → Project Generator",
    description: "An AI-agent project that turns a student's year, college tier and existing skills into real-world project ideas and resume-ready descriptions.",
    tags: ["AI Agents", "Prompt Engineering", "Generative AI"],
    github: "https://github.com/Yaswitha-Chinni",
    accent: "135, 92, 255",
    label: "AI AGENT",
  },
];

const experiments = [
  "Nike Shoes Collection UI", "YouTube UI Clone", "Rock Paper Scissors",
  "JavaScript To-Do List", "Amazon Shipping Calculator", "Cart Quantity Tracker",
  "Loading Spinners", "Login Form", "Profile Card UI", "Job Application Form", "Tribute Page",
];

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const sectionRef = useRef(null);
  const cooldown = useRef(false);
  const activeRef = useRef(0);
  const touchY = useRef(0);

  useEffect(() => { activeRef.current = activeIndex; }, [activeIndex]);

  const goTo = useCallback((newIndex) => {
    if (cooldown.current || newIndex < 0 || newIndex >= projects.length || newIndex === activeRef.current) return;
    cooldown.current = true;
    setFade(false);
    window.setTimeout(() => {
      setActiveIndex(newIndex);
      setFade(true);
    }, 250);
    window.setTimeout(() => { cooldown.current = false; }, 700);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        if (activeRef.current < projects.length - 1) { e.preventDefault(); e.stopPropagation(); goTo(activeRef.current + 1); }
      } else if (e.deltaY < 0) {
        if (activeRef.current > 0) { e.preventDefault(); e.stopPropagation(); goTo(activeRef.current - 1); }
      }
    };
    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  const project = projects[activeIndex];
  const accent = `rgb(${project.accent})`;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="original-projects-section"
      onTouchStart={(e) => { touchY.current = e.touches[0].clientY; }}
      onTouchEnd={(e) => {
        const diff = touchY.current - e.changedTouches[0].clientY;
        if (Math.abs(diff) >= 60) goTo(activeRef.current + (diff > 0 ? 1 : -1));
      }}
    >
      <div className="project-backdrop" style={{ "--accent": project.accent, opacity: fade ? 1 : 0 }} />
      <div className="project-backdrop-grid" />

      <motion.h2
        className="original-project-heading"
        style={{ color: accent }}
        animate={{ opacity: fade ? 1 : 0 }}
      >
        My Projects
      </motion.h2>

      <motion.div
        className="original-project-content"
        animate={{ opacity: fade ? 1 : 0, y: fade ? 0 : 30 }}
        transition={{ duration: 0.35 }}
      >
        <div className="original-project-copy">
          <div className="project-number" style={{ color: `rgba(${project.accent}, .72)` }}>
            0{project.id}
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="original-project-tags">
            {project.tags.map((tag) => (
              <span key={tag} style={{ color: accent, borderColor: `rgba(${project.accent}, .25)`, background: `rgba(${project.accent}, .08)` }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="original-project-buttons">
            <a href={project.github} target="_blank" rel="noreferrer" className="project-live-button" style={{ background: accent }}>
              GitHub <FaGithub />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="project-github-button">
              Explore <FaArrowRight />
            </a>
          </div>
        </div>

        <div className="project-horizontal-art" style={{ "--accent": project.accent }}>
          <div className="project-art-orbit" />
          <div className="project-art-panel">
            <span>{project.label}</span>
            <strong>{project.title}</strong>
            <small>BUILD / TEST / DEPLOY</small>
          </div>
        </div>
      </motion.div>

      <div className="project-dots">
        {projects.map((item, i) => (
          <button
            key={item.id}
            aria-label={`Show project ${item.id}`}
            onClick={() => goTo(i)}
            style={{ background: i === activeIndex ? accent : "#333" }}
            className={i === activeIndex ? "active" : ""}
          />
        ))}
      </div>

      <div className="project-scroll-text">Scroll to explore projects</div>

      <div className="experiments-strip">
        <span>FRONTEND EXPERIMENTS</span>
        <div>{experiments.map((item, i) => <b key={item}>{String(i + 1).padStart(2, "0")} {item}</b>)}</div>
      </div>
    </section>
  );
}
