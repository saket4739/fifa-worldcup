"use client";
import GateManagementPanel from "@/components/GateManagementPanel";

export default function StaffDashboard() {
  return (
    <div className="min-h-screen pt-12 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-2 text-white">Staff Dashboard</h1>
        <p className="text-fifa-muted">Manage your sector assignments and track live operations.</p>
      </header>

      {/* Staff KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
        <div className="glass-card p-6 border-t-4 border-t-blue-500">
          <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">Current Shift</p>
          <p className="text-2xl font-bold text-white mb-1">Gate A - North</p>
          <p className="text-xs text-blue-400">14:00 - 22:00 (In Progress)</p>
        </div>
        <div className="glass-card p-6 border-t-4 border-t-fifa-gold">
          <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">Next Briefing</p>
          <p className="text-2xl font-bold text-white mb-1">13:45 PM</p>
          <p className="text-xs text-fifa-gold">Security Room 4</p>
        </div>
        <div className="glass-card p-6 border-t-4 border-t-green-500">
          <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">System Status</p>
          <p className="text-2xl font-bold text-white mb-1">All Clear</p>
          <p className="text-xs text-green-400">No active incidents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <GateManagementPanel />
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Communications</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-fifa-muted mb-1 block">10:15 AM - Operations</span>
              <p className="text-sm text-white">Please ensure all turnstiles in Sector B are calibrated before 12:00 PM.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-fifa-muted mb-1 block">09:00 AM - HQ</span>
              <p className="text-sm text-white">Daily staff meal vouchers have been loaded to your digital passes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}