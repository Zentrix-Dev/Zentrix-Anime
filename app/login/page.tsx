// app/login/page.tsx
import { signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-elevated/40 backdrop-blur-xl border border-border-subtle rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Left Side: Visual / Anime Collage */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto hidden sm:block">
          <Image
            // Placeholder: Replace with an actual cinematic anime artwork or collage
            src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKABsomRy.jpg" 
            alt="Anime Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-elevated/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 space-y-4">
            <h2 className="font-display font-bold text-4xl text-white drop-shadow-md">
              Enter the <br/><span className="text-accent-primary">Shadow Realm.</span>
            </h2>
            <p className="text-text-secondary font-medium">
              Sync your watch history, create custom lists, and resume episodes across all your devices.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl tracking-wide text-white flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_10px_var(--accent-glow)]">
                  <span className="text-white text-sm leading-none">Z</span>
                </div>
                ZentrixAnime
              </span>
            </Link>
            <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome Back</h1>
            <p className="text-text-muted text-sm">Sign in to continue to your account.</p>
          </div>

          <div className="space-y-4">
            {/* Server Action for Google SignIn */}
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-elevated px-2 text-text-muted">Or</span>
              </div>
            </div>

            {/* Placeholder Email/Password Form for visual completeness */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-1">Email</label>
                <input 
                  type="email" 
                  disabled
                  placeholder="name@example.com"
                  className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary opacity-50 cursor-not-allowed"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-bold text-text-secondary">Password</label>
                  <a href="#" className="text-xs text-accent-secondary hover:text-accent-primary">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  disabled
                  placeholder="••••••••"
                  className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary opacity-50 cursor-not-allowed"
                />
              </div>
              
              <Button variant="primary" className="w-full mt-2 opacity-50 cursor-not-allowed" disabled>
                Sign In with Email (WIP)
              </Button>
            </form>
          </div>
          
          <p className="text-center text-sm text-text-muted mt-8">
            By signing in, you agree to our <Link href="/legal/terms-of-service" className="text-accent-secondary hover:underline">Terms of Service</Link> and <Link href="/legal/privacy-policy" className="text-accent-secondary hover:underline">Privacy Policy</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
