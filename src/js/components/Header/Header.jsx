import React, { useRef } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import StarPlanet from '../StarPlanet/StarPlanet';
import Publics from '../../public/public';

function Header({ isDarkTheme, flag }) {
    const whiteImage = PATHS.SRC.ASSETS.IMAGES.TEA3_1280;
    const blackImage = PATHS.SRC.ASSETS.IMAGES.TEA2_1280;
    const image = isDarkTheme ? whiteImage : blackImage;
    const blackLogo = PATHS.SRC.ASSETS.SJGZ.NEW_RED_LOGO_REMOVED;
    const whiteLogo = PATHS.SRC.ASSETS.SJGZ.NEW_YELLOW_LOGO_REMOVED;
    const logo = isDarkTheme ? whiteLogo : blackLogo;

    const containerRefLight = useRef(null);
    const containerRefDark = useRef(null);
    const containerRef = isDarkTheme ? containerRefDark : containerRefLight;

    return (
        <Publics.FramingBox.FlexColumnMiddleBox reference={containerRef} className='header-container' style={{ overflow: 'visible' }}>
            {flag ? (
            <div className="header-top-container" ref={containerRefLight} >
                <Publics.SlidingBox.SlideInLeft containerRef={containerRef} thresholdin={0} className='header-text'>
                    <h1>双江古寨</h1>
                    <p>源自云南的纯正古茶，带您领略千年茶文化的魅力。</p>
                    <Publics.SlidingBox.SlideInRight containerRef={containerRef} thresholdin={0} className='header-image header-outer-image'>
                        <img src={image} alt="Tea" />
                    </Publics.SlidingBox.SlideInRight>
                    <p className="header-text-last-p">
                        每一片茶叶，<br />源于自然与匠心的完美结合。<br />感受双江古寨的宁静与悠远，<br />品味茶香之中的历史与传承。
                    </p>
                    <div className="header-button-container">
                        <div className="header-button">
                            <Link to="/index/contact">联&nbsp;系&nbsp;我&nbsp;们 &gt;</Link>
                        </div>
                        <div className="header-button">
                            <Link to="/index/products">浏&nbsp;览&nbsp;产&nbsp;品 &gt;</Link>
                        </div>
                    </div>
                </Publics.SlidingBox.SlideInLeft>
                <Publics.SlidingBox.SlideInRight containerRef={containerRef} thresholdin={0} className='header-image header-inner-image'>
                    <img src={image} alt="Tea" />
                </Publics.SlidingBox.SlideInRight>
            </div>
            ) : (
            <div className="header-top-container" ref={containerRefDark} >
                <Publics.SlidingBox.SlideInRight containerRef={containerRef} thresholdin={0} className='header-image header-inner-image'>
                    <img src={image} alt="Tea" />
                </Publics.SlidingBox.SlideInRight>
                <Publics.SlidingBox.SlideInLeft containerRef={containerRef} thresholdin={0} className='header-text'>
                    <h1>双江古寨</h1>
                    <p>源自云南的纯正古茶，带您领略千年茶文化的魅力。</p>
                    <Publics.SlidingBox.SlideInRight containerRef={containerRef} thresholdin={0} className='header-image header-outer-image'>
                        <img src={image} alt="Tea" />
                    </Publics.SlidingBox.SlideInRight>
                    <p className="header-text-last-p">
                        每一片茶叶，<br />源于自然与匠心的完美结合。<br />感受双江古寨的宁静与悠远，<br />品味茶香之中的历史与传承。
                    </p>
                    <div className="header-button-container">
                        <div className="header-button">
                            <Link to="/index/contact">联&nbsp;系&nbsp;我&nbsp;们 &gt;</Link>
                        </div>
                        <div className="header-button">
                            <Link to="/index/products">浏&nbsp;览&nbsp;产&nbsp;品 &gt;</Link>
                        </div>
                    </div>
                </Publics.SlidingBox.SlideInLeft>
            </div>
            )}
            <Publics.SlidingBox.SlideInUp containerRef={containerRef} thresholdin={0.1} className='header-icon-container'>
            <StarPlanet isDarkTheme={isDarkTheme} />
                <div className="header-icon">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="header-icon-text-container">
                    <div className="header-icon-text">
                        春秋四季，采撷自然之美，<br />古茶之韵，品味生活之美。
                    </div>
                    <div className="header-icon-text">
                        自古以来，茶之雅韵，流传在诗词歌赋中。<br />双江古寨公司，承袭千年茶文化精髓，将自然的灵韵与匠心之技凝聚一杯，愿每一杯茶都带给您千古风雅。
                    </div>
                </div>
            </Publics.SlidingBox.SlideInUp>
        </Publics.FramingBox.FlexColumnMiddleBox>
    );
}

export default Header;
