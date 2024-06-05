import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
const Home = () => {
    const { user } = useUserContext();
    return (
        <div>
            <div class="container-fluid bg-primary py-5 mb-5 hero-header">
                <div class="container py-5">
                    <div class="row justify-content-start">
                        <div class="col-lg-8 text-center text-lg-start">
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style={{ 'border-color': 'rgba(256, 256, 256, .3) !important' }}>
                                Welcome {user.username ? user.username : 'Bon Sante'}
                            </h5>
                            <h1 class="display-1 text-white mb-md-4">Best Healthcare Solution For Doctors</h1>
                            <div class="pt-2">
                                {/* <Link to="/find-patient" class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Patient</Link> */}
                                <Link to="/check-appointment" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Check Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;