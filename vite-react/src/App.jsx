import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

export default function App() {
  return (
  <>
    <Navbar isLoggedIn={false} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
  );
}