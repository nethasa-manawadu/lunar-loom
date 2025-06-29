import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiOrbital } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-space-primary/50 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-10"
      >
        <div className="flex justify-center items-center space-x-3">
          <GiOrbital className="text-space-accent text-3xl" />
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-accent to-purple-400">
            LunarLoop
          </h1>
        </div>
        <p className="text-space-light/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Blast off into focus mode! Jot notes, launch tasks, time your missions with the Pomodoro rocket, and chill with spacey tunes while stress drifts into the void.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mb-12"
      >
        {[
          { title: 'Astro Pomodoro', desc: '25-minute focus bursts with mandatory zero-gravity breaks' },
          { title: 'Orbital Player', desc: 'Ambient space sounds to drown out Earthy noise' },
          { title: 'Stellar Notes', desc: 'Jot ideas that vanish like shooting stars if unsaved' },
          { title: 'Space Farm', desc: 'Harvest your knowledge like cosmic crops under a binary star' },
          { title: 'Alien Mailbox', desc: 'Receive stress-busting messages from extraterrestrial pen pals' },
          { title: 'Void Rage Room', desc: 'Punch aliens, smash planets - NASA-approved anger management' },
        ].map(({ title, desc }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-space-secondary rounded-xl shadow-lg p-5 transition-all border border-space-accent/10"
          >
            <h3 className="text-lg font-semibold text-space-accent mb-1">{title}</h3>
            <p className="text-sm text-space-light/80">{desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/signup"
          className="bg-space-accent hover:bg-purple-700 text-white px-6 py-3 rounded-full text-base font-medium shadow-md shadow-purple-500/20 transition-all"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
