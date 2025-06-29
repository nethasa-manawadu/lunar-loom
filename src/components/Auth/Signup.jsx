import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth(); // Changed from login to signup
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Password confirmation check
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await signup(email, password);
      toast.success('Account created successfully! Welcome to LunarLoom! 🚀');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account: ' + error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-space-secondary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-space-accent">Signup to LunarLoom</h2>
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
            minLength="6"
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded bg-space-primary border border-space-light text-space-light"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-space-accent text-white py-2 rounded hover:bg-purple-800 transition"
        >
          Create Account
        </button>
      </form>
      
      <div className="mt-4 text-center text-space-light">
        Already have an account? {' '}
        <Link to="/login" className="text-space-accent hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
}