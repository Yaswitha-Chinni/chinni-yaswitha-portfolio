import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/60 px-5 py-5 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <span className="font-mono text-xs font-semibold tracking-[0.12em] text-white/70">
          CHINNI YASWITHA<span className="text-cyan-300">.</span>
        </span>
        <div className="flex gap-4 text-white/35">
          <a href="https://github.com/Yaswitha-Chinni" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/chinni-yaswitha-097737327/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.instagram.com/yaswitha.chinni/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>
        <span className="font-mono text-[9px] tracking-[0.14em] text-white/25">
          © {new Date().getFullYear()} / BUILT WITH CURIOSITY
        </span>
      </div>
    </footer>
  );
}
