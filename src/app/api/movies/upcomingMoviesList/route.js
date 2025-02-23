import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const upcomingMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchUpcomingMovies
    );
    return Response.json(
      { success: true, data: upcomingMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch upcoming movies" },
      { status: 500 }
    );
  }
}
