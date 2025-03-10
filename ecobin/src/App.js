import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import SignupForm from './Home/SignUp'; 
import Login from './Home/Login';
import WasteReport from './Dashboard/WasteReport';
import logo from './Home/images/Logo.png';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignupForm" element={<SignupForm/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/WasteReport" element={<WasteReport/>}/>
      </Routes>
    </Router>
  );
}
