import { motion } from 'framer-motion';
import { FaBrain, FaRegMoon, FaStar } from 'react-icons/fa';
import { GiSpaceship, GiStaryu, GiGalaxy } from 'react-icons/gi';
import { RiAliensFill } from 'react-icons/ri';

export default function CosmicStudyHub() {
  // Study Techniques
  const studyTips = [
    {
      title: "Focused Work Sessions",
      icon: <FaBrain className="text-emerald-500" />,
      content: "Implement the Pomodoro technique: 25 minutes of concentrated work followed by 5-minute breaks for optimal productivity.",
    },
    {
      title: "Active Recall",
      icon: <FaRegMoon className="text-blue-500" />,
      content: "Enhance retention by testing yourself rather than passively reviewing material.",
    },
    {
      title: "Spaced Repetition",
      icon: <FaStar className="text-amber-400" />,
      content: "Systematically review material at increasing intervals to strengthen memory retention.",
    },
    {
      title: "Concept Mapping",
      icon: <GiSpaceship className="text-indigo-500" />,
      content: "Create visual representations of information to identify relationships between concepts.",
    },
    {
      title: "Peer Instruction",
      icon: <RiAliensFill className="text-rose-500" />,
      content: "Solidify understanding by explaining concepts to others, revealing gaps in knowledge.",
    },
    {
      title: "Sleep Optimization",
      icon: <GiStaryu className="text-teal-400" />,
      content: "Prioritize 7-9 hours of quality sleep for optimal memory consolidation and cognitive function.",
    },
  ];

  // Space Facts
  const spaceFacts = [
    "Neutron stars rotate up to 600 times per second, the fastest known celestial objects.",
    "A single day on Venus lasts longer than its entire year (243 vs. 225 Earth days).",
    "At current spacecraft speeds, a journey to Pluto would take approximately 800 years.",
    "The Sun accounts for 99.8% of our solar system's total mass.",
    "The Sagittarius B2 molecular cloud contains vast quantities of ethyl alcohol in space.",
    "Astronauts experience temporary height increases of up to 3% in microgravity conditions.",
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Void Explorers Collective
          </h1>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Research-backed learning strategies for academic excellence
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Study Techniques */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center">
            Cognitive Enhancement Strategies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-indigo-400/50 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">{tip.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Space Facts */}
        <div className="lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 sticky top-6"
          >
            <h2 className="text-2xl font-semibold text-slate-100 mb-5 flex items-center">
              <FaStar className="mr-3 text-amber-400" />
              Astronomical Insights
            </h2>
            <ul className="space-y-4">
              {spaceFacts.map((fact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-slate-300 leading-relaxed flex items-start"
                >
                  <span className="text-amber-400 mr-3 mt-1">•</span>
                  <span>{fact}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}