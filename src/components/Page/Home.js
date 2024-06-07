import { Link } from "react-router-dom";
import { useAuth } from '../../context/authContext';
const Home = () => {
    const { user } = useAuth();
    return (
        <div>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5" style={{ 'border-color': 'rgba(256, 256, 256, .3) !important' }}>
                                Welcome {user && user.username ? user.username : 'DR. Phan Nguyên Đạt'}
                            </h5>
                            <h1 className="display-1 text-white mb-md-4">Best Healthcare Solution For Doctors</h1>
                            <div className="pt-2">
                                <Link to="/check-appointment" className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Check Appointment now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


