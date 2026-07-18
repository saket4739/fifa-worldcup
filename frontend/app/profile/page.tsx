"use client";

export default function Profile() {
  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-4xl mx-auto animate-fade-in">
      <header className="mb-10 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fifa-gold to-yellow-600 border border-fifa-gold/30 flex items-center justify-center text-2xl font-black text-fifa-navy shadow-lg">
          JD
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Account Profile</h1>
          <p className="text-fifa-muted text-sm">Manage your credential preferences and active security roles.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar Cards */}
        <div className="md:col-span-1 space-y-3">
          <div className="glass-card p-4 border-l-4 border-l-fifa-gold bg-fifa-secondary/30 cursor-pointer text-sm font-semibold text-white">
            Personal Information
          </div>
          <div className="glass-card p-4 border-l-4 border-l-transparent hover:border-white/20 cursor-pointer text-sm font-medium text-fifa-muted hover:text-white transition-all">
            Security & Passwords
          </div>
          <div className="glass-card p-4 border-l-4 border-l-transparent hover:border-white/20 cursor-pointer text-sm font-medium text-fifa-muted hover:text-white transition-all">
            Notifications
          </div>
        </div>

        {/* Input Details Grid Block */}
        <div className="md:col-span-2 glass-card p-8">
          <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-white/10">Personal Details</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-fifa-muted mb-2">First Name</label>
                <input type="text" className="input-field text-sm" defaultValue="John" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-fifa-muted mb-2">Last Name</label>
                <input type="text" className="input-field text-sm" defaultValue="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fifa-muted mb-2">Email Identity Address</label>
              <input type="email" className="input-field text-sm" defaultValue="john.doe@example.com" disabled />
              <span className="text-[10px] text-fifa-muted mt-1 block">To modify your primary identity email, contact systemic support teams.</span>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button type="button" className="btn-secondary text-xs py-2.5">Discard Changes</button>
              <button type="submit" className="btn-primary text-xs py-2.5">Save Profile Information</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}