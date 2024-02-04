import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './LoginButton.css';
import 'react-slideshow-image/dist/styles.css';

import './DisplayName.css';

function LoginButton() {
    const navigate = useNavigate();
    const location = useLocation();
    //const 

    const handleLogin = () => {
        //const currentRoute = location.pathname;
        navigate({
            pathname: '/loginpage',
            search: `redirect_url=${location.pathname}${location.search}`,
        })
        //const queryParams = new URLSearchParams(location.search);
        // const id = queryParams.get('id');
        //queryParams.set('redirectRoute', currentRoute);
        // console.log("H", queryParams.toString());

        //const url = `/loginpage?${queryParams.toString()}`;
        //navigate(url);
    }

    return (
        <button onClick={handleLogin} className="Login-button">
            login
        </button>
    );
}

export default LoginButton;