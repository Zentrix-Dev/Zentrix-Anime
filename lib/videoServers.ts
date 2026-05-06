// lib/videoServers.ts

export type EpisodeParams = {
  anilistId: number;
  episode: number;
  language: "sub" | "dub";
  tmdbId?: number; // Required for Peachify & VidZen
  season?: number;
};

export type VideoServer = {
  id: string;
  name: string;
  supports: ("sub" | "dub")[];
  buildUrl: (params: EpisodeParams) => string;
};

export const VIDEO_SERVERS: VideoServer[] = [
  {
    id: "megaplay-ani",
    name: "MegaPlay",
    supports: ["sub", "dub"],
    // Uses the exact AniList endpoint provided
    buildUrl: ({ anilistId, episode, language }) =>
      `https://megaplay.buzz/stream/ani/${anilistId}/${episode}/${language}`,
  },
  {
    id: "peachify",
    name: "Peachify",
    supports: ["sub"],
    // Requires TMDB ID. If you don't have it mapped, it will likely fail to find the video.
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://peachify.top/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://peachify.top/embed/tv/00000/${season}/${episode}`, // Fallback prevents crash
  },
  {
    id: "vidzen",
    name: "VidZen",
    supports: ["sub"],
    // Requires TMDB ID.
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://vidzen.fun/tv/${tmdbId}/${season}/${episode}`
        : `https://vidzen.fun/tv/00000/${season}/${episode}`,
  },
];
