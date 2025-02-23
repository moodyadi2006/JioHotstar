export const tmdbBASEURL = "https://api.themoviedb.org/3";
export const tmdbSearchURL = "https://api.themoviedb.org/3/search/movie?query="
export const tmdbMovieVideoURL = "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US"
export const tmdbTvShowsVideoURL = "https://api.themoviedb.org/3/tv/video_id/videos"
export const imageBASEURL = "https://image.tmdb.org/t/p/original/";
export const TMDB_ENDPOINT = {
  fetchTvShowsAiringToday: "/tv/airing_today?language=en-US&page=1",
  fetchTvShowsAiring: "/tv/on_the_air?language=en-US&page=1",
  fetchCurrentMovies: "/movie/now_playing?language=en-US",
  fetchTrendingMovies: "/trending/movie/day?language=en-US",
  fetchTrendingTvShows: "/trending/tv/day?language=en-US",
  fetchPopularMovies: `/movie/popular?language=en-US&page=1`,
  fetchPopularTvShows: `/tv/popular?language=en-US&page=1`,
  fetchLatestMovies: `/movie/latest`,
  fetchLatestTvShows: `/tv/latest`,
  fetchUpcomingMovies: `/movie/upcoming?include_video=true`,
  fetchTopRatedMovies: `/movie/top_rated?language=en-US&page=1`,
  fetchTopRatedTvShows: `/tv/top_rated?language=en-US&page=1`,
  fetchActionMovies: `/discover/movie?language=en-USGwith_genres=28`,
  fetchComedyMovies: `/discover/movie?language=en-US&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?language=en-US&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?language=en-US&with genres=10749`,
  fetchAnimeMovies: `/discover/movie?language=en-US&with_genres=16`,
  fetchActionTvShows: `/discover/tv?language=en-US&with_genres=10759`,
  fetchComedyTvShows: `/discover/tv?language=en-US&with_genres=35`,
  fetchMysteryTvShows: `/discover/tv?language=en-US&with_genres=9648`,
  fetchDramaTvShows: `/discover/tv?language=en-US&with_genres=18`,
  fetchCrimeTvShows: `/discover/tv?language=en-USGwith_genres=80`,
};


export async function getMediaList(endpoint) {
  const url = tmdbBASEURL + endpoint;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function searchMovie(endpoint) {
  const url = tmdbSearchURL + endpoint;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function movieVideo(movieId) {
  const url = tmdbMovieVideoURL.replace("movie_id", movieId);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function tvShowsVideo(tvShowsId) {
  const url = tmdbTvShowsVideoURL.replace("video_id", tvShowsId);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
