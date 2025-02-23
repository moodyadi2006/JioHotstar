import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const airingTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchTvShowsAiring
    );
    return Response.json(
      { success: true, data: airingTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching airing TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch airing TV shows" },
      { status: 500 }
    );
  }
}
