import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import SignupForm from './Home/SignUp'; 
import Login from './Home/Login';
import logo from './logo.svg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignupForm" element={<SignupForm/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}
