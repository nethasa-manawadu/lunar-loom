import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { GiAlienBug, GiSpaceship, GiGalaxy, GiStaryu, GiSpaceSuit } from 'react-icons/gi';
import { FaRocket, FaSatellite, FaRegStar, FaStar } from 'react-icons/fa';

const alienMessages = [
  {
    id: 1,
    subject: "Greetings from Zog-9!",
    content: "Dear Earthling, I heard you're stressed. On my planet, we relieve stress by floating upside down in anti-gravity pudding. Maybe try standing on your head while eating Jell-O? Works every time!",
    mood: "silly",
    icon: <GiAlienBug className="text-green-400" />
  },
  {
    id: 2,
    subject: "Urgent Cosmic Advice!",
    content: "ATTENTION: Your planet's 'stress' is just your body's way of saying it wants to dance uncontrollably. I prescribe 3 minutes of flailing like you're being attacked by space bees.",
    mood: "energetic",
    icon: <FaRocket className="text-yellow-400" />
  },
  {
    id: 3,
    subject: "Intergalactic Wisdom",
    content: "On my homeworld, we have a saying: 'A problem shared is a problem halved... unless you share it with a black hole, then it's gone forever!' Try yelling your worries into a pillow - same effect!",
    mood: "wise",
    icon: <GiGalaxy className="text-purple-400" />
  },
  {
    id: 4,
    subject: "You're Amazing!",
    content: "My 17 eyes can see your awesomeness from 300 light-years away! Remember: Even supernovas need to take breaks between explosions. You're doing great!",
    mood: "uplifting",
    icon: <FaStar className="text-yellow-300" />
  },
  {
    id: 5,
    subject: "Emergency Happiness Beam Activated!",
    content: "SENDING GOOD VIBES TO YOUR COORDINATES! According to my calculations, you're exactly where you need to be. Also, my calculator is made of cheese, so trust me on this.",
    mood: "funny",
    icon: <GiStaryu className="text-blue-400" />
  },
  {
    id: 6,
    subject: "Secret Space Knowledge",
    content: "Did you know? The Andromeda Galaxy thinks your problems are approximately 0.0000001% as heavy as a neutrino. Basically weightless! Go eat some ice cream.",
    mood: "scientific",
    icon: <FaSatellite className="text-teal-400" />
  },
  {
    id: 7,
    subject: "Alien High-Five!",
    content: "(That's my 7-fingered high-five)! You survived 100% of your bad days so far. That's better stats than most asteroids! Keep going!",
    mood: "supportive",
    icon: <GiSpaceSuit className="text-red-400" />
  }
];

const moodColors = {
  silly: 'text-green-400',
  energetic: 'text-yellow-400',
  wise: 'text-purple-400',
  uplifting: 'text-yellow-300',
  funny: 'text-blue-400',
  scientific: 'text-teal-400',
  supportive: 'text-red-400'
};

export default function AlienMailbox() {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [mailboxOpen, setMailboxOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [currentAlien, setCurrentAlien] = useState(null);

  // Load saved messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('alienMessages');
    if (saved) {
      setSavedMessages(JSON.parse(saved));
    }
  }, []);

  const getNewMessage = () => {
    setLoading(true);
    setMailboxOpen(false);
    
    // Simulate "transmission delay"
    setTimeout(() => {
      const unreadMessages = alienMessages.filter(
        msg => !savedMessages.some(saved => saved.id === msg.id)
      );
      
      const messagePool = unreadMessages.length > 0 ? unreadMessages : alienMessages;
      const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
      
      setCurrentMessage(randomMessage);
      setCurrentAlien(randomMessage.icon);
      
      // Save to localStorage if not already saved
      if (!savedMessages.some(msg => msg.id === randomMessage.id)) {
        const updatedSaved = [...savedMessages, randomMessage];
        setSavedMessages(updatedSaved);
        localStorage.setItem('alienMessages', JSON.stringify(updatedSaved));
      }
      
      setLoading(false);
      setMailboxOpen(true);
    }, 1500);
  };

  const closeMailbox = () => {
    setMailboxOpen(false);
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          INTERGALACTIC MOTIVATION HUB
        </h2>
        {savedMessages.length > 0 && (
          <div className="flex items-center space-x-2 bg-space-primary/50 px-3 py-1 rounded-full">
            <GiSpaceship className="text-space-light" />
            <span className="text-space-light">
              {savedMessages.length} Saved
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-6 p-4 bg-space-primary/50 rounded-lg border border-space-accent/30">
        <p className="text-space-light italic text-sm">
          "Receive cosmic wisdom from across the galaxy when you need it most.
          <span className="block mt-1 text-yellow-400">Warning: May cause spontaneous happiness bursts.</span>
        </p>
      </div>

      <AnimatePresence>
        {!mailboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-8xl mb-6"
            >
              {currentAlien || <GiAlienBug className="text-green-400 mx-auto" />}
            </motion.div>
            
            <p className="text-space-light">
              Need cosmic encouragement? Open a transmission from our interstellar support network!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={getNewMessage}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${loading ? 'bg-gray-600' : 'bg-space-accent hover:bg-purple-700'} text-space-secondary shadow-lg ${loading ? '' : 'shadow-purple-500/30'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning the cosmos...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <GiSpaceship /> Open Transmission
                </span>
              )}
            </motion.button>
            
            {savedMessages.length > 0 && (
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="text-space-accent hover:text-purple-300 text-sm flex items-center justify-center gap-1"
              >
                {showSaved ? (
                  <>
                    <FaRegStar /> Hide Archive
                  </>
                ) : (
                  <>
                    <FaStar /> View Archive ({savedMessages.length})
                  </>
                )}
              </button>
            )}
            
            {showSaved && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3 overflow-hidden"
              >
                {savedMessages.map((msg) => (
                  <motion.div
                    key={msg.id} 
                    whileHover={{ x: 5 }}
                    className="p-3 bg-space-primary rounded-lg border border-space-accent/20 cursor-pointer hover:bg-space-primary/70"
                    onClick={() => {
                      setCurrentMessage(msg);
                      setCurrentAlien(msg.icon);
                      setMailboxOpen(true);
                      setShowSaved(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${moodColors[msg.mood]}`}>
                        {msg.icon}
                      </div>
                      <div>
                        <p className="font-medium text-space-light">{msg.subject}</p>
                        <p className="text-sm text-space-light/50">{msg.content.substring(0, 40)}...</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-start">
              <div className="text-5xl">
                {currentAlien}
              </div>
              <button
                onClick={closeMailbox}
                className="text-space-light/50 hover:text-space-light text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-space-primary p-3 rounded-lg border border-space-accent/20 text-space-light">
                {currentMessage.subject}
              </h3>
              <div className="bg-space-primary/30 p-4 rounded-lg border border-space-accent/20 whitespace-pre-line text-space-light">
                {currentMessage.content}
              </div>
              <div className="text-right text-sm text-space-light/50 italic">
                Transmission mood: <span className={`font-medium ${moodColors[currentMessage.mood]}`}>{currentMessage.mood}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={getNewMessage}
                className="flex-1 bg-space-accent hover:bg-purple-700 text-space-secondary py-3 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <GiSpaceship /> Another Transmission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={closeMailbox}
                className="flex-1 bg-space-primary hover:bg-space-primary/80 text-space-light py-3 rounded-lg font-bold border border-space-accent/20"
              >
                Close Channel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="text-center text-space-light/50 text-sm mt-6">
        Messages transmitted from across the cosmos
      </div>
    </div>
  );
}