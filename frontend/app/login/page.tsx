"use client";
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fifa-secondary rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      
      <div className="w-full max-w-md z-10 p-8">
        <div className="glass-card p-10 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-fifa-muted text-sm">Sign in to your FIFA 2026 account</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="name@example.com" required />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-fifa-muted">Password</label>
                <Link href="/forgot-password" className="text-xs text-fifa-gold hover:underline">Forgot password?</Link>
              </div>
              <input type="password" className="input-field" placeholder="••••••••" required />
            </div>
            
            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-fifa-muted">
            Don't have an account? <Link href="/register" className="text-fifa-gold font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}