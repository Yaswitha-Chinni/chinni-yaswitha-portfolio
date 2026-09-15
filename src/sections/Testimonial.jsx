import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Exceptional work with a fantastic UI. The attention to detail and overall experience are truly impressive.",
    name: "Farmaarya",
    role: "FOUNDER",
    initials: "FA",
  },
  {
    quote:
      "Great features, thoughtful color choices, and a very polished user experience. It feels both modern and professional.",
    name: "Designing World",
    role: "CEO",
    initials: "DW",
  },
  {
    quote:
      "A well-crafted blend of creativity and technology. The interface is clean, intuitive, and engaging from the first interaction.",
    name: "Arjun Reddy",
    role: "FOUNDER",
    initials: "AR",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section id="testimonials" className="testimonials-wrapper">
      <div className="stars-container">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="testimonial-star"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 61) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              "--duration": `${2 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <motion.h2
        className="testimonial-original-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What People Say
      </motion.h2>

      <div className="testimonial-carousel">
        {testimonials.map((t, i) => {
          let offset = i - index;

          if (
            offset < -Math.floor(testimonials.length / 2)
          ) {
            offset += testimonials.length;
          }

          if (
            offset > Math.floor(testimonials.length / 2)
          ) {
            offset -= testimonials.length;
          }

          const active = offset === 0;

          return (
            <motion.article
              key={t.name}
              className="testimonial-original-card"
              animate={{
                opacity: active ? 1 : 0.25,
                scale: active ? 1 : 0.72,
                x: offset * 250,
                zIndex: 10 - Math.abs(offset),
                filter: active ? "blur(0px)" : "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <div className="testimonial-avatar">
                {t.initials}
              </div>

              <p>“{t.quote}”</p>

              <div>
                <h3>{t.name}</h3>
                <span>{t.role}</span>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="testimonial-original-controls">
        <button
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="next"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </section>
  );
}