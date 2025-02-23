import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const actionMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchActionMovies
    );
    return Response.json(
      { success: true, data: actionMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching action movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch action movies" },
      { status: 500 }
    );
  }
}
