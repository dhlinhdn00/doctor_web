import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Page/Home';
import MakeAppointment from './components/Page/MakeAppointment';
import FindPatient from './components/Page/FindPatient';
import CheckSchedule from './components/Page/CheckSchedule';
import MeetingDoctor from './components/Page/MeetingPage';
import JoinMeeting from './components/Page/JoinMeeting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/make-appointment" element={<MakeAppointment />} />
          <Route path="/check-appointment" element={<CheckSchedule />} />
          <Route path="/find-patient" element={<FindPatient />} />
          <Route path="/doctor/meeting" element={<MeetingDoctor />} />
          <Route path="join-meeting" element={<JoinMeeting />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
