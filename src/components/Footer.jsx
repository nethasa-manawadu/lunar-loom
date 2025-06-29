import { GiOrbital } from 'react-icons/gi';
import { SiTailwindcss, SiFirebase, SiVite, SiReact } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-space-secondary/80 backdrop-blur-lg border-t border-space-primary/30 mt-12">
      <div className="container mx-auto px-4 py-12 space-y-8">
        
        {/* Brand & Motto */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-3">
            <GiOrbital className="text-space-accent text-2xl" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-accent to-purple-400">
              LunarLoop
            </span>
          </div>
          <p className="text-space-light/70 text-center text-sm max-w-md">
            Strengthen your knowledge, take your time, and always be kind to yourself.
          </p>
          <p className="text-space-light/50 italic text-sm">Be kind. Always.</p>
        </div>

        {/* Tech Stack */}
        <div className="flex justify-center space-x-6 text-3xl">
          <SiReact className="text-space-light/70 hover:text-[#61DAFB] transition-all" title="React" />
          <SiVite className="text-space-light/70 hover:text-[#FFC017] transition-all" title="Vite" />
          <SiTailwindcss className="text-space-light/70 hover:text-[#38BDF8] transition-all" title="Tailwind" />
          <SiFirebase className="text-space-light/70 hover:text-[#FFCA28] transition-all" title="Firebase" />
        </div>

        {/* Copyright */}
        <div className="text-center text-space-light/60 text-sm">
          © {new Date().getFullYear()} LunarLoop. Built with calm and curiosity.
        </div>
      </div>
    </footer>
  );
}
