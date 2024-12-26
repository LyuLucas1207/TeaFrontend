import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Publics from '../../public/public';

import './style.css';

const ThreeDCard = ({ ThreeDCardImageSet }) => {
    const [cardsrc1, setCard1] = useState('');
    const [cardsrc2, setCard2] = useState('');
    const [cardsrc3, setCard3] = useState('');
    const [cardsrc4, setCard4] = useState('');

    useEffect(() => {
        const getPageLoadSpeed = () => {
            const entries = performance.getEntriesByType('navigation');
            const loadTime = entries.length ? entries[0].loadEventEnd - entries[0].startTime : 0;
            return loadTime;
        };

        const loadTime = getPageLoadSpeed();
        if (loadTime < 1000) { // 1s
            setCard1(ThreeDCardImageSet.Turbo.Image1);
            setCard2(ThreeDCardImageSet.Turbo.Image2);
            setCard3(ThreeDCardImageSet.Turbo.Image3);
            setCard4(ThreeDCardImageSet.Turbo.Image4);
        } else if (loadTime < 2000) { // 2s
            setCard1(ThreeDCardImageSet.Fast.Image1);
            setCard2(ThreeDCardImageSet.Fast.Image2);
            setCard3(ThreeDCardImageSet.Fast.Image3);
            setCard4(ThreeDCardImageSet.Fast.Image4);
        } else if (loadTime < 3000) { // 3s
            setCard1(ThreeDCardImageSet.Medium.Image1);
            setCard2(ThreeDCardImageSet.Medium.Image2);
            setCard3(ThreeDCardImageSet.Medium.Image3);
            setCard4(ThreeDCardImageSet.Medium.Image4);
        } else {
            setCard1(ThreeDCardImageSet.Slow.Image1);
            setCard2(ThreeDCardImageSet.Slow.Image2);
            setCard3(ThreeDCardImageSet.Slow.Image3);
            setCard4(ThreeDCardImageSet.Slow.Image4);
        }
    }, [ThreeDCardImageSet]);

    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="threedcard-card-container">
            <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.2} thresholdout={0.5} >
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc1} className="threedcard-cover-image" alt="Card1 Cover" />
                    </div>
                    <Link to="/index/products" className="threedcard-title">产品展示</Link>
                    <img src={ThreeDCardImageSet.ThreeD.Image1} className="threedcard-character" alt="Card1 Character" />
                </div>
            </Publics.SlidingBox.SlideInOutLeft>

            <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.2} thresholdout={0.5} >
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc3} className="threedcard-cover-image" alt="Card3 Cover" />
                    </div>
                    <Link to="/index/history" className="threedcard-title">茶叶文化</Link>
                    <img src={ThreeDCardImageSet.ThreeD.Image3} className="threedcard-character" alt="Card3 Character" />
                </div>
            </Publics.SlidingBox.SlideInOutLeft>

            <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.2} thresholdout={0.5} >
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc4} className="threedcard-cover-image" alt="Card4 Cover" />
                    </div>
                    <Link to="/index/contact" className="threedcard-title">联系我们</Link>
                    <img src={ThreeDCardImageSet.ThreeD.Image4} className="threedcard-character" alt="Card4 Character" />
                </div>
            </Publics.SlidingBox.SlideInOutRight>

            <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.2} thresholdout={0.5} >
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc2} className="threedcard-cover-image" alt="Card2 Cover" />
                    </div>
                    <Link to="/index/about" className="threedcard-title">更多信息</Link>
                    <img src={ThreeDCardImageSet.ThreeD.Image2} className="threedcard-character" alt="Card2 Character" />
                </div>
            </Publics.SlidingBox.SlideInOutRight>
        </div>
    );
}

export default ThreeDCard;
