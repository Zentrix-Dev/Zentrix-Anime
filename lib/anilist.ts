// lib/anilist.ts

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

/**
 * Core fetcher utility for the AniList GraphQL API.
 * Leverages Next.js App Router caching for optimal performance.
 */
export async function fetchAniList<T>(
  query: string, 
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(ANILIST_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    // Cache for 1 hour (3600 seconds) for Incremental Static Regeneration (ISR).
    next: { revalidate: 3600 } 
  });
  
  if (!response.ok) {
    throw new Error(`AniList API error: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  
  if (json.errors) {
    console.error('AniList GraphQL Error:', json.errors[0].message);
    throw new Error(json.errors[0].message);
  }
  
  return json.data;
}

// ==========================================
// 1. Trending Anime (Home Page)
// ==========================================

const TRENDING_QUERY = `
  query TrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        id
        title { romaji english }
        coverImage { extraLarge large }
        bannerImage
        description(asHtml: false)
        genres
        averageScore
        format
      }
    }
  }
`;

export interface AnimeMedia {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { extraLarge: string; large: string };
  bannerImage?: string | null;
  description?: string | null;
  genres: string[];
  averageScore: number | null;
  format: string;
}

export async function getTrendingAnime(page = 1, perPage = 15) {
  const data = await fetchAniList<{ Page: { media: AnimeMedia[] } }>(TRENDING_QUERY, {
    page,
    perPage,
  });
  return data.Page.media;
}

// ==========================================
// 2. Anime Details (Detail Page)
// ==========================================

const ANIME_DETAIL_QUERY = `
  query AnimeDetail($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english native }
      coverImage { extraLarge }
      bannerImage
      description(asHtml: false)
      genres
      averageScore
      status
      format
      episodes
      seasonYear
      studios(isMain: true) { nodes { name } }
    }
  }
`;

export interface AnimeDetailResponse {
  Media: {
    id: number;
    title: { romaji: string; english: string | null; native: string | null };
    coverImage: { extraLarge: string };
    bannerImage: string | null;
    description: string | null;
    genres: string[];
    averageScore: number | null;
    status: string;
    format: string;
    episodes: number | null;
    seasonYear: number | null;
    studios: { nodes: Array<{ name: string }> };
  };
}

export async function getAnimeById(id: number) {
  const data = await fetchAniList<{ Media: AnimeDetailResponse['Media'] }>(ANIME_DETAIL_QUERY, { id });
  return data.Media;
}

// ==========================================
// 3. Search Anime (Search Page)
// ==========================================

const SEARCH_QUERY = `
  query SearchAnime($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
        id
        title { romaji english }
        coverImage { large }
        averageScore
        format
      }
    }
  }
`;

export interface SearchAnimeResponse {
  Page: {
    pageInfo: { total: number; currentPage: number; lastPage: number; hasNextPage: boolean };
    media: Array<{
      id: number;
      title: { romaji: string; english: string | null };
      coverImage: { large: string };
      averageScore: number | null;
      format: string;
    }>;
  };
}

export async function searchAnime(search: string, page = 1, perPage = 24) {
  // Return empty structure if query is empty to avoid API errors
  if (!search) return { pageInfo: { total: 0, currentPage: 1, lastPage: 1, hasNextPage: false }, media: [] };
  
  const data = await fetchAniList<SearchAnimeResponse>(SEARCH_QUERY, {
    search,
    page,
    perPage,
  });
  return data.Page;
}

// ==========================================
// 4. Browse / Filter Anime (Browse Page)
// ==========================================

const BROWSE_QUERY = `
  query BrowseAnime($page: Int, $perPage: Int, $genre: String, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: ANIME, isAdult: false, genre: $genre, season: $season, seasonYear: $seasonYear, format: $format, sort: $sort) {
        id
        title { romaji english }
        coverImage { large }
        averageScore
        format
      }
    }
  }
`;

export interface BrowseParams {
  page?: number;
  perPage?: number;
  genre?: string;
  season?: string;
  seasonYear?: number;
  format?: string;
  sort?: string;
}

export async function browseAnime(params: BrowseParams) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchAniList<{ Page: any }>(BROWSE_QUERY, {
    page: params.page || 1,
    perPage: params.perPage || 24,
    genre: params.genre,
    season: params.season,
    seasonYear: params.seasonYear,
    format: params.format,
    sort: params.sort ? [params.sort] : ['POPULARITY_DESC'],
  });
  return data.Page;
}

// ==========================================
// 5. Airing Schedule (Schedule Page)
// ==========================================

const AIRING_SCHEDULE_QUERY = `
  query AiringSchedule($from: Int, $to: Int) {
    Page(perPage: 50) {
      airingSchedules(airingAt_greater: $from, airingAt_lesser: $to, sort: TIME) {
        id
        airingAt
        episode
        media {
          id
          title { romaji english }
          coverImage { large }
          genres
          averageScore
          format
        }
      }
    }
  }
`;

export async function getAiringSchedule(fromTimestamp: number, toTimestamp: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchAniList<{ Page: { airingSchedules: any[] } }>(AIRING_SCHEDULE_QUERY, {
    from: fromTimestamp,
    to: toTimestamp,
  });
  return data.Page.airingSchedules;
}
