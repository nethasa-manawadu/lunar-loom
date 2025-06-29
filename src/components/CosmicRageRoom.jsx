import { useState } from 'react';
import { GiAlienBug, GiAsteroid, GiBlackHoleBolas, GiSpaceship, GiPunch, GiSpikedDragonHead } from 'react-icons/gi';
import { FaRadiation, FaFire } from 'react-icons/fa';
import { RiAliensFill } from 'react-icons/ri';

export default function CosmicRageRoom() {
  // State
  const [anger, setAnger] = useState('');
  const [punches, setPunches] = useState(0);
  const [lastAction, setLastAction] = useState('');
  const [isSmashing, setIsSmashing] = useState(false);
  const [showCombo, setShowCombo] = useState(false);

  // Sound player function
  const playSound = (name) => {
    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.volume = 0.7;
    audio.play().catch(e => console.log(`${name} sound error:`, e));
  };

  // Actions
  const playPunch = () => {
    playSound('punch');
    const newPunches = punches + 1;
    setPunches(newPunches);
    
    // Check for combo
    if (newPunches % 10 === 0) {
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 2000);
      setLastAction(`🔥 COMBO! ${newPunches} alien punches! Galactic record!`);
    } else {
      setLastAction("👊 Cosmic punch landed! Alien tears detected.");
    }
  };

  const playSmash = () => {
    playSound('smash');
    setIsSmashing(true);
    setTimeout(() => setIsSmashing(false), 500);
    setLastAction("💥 Asteroid dust everywhere! Galactic cleanup needed.");
  };

  const playVoid = () => {
    if (!anger.trim()) return;
    playSound('void');
    setLastAction(`🕳️ "${anger}" was vaporized by quantum forces!`);
    setAnger('');
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          RAGE CHAMBER
        </h2>
        <div className="flex items-center space-x-2">
          <FaRadiation className="text-yellow-400 text-xl animate-pulse" />
          <div className="text-space-light/70 text-sm bg-space-primary/50 px-2 py-1 rounded-full">
            Safety Protocols: OFF
          </div>
        </div>
      </div>


      {/* Three rage columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Punch the Alien */}
        <div 
          className="bg-gradient-to-br from-space-primary to-red-900/20 p-5 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer group relative overflow-hidden"
          onClick={playPunch}
        >
          {showCombo && (
            <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
          )}
          <div className="flex flex-col items-center relative z-10">
            <div className="relative mb-3">
              <GiAlienBug className="text-6xl text-green-400 group-hover:text-red-400 transition-colors" />
              <GiPunch 
                className="absolute -right-2 -top-2 text-3xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </div>
            <p className="text-space-light mb-2 font-medium">Punch the Alien!</p>
            <div className="text-space-light text-sm bg-red-900/30 px-3 py-1 rounded-full border border-red-500/30">
              Punches: {punches}
            </div>
          </div>
        </div>

        {/* Smash Asteroid */}
        <div 
          className={`bg-gradient-to-br from-space-primary to-yellow-900/20 p-5 rounded-xl border border-yellow-500/30 hover:border-yellow-500/50 transition-all cursor-pointer ${
            isSmashing ? 'scale-90 bg-yellow-900/30' : 'scale-100'
          }`}
          onClick={playSmash}
        >
          <div className="flex flex-col items-center">
            <GiAsteroid className={`text-6xl text-yellow-400 ${isSmashing ? 'animate-spin' : ''}`} />
            <p className="text-space-light mt-3 font-medium">Smash Asteroid</p>
            <div className="text-space-light text-sm mt-2 bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-500/30">
              {isSmashing ? "CRACK!" : "Click to destroy"}
            </div>
          </div>
        </div>

        {/* Scream into Void */}
        <div className="bg-gradient-to-br from-space-primary to-purple-900/20 p-5 rounded-xl border border-purple-500/30">
          <div className="flex flex-col items-center">
            <GiBlackHoleBolas className="text-6xl text-purple-400 mb-3" />
            <p className="text-space-light mb-2 font-medium">Scream into Void</p>
            <input
              type="text"
              value={anger}
              onChange={(e) => setAnger(e.target.value)}
              placeholder="Type your cosmic rage..."
              className="w-full p-2 rounded-lg bg-space-secondary/80 border border-purple-500/30 text-space-light placeholder-space-light/50 mb-3 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            />
            <button
              onClick={playVoid}
              disabled={!anger.trim()}
              className={`w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 ${
                !anger.trim() 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } transition-colors`}
            >
              <GiSpaceship /> Launch Anger
            </button>
          </div>
        </div>
      </div>

      {/* Action Feedback */}
      {lastAction && (
        <div className="mt-6 p-3 bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg border border-space-accent/30 text-center text-space-light">
          <div className="flex items-center justify-center gap-2">
            <FaFire className="text-yellow-400" />
            <span>{lastAction}</span>
          </div>
        </div>
      )}

      {/* Combo Alert */}
      {showCombo && (
        <div className="mt-4 p-2 bg-yellow-900/30 rounded-lg border border-yellow-500/30 text-center text-yellow-400 font-bold">
          ✨ COMBO ACTIVATED! ✨
        </div>
      )}

      {/* Cosmic Footer */}
      <div className="text-center text-space-light/50 text-sm mt-6 flex items-center justify-center gap-1">
        <RiAliensFill />
        <span>Warning: Excessive rage may cause supernovas</span>
      </div>
    </div>
  );
}