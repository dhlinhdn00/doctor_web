import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('userToken');
        return token ? { email: 'test@example.com' } : null;
    });
    const navigate = useNavigate();

    const login = (email, password) => {
        if (email === "test@example.com" && password === "password") {
            setUser({ email });
            localStorage.setItem('userToken', 'your-token'); // Lưu token vào localStorage
            navigate('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userToken'); // Xóa token khỏi localStorage
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
