import React from 'react';

import Header from '../components/Header';
import VideoText from '../components/VideoText';
import ThreeDCard from '../components/ThreeDCard';
import ProductCards from '../components/ProductCards';

import village2_1280 from './../../videos/village2_1280.mp4';
import village2_960 from './../../videos/village2_960.mp4';
import village2_640 from './../../videos/village2_640.mp4';
import village_2560 from './../../videos/village_2560.mp4';
import village_1920 from './../../videos/village_1920.mp4';
import village_1280 from './../../videos/village_1280.mp4';

function Home({ isDarkTheme }) {
    return (
        <div className="home-container">
            <Header isDarkTheme={isDarkTheme} />
            <VideoText
                isDarkTheme={isDarkTheme}
                flag={true}
                dark1={village2_640}
                dark2={village2_960}
                dark3={village2_1280}
                light1={village_1280}
                light2={village_1920}
                light3={village_2560} />
            <ThreeDCard />
            <ProductCards />

        </div>
    );
}

export default Home;