import React, { useState } from 'react';

const SearchBarForSearchPage = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Add your logic for the search functionality here

        // Pass the search term to the parent component
        onSearch(searchTerm);
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Enter your search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
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

export default SearchBarForSearchPage;
