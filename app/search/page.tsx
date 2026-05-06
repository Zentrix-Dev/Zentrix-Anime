import { searchAnime } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";
import { SearchInput } from "@/components/ui/SearchInput";

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;

  // Only fetch if there is an active search query
  const searchResults = query ? await searchAnime(query, page) : null;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12 space-y-6">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white">
          Explore the <span className="text-accent-primary">Zentrix</span> Database
        </h1>
        <SearchInput />
      </div>

      {query && searchResults && (
        <div className="space-y-6">
          <p className="text-text-secondary font-display text-lg">
            Found <span className="text-accent-secondary font-bold">{searchResults.pageInfo.total}</span> results for &quot;<span className="text-white">{query}</span>&quot;
          </p>

          {searchResults.media.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {searchResults.media.map((anime) => (
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
              <p className="text-text-muted text-xl">No results found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-20 bg-elevated/30 rounded-xl border border-border-subtle border-dashed">
          <p className="text-text-muted text-xl font-display">Type above to begin your search.</p>
        </div>
      )}
    </div>
  );
}
