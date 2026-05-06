// app/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      
      {/* Header Skeleton */}
      <div className="w-64 h-10 bg-elevated rounded-md animate-pulse mb-8 border border-border-subtle" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Poster Skeleton */}
            <div className="relative aspect-[2/3] w-full rounded-xl bg-elevated animate-pulse border border-border-subtle overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
            </div>
            {/* Title Skeleton */}
            <div className="w-3/4 h-4 bg-elevated rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-elevated rounded animate-pulse opacity-50" />
          </div>
        ))}
      </div>

    </div>
  );
}
