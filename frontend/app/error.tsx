"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-900/20 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>

      <div className="relative z-10 glass-card p-10 max-w-md w-full animate-fade-in border-l-4 border-l-red-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white">System Foul</h2>
        </div>
        
        <p className="text-fifa-muted text-sm mb-8 leading-relaxed">
          We encountered an unexpected technical issue. Our engineering team has been notified. Please try reloading the interface.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-white/10 text-white backdrop-blur-md border border-white/20 py-3 px-6 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all font-semibold"
          >
            Attempt Recovery
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full text-sm text-fifa-gold hover:underline py-2"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}