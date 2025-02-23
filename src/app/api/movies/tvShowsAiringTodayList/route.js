import { getMediaList, TMDB_ENDPOINT  } from "@/utils/movieRouter";

export async function GET() {
  try {
    const tvShowsAiringTodayList = await getMediaList(
      TMDB_ENDPOINT.fetchTvShowsAiringToday
    );
    return Response.json(
      { success: true, data: tvShowsAiringTodayList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching TV shows airing today:", error);
    return Response.json(
      { success: false, error: "Failed to fetch TV shows airing today" },
      { status: 500 }
    );
  }
}