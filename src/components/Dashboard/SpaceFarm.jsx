import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { GiPlantSeed, GiTomato, GiWaterDrop, GiStarShuriken } from 'react-icons/gi';
import { FaRocket } from 'react-icons/fa';

export default function SpaceFarm() {
  const [plants, setPlants] = useState([]);
  const [farmData, setFarmData] = useState({
    totalStudySessions: 0,
    totalStudyMinutes: 0,
    harvested: 0
  });
  const [isWatering, setIsWatering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  // Plant growth stages
  const PLANT_STAGES = [
    { icon: <GiPlantSeed className="text-brown-400" />, name: "Seed" },
    { icon: <GiPlantSeed className="text-green-400" />, name: "Sprout" },
    { icon: <GiTomato className="text-green-500" />, name: "Budding" },
    { icon: <GiTomato className="text-red-500" />, name: "Ripe" }
  ];

  // Load farm data from localStorage
  useEffect(() => {
    const savedFarm = localStorage.getItem('spaceFarm');
    if (savedFarm) {
      const parsedData = JSON.parse(savedFarm);
      setFarmData(parsedData.farmData);
      updatePlantGrowth(parsedData.plants);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('spaceFarm', JSON.stringify({
      farmData,
      plants
    }));
  }, [farmData, plants]);

  // Update plant growth progress
  const updatePlantGrowth = (plantArray) => {
    const now = new Date();
    const updatedPlants = plantArray.map(plant => {
      const plantedAt = new Date(plant.plantedAt);
      const hoursSincePlanted = (now - plantedAt) / (1000 * 60 * 60);
      
      // Determine growth stage
      let stage = 0;
      if (hoursSincePlanted > 6) stage = 1;
      if (hoursSincePlanted > 12) stage = 2;
      if (hoursSincePlanted > 24) stage = 3;
      
      return { ...plant, stage };
    });
    setPlants(updatedPlants);
  };

  // Plant a new space tomato
  const plantTomato = (studyMinutes) => {
    const newPlant = {
      id: Date.now().toString(),
      type: 'tomato',
      plantedAt: new Date().toISOString(),
      studyMinutes,
      stage: 0
    };

    setFarmData(prev => ({
      ...prev,
      totalStudySessions: prev.totalStudySessions + 1,
      totalStudyMinutes: prev.totalStudyMinutes + studyMinutes
    }));
    
    setPlants(prev => [...prev, newPlant]);

    // Watering animation
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 1000);
    toast.success("Planted a cosmic tomato seed!");
  };

  // Harvest a ripe plant
  const harvestPlant = (plantId) => {
    const plantToHarvest = plants.find(p => p.id === plantId);
    if (!plantToHarvest || plantToHarvest.stage < 3) return;

    setFarmData(prev => ({
      ...prev,
      harvested: prev.harvested + 1
    }));
    
    setPlants(prev => prev.filter(p => p.id !== plantId));
    toast.success(`Harvested cosmic tomato! +${plantToHarvest.studyMinutes} credits`);
  };

  // Water all plants animation
  const waterPlants = () => {
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 1000);
    toast("Plants watered! 🌊", { icon: '💧' });
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          SPACE FARM
        </h2>
        <div className="flex items-center space-x-2 bg-space-primary/50 px-3 py-1 rounded-full">
          <GiStarShuriken className="text-yellow-400" />
          <span className="text-space-light">
            {farmData?.harvested || 0} harvested
          </span>
        </div>
      </div>

      {/* Farm Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-space-primary/50 p-3 rounded-lg border border-space-accent/20">
          <p className="text-space-light/70 text-sm">Study Sessions</p>
          <p className="text-xl font-bold text-space-light">
            {farmData?.totalStudySessions || 0}
          </p>
        </div>
        <div className="bg-space-primary/50 p-3 rounded-lg border border-space-accent/20">
          <p className="text-space-light/70 text-sm">Total Minutes</p>
          <p className="text-xl font-bold text-space-light">
            {farmData?.totalStudyMinutes || 0}
          </p>
        </div>
      </div>

      {/* Farm Field */}
      <div className="relative bg-space-primary/20 rounded-xl p-4 mb-6 min-h-[200px] border border-space-accent/10">
        {isWatering && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <GiWaterDrop className="text-blue-400 text-4xl animate-bounce" />
          </motion.div>
        )}

        {plants.length === 0 ? (
          <div className="text-center py-8 text-space-light/50">
            <GiPlantSeed className="mx-auto text-4xl mb-2" />
            <p>No plants yet! Complete study sessions to grow your farm.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {plants.map((plant) => (
              <motion.div
                key={plant.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => harvestPlant(plant.id)}
                onMouseEnter={() => setShowTooltip(plant.id)}
                onMouseLeave={() => setShowTooltip(null)}
                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                  plant.stage === 3 ? 'bg-green-900/20 border border-green-400/20' : 'bg-space-primary/50'
                }`}
              >
                <div className="text-3xl mb-1">
                  {PLANT_STAGES[plant.stage].icon}
                </div>
                {showTooltip === plant.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-12 bg-space-primary text-xs p-2 rounded shadow-lg border border-space-accent/20"
                  >
                    {PLANT_STAGES[plant.stage].name} Tomato
                    <div className="text-space-light/50 mt-1">
                      Studied: {plant.studyMinutes} mins
                    </div>
                  </motion.div>
                )}
                <div className="w-full bg-space-secondary h-1 rounded-full mt-2">
                  <motion.div
                    className="bg-green-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(plant.stage + 1) * 25}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={waterPlants}
          className="flex-1 bg-space-primary/50 border border-space-accent/20 text-space-light py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <GiWaterDrop />
          <span>Water Plants</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => plantTomato(25)} // For demo purposes
          className="flex-1 bg-green-600/80 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaRocket />
          <span>Test Plant</span>
        </motion.button>
      </div>

      {/* How it works */}
      <div className="mt-6 p-3 bg-space-primary/30 rounded-lg border border-space-accent/20">
        <h3 className="text-space-light font-medium mb-2 flex items-center">
          <GiStarShuriken className="mr-2 text-yellow-400" />
          How Your Space Farm Works
        </h3>
        <ul className="text-space-light/70 text-sm space-y-1">
          <li>• Click "Test Plant" to plant a space tomato (demo mode)</li>
          <li>• Tomatoes automatically grow through 4 stages over 24 hours</li>
          <li>• Harvest ripe tomatoes to collect cosmic credits</li>
          <li>• Water plants for fun animations (no growth effect)</li>
          <li>• Progress saves in your browser until you refresh</li>
        </ul>
      </div>
    </div>
  );
}