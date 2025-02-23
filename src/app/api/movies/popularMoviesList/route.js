import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const popularMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchPopularMovies
    );
    return Response.json(
      { success: true, data: popularMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
