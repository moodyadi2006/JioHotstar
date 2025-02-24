"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";

const Page = () => {
  const [movieData, setMovieData] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    setLoading(true);
    const decodedName = decodeURIComponent(params.name);
    const fetchMovie = async () => {
      try {
        const response = await axios.get("/api/searchMovie", {
          params: { name: decodedName },
        });
        const movie = response.data.data.results.find(
          (m) => m.name === decodedName || m.title === decodedName
        );
        if (movie) {
          setMovieData(movie);
        } else {
          setError("Movie not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError("Failed to fetch movie data");
        setLoading(false);
      }
    };

    fetchMovie();

    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [params.name]);

  const [videoUrl, setVideoUrl] = useState(null);

  const handlePlayer = async () => {
    setLoading(true);
    setError(null);

    const fetchMovieVideo = async () => {
      try {
        const response = await axios.get("/api/movieVideo", {
          params: { id: movieData.id },
        });
        const videoData = response.data.data.results.find(
          (m) => m.type !== "Clip"
        );
        if (videoData?.site === "YouTube") {
          setVideoUrl(`https://www.youtube.com/watch?v=${videoData.key}`);
          return true;
        }
      } catch (error) {
        console.error("Error fetching movie video:", error);
      }
      return false;
    };

    const fetchTvShowsVideo = async () => {
      try {
        const response = await axios.get("/api/tvShowsVideo", {
          params: { id: movieData.id },
        });
        const videoData = response.data.data.results.find(
          (m) => m.type !== "Clip"
        );
        if (videoData?.site === "YouTube") {
          setVideoUrl(`https://www.youtube.com/watch?v=${videoData.key}`);
          return true;
        }
      } catch (error) {
        console.error("Error fetching TV show video:", error);
      }
      return false;
    };

    try {
      const movieVideoSuccess = await fetchMovieVideo();
      if (!movieVideoSuccess) {
        const tvShowVideoSuccess = await fetchTvShowsVideo();
        if (!tvShowVideoSuccess) {
          throw new Error("Failed to fetch video data");
        }
      }
    } catch (error) {
      console.error("Error in handlePlayer:", error);
      setError("Failed to fetch video data");
    } finally {
      setLoading(false);
    }
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
    <main className="bg-black h-[100vh] relative">
      {videoUrl ? (
        <div className="w-full h-[100vh]">
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData?.backdrop_path})`,
              opacity: Math.max(
                0,
                1 - scrollPosition / (window.innerHeight * 0.6)
              ),
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div
            className="relative h-full flex flex-col justify-end p-6"
            style={{ zIndex: 1 }}
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                {movieData?.title || movieData?.name}
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                {movieData?.overview}
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
                onClick={handlePlayer}
              >
                Watch Now
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
