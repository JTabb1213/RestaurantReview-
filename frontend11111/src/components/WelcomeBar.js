import React from 'react';
import { useUser } from '../UserContext';
import './DisplayName.css';

function WelcomeBar() {
    const { user } = useUser();

    return (
        <div className="welcome">
            {user && <div>Welcome, {user}</div>}
        </div>
    );
}

export default WelcomeBar;
