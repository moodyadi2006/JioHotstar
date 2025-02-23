import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const horrorMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchHorrorMovies
    );
    return Response.json(
      { success: true, data: horrorMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch horror movies" },
      { status: 500 }
    );
  }
}
