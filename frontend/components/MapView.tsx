"use client";
import { useState } from "react";

export default function MapView() {
  const [selectedStadium, setSelectedStadium] = useState("MetLife Stadium");

  const stadiums = [
    { name: "MetLife Stadium", city: "New York/New Jersey", capacity: "82,500", status: "Ready" },
    { name: "Azteca Stadium", city: "Mexico City", capacity: "87,523", status: "Maintenance" },
    { name: "BC Place", city: "Vancouver", capacity: "54,500", status: "Ready" },
  ];

  return (
    <div className="glass-card p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white tracking-wide">Stadium Telemetry Map</h3>
          <span className="text-xs text-fifa-gold border border-fifa-gold/30 px-3 py-1 rounded-full bg-fifa-gold/5">
            16 Venues Active
          </span>
        </div>

        {/* Cinematic Vector Map Placeholder Canvas */}
        <div className="relative w-full h-64 rounded-xl bg-fifa-navy/80 border border-white/5 overflow-hidden flex items-center justify-center mb-6 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#062B61_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          {/* Animated Gold Coordinate Nodes */}
          <div className="absolute top-1/4 left-1/3 group cursor-pointer" onClick={() => setSelectedStadium("BC Place")}>
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-fifa-gold/40 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fifa-gold shadow-[0_0_10px_#D4AF37]"></span>
          </div>

          <div className="absolute top-1/2 left-1/2 group cursor-pointer" onClick={() => setSelectedStadium("MetLife Stadium")}>
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-fifa-gold/40 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fifa-gold shadow-[0_0_10px_#D4AF37]"></span>
          </div>

          <div className="absolute bottom-1/3 left-1/2 group cursor-pointer" onClick={() => setSelectedStadium("Azteca Stadium")}>
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-fifa-gold/40 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fifa-gold shadow-[0_0_10px_#D4AF37]"></span>
          </div>

          <p className="text-xs text-fifa-muted pointer-events-none uppercase tracking-widest z-10">North American Vector System</p>
        </div>
      </div>

      {/* Dynamic Detailed Stats View */}
      {stadiums.filter(s => s.name === selectedStadium).map((venue, idx) => (
        <div key={idx} className="p-4 rounded-xl bg-fifa-secondary/40 border border-white/5 animate-fade-in">
          <p className="text-xs text-fifa-gold font-bold uppercase tracking-wider mb-1">{venue.city}</p>
          <h4 className="text-lg font-bold text-white mb-2">{venue.name}</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-fifa-muted block">Capacity Limit</span>
              <span className="text-white font-medium">{venue.capacity}</span>
            </div>
            <div>
              <span className="text-fifa-muted block">Operations Status</span>
              <span className={`font-medium ${venue.status === "Ready" ? "text-green-400" : "text-yellow-400"}`}>
                ● {venue.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}