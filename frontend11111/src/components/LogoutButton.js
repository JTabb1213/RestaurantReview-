import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHttpClient } from '../HttpClient';

import './LoginButton.css';
import 'react-slideshow-image/dist/styles.css';

import './DisplayName.css';

function LogoutButton() {
    const navigate = useNavigate();
    const httpClient = useHttpClient();
    //const 

    const handleLogout = async () => {
        httpClient.post(`/api/logout`).then(result => {
            console.log("successfully logged out");
        }).catch(err => {
            console.log("error logging out", err)
        })
        navigate({
            pathname: '/logoutpage',
        })

    }

    return (
        <button onClick={handleLogout} className="Login-button">
            Logout
        </button>
    );
}

export default LogoutButton;