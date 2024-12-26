import React, { useEffect, useState, useRef } from 'react';
import Publics from '../../public/public';
import './style.css';
function VideoText({
    isDarkTheme,
    flag = true,
    VideoTextVideoSet,
    VideoTexts,
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
                setVideoSrc(VideoTextVideoSet.Dark.Video3);
            } else if (loadTime < 5000) {
                setVideoSrc(VideoTextVideoSet.Dark.Video2);
            } else {
                setVideoSrc(VideoTextVideoSet.Dark.Video1);
            }
        } else {
            if (loadTime < 2000) {
                setVideoSrc(VideoTextVideoSet.Light.Video3);
            } else if (loadTime < 5000) {
                setVideoSrc(VideoTextVideoSet.Light.Video2);
            } else {
                setVideoSrc(VideoTextVideoSet.Light.Video1);
            }
        }
    }, [isDarkTheme, VideoTextVideoSet]);

    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className={`video-text-container ${!flag ? 'flag' : ''}`}>
            {flag ? (
                <>
                    <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="video-text-video">
                        <video src={videoSrc} autoPlay loop muted playsInline />
                    </Publics.SlidingBox.SlideInOutLeft>
                    <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="video-text-text">
                        {VideoTexts()}
                    </Publics.SlidingBox.SlideInOutRight>
                </>
            ) : (
                <>
                    <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="video-text-text">
                        {VideoTexts()}
                    </Publics.SlidingBox.SlideInOutRight>
                    <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="video-text-video">
                        <video src={videoSrc} autoPlay loop muted playsInline />
                    </Publics.SlidingBox.SlideInOutLeft>
                </>
            )}
        </div>
    );
}


export default VideoText;
