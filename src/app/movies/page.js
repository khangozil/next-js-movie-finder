"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MoviesPage() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const fetchMovies = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/movies?s=${query}`);
      if (!res.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again.");
    }
  };

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorites = (moviedId) =>
    favorites.some((fav) => fav.id === moviedId);

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <h1 className="title">Movie Finder</h1>
        {!session ? (
          <button onClick={() => signIn()} className="auth-button">
            {" "}
            Sign In{" "}
          </button>
        ) : (
          <>
            <p> Welcome , {session.user.name}</p>
            <button onClick={() => signOut()} className="auth-button">
              {" "}
              Sign Out
            </button>
          </>
        )}
        <form onSubmit={fetchMovies} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="card-container">
          {movies.map((movie) => (
            <div key={movie.id} className="card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
              ) : (
                <div className="placeholder">No Image Available</div>
              )}
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              {isFavorites(movie.id) ? (
                <button onClick={() => removeFromFavorites(movie.id)}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(movie)}>
                  Add to Favorites
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
