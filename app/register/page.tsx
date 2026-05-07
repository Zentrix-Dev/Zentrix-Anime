// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong.");
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
              Join the <br/><span className="text-accent-secondary">Shadow Realm.</span>
            </h2>
            <p className="text-text-secondary font-medium">
              Create an account to track your progress and sync across devices.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6 font-display font-bold text-2xl tracking-wide text-white">
              ZentrixAnime
            </Link>
            <h1 className="font-display font-bold text-3xl text-white mb-2">Create Account</h1>
            <p className="text-text-muted text-sm">Fill in your details to get started.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-1">Username</label>
              <input 
                name="name"
                type="text" 
                required
                placeholder="Otaku123"
                className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
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
              <label className="block text-sm font-bold text-text-secondary mb-1">Password</label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                minLength={6}
                className="w-full bg-glass border border-border-subtle text-text-primary px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            
            <Button variant="primary" type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-8">
            Already have an account? <Link href="/login" className="text-accent-secondary hover:underline font-bold">Sign In</Link>
          </p>
        </div>

      </div>
    </div>
  );
        }
            
