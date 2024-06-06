import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [medicalLicense, setMedicalLicense] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="d-flex align-items-center bg-primary vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 bg-light p-5 rounded">
                        <h3 className="text-center mb-4">Đăng ký Bác sĩ</h3>
                        <form id="registerForm" onSubmit={handleSubmit} enctype="multipart/form-data">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Tên đầy đủ" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" id="nationalID" name="nationalID" placeholder="Căn cước công dân" value={nationalID} onChange={(e) => setNationalID(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="medicalLicense">Giấy phép hành nghề:</label>
                                <input type="file" className="form-control" id="medicalLicense" name="medicalLicense" onChange={(e) => setMedicalLicense(e.target.files[0])} required />
                            </div>
                            <div className="form-group form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                                <label className="form-check-label" htmlFor="terms">Tôi đồng ý trở thành bác sĩ của hệ thống và chấp nhận <a href="#">mọi điều khoản</a>.</label>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center">Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
