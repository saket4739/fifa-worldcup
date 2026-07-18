import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Lighting Effect */}
      <div className="absolute inset-0 bg-gold-glow opacity-60 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-slide-up">
        <span className="text-fifa-gold font-bold tracking-widest uppercase text-sm mb-4 block">Official Portal</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Experience The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold to-yellow-200">World's Game</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fifa-muted mb-10">
          The ultimate platform for fans, staff, and volunteers. Manage your tickets, access exclusive content, and prepare for the 2026 World Cup.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/fan" className="btn-primary">
            Access Dashboard
          </Link>
          <Link href="/request-role" className="btn-secondary">
            Join as Staff / Volunteer
          </Link>
        </div>

        {/* Animated Statistics Widgets */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { label: 'Days to Kickoff', value: '842' },
            { label: 'Host Cities', value: '16' },
            { label: 'Teams', value: '48' },
            { label: 'Matches', value: '104' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 border-t-4 border-t-fifa-gold hover:bg-fifa-secondary/40">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-fifa-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}