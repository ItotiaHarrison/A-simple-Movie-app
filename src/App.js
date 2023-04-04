import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';
import Series from './pages/Series';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/search" element={<Search/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
