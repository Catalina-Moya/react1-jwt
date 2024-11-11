import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');

        if (storedToken && storedEmail) {
            setToken(storedToken);
            setUser(storedEmail);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setUser(data.email);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
            } else {
                console.error('Error al hacer login:', data.message);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud de login:', error);
        }
    };

    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setUser(data.email);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
            } else {
                console.error('Error al hacer registro:', data.message);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud de registro:', error);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const getProfile = async () => {
        if (!token) {
            console.error('No hay token disponible');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.email);
            } else {
                console.error('Error al obtener el perfil:', data.message);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud de perfil:', error);
        }
    };

    return (
        <UserContext.Provider value={{ token, user, login, register, logout, getProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
