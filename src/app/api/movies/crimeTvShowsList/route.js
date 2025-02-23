import { getMediaList, TMDB_ENDPOINT  } from "@/utils/movieRouter";

export async function GET() {
  try {
    const crimeTvShowsList = await getMediaList(TMDB_ENDPOINT.fetchCrimeTvShows);
    return Response.json(
      { success: true, data: crimeTvShowsList },
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
