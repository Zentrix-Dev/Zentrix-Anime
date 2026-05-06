// components/ui/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-elevated/50 border-t border-border-subtle mt-auto backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-2xl tracking-wide text-white">
                Zentrix<span className="text-accent-secondary">Anime</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm max-w-md leading-relaxed">
              ZentrixAnime does not store any files on our server, we only link to the media which is hosted on 3rd party services. 
              Enjoy the best Neo-Tokyo streaming experience.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/browse" className="hover:text-accent-primary transition-colors">Browse</Link></li>
              <li><Link href="/schedule" className="hover:text-accent-primary transition-colors">Release Schedule</Link></li>
              <li><Link href="/top" className="hover:text-accent-primary transition-colors">Top Anime</Link></li>
              <li><Link href="/seasonal" className="hover:text-accent-primary transition-colors">Seasonal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/legal/terms-of-service" className="hover:text-accent-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy-policy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cookie-policy" className="hover:text-accent-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/legal/dmca" className="hover:text-accent-primary transition-colors">DMCA</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-border-subtle text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} ZentrixAnime. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Placeholder Social Icons */}
            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center text-text-muted hover:text-accent-primary hover:bg-white/10 transition-all cursor-pointer">X</div>
            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center text-text-muted hover:accent-primary hover:bg-white/10 transition-all cursor-pointer">Dc</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
