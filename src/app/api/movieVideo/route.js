import { movieVideo } from "@/utils/movieRouter";

export async function GET(request) {
  try {
    // Parse the URL to get the search params
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("id");

    if (!movieId) {
      return Response.json(
        { success: false, error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const movieVideoResponse = await movieVideo(movieId);
    return Response.json(
      { success: true, data: movieVideoResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movie:", error);
    return Response.json(
      { success: false, error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}
