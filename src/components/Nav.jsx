import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import clickSoundFile from "./key5.wav";
import backgroundSongFile from "./song.mp3";

export default function Navbar() {
  const [menuopen, setMenuopen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const clickAudio = useRef(null);
  const musicAudio = useRef(null);

  useEffect(() => {
    clickAudio.current = new Audio(clickSoundFile);
    musicAudio.current = new Audio(backgroundSongFile);
    musicAudio.current.loop = true;
    return () => musicAudio.current?.pause();
  }, []);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    clickAudio.current?.play().catch(() => {});
    setMenuopen((value) => !value);
  };

  const toggleMusic = () => {
    if (!musicAudio.current) return;
    if (isMusicPlaying) {
      musicAudio.current.pause();
      setIsMusicPlaying(false);
    } else {
      musicAudio.current.play().then(() => setIsMusicPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <nav className={`sajal-nav ${visible ? "nav-visible" : ""}`}>
        <button className="nav-brand" onClick={toggleMenu} aria-label="Open portfolio menu">
          <span>CY</span><b>.</b>
          <small>PORTFOLIO</small>
        </button>

        <div className="nav-actions">
          <button className="music-button" onClick={toggleMusic}>
            {isMusicPlaying ? "STOP MUSIC" : "PLAY MUSIC"}
          </button>
        </div>
      </nav>

      <Menu isOpen={menuopen} onClose={() => setMenuopen(false)} />
    </>
  );
}
