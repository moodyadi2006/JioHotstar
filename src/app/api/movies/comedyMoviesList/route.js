import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const comedyMoviesList = await getMediaList(
      TMDB_ENDPOINT.fetchComedyMovies
    );
    return Response.json(
      { success: true, data: comedyMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comedy movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch comedy movies" },
      { status: 500 }
    );
  }
}
