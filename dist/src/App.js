import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ProductList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
