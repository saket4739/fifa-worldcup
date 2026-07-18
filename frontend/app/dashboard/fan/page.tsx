"use client";
import { Suspense } from 'react';

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 bg-white/5 rounded-2xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-white/5 rounded-2xl"></div>
        <div className="h-64 bg-white/5 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default function FanDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">Fan Portal</h1>
        <p className="text-fifa-muted">Manage your tickets and follow your favorite teams.</p>
      </header>

      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                Upcoming Matches
                <span className="text-xs bg-fifa-gold/20 text-fifa-gold px-3 py-1 rounded-full">2 Tickets</span>
              </h2>
              {/* Empty/Loading State Example */}
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full mb-3 flex items-center justify-center border border-white/10">
                  <span className="text-fifa-gold text-xl">⚽</span>
                </div>
                <p className="text-fifa-muted">No matches scheduled yet.</p>
                <button className="mt-3 text-sm text-fifa-gold hover:underline">Explore Match Schedule</button>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <div className="glass-card p-6 bg-gradient-to-br from-fifa-secondary to-fifa-navy">
              <h3 className="text-lg font-bold mb-4">My Teams</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-fifa-gold/30 cursor-pointer">
                  <span className="font-medium">Brazil</span>
                  <span className="text-fifa-muted text-sm">Group G</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-fifa-gold/30 cursor-pointer">
                  <span className="font-medium">France</span>
                  <span className="text-fifa-muted text-sm">Group D</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </Suspense>
    </div>
  );
}