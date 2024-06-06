import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Đảm bảo rằng login hoàn thành trước khi chuyển hướng
            await login(email, password);
            navigate('/'); // Chuyển hướng người dùng đến trang chủ sau khi đăng nhập thành công
        } catch (error) {
            // Xử lý lỗi nếu đăng nhập thất bại
            console.error("Failed to login", error);
            alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin tài khoản!");
        }
    };

    return (
        <div className="d-flex align-items-center bg-primary vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 bg-light p-5 rounded">
                        <h3 className="text-center mb-4">Đăng nhập</h3>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group mb-4">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center">Chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
