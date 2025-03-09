import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WastinWebsite from '../src/Home/home'; // Ensure this component exists
import logo from './logo.svg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WastinWebsite />} />
      </Routes>
    </Router>
  );
}
