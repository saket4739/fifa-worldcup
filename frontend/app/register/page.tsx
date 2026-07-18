"use client";
import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fifa-navy relative overflow-hidden py-20">
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fifa-gold rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>
      
      <div className="w-full max-w-lg z-10 p-8">
        <div className="glass-card p-10 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-fifa-muted text-sm">Join the official FIFA 2026 platform</p>
          </div>
          
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-fifa-muted mb-2">First Name</label>
                <input type="text" className="input-field" placeholder="Lionel" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-fifa-muted mb-2">Last Name</label>
                <input type="text" className="input-field" placeholder="Messi" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="name@example.com" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Password</label>
              <input type="password" className="input-field" placeholder="••••••••" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-fifa-muted mb-2">Requested Role</label>
              <select className="input-field appearance-none bg-fifa-secondary/50">
                <option value="fan">Fan / Spectator</option>
                <option value="volunteer">Volunteer</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            
            <button type="submit" className="w-full btn-primary mt-4">
              Register Account
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-fifa-muted">
            Already have an account? <Link href="/login" className="text-fifa-gold font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}