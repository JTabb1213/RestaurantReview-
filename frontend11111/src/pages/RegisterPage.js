import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useHttpClient } from '../HttpClient';
import './LoginPage.css';

export default function Register() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    //const [searchParams] = useSearchParams();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState();
    const [previousRoute, setPreviousRoute] = useState("");
    const [working, setWorking] = useState();

    const handleTakeMeHome = () => {
        navigate('/');
    }

    const handleCreateAccount = () => {
        setError("");
        if (password !== confirmPass) {
            setError("Passwords have to match");
            return;
        }
        console.log("U", username);
        httpClient.post('/api/createUser', {
            email: email,
            username: username,
            password: password
        },).then(result => {
            console.log(result);
            navigate({
                pathname: '/loginpage',
                search: `redirect_url=${redirectUrl}`
            })
        }).catch(err => {
            setError(err.response.data.message);
        });
    }

    return (
        <div className="login-container">
            <h1>Create Account</h1>
            <div className="input-container">
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="confirmPassword"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="login-input"
                    />
                </label>

            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-container">
                <button
                    onClick={handleCreateAccount}
                    className="login-button"
                    disabled={working}
                >
                    Create Account
                </button>
                <button
                    onClick={handleTakeMeHome}
                    className="take-me-home-button"
                    disabled={working}
                >
                    Go to home page
                </button>
            </div>
        </div>
    );
}

