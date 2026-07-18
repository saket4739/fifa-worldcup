"use client";
import CrowdDashboard from '@/components/CrowdDashboard';
import OpsIntelligencePanel from '@/components/OpsIntelligencePanel';

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-10 animate-fade-in flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-white">Organizer Command Center</h1>
          <p className="text-fifa-muted">Real-time stadium operations and intelligence overview.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button className="btn-secondary text-sm">Download Report</button>
          <button className="btn-primary text-sm">Broadcast Announcement</button>
        </div>
      </header>

      {/* KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
        {[
          { label: 'Total Attendance', value: '78,432', trend: '+12%' },
          { label: 'Active Gates', value: '24 / 24', trend: 'Optimal' },
          { label: 'Staff Deployed', value: '1,240', trend: 'On Shift' },
          { label: 'Incidents', value: '3', trend: 'Resolved' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 border-l-4 border-l-fifa-gold">
            <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-green-400">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="lg:col-span-2">
          <CrowdDashboard />
        </div>
        <div className="lg:col-span-1">
          <OpsIntelligencePanel />
        </div>
      </div>
    </div>
  );
}