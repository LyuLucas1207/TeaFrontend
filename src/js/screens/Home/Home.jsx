import React from 'react';

import Components from '../../components/components';
import { PATHS } from '../../constants/paths';
import './style.css';

function Home({ isDarkTheme }) {
    const ThreeDCardImageSet = {
        Turbo:{
            Image1: PATHS.SRC.ASSETS.IMAGES.TEA5_4256,
            Image2: PATHS.SRC.ASSETS.IMAGES.TEA6_4961,
            // Image3: PATHS.SRC.ASSETS.IMAGES.TEA7_5184,
            // Image4: PATHS.SRC.ASSETS.IMAGES.TEA8_5616
            Image3: PATHS.SRC.ASSETS.IMAGES.TEA10_GENERAL,
            Image4: PATHS.SRC.ASSETS.IMAGES.TEA9_GENERAL
        },
        Fast:{
            Image1: PATHS.SRC.ASSETS.IMAGES.TEA5_1920,
            Image2: PATHS.SRC.ASSETS.IMAGES.TEA6_1920,
            // Image3: PATHS.SRC.ASSETS.IMAGES.TEA7_1920,
            // Image4: PATHS.SRC.ASSETS.IMAGES.TEA8_1920  
            Image3: PATHS.SRC.ASSETS.IMAGES.TEA10_GENERAL,
            Image4: PATHS.SRC.ASSETS.IMAGES.TEA9_GENERAL
        },
        Medium:{
            Image1: PATHS.SRC.ASSETS.IMAGES.TEA5_1280,
            Image2: PATHS.SRC.ASSETS.IMAGES.TEA6_1280,
            // Image3: PATHS.SRC.ASSETS.IMAGES.TEA7_1280,
            // Image4: PATHS.SRC.ASSETS.IMAGES.TEA8_1280
            Image3: PATHS.SRC.ASSETS.IMAGES.TEA10_GENERAL,
            Image4: PATHS.SRC.ASSETS.IMAGES.TEA9_GENERAL
        },
        Slow:{
            Image1: PATHS.SRC.ASSETS.IMAGES.TEA5_640,
            Image2: PATHS.SRC.ASSETS.IMAGES.TEA6_640,
            // Image3: PATHS.SRC.ASSETS.IMAGES.TEA7_640,
            // Image4: PATHS.SRC.ASSETS.IMAGES.TEA8_640
            Image3: PATHS.SRC.ASSETS.IMAGES.TEA10_GENERAL,
            Image4: PATHS.SRC.ASSETS.IMAGES.TEA9_GENERAL
        },
        ThreeD:{
            Image1: PATHS.SRC.ASSETS.IMAGES.TEA5_1280_REMOVE_BG,
            Image2: PATHS.SRC.ASSETS.IMAGES.TEA6_1280_REMOVE_BG,
            // Image3: PATHS.SRC.ASSETS.IMAGES.TEA7_1280_REMOVE_BG,
            // Image4: PATHS.SRC.ASSETS.IMAGES.TEA8_1280_REMOVE_BG
            Image3: PATHS.SRC.ASSETS.IMAGES.TEA10_REMOVE_BG,
            Image4: PATHS.SRC.ASSETS.IMAGES.TEA9_REMOVE_BG
        }
    }

    const VideoTextVideoSet = {
        Light:{
            Video1: PATHS.SRC.ASSETS.VIDEOS.VILLAGE_1280,
            Video2: PATHS.SRC.ASSETS.VIDEOS.VILLAGE_1920,
            Video3: PATHS.SRC.ASSETS.VIDEOS.VILLAGE_2560
        },
        Dark:{
            Video1: PATHS.SRC.ASSETS.VIDEOS.VILLAGE2_640,
            Video2: PATHS.SRC.ASSETS.VIDEOS.VILLAGE2_960,
            Video3: PATHS.SRC.ASSETS.VIDEOS.VILLAGE2_1280
        }
    }

    const VideoTexts = () => {
        return (
            <div className="video-text-text-container">
                <p> <span>云南，</span>作为中国最大的茶园基地之一，得天独厚的地理位置和温润的气候为茶树的生长提供了理想条件。</p>
                <p>
                    这里的高山茶园孕育出丰富的茶叶品种，尤以享誉世界的普洱茶最为著名。
                    高海拔、优质土壤与天然降水的结合，使得云南茶叶不仅风味独特，更是茶香四溢，深受国内外茶爱好者的喜爱。
                </p>
                <br/>
                <p><span>双江古寨，</span>正位于这片孕育珍茗的丰饶土地上，为您带来地道的云南茶韵。</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* <Components.StarPlanet isDarkTheme={isDarkTheme} /> */}
            <Components.Header isDarkTheme={isDarkTheme} flag={!isDarkTheme}/>
            <Components.VideoText isDarkTheme={isDarkTheme} flag={!isDarkTheme} VideoTextVideoSet={VideoTextVideoSet} VideoTexts={VideoTexts}/>
            <Components.ThreeDCard ThreeDCardImageSet={ThreeDCardImageSet} />
            <Components.ProductCards />
        </div>
    );
}

export default Home;