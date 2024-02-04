import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css';

function SearchButton() {
    const navigate = useNavigate();
    const handleSearch = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <button onClick={handleSearch} className="Search-button">
            Go back to search
        </button>
    );
}

export default SearchButton;