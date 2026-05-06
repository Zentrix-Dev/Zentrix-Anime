// components/ui/JsonLd.tsx
export function JsonLd({ anime }: { anime: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": anime.title.english || anime.title.romaji,
    "alternativeHeadline": anime.title.native,
    "description": anime.description?.replace(/<[^>]*>?/gm, ''),
    "image": anime.coverImage.extraLarge,
    "genre": anime.genres,
    "numberOfEpisodes": anime.episodes,
    "aggregateRating": anime.averageScore ? {
      "@type": "AggregateRating",
      "ratingValue": (anime.averageScore / 10).toFixed(1), // Convert 100-scale to 10-scale
      "bestRating": "10"
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
