"use client";

export default function AnnouncementList() {
  const announcements = [
    { id: 1, title: "Gate 4 Maintenance", content: "Turnstiles at Gate 4 will be offline for 30 minutes for calibration.", date: "Today, 10:30 AM", priority: "high" },
    { id: 2, title: "Volunteer Briefing", content: "All Sector C volunteers please report to HQ at 14:00.", date: "Today, 09:15 AM", priority: "normal" },
    { id: 3, title: "Weather Update", content: "Clear skies expected for the evening match. No roof deployment needed.", date: "Yesterday, 18:00 PM", priority: "normal" },
  ];

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white">Latest Broadcasts</h3>
        <span className="text-xs font-semibold text-fifa-gold uppercase tracking-widest">Live Feed</span>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`p-4 rounded-xl bg-white/5 border transition-all duration-300 ${
              announcement.priority === 'high' 
                ? 'border-fifa-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className={`font-bold text-sm ${announcement.priority === 'high' ? 'text-fifa-gold' : 'text-white'}`}>
                {announcement.title}
              </h4>
              <span className="text-[10px] text-fifa-muted whitespace-nowrap ml-4">{announcement.date}</span>
            </div>
            <p className="text-sm text-fifa-muted leading-relaxed">
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}