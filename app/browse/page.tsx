// app/browse/page.tsx
import { browseAnime } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";
import { BrowseFilters } from "@/components/ui/BrowseFilters";

interface BrowsePageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  const results = await browseAnime({
    page,
    genre: searchParams.genre,
    season: searchParams.season,
    format: searchParams.format,
    sort: searchParams.sort,
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
          Browse <span className="text-accent-secondary">Anime</span>
        </h1>
        <p className="text-text-muted">Use the filters below to discover your next favorite show.</p>
      </div>

      <BrowseFilters />

      {results.media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.media.map((anime: any) => (
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
      ) : (
        <div className="text-center py-20 bg-elevated/30 rounded-xl border border-border-subtle">
          <p className="text-text-muted text-xl">No anime found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
