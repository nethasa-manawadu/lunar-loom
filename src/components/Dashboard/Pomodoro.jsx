import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaRedo, FaSatelliteDish, FaRocket } from 'react-icons/fa';
import { GiSpaceship, GiGalaxy, GiAlienSkull, GiAstronautHelmet } from 'react-icons/gi';

const MODES = {
  work: {
    name: 'FOCUS MODE',
    color: 'from-purple-900/70 to-space-secondary',
    icon: <GiSpaceship className="text-space-accent text-3xl" />,
    border: 'border-space-accent',
    label: 'Engage Warp Drive',
    description: 'Maximum concentration for interstellar productivity'
  },
  break: {
    name: 'COSMIC BREAK',
    color: 'from-blue-900/70 to-space-primary',
    icon: <GiGalaxy className="text-space-light text-3xl" />,
    border: 'border-space-light',
    label: 'Orbit Relaxation',
    description: 'Recharge your quantum batteries'
  }
};

export default function CosmicPomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [cycles, setCycles] = useState(0);
  const [customTime, setCustomTime] = useState('');
  const [showRocket, setShowRocket] = useState(false);

  // Core timer
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime(prev => prev - 1), 1000);
    } else if (isActive && time === 0) {
      if (mode === 'work') {
        setCycles(c => c + 1);
        setMode('break');
        setTime(5 * 60);
        setShowRocket(true);
        setTimeout(() => setShowRocket(false), 2000);
      } else {
        setMode('work');
        setTime(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const applyCustomTime = (e) => {
    e.preventDefault();
    const mins = parseInt(customTime);
    if (mins >= 1 && mins <= 120) {
      setTime(mins * 60);
      setIsActive(false);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <motion.div
            initial={{ x: -100, y: 100, opacity: 0 }}
            animate={{ x: 400, y: -100, opacity: 1 }}
            exit={{ x: 600, y: -200, opacity: 0 }}
            className="fixed z-50 pointer-events-none"
          >
            <FaRocket className="text-yellow-400 text-4xl rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          WARP SPEED WORK
        </h2>
        <div className="flex items-center space-x-2 bg-space-primary/50 px-3 py-1 rounded-full">
          <GiAstronautHelmet className="text-space-light" />
          <span className="text-space-light">
            {cycles} {cycles === 1 ? 'Cycle' : 'Cycles'}
          </span>
        </div>
      </div>

      {/* Mode Display */}
      <div className={`bg-gradient-to-br ${MODES[mode].color} p-4 rounded-xl border ${MODES[mode].border} mb-6`}>
        <div className="flex items-center gap-3">
          {MODES[mode].icon}
          <div>
            <h2 className="text-2xl font-bold text-space-light">
              {MODES[mode].name}
            </h2>
            <p className="text-space-light/70 text-sm">
              {MODES[mode].description}
            </p>
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-7xl font-mono font-bold mb-6 text-center py-8 w-full bg-space-primary/10 rounded-xl text-space-light border border-space-accent/20">
        {formatTime()}
      </div>

      {/* Custom Time Input */}
      <form onSubmit={applyCustomTime} className="w-full mb-6">
        <div className="flex gap-3">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Set mission duration (1-120 mins)"
            className="flex-1 p-3 rounded-lg bg-space-primary/70 border border-space-accent/30 text-space-light placeholder-space-light/50 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 rounded-lg bg-space-accent text-space-secondary font-bold flex items-center gap-2"
          >
            <FaSatelliteDish /> Set
          </motion.button>
        </div>
      </form>

      {/* Control Buttons */}
      <div className="flex gap-3 w-full mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`flex-1 py-4 rounded-lg font-bold flex items-center justify-center gap-2 ${
            isActive ? 'bg-red-600/90 hover:bg-red-700/90' : 'bg-space-accent hover:bg-purple-700'
          } text-space-secondary shadow-lg ${isActive ? 'shadow-red-500/30' : 'shadow-purple-500/30'}`}
        >
          {isActive ? <><FaPause /> Pause Mission</> : <><FaPlay /> Start Warp</>}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="flex-1 py-4 rounded-lg bg-space-primary/70 border border-space-light/20 text-space-light font-bold flex items-center justify-center gap-2 shadow-lg shadow-space-light/10"
        >
          <FaRedo /> Reset Orbit
        </motion.button>
      </div>

      {/* Cycle Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-space-primary/30 p-3 rounded-lg border border-space-accent/20">
          <div className="text-space-light/70 text-sm">Current</div>
          <div className="text-xl font-bold text-space-light">
            {cycles % 4 + 1}/4
          </div>
        </div>
        <div className="bg-space-primary/30 p-3 rounded-lg border border-space-accent/20">
          <div className="text-space-light/70 text-sm">Today</div>
          <div className="text-xl font-bold text-space-light">
            {Math.floor(cycles / 4)}
          </div>
        </div>
        <div className="bg-space-primary/30 p-3 rounded-lg border border-space-accent/20">
          <div className="text-space-light/70 text-sm">Total</div>
          <div className="text-xl font-bold text-space-light">
            {cycles}
          </div>
        </div>
      </div>

      {/* Alien Motivator */}
      {time < 60 && isActive && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-space-primary/50 rounded-lg border border-yellow-400/30 flex items-center"
        >
          <GiAlienSkull className="text-yellow-400 text-2xl mr-2" />
          <div className="text-space-light text-sm">
            <strong>Final countdown!</strong> Keep going space cadet!
          </div>
        </motion.div>
      )}
    </div>
  );
}