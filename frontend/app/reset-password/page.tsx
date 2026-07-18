"use client";
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy relative overflow-hidden px-6">
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-fifa-gold rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="glass-card p-10 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">New Credentials</h2>
            <p className="text-fifa-muted text-sm">Please secure your account with a new password.</p>
          </div>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">New Password</label>
              <input type="password" className="input-field" placeholder="••••••••" required />
              <div className="mt-2 flex gap-1">
                {/* Visual Password Strength Indicator */}
                <div className="h-1 w-full bg-red-500 rounded-full"></div>
                <div className="h-1 w-full bg-white/10 rounded-full"></div>
                <div className="h-1 w-full bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Confirm Password</label>
              <input type="password" className="input-field" placeholder="••••••••" required />
            </div>
            
            <button type="submit" className="w-full btn-primary mt-4">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}