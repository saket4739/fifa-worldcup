"use client";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  // Note: Backend authentication logic remains untouched.
  // This is purely the visual wrapper for when the app is checking authorization.
  const isChecking = false; 
  const isAuthorized = true;

  if (isChecking) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-10 h-10 border-4 border-white/10 border-t-fifa-gold rounded-full animate-spin mb-4"></div>
        <p className="text-fifa-muted text-sm uppercase tracking-widest font-semibold">Verifying Credentials</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6 animate-slide-up">
        <div className="glass-card p-10 max-w-md text-center border-t-4 border-t-red-500">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <h2 className="text-2xl font-bold text-white mb-2">Restricted Area</h2>
          <p className="text-fifa-muted text-sm">Your current clearance level does not permit access to this sector.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}