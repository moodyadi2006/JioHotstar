import { getMediaList, TMDB_ENDPOINT } from "@/utils/movieRouter";

export async function GET() {
  try {
    const comedyTvShowsList = await getMediaList(
      TMDB_ENDPOINT.fetchComedyTvShows
    );
    return Response.json(
      { success: true, data: comedyTvShowsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comedy TV shows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch comedy TV shows" },
      { status: 500 }
    );
  }
}
