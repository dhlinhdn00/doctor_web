import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
//import i18n from 'i18n';

const Header = () => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
 // const [language, setLanguage] = useState(i18n.language); 

  // const handleLanguageChange = (lang) => {
  //   setLanguage(lang);
  //   i18n.changeLanguage(lang);
  //    // Add your language change logic here, like updating i18next language
  // };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second
    return () => clearInterval(timer);
  }, []);

  // Define active link style
  const activeLinkStyle = {
    color: 'blue', // This color is just an example, you can change it as desired
    textDecoration: 'underline'
  };

  return (
    <div>
      <div className="container-fluid py-2 border-bottom d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <NavLink className="text-decoration-none text-body pe-3" to="/" style={{ color: 'black' }}>
                  <i className="bi bi-telephone me-2"></i>+012 345 6789
                </NavLink>
                <span className="text-body">|</span>
                <NavLink className="text-decoration-none text-body px-3" to="/contact" style={{ color: 'black' }}>
                  <i className="bi bi-envelope me-2"></i>info@example.com
                </NavLink>
                <span className="text-body">|</span>
                <NavLink className="text-decoration-none text-body px-3" to="/" style={{ color: 'black' }}>
                  <i className="bi bi-clock me-2"></i>{currentTime.toLocaleTimeString()}
                </NavLink>
                {/* <span className="text-body">|</span>
                <div className="dropdown">
                  <NavLink to="#" className="text-decoration-none text-body px-3 dropdown-toggle" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
                    <i className="bi bi-translate me-2"></i>{language}
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                    <li><a className="dropdown-item" href="#" onClick={() => handleLanguageChange('English')}>English</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleLanguageChange('Vietnamese')}>Vietnamese</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleLanguageChange('French')}>French</a></li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                {/* Update social links if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
            <NavLink to="/" className="navbar-brand">
              <h1 className="m-0 text-uppercase text-primary">
                <i className="fa fa-clinic-medical me-2"></i>BONNE SANTÉ
              </h1>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0">
                <NavLink exact to="/" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Home
                </NavLink>
                <NavLink to="/check-appointment" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Appointment
                </NavLink>
                <NavLink to="/show-patient" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Patient
                </NavLink>
                <NavLink to="/chat" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Chat
                </NavLink>
                {/* <div className="nav-item dropdown">
                  <NavLink
                    to="/pages"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  >
                    Pages
                  </NavLink>
                  <div className="dropdown-menu m-0">
                    <NavLink to="/blog" className="dropdown-item">
                      Blog Grid
                    </NavLink>
                    <NavLink to="/blog-detail" className="dropdown-item">
                      Blog Detail
                    </NavLink>
                    <NavLink to="/team" className="dropdown-item">
                      The Team
                    </NavLink>
                    <NavLink to="/testimonial" className="dropdown-item">
                      Testimonial
                    </NavLink>
                    <NavLink to="/appointment" className="dropdown-item">
                      Appointment
                    </NavLink>
                    <NavLink to="/search" className="dropdown-item">
                      Search
                    </NavLink>
                  </div>
                </div> */}
                <NavLink to="/profile" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Profile
                </NavLink>
                {/* <NavLink to="/contact" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Contact
                </NavLink> */}
                {user ? (
                  <NavLink to="/" className="nav-item nav-link" onClick={logout} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to="/login" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
