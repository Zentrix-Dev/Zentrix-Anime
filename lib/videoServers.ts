// lib/videoServers.ts

export type EpisodeParams = {
  anilistId: number;
  episode: number;
  language: "sub" | "dub";
  tmdbId?: number; // Required for TMDB-based servers
  season?: number; // Defaults to 1 for anime
};

export type VideoServer = {
  id: string;
  name: string;
  supports: ("sub" | "dub")[];
  type: "anilist" | "tmdb"; // Helps the UI know which IDs are needed
  buildUrl: (params: EpisodeParams) => string;
};

export const VIDEO_SERVERS: VideoServer[] = [
  // --- NATIVE ANILIST SERVERS (Best for your site) ---
  {
    id: "megaplay",
    name: "MegaPlay",
    supports: ["sub", "dub"],
    type: "anilist",
    buildUrl: ({ anilistId, episode, language }) =>
      `https://megaplay.buzz/stream/ani/${anilistId}/${episode}/${language}`,
  },
  {
    id: "4animo",
    name: "4Animo",
    supports: ["sub", "dub"],
    type: "anilist",
    buildUrl: ({ anilistId, episode, language }) =>
      `https://cdn.4animo.xyz/api/embed/anilist/${anilistId}/${episode}/${language}?k=1`,
  },

  // --- TMDB BASED SERVERS (Movies & TV Shows) ---
  {
    id: "vidsrc",
    name: "VidSrc",
    supports: ["sub"], // Usually auto-detects based on user location/preference
    type: "tmdb",
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://vidsrc.ru/tv/${tmdbId}/${season}/${episode}?autoplay=true`
        : `https://vidsrc.ru/tv/0/${season}/${episode}`,
  },
  {
    id: "vidzen",
    name: "VidZen",
    supports: ["sub"],
    type: "tmdb",
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://vidzen.fun/tv/${tmdbId}/${season}/${episode}`
        : `https://vidzen.fun/tv/0/${season}/${episode}`,
  },
  {
    id: "vidplays",
    name: "VidPlays",
    supports: ["sub"],
    type: "tmdb",
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://vidplays.fun/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidplays.fun/embed/tv/0/${season}/${episode}`,
  },
  {
    id: "peachify",
    name: "Peachify",
    supports: ["sub"],
    type: "tmdb",
    buildUrl: ({ tmdbId, season = 1, episode }) =>
      tmdbId 
        ? `https://peachify.top/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://peachify.top/embed/tv/0/${season}/${episode}`,
  },
];
