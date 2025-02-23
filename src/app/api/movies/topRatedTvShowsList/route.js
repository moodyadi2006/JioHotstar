import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const topRatedTvShowsList = await getMediaList(TMDB_ENDPOINT.fetchTopRatedTvShows);
    return Response.json(
      { success: true, data: topRatedTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch top rated movies" },
      { status: 500 }
    );
  }
}
