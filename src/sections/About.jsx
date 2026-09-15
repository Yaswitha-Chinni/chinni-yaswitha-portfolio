import React from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";

const education = [
  {
    id: 1,
    role: "B.Tech — Artificial Intelligence & Machine Learning",
    company: "Kakatiya Institute of Technology & Science, Warangal",
    period: "2024 – 2028 • Expected Graduation 2028 • CGPA 9.2/10",
  },
  {
    id: 2,
    role: "Intermediate",
    company: "Telangana Minorities Residential Junior College",
    period: "98%",
  },
  {
    id: 3,
    role: "10th Class",
    company: "Telangana Minorities Residential School",
    period: "100%",
  },
];

export default function About() {
  return (
    <section id="education" className="education-section">
      <Background />

      <h2 className="original-education-heading">My Education</h2>

      <div className="education-timeline">
        <div className="education-line" />
        {education.map((item, idx) => {
          const isLeft = idx % 2 !== 0;
          return (
            <div key={item.id} className="education-timeline-item">
              <motion.div
                className={`education-timeline-card ${isLeft ? "left" : "right"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", stiffness: 70, damping: 20 }}
              >
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <span>{item.period}</span>
              </motion.div>
              <div className="education-dot" />
            </div>
          );
        })}
      </div>

      <div className="original-scroll-indicator">
        <div className="original-mouse"><i /></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
