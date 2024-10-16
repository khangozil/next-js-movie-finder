"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h1>Your Favorite Movies</h1>
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="card-container">
            {favorites.map((movie) => (
              <div key={movie.id} className="card">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="placeholder">No Image Available</div>
                )}
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <button onClick={() => removeFromFavorites(movie.id)}>
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
