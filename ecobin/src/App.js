import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home'; // Ensure the file name matches exactly
import SignupForm from './Home/SignUp'; 
import Login from './Home/Login';
import WasteReport from './Dashboard/WasteReport';
import WasteManagementDashboard from './Dashboard/AdminDashboard';
import WasteTrackDashboard from './Dashboard/CollectionSchedule';
import Leaderboard from './Dashboard/Reward';
import AnalyzePage from './Dashboard/Analiyze';
import WasteReportingTable from './Dashboard/WasteReportingTable';
import AutoGenerateReport from './Dashboard/ReportWaste';


import './App.css';
import CollectionScheduleAnalytics from './Dashboard/CollectionScheduleAnalytics';
import CollectionScheduleUpdate from './Dashboard/CollectionScheduleUpdate';
import CollectionScheduleView from './Dashboard/CollectionScheduleView';
import CollectionSchduleReport from './Dashboard/CollectionSchduleReport';
import CollectionScheduleGenarateReport from './Dashboard/CollectionScheduleGenarateReport';
import Navbar from './Navbar/NavBar';
 
import WastePickupRequest from './Home/RequestWaste';
import ProfileHeader from './UserProfile/UserProfile';
import ViewRequestPickup from './ViewRequestPickup/ViewRequestPickup';
import EditeRequestPickup from './ViewRequestPickup/EditeRequestPickup';
import WasteRequestTable from  './Dashboard/PickupTable';



import ContactDetails from './Dashboard/Contact';
import AiDetector from './AiDetecter/AiDetector';
import UserService from './Home/UserService';
import Chatbot from './ChatBot/Chatbot';

export default function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <>
              <Navbar /> {/* Navbar will only appear on the Home page */}
              <Home />
              
              
            </>
            
          }
        />
         <Route
          path="/WastePickupRequest"
          element={
            <>
              <Navbar /> {/* Navbar will only appear on the Home page */}
              <WastePickupRequest />
              
              
            </>
            
          }
        />
         
        <Route path="/SignupForm" element={<SignupForm/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/WasteReport" element={<WasteReport/>}/>
       
        <Route path="/WastePickupRequest"  element={<WastePickupRequest/>}/>
        <Route path="/ViewPickup"  element={<ViewRequestPickup/>}/>
        <Route path="/editepickup/:id"  element={<EditeRequestPickup/>}/>
        <Route path="/ProfileHeader" element={<ProfileHeader/>}/>
        <Route path="/WasteRequestTable" element={<WasteRequestTable/>}/>

        <Route path="/ContactDetails" element={<ContactDetails/>}/>
        <Route path="/bot" element={<Chatbot/>}/>
        

        {UserService.adminOnly() && (
              <>
                  <Route path="/WasteManagementDashboard" element={<WasteManagementDashboard/>}/>
                  <Route path="/WasteTrackDashboard" element={<WasteTrackDashboard/>}/>
                  <Route path="/Leaderboard" element={<Leaderboard/>}/>
                  <Route path="/AnalyzePage" element={<AnalyzePage/>}/>
                  <Route path="/WasteReportingTable" element={<WasteReportingTable/>}/>
                  <Route path="/AutoGenerateReport" element={<AutoGenerateReport/>}/>
                  <Route path="/collectionreport" element={<CollectionSchduleReport/>}/>
                  <Route path="/collectionview/:id" element={<CollectionScheduleView/>}/>
                  <Route path="/collectionupdate/:id" element={<CollectionScheduleUpdate/>}/>
                  <Route path="/Collectionanalythics" element={<CollectionScheduleAnalytics/>}/>
                  <Route path="/CollectionGenarateReport" element={<CollectionScheduleGenarateReport/>}/>
                  <Route path="/aidetector" element={<AiDetector/>}/>
                  
              </>
            )}

      </Routes>
    </Router>
  );
}