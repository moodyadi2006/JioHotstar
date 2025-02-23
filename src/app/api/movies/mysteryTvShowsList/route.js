import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const mysteryTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchMysteryTvShows
    );
    return Response.json(
      { success: true, data: mysteryTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching mystery TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch mystery TV shows" },
      { status: 500 }
    );
  }
}
