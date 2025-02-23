import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const dramaTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchDramaTvShows
    );
    return Response.json(
      { success: true, data: dramaTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching drama TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch drama TV shows" },
      { status: 500 }
    );
  }
}
