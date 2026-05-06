// app/top/page.tsx
import { browseAnime } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";

export default async function TopAnimePage() {
  // Fetch Top 50 anime of all time sorted by SCORE_DESC
  const topAnime = await browseAnime({
    page: 1,
    perPage: 50,
    sort: "SCORE_DESC",
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
          Top <span className="text-accent-tertiary">Anime</span>
        </h1>
        <p className="text-text-muted">The highest-rated shows of all time, according to the community.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {topAnime.media.map((anime: any, index: number) => (
          <div key={anime.id} className="relative group">
            {/* Rank Badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-tertiary text-white font-display font-bold text-lg flex items-center justify-center rounded-full shadow-[0_0_15px_var(--accent-glow)] z-20 border-2 border-primary">
              {index + 1}
            </div>
            
            <AnimeCard
              id={anime.id}
              title={anime.title.english || anime.title.romaji}
              image={anime.coverImage.large}
              score={anime.averageScore || undefined}
              format={anime.format}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
