// lib/videoServers.ts

export type EpisodeParams = {
  anilistId: number;
  episode: number;
  language: 'sub' | 'dub';
  // Optional IDs for fallback servers that use different database mappings
  malId?: number;
  tmdbId?: number;
  fourAnimoEpId?: string;
  season?: number;
};

export type VideoServer = {
  id: string;
  name: string;
  supports: ('sub' | 'dub')[];
  buildUrl: (params: EpisodeParams) => string;
};

export const VIDEO_SERVERS: VideoServer[] = [
  {
    id: 'megaplay-anilist',
    name: 'MegaPlay',
    supports: ['sub', 'dub'],
    buildUrl: ({ anilistId, episode, language }) =>
      `https://megaplay.buzz/stream/ani/${anilistId}/${episode}/${language}`,
  },
  {
    id: 'megaplay-mal',
    name: 'MegaPlay (MAL)',
    supports: ['sub', 'dub'],
    buildUrl: ({ malId, episode, language }) =>
      // Requires malId, fallback to AniList ID if missing (might fail but prevents crash)
      `https://megaplay.buzz/stream/mal/${malId || anilistId}/${episode}/${language}`,
  },
  {
    id: '4animo',
    name: '4Animo HD',
    supports: ['sub', 'dub'],
    buildUrl: ({ fourAnimoEpId, language }) =>
      // Note: 4Animo typically requires their specific DB ID. 
      // In a real scenario, you'd fetch an ID mapping API. We use a placeholder logic here.
      `https://cdn.4animo.xyz/api/embed/hd-1/${fourAnimoEpId || 'unknown'}/${language}?k=1&autoPlay=1&skipIntro=1`,
  },
  {
    id: 'vidzen',
    name: 'VidZen',
    supports: ['sub'],
    buildUrl: ({ tmdbId, season, episode }) =>
      season
        ? `https://vidzen.fun/tv/${tmdbId}/${season}/${episode}`
        : `https://vidzen.fun/movie/${tmdbId}`,
  },
  {
    id: 'vixsrc',
    name: 'VixSrc',
    supports: ['sub'],
    buildUrl: ({ tmdbId, season, episode }) =>
      season
        ? `https://vixsrc.to/tv/${tmdbId}/${season}/${episode}`
        : `https://vixsrc.to/movie/${tmdbId}`,
  },
];
