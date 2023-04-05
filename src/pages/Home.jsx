import React, { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

export default function Home(movie) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Fetch data for upcoming movies
    fetch("https://moviesdatabase.p.rapidapi.com/titles/x/upcoming", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setUpcomingMovies(data.results);
        console.log(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });


    // Fetch data for actors
      fetch('https://moviesdatabase.p.rapidapi.com/actors', options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch actors");
        }
        return response.json();
      })
      .then((data) => {
        setActors(data.results);
        console.log(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });


  }, []);

  const renderMovie = (movie) => {
    return (
      <div className="movie">
        <div>
          <img width="800" height="563" alt={`${movie}`} src= "https://m.media-amazon.com/images/M/MV5BMWY3YWY1OTktNjc3Ni00NThiLWI0ODYtOTNjM2E4YjQ2MmJkXkEyXkFqcGdeQXVyMjcyMzI2OTQ@._V1_.jpg" />
        </div>

        <div>
          <h2 key={movie.id} className="text-white">{movie.titleText.text}</h2>
          <div>
            <span >({movie.releaseDate.year})</span>
          </div>
        </div>
      </div>
    );
  };

  const renderActors = (actor) => {
    return (
      <div className="movie">
        <div>
          <h2 key={movie.id} className="text-white">{actor.primaryName}</h2>
          <div>
            <span >{ `Born: ${actor.birthYear}`}</span>
          </div>
        </div>
      </div>
    );
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-gray-400 text-xl">
      <div>
        <h1 className="text-2xl font-semibold my-10 text-white">Upcoming Movies</h1>
        <div className="grid grid-cols-5 gap-y-20">
          {upcomingMovies.map(renderMovie)}
          </div>
      </div>


      <div>
        <h1 className="text-2xl font-semibold my-10 text-white">Actors</h1>
        <div className="grid grid-cols-5 gap-y-20">
          {actors.map(renderActors)}
          </div>
      </div>

    </div>
  );
}
