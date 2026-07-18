"use client";

export default function CrowdDashboard() {
  return (
    <div className="glass-card p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Live Crowd Density</h3>
        <span className="flex items-center gap-2 text-xs text-fifa-muted">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE UPDATES
        </span>
      </div>

      <div className="space-y-6">
        {/* Simulated Data Bars */}
        {[
          { zone: 'North Sector', density: 85, status: 'High' },
          { zone: 'South Sector', density: 60, status: 'Moderate' },
          { zone: 'East Sector', density: 40, status: 'Normal' },
          { zone: 'West Sector', density: 92, status: 'Critical' },
        ].map((sector, i) => (
          <div key={i} className="group">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-medium">{sector.zone}</span>
              <span className="text-fifa-muted">{sector.density}% Capacity</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  sector.density > 90 ? 'bg-red-500' : sector.density > 75 ? 'bg-fifa-gold' : 'bg-green-500'
                }`}
                style={{ width: `${sector.density}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}