import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { PopularMoviesResponse } from "@/types/PopularMoviesResponse";

const baseURL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;
const tmdbToken = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      "Content-type": "application/json",
      ...(tmdbToken
        ? {
            Authorization: `Bearer ${tmdbToken}`,
          }
        : {}),
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<PopularMoviesResponse, number>({
      query: (page) => `/movie/popular?language=en-US&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApi;
