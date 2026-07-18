"use client";
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy relative overflow-hidden px-6">
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-fifa-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="glass-card p-10 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Reset Access</h2>
            <p className="text-fifa-muted text-sm">Enter your registered email to receive secure recovery instructions.</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="name@example.com" required />
            </div>
            
            <button type="submit" className="w-full btn-primary">
              Send Recovery Link
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <Link href="/login" className="text-sm font-medium text-fifa-muted hover:text-fifa-gold transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}