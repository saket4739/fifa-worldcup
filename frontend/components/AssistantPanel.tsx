"use client";

export default function AssistantPanel() {
  return (
    <div className="glass-card flex flex-col h-[500px] overflow-hidden border-t-4 border-t-fifa-gold">
      <div className="bg-fifa-secondary/80 p-5 border-b border-white/10 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-fifa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            Operations Copilot
          </h3>
          <p className="text-xs text-fifa-muted mt-1">AI-powered venue intelligence</p>
        </div>
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-fifa-navy/30">
        <div className="flex flex-col gap-1 max-w-[85%]">
          <span className="text-[10px] text-fifa-muted ml-2">System</span>
          <div className="rounded-2xl rounded-tl-none p-3.5 bg-white/5 border border-white/10 text-sm text-white">
            Accessing database... The current estimated crowd density at the North Concourse is 82%. Would you like me to suggest rerouting protocols?
          </div>
        </div>
        
        <div className="flex flex-col gap-1 max-w-[85%] self-end items-end">
          <span className="text-[10px] text-fifa-muted mr-2">You</span>
          <div className="rounded-2xl rounded-tr-none p-3.5 bg-fifa-gold text-fifa-navy font-medium text-sm">
            Yes, please display the optimal fan flow redirection to Sector B.
          </div>
        </div>
      </div>

      <div className="p-4 bg-fifa-navy/80 border-t border-white/10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask the operations copilot..." 
            className="w-full bg-fifa-secondary/50 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white placeholder:text-fifa-muted focus:outline-none focus:border-fifa-gold transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-fifa-gold hover:text-white transition-colors bg-white/5 rounded-md hover:bg-white/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}