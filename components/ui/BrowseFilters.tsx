// components/ui/BrowseFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
const SEASONS = ["WINTER", "SPRING", "SUMMER", "FALL"];
const FORMATS = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL"];
const SORTS = [
  { label: "Popularity", value: "POPULARITY_DESC" },
  { label: "Trending", value: "TRENDING_DESC" },
  { label: "Score", value: "SCORE_DESC" },
  { label: "Date Added", value: "START_DATE_DESC" },
];

export function BrowseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset pagination on filter change
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 bg-elevated/50 p-4 rounded-xl border border-border-subtle backdrop-blur-md mb-8">
      {/* Genre Filter */}
      <select 
        className="bg-bg-card border border-border-subtle text-text-primary px-3 py-2 rounded-lg focus:outline-none focus:border-accent-primary font-display text-sm"
        value={searchParams.get("genre") || ""}
        onChange={(e) => updateFilter("genre", e.target.value)}
      >
        <option value="">All Genres</option>
        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>

      {/* Season Filter */}
      <select 
        className="bg-bg-card border border-border-subtle text-text-primary px-3 py-2 rounded-lg focus:outline-none focus:border-accent-primary font-display text-sm"
        value={searchParams.get("season") || ""}
        onChange={(e) => updateFilter("season", e.target.value)}
      >
        <option value="">All Seasons</option>
        {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Format Filter */}
      <select 
        className="bg-bg-card border border-border-subtle text-text-primary px-3 py-2 rounded-lg focus:outline-none focus:border-accent-primary font-display text-sm"
        value={searchParams.get("format") || ""}
        onChange={(e) => updateFilter("format", e.target.value)}
      >
        <option value="">All Formats</option>
        {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      {/* Sort Filter */}
      <select 
        className="bg-bg-card border border-border-subtle text-text-primary px-3 py-2 rounded-lg focus:outline-none focus:border-accent-primary font-display text-sm"
        value={searchParams.get("sort") || ""}
        onChange={(e) => updateFilter("sort", e.target.value)}
      >
        {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
  );
}
