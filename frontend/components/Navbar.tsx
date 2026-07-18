"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-fifa-navy/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
              <span className="text-fifa-gold">FIFA</span> 2026
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Home', 'Matches', 'Dashboard', 'Teams'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  className="relative group text-sm font-medium text-fifa-muted hover:text-white transition-colors duration-300"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-fifa-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-fifa-gold transition-colors">Sign In</Link>
            <Link href="/register" className="btn-primary py-2 px-4 text-sm">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}