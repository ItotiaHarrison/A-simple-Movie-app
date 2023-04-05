import React, { useEffect, useState } from "react";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c04ec04ea3mshebd8f228e2a5d68p1a45f2jsndadd7b53bf36",
      "X-RapidAPI-Host": "netflix-data.p.rapidapi.com",
    },
  };
  useEffect(() => {
    // Fetch data for series
    fetch("/", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch TV series");
        }
        return response.json();
      })
      .then((series) => {
        setSeries(series);
        console.log(series);
        setFilteredSeries(series);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    const filteredSeries = series.filter((serie) =>
    serie.title && serie.title.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setFilteredSeries(filteredSeries);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderSeries = (series) => {
    return (
      <div className="movie">
        <div>
          <img width="200" alt={`${series.TitleText}`} src={series.url} />
        </div>

        <div>
          <h2 key={series.id}>{series.TitleText}</h2>
          <div>
            <span>({series.year})</span>
            <span>Movie</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-gray-400 text-xl">
      <div>
        <form className="search">
          <label>
            Search:
            <input
              type="text"
              value={searchQuery}
              placeholder="Type series name"
              onChange={handleSearchInputChange}
            />
          </label>
        </form>
        <ul>
          {Array.isArray(filteredSeries) &&
            filteredSeries.map((show) => <li key={show.id}>{show.title}</li>)}
        </ul>
      </div>

      <div>{series.map(renderSeries)}</div>
    </div>
  );
}
