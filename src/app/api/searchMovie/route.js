import { searchMovie } from "@/utils/movieRouter";

export async function GET(request) {
  try {
    // Parse the URL to get the search params
    const { searchParams } = new URL(request.url);
    const movieName = searchParams.get("name");

    if (!movieName) {
      return Response.json(
        { success: false, error: "Movie name is required" },
        { status: 400 }
      );
    }

    const searchMovieResponse = await searchMovie(movieName);
    return Response.json(
      { success: true, data: searchMovieResponse },
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
