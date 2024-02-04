import React, { useEffect, useState } from 'react';
import { useHttpClient } from "../HttpClient";
import { useLocation } from 'react-router-dom';
import DisplayResults from '../components/Display';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import DisplayName from '../components/DisplayName';
import SearchButton from '../components/SearchButton';
import AddReviewButton from '../components/AddReviewButton';
//import { useHttpClient } from '../HttpClient';

function DisplayPage() {
    const httpClient = useHttpClient();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('id');
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await httpClient.post('/api/seeIfLoggedIn');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("not logged in");
                    setIsLoggedIn(false);
                } else {
                    console.error("error seeing login info: ", error);
                }
            }
        }

        getData();

    }, []);

    console.log("made it here", query);

    return (
        <div>
            <SearchButton />
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
                <LoginButton />
            )}

            <AddReviewButton />
            <DisplayResults />
        </div>
    );
}

export default DisplayPage;
