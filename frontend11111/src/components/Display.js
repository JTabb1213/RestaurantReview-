import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../HttpClient';
import 'react-slideshow-image/dist/styles.css';

import './Display.css';

function DisplayResults() {
    const location = useLocation();
    const httpClient = useHttpClient();
    const [photos, setPhotos] = useState([]);
    const [photoURLs, setPhotoURLs] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const id = params.get('id');
                //const h = params.get();
                //console.log("test", h);
                const response = await httpClient.get(`/api/searchByGoogleId?id=${id}`);

                console.log(response.data);
                setPhotos(response.data.result.photos);
                setName(response.data.result.name);

                if (response.data.result.photos) {
                    console.log("photos are here")
                    const urls = await Promise.all(response.data.result.photos.map(async (photo) => {
                        const photoReference = photo.photo_reference;
                        const url = await getPhotosFromBackend(photoReference);
                        return url;
                    }));

                    setPhotoURLs(urls);
                } else {
                    console.log("no photos");
                }
            } catch (error) {
                console.error("error getting res info: ", error);
            }
        }

        getData();
    }, []);

    const getPhotosFromBackend = async (photoReference) => {
        try {
            const response = await httpClient.get(`/api/getPhotos?ref=${photoReference}`);
            return response.data;
        } catch (error) {
            console.error("error");
        }
    }

    return (
        <div className="photos-container">
            <div className="photos-wrapper">
                <div className="Restaurant-Name">
                    {name}
                </div>
                {photoURLs.map((url, index) => (
                    <img key={index} src={url} alt={`photo-${index}`} className="photo" />
                ))}
            </div>
        </div>
    );
}

export default DisplayResults;
