"use client";

export default function GateManagementPanel() {
  const gates = [
    { id: 'Gate 1', status: 'Active', flow: 'Normal', color: 'text-green-400', bg: 'bg-green-400/20' },
    { id: 'Gate 2', status: 'Active', flow: 'Heavy', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    { id: 'Gate 3', status: 'Locked', flow: 'None', color: 'text-red-400', bg: 'bg-red-400/20' },
    { id: 'VIP Entrance', status: 'Active', flow: 'Light', color: 'text-fifa-gold', bg: 'bg-fifa-gold/20' },
  ];

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Gate Control</h3>
        <button className="text-xs text-fifa-gold hover:underline">Refresh Status</button>
      </div>

      <div className="space-y-3">
        {gates.map((gate, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${gate.bg} border border-current ${gate.color} shadow-[0_0_8px_currentColor]`}></div>
              <div>
                <p className="text-sm font-bold text-white">{gate.id}</p>
                <p className="text-xs text-fifa-muted">Flow: {gate.flow}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {gate.status === 'Locked' ? (
                <button className="px-3 py-1 text-xs font-medium rounded bg-white/10 text-white hover:bg-white/20 transition-colors">
                  Unlock
                </button>
              ) : (
                <button className="px-3 py-1 text-xs font-medium rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors">
                  Lockdown
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}