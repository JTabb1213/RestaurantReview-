import React, { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useHttpClient } from '../HttpClient';
import { useEffect } from 'react';
import './LoginPage.css';

export default function LoginPage() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();


    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();
    const [working, setWorking] = useState();
    const [user, setUser] = useState("");

    const onButtonClick = () => {
        setError(null);
        setWorking(true);
        httpClient.post('/api/login', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            console.log("result of login:", result);
            setUser(result.data.username);
            console.log("user", user);
            navigate(redirectUrl || '/');
        }).catch(err => {
            setError(err.response.data.message);
        }).finally(() => {
            setWorking(false);
        })
    }

    const onRegisterClicked = () => {
        navigate({
            pathname: '/register',
            search: `redirect_url=${redirectUrl}`,
        })
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="input-container">
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </label>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-container">
                <button
                    onClick={onButtonClick}
                    className="login-button"
                    disabled={working}
                >
                    {working ? "Logging in..." : "Login"}
                </button>
                <button onClick={onRegisterClicked} className="register-button">
                    Register
                </button>
            </div>
        </div>
    );
}
