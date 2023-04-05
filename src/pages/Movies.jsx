import React, { useEffect, useState } from "react";

export default function Movies(movie) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch("https://moviesdatabase.p.rapidapi.com/titles", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((movies) => {
        setMovies(movies.results);
        console.log(movies.results);
        setFilteredMovies(movies.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  });

  const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    if (newSearchQuery.length < 2) {
      setFilteredMovies([]);
      return;
    }


    const filteredMovies = movies.filter((movie) =>
    movie.titleText.text && movie.titleText.text.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderMovie = (movie) => {
    return (
      <div className="movie">
        <div>
          <img width="800" height="563" alt={`${movie}`} src= "https://m.media-amazon.com/images/M/MV5BZDI4MmJiMmMtMzQ3Mi00N2Y0LTlkYmUtYmQ0ZTQ1NzVlZmVjXkEyXkFqcGdeQXVyMDUyOTUyNQ@@._V1_.jpg" />
        </div>

        <div>
          <h2 key={movie.id} className="text-white">{movie.titleText.text}</h2>
          <div>
            <span>({movie.releaseYear.year})</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-gray-400 text-xl">
      <div>
        <form className="search">
          <label className="text-white">
            Search:
            <input
              type="text"
              value={searchQuery}
              placeholder="Type movie name"
              onChange={handleSearchInputChange}
            />
          </label>
        </form>
        <ul>
          {Array.isArray(filteredMovies) &&
            filteredMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
        </ul>

        
      </div>

      <div className="grid grid-cols-5 gap-y-8">{movies.map(renderMovie)}</div>
    </div>
  );
}
