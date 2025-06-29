import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes } from 'react-icons/fa';
import { useMusicPlayer } from './MusicPlayer';

export default function Navbar() {
  const { user } = useAuth();
  const { isPlaying, toggleMusic } = useMusicPlayer();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-space-secondary/80 backdrop-blur-md border-b border-space-accent/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-accent to-purple-400">
            LunarLoop
          </span>
        </Link>

        {/* Desktop Nav + Music */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={toggleMusic}
            className={`p-2 rounded-full ${isPlaying ? 'bg-purple-500/20 text-purple-400' : 'text-space-light/70'} transition-all`}
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>

          <Link to="/study-tips" className="text-space-light hover:text-space-accent transition-all font-medium">
            Study Tips
          </Link>

          {user ? (
            <Link to="/dashboard" className="text-space-light hover:text-space-accent transition-all font-medium">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-space-light hover:text-space-accent transition-all font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-space-accent text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button 
            onClick={toggleMusic}
            className={`p-2 rounded-full ${isPlaying ? 'bg-purple-500/20 text-purple-400' : 'text-space-light/70'} transition-all`}
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-space-light text-xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-space-secondary/95 backdrop-blur-md border-t border-space-accent/20 px-4 pb-4">
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/study-tips" className="text-space-light hover:text-space-accent transition-all font-medium" onClick={() => setMenuOpen(false)}>
              Study Tips
            </Link>

            {user ? (
              <Link to="/dashboard" className="text-space-light hover:text-space-accent transition-all font-medium" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-space-light hover:text-space-accent transition-all font-medium" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="bg-space-accent text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all font-medium w-fit" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
