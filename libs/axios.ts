import axios from "axios";

const tmdbToken = process.env.EXPO_PUBLIC_TMDB_TOKEN;
const baseURL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    ...(tmdbToken
      ? {
          Authorization: `Bearer ${tmdbToken}`,
        }
      : {}),
  },
});
