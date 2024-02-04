import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Button clicked!');
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Successfully logged out, return to search?</h1>
            <button onClick={handleClick} style={styles.button}>
                Take me to search
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LogoutPage;
