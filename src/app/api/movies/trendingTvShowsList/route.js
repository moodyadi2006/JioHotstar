import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const trendingTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchTrendingTvShows
    );
    return Response.json(
      { success: true, data: trendingTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch trending TV shows" },
      { status: 500 }
    );
  }
}
