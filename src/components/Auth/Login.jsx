// Login.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login: ' + error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-space-secondary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-space-accent">Login to LunarLoop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-space-primary border border-space-light text-space-light"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-space-primary border border-space-light text-space-light"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-space-accent text-white py-2 rounded hover:bg-purple-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}