// app/watch/[id]/[episode]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnimeById } from "@/lib/anilist";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Button } from "@/components/ui/Button";

interface WatchPageProps {
  params: {
    id: string;
    episode: string;
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const animeId = parseInt(params.id, 10);
  const episodeNum = parseInt(params.episode, 10);

  if (isNaN(animeId) || isNaN(episodeNum)) {
    notFound();
  }

  let anime;
  try {
    anime = await getAnimeById(animeId);
  } catch (error) {
    notFound();
  }

  const title = anime.title.english || anime.title.romaji;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col gap-6">
      
      {/* Breadcrumbs & Title Area */}
      <div className="space-y-2">
        <Link 
          href={`/anime/${animeId}`}
          className="text-sm text-accent-secondary hover:text-accent-primary transition-colors font-bold"
        >
          ← Back to Details
        </Link>
        <h1 className="font-display font-bold text-2xl md:text-4xl text-white">
          {title} <span className="text-text-muted">|</span> <span className="text-accent-primary">Episode {episodeNum}</span>
        </h1>
      </div>

      {/* Main Player Area */}
      <div className="w-full max-w-6xl mx-auto">
        <VideoPlayer anilistId={animeId} episode={episodeNum} />
      </div>

      {/* Below Player Controls (Next/Prev Ep, Info) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 bg-bg-card p-4 rounded-xl border border-border-subtle mt-4">
        <div className="flex items-center gap-4">
          <Link href={`/watch/${animeId}/${Math.max(1, episodeNum - 1)}`}>
            <Button variant="ghost" disabled={episodeNum <= 1}>
              ⏮ Prev
            </Button>
          </Link>
          <Link href={`/watch/${animeId}/${episodeNum + 1}`}>
            <Button variant="ghost">
              Next ⏭
            </Button>
          </Link>
        </div>
        
        <div className="text-right text-sm text-text-secondary">
          <p>If the video does not load, try switching servers.</p>
          <p>Keyboard shortcuts: <span className="text-white bg-glass px-1 rounded">F</span> Fullscreen</p>
        </div>
      </div>
      
    </div>
  );
}
