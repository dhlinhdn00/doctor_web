import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Assuming login updates the context and local storage
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in
            await login(email, password);
            // Navigate to home only after successful login
            navigate('/');
        } catch (error) {
            // If login fails, log the error and show an alert
            console.error("Failed to login", error);
            alert("Login failed, please check your account information!");
        }
    };

    return (
        <div className="d-flex align-items-center bg-primary vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 bg-light p-5 rounded">
                        <h3 className="text-center mb-4">Log In</h3>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group mb-4">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100">Log In</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center">No account? <Link to="/register">Register now!</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
