import React from 'react';
import { useHttpClient } from '../HttpClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './SearchButton.css';

function AddReviewButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const httpClient = useHttpClient();

    const handleAddReview = async (event) => {
        event.preventDefault();
        try {
            const response = await httpClient.post(`/api/seeIfLoggedIn`);

            console.log('Backend response:', response.data);
            navigate('/reviewpage');
        } catch (error) {
            console.log('Error calling backend for nearby restaurants:', error);

            if (error.response && error.response.status === 401) {
                navigate({
                    pathname: '/needtologin',
                    search: `redirect_url=${location.pathname}${location.search}`,
                })
            }
        }
    };

    return (
        <button onClick={handleAddReview} className="Add-review-button">
            Review this place
        </button>
    );
}

export default AddReviewButton;