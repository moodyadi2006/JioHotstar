import { tvShowsVideo } from "@/utils/movieRouter";

export async function GET(request) {
  try {
    // Parse the URL to get the search params
    const { searchParams } = new URL(request.url);
    const tvShowsId = searchParams.get("id");

    if (!tvShowsId) {
      return Response.json(
        { success: false, error: "TV Shows ID is required" },
        { status: 400 }
      );
    }

    const tvShowsVideoResponse = await tvShowsVideo(tvShowsId);
    return Response.json(
      { success: true, data: tvShowsVideoResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tvShows:", error);
    return Response.json(
      { success: false, error: "Failed to fetch tvShows" },
      { status: 500 }
    );
  }
}
