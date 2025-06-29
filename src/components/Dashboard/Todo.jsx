import { useState, useEffect } from 'react';
import { collection, query, where, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { GiSpaceship, GiAlienSkull, GiStarSwirl, GiOrbital } from 'react-icons/gi';

export default function CosmicTodo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosArr = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id });
        });
        todosArr.sort((a, b) => {
          const statusOrder = { 'todo': 0, 'doing': 1, 'done': 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setTodos(todosArr);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      await addDoc(collection(db, 'todos'), {
        title: newTodo,
        status: 'todo',
        createdAt: new Date().toISOString(),
        userId: user.uid,
      });
      setNewTodo('');
      toast.success('Mission added to the queue!');
    } catch (error) {
      toast.error('Transmission failed: ' + error.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        status: newStatus,
      });
      toast.success('Mission status updated!');
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      toast.success('Mission aborted successfully!');
    } catch (error) {
      toast.error('Failed to abort mission: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-red-500';
      case 'doing': return 'bg-yellow-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <GiAlienSkull className="text-red-400" />;
      case 'doing': return <GiStarSwirl className="text-yellow-400 animate-spin" />;
      case 'done': return <GiOrbital className="text-green-400" />;
      default: return <GiAlienSkull className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6 bg-space-secondary rounded-lg shadow-lg border border-space-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-space-accent">
          MISSION CONTROL
        </h2>
        <div className="flex items-center space-x-2 bg-space-primary/50 px-3 py-1 rounded-full">
          <GiSpaceship className="text-space-light" />
          <span className="text-space-light">
            {todos.length} {todos.length === 1 ? 'Mission' : 'Missions'}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 p-4 bg-space-primary/50 rounded-lg border border-space-accent/30">
        <p className="text-space-light italic text-sm">
          "Track your interstellar objectives across three states:
          <span className="block mt-1 text-yellow-400">Pending → In Progress → Completed</span>
        </p>
      </div>

      {/* Task Input */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new cosmic mission..."
          className="flex-1 p-3 rounded-l-lg bg-space-primary/70 border border-space-accent/30 text-space-light placeholder-space-light/50 focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-space-accent text-space-secondary px-4 rounded-r-lg hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <GiSpaceship />
          <span>Launch</span>
        </button>
      </div>

      {/* Missions List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-space-light/50 border-2 border-dashed border-space-light/20 rounded-lg">
            <GiSpaceship className="mx-auto text-4xl mb-2 text-space-light/30" />
            <p>No active missions detected</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`p-4 bg-space-primary/50 rounded-lg border ${
                todo.status === 'todo' ? 'border-red-500/30' : 
                todo.status === 'doing' ? 'border-yellow-500/30' : 'border-green-500/30'
              } flex justify-between items-center`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">
                  {getStatusIcon(todo.status)}
                </div>
                <p className={`${todo.status === 'done' ? 'line-through text-space-light/50' : 'text-space-light'}`}>
                  {todo.title}
                </p>
              </div>
              <div className="flex space-x-2">
                <select
                  value={todo.status}
                  onChange={(e) => updateStatus(todo.id, e.target.value)}
                  className="bg-space-secondary text-space-light p-2 rounded text-sm border border-space-accent/30"
                >
                  <option value="todo">Pending</option>
                  <option value="doing">In Progress</option>
                  <option value="done">Completed</option>
                </select>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-space-secondary text-red-400 hover:text-red-300 text-sm p-2 rounded border border-space-accent/30"
                >
                  Abort
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Legend */}
      <div className="grid grid-cols-3 gap-3 mt-6 text-center text-sm">
        <div className="p-2 bg-space-primary/30 rounded border border-red-500/30">
          <div className="flex items-center justify-center space-x-1">
            <GiAlienSkull className="text-red-400" />
            <span className="text-space-light">Pending</span>
          </div>
        </div>
        <div className="p-2 bg-space-primary/30 rounded border border-yellow-500/30">
          <div className="flex items-center justify-center space-x-1">
            <GiStarSwirl className="text-yellow-400" />
            <span className="text-space-light">In Progress</span>
          </div>
        </div>
        <div className="p-2 bg-space-primary/30 rounded border border-green-500/30">
          <div className="flex items-center justify-center space-x-1">
            <GiOrbital className="text-green-400" />
            <span className="text-space-light">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}