"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-fifa-gold text-fifa-navy shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center focus:outline-none transition-transform active:scale-95 hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        )}
      </button>

      {/* Main Glassmorphic Panel Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 h-[450px] glass-card flex flex-col justify-between overflow-hidden animate-slide-up border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* System Header */}
          <div className="bg-fifa-secondary/80 p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></div>
            <div>
              <h4 className="text-sm font-bold text-white">Official Assistant</h4>
              <p className="text-[10px] text-fifa-muted">Operations & Venue Automated Support</p>
            </div>
          </div>

          {/* Messages Stream Layer */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-fifa-navy/20">
            <div className="max-w-[80%] rounded-2xl rounded-tl-none p-3 bg-white/5 border border-white/5 text-sm leading-relaxed">
              Hello! How can I assist you with match configurations, schedules, or volunteer systems today?
            </div>
          </div>

          {/* Interactive Chat Input Area */}
          <div className="p-4 border-t border-white/10 bg-fifa-navy/60 backdrop-blur-md">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Type your question..." 
                className="w-full bg-fifa-secondary/40 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-fifa-muted focus:outline-none focus:border-fifa-gold transition-colors"
              />
              <button className="absolute right-3 text-fifa-gold hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}