import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Burger from './components/Burger';
import HomeTemplate from './components/HomeTemplate';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
