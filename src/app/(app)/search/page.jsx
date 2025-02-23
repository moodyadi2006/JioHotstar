"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const [currentMoviesList, setCurrentMoviesList] = useState([]);
  const [actionMoviesList, setActionMoviesList] = useState([]);
  const [actionTvShowsList, setActionTvShowsList] = useState([]);
  const [airingTvShowsList, setAiringTvShowsList] = useState([]);
  const [animeMoviesList, setAnimeMoviesList] = useState([]);
  const [comedyMoviesList, setComedyMoviesList] = useState([]);
  const [comedyTvShowsList, setComedyTvShowsList] = useState([]);
  const [crimeTvShowsList, setCrimeTvShowsList] = useState([]);
  const [dramaTvShowsList, setDramaTvShowsList] = useState([]);
  const [horrorMoviesList, setHorrorMoviesList] = useState([]);
  const [latestMoviesList, setLatestMoviesList] = useState([]);
  const [latestTvShowsList, setLatestTvShowsList] = useState([]);
  const [mysteryTvShowsList, setMysteryTvShowsList] = useState([]);
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [popularTvShowsList, setPopularTvShowsList] = useState([]);
  const [romanceMoviesList, setRomanceMoviesList] = useState([]);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [topRatedTvShowsList, setTopRatedTvShowsList] = useState([]);
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);
  const [trendingTvShowsList, setTrendingTvShowsList] = useState([]);
  const [tvShowsAiringTodayList, setTvShowsAiringTodayList] = useState([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [noMovies, setNoMovies] = useState(false);

  useEffect(() => {
    if (trendingMoviesList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % trendingMoviesList.length
        );
      }, 10000); // Change to 10 seconds

      return () => clearInterval(interval);
    }
  }, [trendingMoviesList]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentMoviesListResponse = await axios.get(
          "/api/movies/currentMoviesList"
        );
        setCurrentMoviesList(currentMoviesListResponse.data.data.results);
        const actionMoviesListResponse = await axios.get(
          "/api/movies/actionMoviesList"
        );
        setActionMoviesList(actionMoviesListResponse.data.data.results);
        const actionTvShowsListResponse = await axios.get(
          "/api/movies/actionTvShowsList"
        );
        setActionTvShowsList(actionTvShowsListResponse.data.data.results);
        const airingTvShowsListResponse = await axios.get(
          "/api/movies/airingTvShowsList"
        );
        setAiringTvShowsList(airingTvShowsListResponse.data.data.results);
        const animeMoviesListResponse = await axios.get(
          "/api/movies/animeMoviesList"
        );
        setAnimeMoviesList(animeMoviesListResponse.data.data.results);
        const comedyMoviesListResponse = await axios.get(
          "/api/movies/comedyMoviesList"
        );
        setComedyMoviesList(comedyMoviesListResponse.data.data.results);
        const comedyTvShowsListResponse = await axios.get(
          "/api/movies/comedyTvShowsList"
        );
        setComedyTvShowsList(comedyTvShowsListResponse.data.data.results);
        const crimeTvShowsListResponse = await axios.get(
          "/api/movies/crimeTvShowsList"
        );
        setCrimeTvShowsList(crimeTvShowsListResponse.data.data.results);
        const dramaTvShowsListResponse = await axios.get(
          "/api/movies/dramaTvShowsList"
        );
        setDramaTvShowsList(dramaTvShowsListResponse.data.data.results);
        const horrorMoviesListResponse = await axios.get(
          "/api/movies/horrorMoviesList"
        );
        setHorrorMoviesList(horrorMoviesListResponse.data.data.results);
        const latestMoviesListResponse = await axios.get(
          "/api/movies/latestMoviesList"
        );
        setLatestMoviesList(latestMoviesListResponse.data.data);
        const latestTvShowsListResponse = await axios.get(
          "/api/movies/latestTvShowsList"
        );
        setLatestTvShowsList(latestTvShowsListResponse.data.data);
        const mysteryTvShowsListResponse = await axios.get(
          "/api/movies/mysteryTvShowsList"
        );
        setMysteryTvShowsList(mysteryTvShowsListResponse.data.data.results);
        const popularMoviesListResponse = await axios.get(
          "/api/movies/popularMoviesList"
        );
        setPopularMoviesList(popularMoviesListResponse.data.data.results);
        const popularTvShowsListResponse = await axios.get(
          "/api/movies/popularTvShowsList"
        );
        setPopularTvShowsList(popularTvShowsListResponse.data.data.results);
        const romanceMoviesListResponse = await axios.get(
          "/api/movies/romanceMoviesList"
        );
        setRomanceMoviesList(romanceMoviesListResponse.data.data.results);
        const topRatedMoviesListResponse = await axios.get(
          "/api/movies/topRatedMoviesList"
        );
        setTopRatedMoviesList(topRatedMoviesListResponse.data.data.results);
        const topRatedTvShowsListResponse = await axios.get(
          "/api/movies/topRatedTvShowsList"
        );
        setTopRatedTvShowsList(topRatedTvShowsListResponse.data.data.results);
        const trendingMoviesListResponse = await axios.get(
          "/api/movies/trendingMoviesList"
        );
        setTrendingMoviesList(trendingMoviesListResponse.data.data.results);
        const trendingTvShowsListResponse = await axios.get(
          "/api/movies/trendingTvShowsList"
        );
        setTrendingTvShowsList(trendingTvShowsListResponse.data.data.results);
        const tvShowsAiringTodayListResponse = await axios.get(
          "/api/movies/tvShowsAiringTodayList"
        );
        setTvShowsAiringTodayList(
          tvShowsAiringTodayListResponse.data.data.results
        );
        const upcomingMoviesListResponse = await axios.get(
          "/api/movies/upcomingMoviesList"
        );
        setUpcomingMoviesList(upcomingMoviesListResponse.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }
    try {
      const response = await axios.get("/api/searchMovie", {
        params: { name: searchQuery },
      });
      const searchResults = response.data.data.results;
      if (searchResults.length === 0) {
        toast({
          title: "No Movies found !!!",
          description: "Search for any other movie",
          variant: "destructive",
        });
      } else {
        setMovies(searchResults);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results");
    }
  };

  const handleWatch = (name) => {
    router.replace(`/movies/${name}`);
  };

  if (loading) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('https://images.pexels.com/photos/3279307/pexels-photo-3279307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const ErrorDisplay = ({ error }) => (
    <div className="bg-black h-[90vh] flex items-center justify-center">
      <div className="bg-red-900/50 border border-red-500 rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error Occurred</h2>
        <p className="text-white mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Usage
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="bg-black min-h-screen p-4 ml-2">
      {/* Search bar */}
      <div className="relative flex flex-col justify-center mx-auto">
        <Search
          className="text-gray-400 text-2xl absolute top-1/2 left-4 transform -translate-y-10 cursor-pointer"
          onClick={handleSearch}
        />

        <input
          type="text"
          className="w-full mt-5 mb-8 pl-12 pr-4 py-3 outline-none border-2 border-gray-700 text-lg bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:border-blue-500 transition-colors duration-300"
          placeholder="Movies, shows and more"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <X
          className="text-gray-400 text-xl absolute top-1/2 right-4 transform -translate-y-10 cursor-pointer"
          onClick={() => {
            setSearchQuery("");
            setMovies([]);
          }}
        />

        <h1 className="text-white text-xl font-bold mb-5">Trending in India</h1>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-6 gap-4">
        {movies.length > 0 ? (
          <>
            {movies.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <>
            {topRatedMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {currentMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {actionMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {actionTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {airingTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {animeMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {comedyMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {dramaTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {horrorMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {crimeTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {comedyTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {romanceMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {popularTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {popularMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {mysteryTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {upcomingMoviesList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {trendingTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {tvShowsAiringTodayList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {topRatedTvShowsList.map((movie, index) => (
              <div
                className="relative w-full h-[50vh] rounded-lg overflow-hidden hover:scale-105 transition-transform"
                key={index}
              >
                <Link href={`/movies/${movie.name || movie.title}`} passHref>
                  <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ease-in-out opacity-0 hover:opacity-100 bg-opacity-0 hover:-translate-y-0">
                      {/* Watch Now Button */}
                      <Button
                        onClick={() => handleWatch(movie.name || movie.title)}
                        className="block text-white w-full rounded-2xl bg-blue-500 px-4 py-2 text-center"
                      >
                        Watch now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
