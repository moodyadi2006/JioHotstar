"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export default function Home() {
  const [animeMoviesList, setAnimeMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (animeMoviesList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % animeMoviesList.length
        );
      }, 10000); // Change to 10 seconds

      return () => clearInterval(interval);
    }
  }, [animeMoviesList]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const animeMoviesListResponse = await axios.get(
          "/api/movies/animeMoviesList"
        );
        setAnimeMoviesList(animeMoviesListResponse.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleWatch = (name) => {
    router.replace(`/movies/${name}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="bg-black w-100">
      <main className="bg-black h-[90vh] mb-8">
        <Carousel
          className="relative"
          onSelect={(index) => setCurrentIndex(index)}
        >
          <CarouselContent>
            {animeMoviesList.map((movie, index) => (
              <CarouselItem
                key={movie.id}
                className={index === currentIndex ? "block" : "hidden"}
              >
                <div className="relative w-full h-[90vh]">
                  {/* Fixed background container */}
                  <div
                    className="fixed top-0 left-0 w-full h-full"
                    style={{
                      zIndex: 0,
                    }}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        opacity: Math.max(
                          0,
                          1 - scrollPosition / (window.innerHeight * 0.6)
                        ),
                      }}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content container */}
                  <div
                    className="relative h-full flex flex-col justify-end p-6"
                    style={{ zIndex: 1 }}
                  >
                    <div className="max-w-2xl">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        {movie.title}
                      </h2>
                      <p className="text-gray-300 text-lg mb-6">
                        {movie.overview}
                      </p>
                      <Link
                        href={`/movies/${movie.name || movie.title}`}
                        passHref
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
                          Watch Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <main className="ml-6 pb-8 group">
        <h1 className="text-2xl font-bold mb-4 text-white">Top Animes</h1>
        <div className="relative">
          <Carousel
            className="relative"
            onSelect={(index) => setCurrentIndex(index)}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="flex">
              {animeMoviesList.map((movie, index) => (
                <CarouselItem
                  key={movie.id}
                  className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <Link href={`/movies/${movie.name || movie.title}`} passHref>
                    <div className="relative group w-48 h-64 border rounded-xl transition-all duration-300 ease-in-out hover:w-56 hover:h-72 hover:z-10">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300 ease-in-out"
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                        }}
                      />

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
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 translate-x-5 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CarouselPrevious className="bg-white/30 hover:bg-white/50 p-2 rounded-full" />
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 -translate-x-10 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CarouselNext className="bg-white/30 hover:bg-white/50 p-2 rounded-full" />
            </div>
          </Carousel>
        </div>
      </main>
    </div>
  );
}
