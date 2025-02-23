import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const trendingMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchTrendingMovies
    );
    return Response.json(
      { success: true, data: trendingMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}
