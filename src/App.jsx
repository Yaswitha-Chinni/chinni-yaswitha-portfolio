import React, { lazy, Suspense, useEffect, useState } from "react";
import IntroScreen from "./components/Intro";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import FullPageScroll from "./components/FullPageScroll";

const Home = lazy(() => import("./sections/Home"));
const Skill = lazy(() => import("./sections/Skill"));
const Project = lazy(() => import("./sections/Project"));
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          {isDesktop && <Cursor isDesktop={isDesktop} />}
          <Nav />
          <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-xs tracking-[.25em] text-white/40">LOADING PORTFOLIO...</div>}>
            <FullPageScroll>
              <Home />
              <Skill />
              <Project />
              <About />
              <Experience />
              <Testimonial />
              <Contact />
            </FullPageScroll>
          </Suspense>
        </>
      )}
    </div>
  );
}
