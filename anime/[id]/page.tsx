import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnimeById } from "@/lib/anilist";
import { Button } from "@/components/ui/Button";

// Next.js 14 requires params to be properly typed for dynamic routes
interface PageProps {
  params: {
    id: string;
  };
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const animeId = parseInt(params.id, 10);

  // Prevent NaN bugs if a user manually types a non-numeric ID in the URL
  if (isNaN(animeId)) {
    notFound();
  }

  let anime;
  try {
    anime = await getAnimeById(animeId);
  } catch (error) {
    // If the API fails or the ID doesn't exist on AniList, trigger Next.js 404
    notFound();
  }

  // Fallbacks for data that might be null from AniList
  const title = anime.title.english || anime.title.romaji;
  const bannerImg = anime.bannerImage || anime.coverImage.extraLarge;
  const studioName = anime.studios.nodes[0]?.name || "Unknown Studio";
  
  // Clean AniList's HTML descriptions (they often include <br> and <i> tags)
  const cleanDescription = anime.description 
    ? anime.description.replace(/<[^>]*>?/gm, '') 
    : "No synopsis available.";

  return (
    <div className="flex flex-col min-h-screen pb-20">
      
      {/* Cinematic Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-primary">
        <Image
          src={bannerImg}
          alt={`${title} Banner`}
          fill
          className="object-cover opacity-40 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Poster & Actions */}
          <div className="w-full md:w-[260px] lg:w-[300px] shrink-0 space-y-6">
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border-2 border-border-subtle shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
              <Image
                src={anime.coverImage.extraLarge}
                alt={`${title} Poster`}
                fill
                className="object-cover"
                priority
              />
              {/* Holographic Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] hover:duration-1000" />
            </div>
            
            <div className="flex flex-col gap-3">
              <Link href={`/watch/${animeId}/1`} className="w-full">
                <Button variant="primary" className="w-full">▶ Watch Episode 1</Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="glass">＋ My List</Button>
                <Button variant="glass">★ Favorite</Button>
              </div>
            </div>
          </div>

          {/* Right Column: Info Panel */}
          <div className="flex-1 pt-4 md:pt-16 space-y-6">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
                {title}
              </h1>
              {anime.title.native && (
                <h2 className="font-jp text-text-muted text-lg">
                  {anime.title.native}
                </h2>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-text-secondary bg-elevated/50 backdrop-blur-md border border-border-subtle rounded-lg p-4 w-fit">
              {anime.averageScore && (
                <span className="flex items-center gap-1 text-accent-secondary">
                  <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
                  {anime.averageScore}% SCORE
                </span>
              )}
              <span className="text-text-muted px-2">|</span>
              <span className="uppercase">{anime.format}</span>
              <span className="text-text-muted px-2">|</span>
              <span>{anime.seasonYear || "TBA"}</span>
              <span className="text-text-muted px-2">|</span>
              <span>{anime.episodes ? `${anime.episodes} EPS` : "Ongoing"}</span>
              <span className="text-text-muted px-2">|</span>
              <span className="text-accent-tertiary">{studioName}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span 
                  key={genre} 
                  className="px-4 py-1.5 bg-glass border border-border-subtle rounded-full text-sm font-accent tracking-widest uppercase hover:border-accent-primary transition-colors cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="space-y-2 max-w-4xl">
              <h3 className="font-display font-bold text-xl text-white border-b border-border-subtle pb-2">
                Synopsis
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {cleanDescription}
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
