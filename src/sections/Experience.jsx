import React from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";

const experience = [
  ["AI Intern", "Edunet Foundation", "May 2026 – June 2026", "INTERNSHIP"],
  ["Web Development Intern", "InAmigos Foundation", "May 2026 – June 2026", "INTERNSHIP"],
  ["Social Media Marketing Intern", "InAmigos Foundation", "December 2025 – January 2026", "INTERNSHIP"],
  ["Infosys Springboard", "Pragati / Springboard learning experience", "Professional development", "LEARNING"],
  ["Freelance Designer", "lyortech", "August 2024 – October 2024", "FREELANCE"],
  ["Google Student Ambassador — India", "GSA 2026 • GID: 2992", "Student technology community", "LEADERSHIP"],
  ["Campus Mantri — GeeksforGeeks", "Student technical community", "Leadership & learning initiatives", "LEADERSHIP"],
  ["IRC Member", "Academic / innovation community", "Active contribution", "COMMUNITY"],
];

const achievements = [
  ["13.74", "SECONDS", "International Book of Records"],
  ["2026", "GSA", "Google Student Ambassador"],
  ["GFG", "CAMPUS", "GeeksforGeeks Campus Mantri"],
];

const certifications = [
  "Google Prompting Essentials",
  "Introduction to AI — Google",
  "Use AI as a Creative or Expert Partner — Google",
  "Google Prompting Essentials Specialization",
  "Build & Deploy Apps with Google AI Studio & Multilingual AI Speech App with Vibe Coding — HCL GUVI",
  "Green Unicorn Challenge — Unstop",
  "Hack The Matrix — Vibe Coding Hackathon — Unstop",
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <Background />
      <div className="experience-shell">
        <div className="section-kicker">05 / FIELD NOTES</div>
        <h2 className="section-title">EXPERIENCE <em>& PROOF</em></h2>

        <div className="experience-timeline">
          {experience.map(([role, company, period, type], index) => (
            <motion.article
              key={`${role}-${company}`}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.04 }}
              className="experience-item"
            >
              <span className="experience-number">0{index + 1}</span>
              <div className="experience-content">
                <small>{type}</small>
                <h3>{role}</h3>
                <p>{company}</p>
              </div>
              <time>{period}</time>
            </motion.article>
          ))}
        </div>

        <div className="proof-grid">
          <div className="proof-panel">
            <div className="mini-kicker">ACHIEVEMENTS</div>
            <div className="achievement-row">
              {achievements.map(([value, unit, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{unit}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="proof-panel">
            <div className="mini-kicker">CERTIFICATIONS</div>
            <div className="cert-scroll">
              {certifications.map((item, index) => (
                <div key={item}><b>0{index + 1}</b>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
