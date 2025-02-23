import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const latestTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchLatestTvShows
    );
    return Response.json(
      { success: true, data: latestTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch latest TV shows" },
      { status: 500 }
    );
  }
}
