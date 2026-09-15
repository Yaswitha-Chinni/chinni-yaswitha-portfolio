import React, { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import AstraImg from "../assets/Astra.png";
import Footer from "./Footer";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      "1981974b-8694-43dc-bb96-0d73df653b01"
    );

    formData.append(
      "subject",
      `Portfolio enquiry from ${formData.get("name")}`
    );

    formData.append(
      "from_name",
      "Chinni Yaswitha Portfolio"
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSent(true);
        form.reset();

        setTimeout(() => {
          setSent(false);
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Unable to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact-wrapper">
      <div className="stars-container">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="testimonial-star"
            style={{
              top: `${(i * 43) % 100}%`,
              left: `${(i * 67) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              "--duration": `${2 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="contact-original-content">
        <img
          src={AstraImg}
          alt="Astronaut illustration"
          className="astra-image"
        />

        <div className="contact-original-card">
          <h2>Let's Connect</h2>

          <form onSubmit={sendEmail}>
            <input
              name="name"
              placeholder="Full Name"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
            />

            <select
              name="service"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Service
              </option>

              <option value="AI / ML">
                AI / ML
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Collaboration">
                Collaboration
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <textarea
              name="message"
              rows="4"
              placeholder="Message..."
              required
            />

            <button type="submit">
              {sent ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-identity">
        CHINNI YASWITHA
      </div>

      <div className="contact-socials-original">
        <a
          href="https://github.com/Yaswitha-Chinni"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/chinni-yaswitha-097737327/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.instagram.com/yaswitha.chinni/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </div>

      <Footer />
    </section>
  );
}