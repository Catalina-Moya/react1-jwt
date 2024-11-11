import React from 'react';
import { useUser } from '../components/UserContext';
import '../assets/css/Profile.css';
import profileImage from '../assets/img/user.webp';

function Profile() {
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='p-background'></div>
                <div className='profile'>
                    <img src={profileImage} alt="Perfil" className='profile-img' />
                    <div className='profile-tittle'>Nombre del usuario</div>
                    <div className='profile-p'>
                        <p>{user}</p>
                    </div>
                    <div className='btn-ptofile'>
                        <button onClick={handleLogout} className="btn">Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

