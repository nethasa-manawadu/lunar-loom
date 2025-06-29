import { useState, useEffect, useRef } from 'react';

export const useMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/bg-music.m4a'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Autoplay policy fix: Play on first user interaction
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback prevented:", e));
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    return () => {
      audioRef.current.pause();
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Playback error:", e));
    }

    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggleMusic };
};
