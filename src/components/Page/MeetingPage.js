import { Link, useLocation } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

const MeetingDoctor = () => {
    const { user } = useUserContext();
    let { state } = useLocation();
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row gx-5">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="mb-4">
                            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Appointment</h5>
                        </div>
                        <img alt="" src="https://www.sim.hcmut.edu.vn/wp-content/uploads/2018/08/pexels-photo.jpg" className="img-fluid rounded-3 shadow-sm" />
                    </div>
                    <div className="col-lg-6">
                        <div className="bg-light text-center rounded p-5">
                            <h1 className="mb-4">Detail Appointment</h1>
                            <form>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <select className="form-select bg-white border-0" style={{ 'height': '55px' }}>
                                            <option selected>Department</option>
                                            {/* <option value="1">Department 1</option>
                                            <option value="2">Department 2</option>
                                            <option value="3">Department 3</option> */}
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <select className="form-select bg-white border-0" style={{ 'height': '55px' }}>
                                            <option selected>{user.username}</option>
                                            {/* <option value="1">Doctor 1</option>
                                            <option value="2">Doctor 2</option>
                                            <option value="3">Doctor 3</option> */}
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="text" className="form-control bg-white border-0" placeholder="Your Name" style={{ 'height': '55px' }} value={state ? state.name : ''} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="email" className="form-control bg-white border-0" placeholder="Your Email" style={{ 'height': '55px' }} value={state ? state.userID : ''} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="date" id="date" data-target-input="nearest">
                                            <input type="text"
                                                className="form-control bg-white border-0 datetimepicker-input"
                                                placeholder="Date" data-target="#date" data-toggle="datetimepicker" style={{ 'height': '55px' }} value={date.toISOString().split('T')[0]} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="time" id="time" data-target-input="nearest">
                                            <input type="text"
                                                className="form-control bg-white border-0 datetimepicker-input"
                                                placeholder="Time" data-target="#time" data-toggle="datetimepicker" style={{ 'height': '55px' }} value={time} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <Link className="btn btn-primary w-100 py-3" to="/join-meeting" state={{ ...state, date: date.toISOString().split('T')[0], time: time }}>Join Meeting</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MeetingDoctor;
