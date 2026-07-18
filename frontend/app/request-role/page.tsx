"use client";
import Link from 'next/link';

export default function RequestRole() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Role Request Application</h1>
        <p className="text-fifa-muted">Apply to become an official member of the FIFA 2026 ground team.</p>
      </div>

      <div className="glass-card p-8 md:p-12">
        <form className="space-y-8">
          
          <div className="space-y-4">
            <label className="block text-sm font-bold text-white">Select Desired Role</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="relative flex cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 focus:outline-none hover:border-fifa-gold/50 has-[:checked]:border-fifa-gold has-[:checked]:bg-fifa-gold/10 transition-all">
                <input type="radio" name="role" value="volunteer" className="peer sr-only" defaultChecked />
                <div>
                  <p className="font-bold text-white mb-1">Volunteer</p>
                  <p className="text-xs text-fifa-muted">Assist fans, manage wayfinding, and support events.</p>
                </div>
                <div className="absolute top-4 right-4 text-fifa-gold opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
              </label>

              <label className="relative flex cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 focus:outline-none hover:border-fifa-gold/50 has-[:checked]:border-fifa-gold has-[:checked]:bg-fifa-gold/10 transition-all">
                <input type="radio" name="role" value="staff" className="peer sr-only" />
                <div>
                  <p className="font-bold text-white mb-1">Operations Staff</p>
                  <p className="text-xs text-fifa-muted">Security, gate control, and official ground crew.</p>
                </div>
                <div className="absolute top-4 right-4 text-fifa-gold opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fifa-muted mb-2">Previous Experience / Reason for Applying</label>
            <textarea 
              className="input-field min-h-[120px] resize-y" 
              placeholder="Tell us why you want to join the team..."
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" className="w-4 h-4 rounded border-white/20 bg-white/5 text-fifa-gold focus:ring-fifa-gold focus:ring-offset-fifa-navy" required />
            <label htmlFor="terms" className="text-sm text-fifa-muted">
              I agree to the <Link href="#" className="text-fifa-gold hover:underline">Terms of Service</Link> and background check protocol.
            </label>
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
            <Link href="/" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
}