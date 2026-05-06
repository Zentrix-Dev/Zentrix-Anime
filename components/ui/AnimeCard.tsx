import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score?: number;
  format?: string;
}

export function AnimeCard({ id, title, image, score, format }: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`} className="group block w-full outline-none">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-card border border-border-subtle transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_var(--accent-glow)] group-focus-visible:ring-2 group-focus-visible:ring-accent-primary">
        
        {/* Poster Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges (Top Left/Right) */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
          {format && (
            <span className="bg-glass backdrop-blur-md border border-border-subtle px-2 py-0.5 rounded-full text-[10px] font-accent tracking-wider text-text-primary uppercase">
              {format}
            </span>
          )}
          {score && (
            <span className="bg-accent-primary/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-white shadow-lg">
              {score}%
            </span>
          )}
        </div>

        {/* Title Context (Appears on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <h3 className="font-display font-bold text-sm md:text-base leading-tight text-white line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
