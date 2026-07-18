"use client";

export default function OpsIntelligencePanel() {
  return (
    <div className="glass-card p-6 h-full bg-gradient-to-b from-fifa-secondary/30 to-transparent">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-fifa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        AI Intelligence
      </h3>

      <div className="space-y-4">
        {[
          { time: '10:42 AM', alert: 'Crowd surge detected at Gate 4. Suggest redirecting Fan Zone A.', priority: 'high' },
          { time: '10:15 AM', alert: 'Weather update: Light rain expected at 14:00. Roof protocol initiated.', priority: 'medium' },
          { time: '09:30 AM', alert: 'Volunteer shift change completed successfully.', priority: 'low' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-fifa-gold/30 transition-all cursor-default">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                item.priority === 'medium' ? 'bg-fifa-gold/20 text-fifa-gold' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {item.priority} priority
              </span>
              <span className="text-xs text-fifa-muted">{item.time}</span>
            </div>
            <p className="text-sm text-white leading-relaxed">{item.alert}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-sm text-fifa-gold hover:text-white transition-colors border border-fifa-gold/30 hover:bg-fifa-gold/10 py-2 rounded-lg">
        View Full Logs
      </button>
    </div>
  );
}