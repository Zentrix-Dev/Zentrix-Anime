// app/page.tsx (Final Version)
import { getTrendingAnime, browseAnime } from "@/lib/anilist";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { AnimeCard } from "@/components/ui/AnimeCard";

export default async function HomePage() {
  // Fetch data in parallel for speed
  const [trending, topRated, seasonal] = await Promise.all([
    getTrendingAnime(1, 15),
    browseAnime({ sort: "SCORE_DESC", perPage: 10 }),
    browseAnime({ season: "SPRING", seasonYear: 2026, perPage: 10 }) 
  ]);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroCarousel trending={trending as any} />

      <div className="container mx-auto px-4 mt-12 space-y-16">
        
        {/* Trending Section */}
        <section>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent-primary rounded-full" /> Trending Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trending.slice(5).map((anime) => (
              <AnimeCard 
                key={anime.id} 
                id={anime.id} 
                title={anime.title.english || anime.title.romaji} 
                image={anime.coverImage.large} 
                score={anime.averageScore || undefined}
                format={anime.format}
              />
            ))}
          </div>
        </section>

        {/* Top Rated Section */}
        <section>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent-secondary rounded-full" /> All-Time Favorites
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topRated.media.map((anime: any) => (
              <AnimeCard 
                key={anime.id} 
                id={anime.id} 
                title={anime.title.english || anime.title.romaji} 
                image={anime.coverImage.large} 
                score={anime.averageScore || undefined}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
