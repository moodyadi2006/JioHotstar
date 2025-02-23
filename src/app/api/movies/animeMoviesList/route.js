import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const animeMoviesList = await getMediaList(TMDB_ENDPOINT.fetchAnimeMovies);
    return Response.json(
      { success: true, data: animeMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching anime movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch anime movies" },
      { status: 500 }
    );
  }
}
