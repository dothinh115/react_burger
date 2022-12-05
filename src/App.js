import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './components/HomeTemplate';
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
