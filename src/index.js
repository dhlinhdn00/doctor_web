import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Page/Home';
import MakeAppointment from './components/Page/MakeAppointment';
import FindPatient from './components/Page/FindPatient';
import CheckSchedule from './components/Page/CheckSchedule';
import MeetingDoctor from './components/Page/MeetingPage';
import JoinMeeting from './components/Page/JoinMeeting';
import Login from './components/Page/Login'; 
import Logout from './components/Page/Logout';
import Register from './components/Page/Register';
import ShowPatient from './components/Page/ShowPatient';


const root = ReactDOM.createRoot(document.getElementById('root'));

const isAuthenticated = () => {
  const token = localStorage.getItem('userToken');
  return token ? true : false;
}

root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/make-appointment" element={isAuthenticated() ? <MakeAppointment /> : <Navigate to="/login" />} />
          <Route path="/check-appointment" element={isAuthenticated() ? <CheckSchedule /> : <Navigate to="/login" />} />
          <Route path="/show-patient" element={isAuthenticated() ? <ShowPatient /> : <Navigate to="/login" />} />
          <Route path="/doctor/meeting" element={isAuthenticated() ? <MeetingDoctor /> : <Navigate to="/login" />} />
          <Route path="/join-meeting" element={isAuthenticated() ? <JoinMeeting /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
