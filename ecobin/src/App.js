import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import SignupForm from './Home/SignUp'; 
import Login from './Home/Login';
import WasteReport from './Dashboard/WasteReport';
import WasteManagementDashboard from './Dashboard/AdminDashboard';
import WasteTrackDashboard from './Dashboard/CollectionSchedule';
import Leaderboard from './Dashboard/Reward';
import AnalyzePage from './Dashboard/Analiyze';

import logo from './Home/images/Logo.png';
import './App.css';
import CollectionSchduleReport from './Dashboard/CollectionSchduleReport';
import CollectionScheduleView from './Dashboard/CollectionScheduleView';
import CollectionScheduleUpdate from './Dashboard/CollectionScheduleUpdate';
import CollectionSchduleAnalythics from './Dashboard/CollectionScheduleAnalythics';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignupForm" element={<SignupForm/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/WasteReport" element={<WasteReport/>}/>
        <Route path="/WasteManagementDashboard" element={<WasteManagementDashboard/>}/>
        <Route path="/WasteTrackDashboard" element={<WasteTrackDashboard/>}/>
        <Route path="/Leaderboard" element={<Leaderboard/>}/>
        <Route path="/AnalyzePage" element={<AnalyzePage/>}/>
        <Route path="/collectionreport" element={<CollectionSchduleReport/>}/>
        <Route path="/collectionview/:id" element={<CollectionScheduleView/>}/>
        <Route path="/collectionupdate/:id" element={<CollectionScheduleUpdate/>}/>
        <Route path="/analythics" element={<CollectionSchduleAnalythics/>}/>
      </Routes>
    </Router>
  );
}
