import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <div className="container-fluid py-2 border-bottom d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                            <div className="d-inline-flex align-items-center">
                                <Link className="text-decoration-none text-body pe-3" to=""><i className="bi bi-telephone me-2"></i>+012 345 6789</Link>
                                <span className="text-body">|</span>
                                <Link className="text-decoration-none text-body px-3" to=""><i className="bi bi-envelope me-2"></i>info@example.com</Link>
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-lg-end">
                            <div className="d-inline-flex align-items-center">
                                <Link className="text-body px-2" to="">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link className="text-body ps-2" to="">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid sticky-top bg-white shadow-sm">
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                        <Link to="/" className="navbar-brand">
                            <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>BON SANTE</h1>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="" className="nav-item nav-link">About</Link>
                                <Link to="" className="nav-item nav-link">Service</Link>
                                <Link to="" className="nav-item nav-link">Pricing</Link>
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu m-0">
                                        <Link to="" className="dropdown-item">Blog Grid</Link>
                                        <Link to="" className="dropdown-item">Blog Detail</Link>
                                        <Link to="" className="dropdown-item">The Team</Link>
                                        <Link to="" className="dropdown-item">Testimonial</Link>
                                        <Link to="" className="dropdown-item">Appointment</Link>
                                        <Link to="" className="dropdown-item">Search</Link>
                                    </div>
                                </div>
                                <Link to="" className="nav-item nav-link">Contact</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Header;