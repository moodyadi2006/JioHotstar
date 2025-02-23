import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const popularTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchPopularTvShows
    );
    return Response.json(
      { success: true, data: popularTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch popular TV shows" },
      { status: 500 }
    );
  }
}
