import React, { useRef, useEffect, useState } from 'react';
import './../../css/components/ThreeDCard.css';
import cardwithoutBackground from './../../images/tea5_1280-removebg-preview.png';
import cardwithoutBackground2 from './../../images/tea6_1280-removebg-preview.png';
import cardwithoutBackground3 from './../../images/tea7_1280-removebg-preview.png';
import cardwithoutBackground4 from './../../images/tea8_1280-removebg-preview.png';
import cardBackGround from './../../images/tea5_1280.jpg';
import cardBackGround2 from './../../images/tea6_1280.jpg';
import cardBackGround3 from './../../images/tea7_1280.jpg';
import cardBackGround4 from './../../images/tea8_1280.jpg';

import cardBackGround_1920 from './../../images/tea5_1920.jpg';
import cardBackGround2_1920 from './../../images/tea6_1920.jpg';
import cardBackGround3_1920 from './../../images/tea7_1920.jpg';
import cardBackGround4_1920 from './../../images/tea8_1920.jpg';

import cardBackGround_640 from './../../images/tea5_640.jpg';
import cardBackGround2_640 from './../../images/tea6_640.jpg';
import cardBackGround3_640 from './../../images/tea7_640.jpg';
import cardBackGround4_640 from './../../images/tea8_640.jpg';

import cardBackGround_4256 from './../../images/tea5_4256.jpg';
import cardBackGround2_4961 from './../../images/tea6_4961.jpg';
import cardBackGround3_5184 from './../../images/tea7_5184.jpg';
import cardBackGround4_5616 from './../../images/tea8_5616.jpg';



import { Link } from 'react-router-dom';
import { useVisibilityInOut } from '../utility/myUse';



function ThreeDCard({
    card1 = cardBackGround,
    card2 = cardBackGround2,
    card3 = cardBackGround3,
    card4 = cardBackGround4
}) {
    const containerRef = useRef(null);
    const isVisible = useVisibilityInOut(containerRef, 0.4, 0.3);

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
            setCard1(cardBackGround_4256);
            setCard2(cardBackGround2_4961);
            setCard3(cardBackGround3_5184);
            setCard4(cardBackGround4_5616);
        } else if (loadTime < 2000) { // 2s
            setCard1(cardBackGround_1920);
            setCard2(cardBackGround2_1920);
            setCard3(cardBackGround3_1920);
            setCard4(cardBackGround4_1920);
        } else if (loadTime < 3000) { // 3s
            setCard1(card1);
            setCard2(card2);
            setCard3(card3);
            setCard4(card4);
        } else {
            setCard1(cardBackGround_640);
            setCard2(cardBackGround2_640);
            setCard3(cardBackGround3_640);
            setCard4(cardBackGround4_640);
        }
    }, [card1, card2, card3, card4]);


    return (
        <div ref={containerRef} className="threedcard-card-container">

            <div className={`threedcard-card-slide ${isVisible ? 'Tdcard-slide-in-left' : 'Tdcard-slide-out-left'}`}>
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc1} className="threedcard-cover-image" alt="Card1 Cover" />

                    </div>
                    <Link to="/index/products" className="threedcard-title">产品展示</Link>
                    <img src={cardwithoutBackground} className="threedcard-character" alt="Card1 Character" />
                </div>
            </div>

            <div className={`threedcard-card-slide ${isVisible ? 'Tdcard-slide-in-left' : 'Tdcard-slide-out-left'}`}>
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc2} className="threedcard-cover-image" alt="Card2 Cover" />
                    </div>
                    <Link to="/index/about" className="threedcard-title">泡茶步骤</Link>
                    <img src={cardwithoutBackground2} className="threedcard-character" alt="Card2 Character" />
                </div>
            </div>

            <div className={`threedcard-card-slide ${isVisible ? 'Tdcard-slide-in-right' : 'Tdcard-slide-out-right'}`}>
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc3} className="threedcard-cover-image" alt="Card3 Cover" />
                    </div>
                    <Link to="/index/news" className="threedcard-title">茶叶文化</Link>
                    <img src={cardwithoutBackground3} className="threedcard-character" alt="Card3 Character" />
                </div>
            </div>

            <div className={`threedcard-card-slide ${isVisible ? 'Tdcard-slide-in-right' : 'Tdcard-slide-out-right'}`}>
                <div className="threedcard-card">
                    <div className="threedcard-wrapper">
                        <img src={cardsrc4} className="threedcard-cover-image" alt="Card4 Cover" />
                    </div>
                    <Link to="/index/contact" className="threedcard-title">联系我们</Link>
                    <img src={cardwithoutBackground4} className="threedcard-character" alt="Card4 Character" />
                </div>
            </div>
        </div>
    );
}

export default ThreeDCard;
