// app/genre/[genre]/page.tsx
import { browseAnime } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";
import { notFound } from "next/navigation";

interface GenrePageProps {
  params: {
    genre: string;
  };
  searchParams: { page?: string };
}

// Map URL-friendly slugs back to AniList strict genre names
const genreMap: Record<string, string> = {
  "action": "Action",
  "adventure": "Adventure",
  "comedy": "Comedy",
  "drama": "Drama",
  "fantasy": "Fantasy",
  "horror": "Horror",
  "mecha": "Mecha",
  "mystery": "Mystery",
  "psychological": "Psychological",
  "romance": "Romance",
  "sci-fi": "Sci-Fi",
  "slice-of-life": "Slice of Life",
  "sports": "Sports",
  "supernatural": "Supernatural",
  "thriller": "Thriller"
};

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const decodedSlug = decodeURIComponent(params.genre).toLowerCase();
  const actualGenre = genreMap[decodedSlug];

  if (!actualGenre) {
    notFound(); // Trigger 404 if the genre isn't in our map
  }

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // Fetch top popularity anime for this specific genre
  const results = await browseAnime({
    page,
    perPage: 30,
    genre: actualGenre,
    sort: "POPULARITY_DESC",
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      
      {/* Genre Header Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-12 flex items-center justify-center border border-border-subtle shadow-[0_0_30px_rgba(124,58,237,0.1)]">
        {/* We use a generic cyberpunk gradient for genre banners */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-primary to-accent-secondary/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-wider uppercase drop-shadow-lg">
            {actualGenre}
          </h1>
          <p className="text-text-secondary mt-2 font-display text-lg">
            Explore the best <span className="text-accent-primary">{actualGenre}</span> anime
          </p>
        </div>
      </div>

      {/* Results Grid */}
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
        <div className="text-center py-20">
          <p className="text-text-muted text-xl">No anime found for this genre.</p>
        </div>
      )}
    </div>
  );
}
