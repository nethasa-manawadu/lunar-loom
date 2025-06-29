// ... all your imports remain the same ...
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiPlus, FiX, FiBell } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { GiGalaxy, GiOrbital, GiRocketFlight } from 'react-icons/gi';

// ... docstring stays the same ...

export default function SpaceScheduler() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [pendingAlarms, setPendingAlarms] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'spaceEvents'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
    }, (error) => {
      console.error("Firestore error:", error);
      toast.error("Error loading cosmic events");
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    let timeout;

    const checkAlarms = () => {
      const now = new Date();
      const today = formatDate(now);
      const currentTime = now.toTimeString().substring(0, 5);

      events.forEach(event => {
        if (
          event.date === today &&
          event.alarmTime === currentTime &&
          !event.alarmTriggered &&
          !pendingAlarms.some(a => a.id === event.id)
        ) {
          triggerAlarm(event);
        }
      });

      timeout = setTimeout(checkAlarms, 60000);
    };

    checkAlarms();

    return () => clearTimeout(timeout);
  }, [events, pendingAlarms]);

  const triggerAlarm = async (event) => {
    try {
      await updateDoc(doc(db, 'spaceEvents', event.id), {
        alarmTriggered: true
      });
      setPendingAlarms(prev => [...prev, event]);
    } catch (error) {
      toast.error('Error triggering cosmic alert: ' + error.message);
    }
  };

  const dismissAlarm = (id) => {
    setPendingAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  const addEvent = async () => {
    if (!newEvent.trim() || !selectedDate) {
      toast.error("Mission parameters incomplete!");
      return;
    }

    try {
      const formattedDate = selectedDate;

      const eventData = {
        text: newEvent,
        date: formattedDate,
        alarmTime: alarmTime || null,
        completed: false,
        alarmTriggered: false,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'spaceEvents'), eventData);

      setNewEvent('');
      setAlarmTime('');
      toast.success('Mission launched into orbit! 🚀');
    } catch (error) {
      toast.error('Launch sequence failed: ' + error.message);
    }
  };

  const toggleEvent = async (id) => {
    try {
      const event = events.find(e => e.id === id);
      await updateDoc(doc(db, 'spaceEvents', id), {
        completed: !event.completed
      });
      toast.success(event.completed ? 'Mission reactivated!' : 'Mission accomplished! 🌟');
    } catch (error) {
      toast.error('Error updating mission status: ' + error.message);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'spaceEvents', id));
      toast.success('Mission vaporized! 💥');
    } catch (error) {
      toast.error('Error deleting cosmic record: ' + error.message);
    }
  };

  const weekDays = [
    { label: 'S', key: 'sun' },
    { label: 'M', key: 'mon' },
    { label: 'T', key: 'tue' },
    { label: 'W', key: 'wed' },
    { label: 'T', key: 'thu' },
    { label: 'F', key: 'fri' },
    { label: 'S', key: 'sat' }
  ];

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Alarm notifications */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <AnimatePresence>
          {pendingAlarms.map((alarm) => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="bg-space-primary border-l-4 border-yellow-400 shadow-lg rounded-r-lg mb-2 p-4 max-w-md mx-auto backdrop-blur-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <FiBell className="text-yellow-400 mr-2 animate-ring" />
                    <h3 className="font-bold text-space-light">COSMIC ALERT!</h3>
                  </div>
                  <p className="text-space-light mt-1">{alarm.text}</p>
                  <p className="text-xs text-space-light/50 mt-1 flex items-center">
                    <GiOrbital className="mr-1" />
                    {new Date(alarm.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })} ⏰ {alarm.alarmTime}
                  </p>
                </div>
                <button
                  onClick={() => dismissAlarm(alarm.id)}
                  className="text-space-light/50 hover:text-space-light ml-4 transition-colors"
                >
                  <FiX />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          COSMIC SCHEDULER
        </h2>
        <div className="text-space-light/50 text-sm bg-space-primary/50 px-3 py-1 rounded-full">
          {events.length} active missions
        </div>
      </div>

      {/* Description box */}
      <div className="mb-6 p-4 bg-space-primary/50 rounded-lg border border-space-accent/30">
        <p className="text-space-light italic text-sm">
          "NASA-approved mission control interface. 
          Schedule tasks, set reminders, and conquer the cosmos.
          <span className="block mt-1 text-yellow-400">Warning: *Changes take effect after page refresh.*</span>
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekDays.map(day => (
              <div key={day.key} className="text-center text-space-light/70 text-sm font-medium">
                {day.label}
              </div>
            ))}

            {days.map(day => {
              const formattedMonth = String(currentMonth + 1).padStart(2, '0');
              const formattedDay = String(day).padStart(2, '0');
              const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
              const dayEvents = events.filter(e => e.date === dateStr);

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-12 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                    ${selectedDate === dateStr ? 'bg-space-accent text-white shadow-lg shadow-purple-500/30' : 'bg-space-primary hover:bg-space-primary/80'}
                    ${day === currentDate.getDate() && 'ring-2 ring-purple-400 shadow-lg shadow-purple-400/20'}`}
                >
                  <span className="text-sm">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`w-1.5 h-1.5 rounded-full ${event.completed ? 'bg-green-400 shadow-green-400/50' : 'bg-yellow-400 shadow-yellow-400/50'}`}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-space-accent/50" />
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Task Management Panel (same as before) */}
        {/* Not repeated here to save space since no changes are needed in that part */}
        {/* If you want me to review or clean that too, just say the word 💪 */}
        
        {/* ... */}
                {/* Task Management Section - Right Side */}
        <div className="lg:col-span-2">
          {selectedDate ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-space-primary/70 rounded-lg p-4 mb-4 border border-space-accent/20 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-space-light flex items-center">
                  <GiRocketFlight className="mr-2 text-space-accent" />
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-space-light/50 hover:text-space-light transition-colors"
                >
                  <FiX />
                </button>
              </div>

              {/* Mission List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {events.filter(e => e.date === formatDate(selectedDate)).length > 0 ? (
                  events.filter(e => e.date === formatDate(selectedDate)).map(event => (
                    <motion.div
                      key={event.id}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${event.completed ? 'bg-green-900/20 border border-green-400/20' : 'bg-space-secondary border border-space-light/10'}`}
                    >
                      <div
                        onClick={() => toggleEvent(event.id)}
                        className={`flex-1 cursor-pointer ${event.completed ? 'line-through text-space-light/50' : 'text-space-light'}`}
                      >
                        <div className="flex items-center">
                          {event.alarmTime && <FiBell className="text-yellow-400 mr-2" />}
                          {event.text}
                        </div>
                        {event.alarmTime && (
                          <div className="text-xs text-space-light/50 mt-1 flex items-center">
                            <span>⏰ {event.alarmTime}</span>
                            {event.completed && (
                              <span className="ml-2 text-green-400 flex items-center">
                                ✓ Completed
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEvent(event.id);
                        }}
                        className="text-red-400 hover:text-red-300 ml-2 transition-colors"
                      >
                        <FiX size={16} />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-4 text-space-light/50">
                    <p>No missions scheduled for this stellar day</p>
                  </div>
                )}
              </div>

              {/* Mission Creation Panel */}
              <div className="space-y-3 mt-4">
                <input
                  type="text"
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  placeholder="Enter mission parameters..."
                  className="w-full p-3 rounded-lg bg-space-secondary border border-space-light/20 text-space-light placeholder-space-light/50 focus:outline-none focus:ring-1 focus:ring-space-accent transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                />

                <div className="flex items-center space-x-2 bg-space-secondary/50 p-2 rounded-lg border border-space-light/10">
                  <FiBell className="text-yellow-400 flex-shrink-0" />
                  <input
                    type="time"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className="flex-1 p-2 rounded bg-transparent text-space-light focus:outline-none"
                    placeholder="Set quantum reminder (optional)"
                  />
                </div>

                <motion.button
                  onClick={addEvent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-space-accent text-white py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 font-medium shadow-lg shadow-purple-500/20"
                >
                  <FiPlus />
                  <span>Launch Mission</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-space-light/50 border-2 border-dashed border-space-light/20 rounded-lg"
            >
              <GiGalaxy className="mx-auto text-4xl mb-2 text-space-light/30" />
              <p>Select a stellar date to schedule your cosmic missions</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-center text-space-light/50 text-sm mt-6">
        Warp speed scheduling for interstellar productivity
      </div>
    </div>
  );
}
