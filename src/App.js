import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import './App.css';



function App() {  

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
