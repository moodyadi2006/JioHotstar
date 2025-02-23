import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const actionTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchActionTvShows
    );
    return Response.json(
      { success: true, data: actionTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching action TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch action TV shows" },
      { status: 500 }
    );
  }
}
