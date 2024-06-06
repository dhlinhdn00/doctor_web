import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { user, logout } = useAuth();

  // Định nghĩa phong cách cho liên kết đang được kích hoạt
  const activeLinkStyle = {
    color: 'blue', // Màu này chỉ là ví dụ, bạn có thể thay đổi theo ý muốn
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
              </div>
            </div>
            <div className="col-md-6 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                {/* Cập nhật các liên kết mạng xã hội nếu cần */}
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
                <NavLink to="/about" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  About
                </NavLink>
                <NavLink to="/service" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Service
                </NavLink>
                <NavLink to="/pricing" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Pricing
                </NavLink>
                <div className="nav-item dropdown">
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
                </div>
                <NavLink to="/contact" className="nav-item nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                  Contact
                </NavLink>
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
