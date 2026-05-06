// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* Glitch text background effect */}
      <h1 className="absolute text-[15rem] md:text-[25rem] font-display font-bold text-white/[0.02] select-none pointer-events-none">
        404
      </h1>

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        <div className="w-24 h-24 mx-auto bg-elevated border border-border-subtle rounded-3xl rotate-45 flex items-center justify-center shadow-[0_0_40px_var(--accent-glow)] mb-8">
          <div className="w-12 h-12 border-t-2 border-r-2 border-accent-primary -rotate-45" />
        </div>

        <h2 className="font-display font-bold text-4xl md:text-5xl text-white drop-shadow-lg">
          Lost in the <span className="text-accent-primary animate-pulse">Shadow Realm</span>
        </h2>
        
        <p className="text-text-secondary text-lg">
          The page you are looking for has been banished or no longer exists in this timeline. 
          Return to the home base before you fade away.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link href="/browse">
            <Button variant="ghost" className="w-full sm:w-auto">
              Browse Anime
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
