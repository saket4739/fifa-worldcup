"use client";

export default function RoleRequestPanel() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4">Application Status</h3>
      
      <div className="p-5 rounded-xl bg-fifa-secondary/30 border border-fifa-gold/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-fifa-gold rounded-full mix-blend-multiply filter blur-[50px] opacity-10"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs text-fifa-muted uppercase tracking-wider mb-1">Target Role</p>
            <p className="text-xl font-bold text-white">Event Volunteer</p>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            Pending Review
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4">
          <div className="flex-1">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-fifa-gold w-1/2 rounded-full relative">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
              </div>
            </div>
          </div>
          <span className="text-xs text-fifa-muted font-medium">Step 2 of 3</span>
        </div>
      </div>
    </div>
  );
}