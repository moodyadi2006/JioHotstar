import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const topRatedMoviesList = await getMediaList(TMDB_ENDPOINT.fetchTopRatedMovies);
    return Response.json(
      { success: true, data: topRatedMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch top rated movies" },
      { status: 500 }
    );
  }
}
