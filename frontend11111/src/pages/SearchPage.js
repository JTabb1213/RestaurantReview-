import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../HttpClient';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import './SearchPage.css';


function SearchPage() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [city, setCity] = useState('my location');
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [moreResults, setMoreResults] = useState([]);
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

    },);


    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handlePlaceClick = (id) => {
        navigate(`/displaypage?id=${id}`)
    }

    const handleSearch = async () => {
        try {
            setError("");
            console.log('City:', city);
            console.log('Keyword:', keyword);

            const response = await httpClient.get(`/api/restaurantsNearby?address=${city}&name=${keyword}&nextPageToken=${nextPageToken}`);

            console.log('Backend response:', response.data);
            if (response.data.restaurants.length === 0) {
                setError("No restaurants found");
            }

            //setSearchResults(response.data.restaurants);

            //setSearchResults((prevResults) => (nextPageToken ? [...prevResults, ...response.data.restaurants] : response.data.restaurants));
            setSearchResults(response.data.restaurants);

            // setNextPageToken(response.data.nextPageToken);
            console.log("NextP: ", nextPageToken)
        } catch (error) {
            console.log('Error calling backend for nearby restaurants:', error);
            setError(error.response.data);
        }
    };

    return (
        <div className='search-page'>
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
                <LoginButton />
            )}
            <div className="search-container">
                <label>
                    Near:
                    <input type="text" value={city} onChange={handleCityChange} className="search-input" />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={keyword} onChange={handleKeywordChange} className="search-input" />
                </label>
                <br />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>

                {error && <div className="error-message">{error}</div>}
                {searchResults.length > 0 && (
                    <div>
                        <h2>Search Results:</h2>
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>
                                    <div className="results"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handlePlaceClick(result.id)}
                                    >
                                        {result.name} - {result.address}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {nextPageToken ? (
                            <button onClick={handleSearch} className="search-button">
                                Search more
                            </button>
                        ) : (
                            <div style={{ color: 'red' }}> No more restaurants nearby </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
