// src/app/api/movies/route.js
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('s');
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    return new Response(JSON.stringify(response.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("API request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch movies" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
