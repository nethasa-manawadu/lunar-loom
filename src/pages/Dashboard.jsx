import { useAuth } from '../context/AuthContext';
import Notes from '../components/Dashboard/Notes';
import Pomodoro from '../components/Dashboard/Pomodoro';
import Todo from '../components/Dashboard/Todo';
import { motion } from 'framer-motion';
import AlienMailbox from '../components/Dashboard/AlienMailbox';
import SpaceScheduler from '../components/Dashboard/SpaceScheduler';
import CosmicRageRoom from '../components/CosmicRageRoom';
import SpaceFarm from '../components/Dashboard/SpaceFarm';

const spaceGreetings = [
  "Ahoy, Spacefarer! Ready to continue your mission?",
  "Good to see you, Commander! Let's make today stellar.",
  "Stardust in your veins, Captain! Let's conquer this.",
  "Stay on course - you're doing galaxy-class work!",
  "Keep orbiting that knowledge, Space Explorer!",
  "Your focus is brighter than a supernova!"
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const randomGreeting = spaceGreetings[Math.floor(Math.random() * spaceGreetings.length)];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-space-accent">
            {randomGreeting}
          </h1>
          <p className="text-space-light/70 mt-1">
            Stardate: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition flex items-center space-x-2"
        >
          <span>Logout</span>
        </button>
      </div>

      {/* Rest of the dashboard components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          //className="lg:col-span-2"
        >
          <Pomodoro />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          //className="lg:col-span-2"
        >
          <SpaceFarm />
        </motion.div>

        {/* ... (keep all your existing motion.div components) ... */}
        

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Todo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Notes />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="lg:col-span-2"
        >
          <SpaceScheduler />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="lg:col-span-2" 
        >
          <AlienMailbox />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="lg:col-span-2" 
        >
          <CosmicRageRoom />
        </motion.div>
      </div>
    </div>
  );
}