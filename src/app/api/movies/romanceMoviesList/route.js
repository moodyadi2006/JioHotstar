import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const romanceMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchRomanceMovies
    );
    return Response.json(
      { success: true, data: romanceMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching romance movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch romance movies" },
      { status: 500 }
    );
  }
}
