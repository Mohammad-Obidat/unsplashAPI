import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProductList from './components/ProductList';
import ImageGallery from './components/ImageGallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { useState } from 'react';

function App() {
  const [searchParam, setSearchParam] = useState('');

  return (
    <>
      <Router>
        <Navbar setSearchParam={setSearchParam} searchParam={searchParam} />
        <Routes>
          <Route path='/' element={<ProductList searchParam={searchParam} />} />
          <Route path='/imageGallery' element={<ImageGallery />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
