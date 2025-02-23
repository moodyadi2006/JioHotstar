import { getMediaList, TMDB_ENDPOINT  } from "@/utils/movieRouter";

export async function GET() {
  try {
    const currentMoviesList = await getMediaList(TMDB_ENDPOINT.fetchCurrentMovies);
    return Response.json(
      { success: true, data: currentMoviesList },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching current movies:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch current movies' },
      { status: 500 }
    );
  }
}
