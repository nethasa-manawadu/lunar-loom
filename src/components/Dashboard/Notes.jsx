import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { GiGalaxy, GiStaryu, GiNotebook, GiSpaceship } from 'react-icons/gi';

export default function CosmicNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'notes'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notesArr = [];
        querySnapshot.forEach((doc) => {
          notesArr.push({ ...doc.data(), id: doc.id });
        });
        setNotes(notesArr);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addNote = async () => {
    if (newNote.trim() === '') return;
    try {
      await addDoc(collection(db, 'notes'), {
        content: newNote,
        createdAt: new Date().toISOString(),
        userId: user.uid,
      });
      setNewNote('');
      toast.success('Cosmic note recorded!');
    } catch (error) {
      toast.error('Transmission failed: ' + error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      toast.success('Note vaporized!');
    } catch (error) {
      toast.error('Deletion sequence failed: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          ASTRO LOGBOOK
        </h2>
        <div className="flex items-center space-x-2 bg-space-primary/50 px-3 py-1 rounded-full">
          <GiNotebook className="text-space-light" />
          <span className="text-space-light">
            {notes.length} {notes.length === 1 ? 'Entry' : 'Entries'}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 p-4 bg-space-primary/50 rounded-lg border border-space-accent/30">
        <p className="text-space-light italic text-sm">
          "Record your interstellar thoughts and discoveries.
          <span className="block mt-1 text-yellow-400">Warning: Knowledge contained herein may exceed universal limits.</span>
        </p>
      </div>

      {/* Note Input */}
      <div className="flex mb-6">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Transmit new cosmic knowledge..."
          className="flex-1 p-3 rounded-l-lg bg-space-primary/70 border border-space-accent/30 text-space-light placeholder-space-light/50 focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addNote}
          className="bg-space-accent text-space-secondary px-4 rounded-r-lg hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <GiSpaceship />
          <span>Launch</span>
        </motion.button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-space-light/50 border-2 border-dashed border-space-light/20 rounded-lg">
            <GiGalaxy className="mx-auto text-4xl mb-2 text-space-light/30" />
            <p>No cosmic observations recorded yet</p>
          </div>
        ) : (
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                whileHover={{ x: 5 }}
                className="p-4 bg-space-primary/50 rounded-lg border border-space-accent/20 flex justify-between items-center"
              >
                <div className="flex items-start">
                  <GiStaryu className="text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-space-light">{note.content}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteNote(note.id)}
                  className="text-red-400 hover:text-red-300 ml-4"
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-space-light/50 text-sm mt-6">
        Stellar knowledge preserved across the cosmos
      </div>
    </div>
  );
}