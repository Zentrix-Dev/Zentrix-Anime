// components/ui/Navbar.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "./Button";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full bg-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo & Primary Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_15px_var(--accent-glow)] group-hover:scale-105 transition-transform">
              <span className="font-display font-bold text-white text-lg leading-none">Z</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              Zentrix<span className="text-accent-secondary">Anime</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-text-secondary hover:text-accent-primary transition-colors">Home</Link>
            <Link href="/browse" className="text-sm font-bold text-text-secondary hover:text-accent-primary transition-colors">Browse</Link>
            <Link href="/schedule" className="text-sm font-bold text-text-secondary hover:text-accent-primary transition-colors">Schedule</Link>
            <Link href="/top" className="text-sm font-bold text-text-secondary hover:text-accent-primary transition-colors">Top Anime</Link>
          </nav>
        </div>

        {/* Search & User Auth */}
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-text-muted hover:text-accent-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {session?.user ? (
            <Link href="/profile" className="flex items-center gap-3 group">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-text-primary leading-tight">{session.user.name}</p>
                <p className="text-xs text-text-muted leading-tight">Profile</p>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-border-subtle group-hover:border-accent-primary transition-colors">
                <Image 
                  src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                  alt={session.user.name || "User Avatar"} 
                  width={36} 
                  height={36} 
                  className="object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="primary" className="py-1.5 px-4 text-sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
      </div>
    </header>
  );
}
