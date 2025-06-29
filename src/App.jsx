import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import StudyTips from './pages/StudyTips';
//import AstronomyFacts from './pages/AstronomyFacts';
import GoToTopButton from './components/GoToTopButton';
//import { useMusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-space-primary text-space-light">
          <Navbar />
          <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/study-tips" element={<StudyTips />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
          </main>
          <Footer />
          <GoToTopButton />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;