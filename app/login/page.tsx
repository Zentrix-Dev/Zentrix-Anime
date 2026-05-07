// app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/");
        router.refresh(); // Forces navbar to show user profile
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-elevated/40 backdrop-blur-xl border border-border-subtle rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Left Side: Visual */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto hidden sm:block">
          <Image
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
            <Link href="/" className="inline-block mb-6 font-display font-bold text-2xl tracking-wide text-white">
              ZentrixAnime
            </Link>
            <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome Back</h1>
            <p className="text-text-muted text-sm">Sign in to continue to your account.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-1">Email</label>
              <input 
                name="email"
                type="email" 
                required
                placeholder="name@example.com"
                className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-text-secondary">Password</label>
              </div>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            
            <Button variant="primary" type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In with Email"}
            </Button>
          </form>
          
          <p className="text-center text-sm text-text-muted mt-8">
            Don't have an account? <Link href="/register" className="text-accent-secondary hover:underline font-bold">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
            }
                
