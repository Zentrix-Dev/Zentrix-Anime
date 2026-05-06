// app/seasonal/page.tsx
import { browseAnime } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";

// Helper to determine the current anime season
function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "SPRING";
  if (month >= 5 && month <= 7) return "SUMMER";
  if (month >= 8 && month <= 10) return "FALL";
  return "WINTER";
}

interface SeasonalPageProps {
  searchParams: { season?: string; year?: string };
}

export default async function SeasonalPage({ searchParams }: SeasonalPageProps) {
  const currentYear = new Date().getFullYear();
  const season = searchParams.season?.toUpperCase() || getCurrentSeason();
  const year = searchParams.year ? parseInt(searchParams.year, 10) : currentYear;

  // Fetch seasonal anime
  const seasonalAnime = await browseAnime({
    page: 1,
    perPage: 40,
    season: season,
    seasonYear: year,
    sort: "POPULARITY_DESC",
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-elevated/30 p-6 md:p-8 rounded-2xl border border-border-subtle">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2 tracking-wide">
            {season} <span className="text-accent-secondary">{year}</span>
          </h1>
          <p className="text-text-muted">The most popular shows airing this season.</p>
        </div>

        {/* Note: In a fully interactive client, these would be <select> dropdowns 
            that push router changes, similar to the BrowseFilters component. */}
        <div className="flex gap-4">
          <a href={`/seasonal?season=WINTER&year=${year}`} className={`px-4 py-2 rounded-lg border font-bold text-sm ${season === 'WINTER' ? 'bg-accent-primary text-white border-accent-primary' : 'border-border-subtle text-text-secondary hover:text-white'}`}>WINTER</a>
          <a href={`/seasonal?season=SPRING&year=${year}`} className={`px-4 py-2 rounded-lg border font-bold text-sm ${season === 'SPRING' ? 'bg-accent-primary text-white border-accent-primary' : 'border-border-subtle text-text-secondary hover:text-white'}`}>SPRING</a>
          <a href={`/seasonal?season=SUMMER&year=${year}`} className={`px-4 py-2 rounded-lg border font-bold text-sm ${season === 'SUMMER' ? 'bg-accent-primary text-white border-accent-primary' : 'border-border-subtle text-text-secondary hover:text-white'}`}>SUMMER</a>
          <a href={`/seasonal?season=FALL&year=${year}`} className={`px-4 py-2 rounded-lg border font-bold text-sm ${season === 'FALL' ? 'bg-accent-primary text-white border-accent-primary' : 'border-border-subtle text-text-secondary hover:text-white'}`}>FALL</a>
        </div>
      </div>

      {/* Grid */}
      {seasonalAnime.media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {seasonalAnime.media.map((anime: any) => (
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
        <div className="text-center py-20">
          <p className="text-text-muted text-xl font-display">No records found for this season.</p>
        </div>
      )}
    </div>
  );
}
