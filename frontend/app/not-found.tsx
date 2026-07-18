"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy relative overflow-hidden text-center px-6">
      {/* Background Lighting Effect */}
      <div className="absolute inset-0 bg-gold-glow opacity-40 z-0"></div>
      
      <div className="relative z-10 glass-card p-12 max-w-2xl mx-auto animate-slide-up border-t-4 border-t-fifa-gold">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-yellow-200 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">
          Out of Bounds
        </h2>
        <p className="text-fifa-muted text-lg mb-8 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed. Let's get you back into the action.
        </p>
        
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Return to Pitch
        </Link>
      </div>
    </div>
  );
}