import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import './App.css';

const MOVIE_API_URL = 'https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/%7Bname%7D/'
const SERIES_API_URL = 'https://moviesminidatabase.p.rapidapi.com/series/idbyTitle/%7Bname%7D/'

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  

  useEffect(() =>{
    fetch(MOVIE_API_URL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c04ec04ea3mshebd8f228e2a5d68p1a45f2jsndadd7b53bf36',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch(err => console.error(err));
  }, []);


  useEffect(() =>{
    fetch(SERIES_API_URL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c04ec04ea3mshebd8f228e2a5d68p1a45f2jsndadd7b53bf36',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
      }
    })
	    .then(response => response.json())
	    .then((series) => {
        setSeries(series);
      })
	    .catch(err => console.error(err));

  })




  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/series" element={<Series/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
