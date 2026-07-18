"use client";

interface TeamBannerProps {
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

export default function TeamBanner({ homeTeam, awayTeam, matchDate, stadium }: TeamBannerProps) {
  return (
    <div className="w-full glass-card relative overflow-hidden bg-gradient-to-r from-fifa-navy via-fifa-secondary to-fifa-navy border-l-4 border-l-fifa-gold p-8 shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-glow opacity-30 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8 text-center md:text-left">
          {/* Home Team */}
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">{homeTeam}</h2>
            <span className="text-xs text-fifa-gold font-semibold tracking-widest">HOST</span>
          </div>
          
          <div className="text-xl md:text-2xl font-bold text-fifa-muted px-4 py-1 rounded bg-white/5 border border-white/10">
            VS
          </div>

          {/* Away Team */}
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">{awayTeam}</h2>
            <span className="text-xs text-fifa-muted font-semibold tracking-widest">CONTENDER</span>
          </div>
        </div>

        {/* Live Match Scheduling Info */}
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
          <p className="text-sm font-semibold text-white tracking-wide">{matchDate}</p>
          <p className="text-xs text-fifa-muted mt-1">{stadium}</p>
          <span className="inline-block mt-3 text-[10px] font-bold tracking-widest bg-fifa-gold text-fifa-navy px-3 py-1 rounded uppercase">
            Group Stage Match
          </span>
        </div>
      </div>
    </div>
  );
}