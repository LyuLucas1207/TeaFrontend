import React from 'react';

import Header from '../components/Header';

function Home({ isDarkTheme }) {
    return (
        <div className="home-container">
            <Header isDarkTheme={isDarkTheme} />
            
        </div>
    );
}

export default Home;