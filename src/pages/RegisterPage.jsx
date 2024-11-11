import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import '../assets/css/RegisterPage.css';

function RegisterPage() {

    const { register } = useUser();
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
            await register(emailInput, contraseñaInput);
        } catch (err) {
            setError('Error al registrar usuario');
        }
    };

    return (
        <div className='register-container'>
            <div className='register-content'>
                <div>
                    <h1>Registro</h1>
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
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </form>
                </div>
                <p className='login-register'>
                    ¿Ya tienes una cuenta?
                </p>
                <a href="/login" className="btn btn-primary">
                    Inicia sesión aquí
                </a>
            </div>
        </div>
    );
}

export default RegisterPage;