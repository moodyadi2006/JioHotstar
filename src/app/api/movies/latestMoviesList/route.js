import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const latestMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchLatestMovies
    );
    return Response.json(
      { success: true, data: latestMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch latest movies" },
      { status: 500 }
    );
  }
}
