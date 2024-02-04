import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../HttpClient';
import 'react-slideshow-image/dist/styles.css';

import './DisplayName.css';

function DisplayName() {
    const location = useLocation();
    const httpClient = useHttpClient();
    const [name, setName] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const id = params.get('id');

                const response = await httpClient.get(`/api/searchByGoogleId?id=${id}`);

                setName(response.data.result.name);

            } catch (error) {
                console.error("error getting res info: ", error);
            }
        }

        getData();
    }, []);

    return (
        <div className="Restaurant-Name">
            {name}
        </div>
    );
}

export default DisplayName;