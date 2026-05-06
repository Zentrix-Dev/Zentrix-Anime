"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

// Assuming we expand our interface slightly from the previous fetcher
interface HeroAnime {
  id: number;
  title: { romaji: string; english: string | null };
  bannerImage: string | null;
  coverImage: { extraLarge: string };
  description: string;
  genres: string[];
}

export function HeroCarousel({ trending }: { trending: HeroAnime[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out anime that don't have a banner image for a cleaner hero
  const validHeroes = trending.filter(a => a.bannerImage).slice(0, 5);

  useEffect(() => {
    if (validHeroes.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validHeroes.length);
    }, 6000); // 6s interval as requested
    return () => clearInterval(timer);
  }, [validHeroes.length]);

  if (validHeroes.length === 0) return null;

  const currentAnime = validHeroes[currentIndex];

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-primary group">
      {/* Background Image with Crossfade */}
      {validHeroes.map((anime, index) => (
        <div 
          key={anime.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={anime.bannerImage || anime.coverImage.extraLarge}
            alt={anime.title.english || anime.title.romaji}
            fill
            className="object-cover opacity-60"
            priority={index === 0}
          />
          {/* Gradient Overlays for readability and blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-2xl space-y-4">
          <div className="flex gap-2 flex-wrap mb-2">
            {currentAnime.genres.slice(0, 3).map(genre => (
              <span key={genre} className="px-3 py-1 bg-accent-primary/20 text-accent-primary border border-accent-primary/30 rounded-full text-xs font-accent tracking-wider uppercase backdrop-blur-sm">
                {genre}
              </span>
            ))}
          </div>
          
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight drop-shadow-lg">
            {currentAnime.title.english || currentAnime.title.romaji}
          </h1>
          
          {/* Parse HTML tags out of AniList descriptions and truncate */}
          <p className="text-text-secondary text-sm md:text-base line-clamp-3 max-w-xl">
            {currentAnime.description?.replace(/<[^>]*>?/gm, '') || "No description available."}
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <Link href={`/anime/${currentAnime.id}`}>
              <Button variant="primary">▶ Watch Now</Button>
            </Link>
            <Button variant="glass">＋ Add to List</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
