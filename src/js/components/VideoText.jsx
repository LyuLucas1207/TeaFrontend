import React, { useEffect, useState, useRef } from 'react';
import './../../css/components/VideoText.css';
import village2_1280 from './../../videos/village2_1280.mp4';
import village2_960 from './../../videos/village2_960.mp4';
import village2_640 from './../../videos/village2_640.mp4';
import village_2560 from './../../videos/village_2560.mp4';
import village_1920 from './../../videos/village_1920.mp4';
import village_1280 from './../../videos/village_1280.mp4';
import { useVisibilityInOut } from '../utility/myUse';

function VideoText({
    isDarkTheme,
    flag = true,
    dark1 = village2_640,
    dark2 = village2_960,
    dark3 = village2_1280,
    light1 = village_1280,
    light2 = village_1920,
    light3 = village_2560
}) {
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const getPageLoadSpeed = () => {
            const entries = performance.getEntriesByType('navigation');
            const loadTime = entries.length ? entries[0].loadEventEnd - entries[0].startTime : 0;
            return loadTime;
        };

        const loadTime = getPageLoadSpeed();

        if (isDarkTheme) {
            if (loadTime < 2000) {
                setVideoSrc(dark3);
            } else if (loadTime < 5000) {
                setVideoSrc(dark2);
            } else {
                setVideoSrc(dark1);
            }
        } else {
            if (loadTime < 2000) {
                setVideoSrc(light3);
            } else if (loadTime < 5000) {
                setVideoSrc(light2);
            } else {
                setVideoSrc(light1);
            }
        }
    }, [isDarkTheme, dark1, dark2, dark3, light1, light2, light3]);

    const containerRef = useRef(null);
    const isVisible = useVisibilityInOut(containerRef, 0.4, 0.3);

    return (
        <div ref={containerRef} className={`video-text-container ${!flag ? 'flag' : ''}`}>
            {flag ? (
                <>
                    <div className={`video-text-video ${isVisible ? 'slide-in-left' : 'slide-out-left'}`}>
                        <video src={videoSrc} autoPlay loop muted playsInline />
                    </div>
                    <div className={`video-text-text ${isVisible ? 'slide-in-right' : 'slide-out-right'}`}>
                        <p> <span>云南，</span>作为中国最大的茶园基地之一，得天独厚的地理位置和温润的气候为茶树的生长提供了理想条件。</p>
                        <p>这里的高山茶园孕育出丰富的茶叶品种，尤以享誉世界的普洱茶最为著名。高海拔、优质土壤与天然降水的结合，使得云南茶叶不仅风味独特，更是茶香四溢，深受国内外茶爱好者的喜爱。</p>
                        <br />
                        <p> <span>双江古寨，</span>正位于这片孕育珍茗的丰饶土地上，为您带来地道的云南茶韵。</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={`video-text-text ${isVisible ? 'slide-in-left' : 'slide-out-left'}`}>
                        <p> <span>云南，</span>作为中国最大的茶园基地之一，得天独厚的地理位置和温润的气候为茶树的生长提供了理想条件。</p>
                        <p>这里的高山茶园孕育出丰富的茶叶品种，尤以享誉世界的普洱茶最为著名。高海拔、优质土壤与天然降水的结合，使得云南茶叶不仅风味独特，更是茶香四溢，深受国内外茶爱好者的喜爱。</p>
                        <br />
                        <p> <span>双江古寨，</span>正位于这片孕育珍茗的丰饶土地上，为您带来地道的云南茶韵。</p>
                    </div>
                    <div className={`video-text-video ${isVisible ? 'slide-in-right' : 'slide-out-right'}`}>
                        <video src={videoSrc} autoPlay loop muted playsInline />
                    </div>
                </>
            )}
        </div>
    );
}


export default VideoText;
