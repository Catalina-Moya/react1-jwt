import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import '../assets/css/LoginPage.css';

function LoginPage() {

    const { login } = useUser();
    const [emailInput, setEmailInput] = useState('');
    const [contraseñaInput, setContraseñaInput] = useState('');
    const [error, setError] = useState('');

    const handleEmailInput = (evento) => {
        setEmailInput(evento.target.value);
    };

    const handleContraseñaInput = (evento) => {
        setContraseñaInput(evento.target.value);
    };

    const handleForm = async (evento) => {
        evento.preventDefault();

        if (!emailInput.length || !contraseñaInput.length) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        if (!emailInput.includes("@")) {
            alert("No es un correo válido.");
            return;
        }
        if (contraseñaInput.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            await login(emailInput, contraseñaInput);
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-content'>
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleForm}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                value={emailInput}
                                onChange={handleEmailInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contraseñaInput" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="contraseñaInput"
                                value={contraseñaInput}
                                onChange={handleContraseñaInput}
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
                <p className='register-login'>
                    ¿No tienes una cuenta?
                </p>
                <a href="/register" className="btn btn-primary">
                    Regístrate aquí
                </a>
            </div>
        </div>
    );
}

export default LoginPage;
