"use client";

export default function VolunteerDashboard() {
  return (
    <div className="min-h-screen pt-12 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-2 text-white">Volunteer Hub</h1>
        <p className="text-fifa-muted">Thank you for helping us make history. Here is your schedule.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
        <div className="glass-card p-6 md:col-span-2 bg-gradient-to-r from-fifa-gold/10 to-transparent border-l-4 border-l-fifa-gold">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-fifa-muted uppercase tracking-wider mb-1">Next Assignment</p>
              <p className="text-2xl font-bold text-white">Fan Zone Guide - Sector C</p>
              <p className="text-sm text-fifa-gold mt-1">Tomorrow, 08:00 AM</p>
            </div>
            <button className="btn-primary text-sm px-4 py-2">Check In</button>
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">Hours Logged</p>
          <p className="text-3xl font-bold text-white">24.5</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-xs text-fifa-muted uppercase tracking-wider mb-2">Rating</p>
          <p className="text-3xl font-bold text-white">4.9<span className="text-lg text-fifa-gold">/5</span></p>
        </div>
      </div>

      <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Upcoming Schedule</h3>
        
        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {[
            { date: 'Oct 12', time: '08:00 - 14:00', task: 'Wayfinding Assistance', location: 'Metro Station North' },
            { date: 'Oct 14', time: '12:00 - 18:00', task: 'Ticket Scanning', location: 'Gate 4' },
            { date: 'Oct 15', time: '16:00 - 22:00', task: 'Merchandise Support', location: 'Store Kiosk B' },
          ].map((shift, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-fifa-secondary text-fifa-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 hover:border-fifa-gold/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">{shift.date}</span>
                  <span className="text-xs text-fifa-gold">{shift.time}</span>
                </div>
                <p className="text-sm text-white">{shift.task}</p>
                <p className="text-xs text-fifa-muted mt-1">{shift.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}