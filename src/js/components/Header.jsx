import React from 'react';
import './../../css/components/Header.css';
import teaImage from './../../images/tea2_1920.jpg';
import teaImage2 from './../../images/tea3_1920.jpg';
import companyLogo from './../../sjgz/logo1.png';
import companyLogo2 from './../../sjgz/logo3.png';
import { Link } from 'react-router-dom';

function Header({ isDarkTheme }) {
    return (
        <div className="header-container">
            <div className="header-top-container">
                <div className="header-text">
                    <h1>双江古寨</h1>
                    <p>源自云南的纯正古茶，带您领略千年茶文化的魅力。</p>

                    <div className="header-image header-outer-image">
                        <img src={isDarkTheme ? teaImage2 : teaImage} alt="Tea" />
                    </div>
                    <p className="header-text-last-p">每一片茶叶，<br />源于自然与匠心的完美结合。<br />感受双江古寨的宁静与悠远，<br />品味茶香之中的历史与传承。</p>
                    <div className="header-button-container">
                        <div className="header-button">
                            <Link to="/contact">联&nbsp;系&nbsp;我&nbsp;们 &gt;</Link>
                        </div>
                        <div className="header-button">
                            <Link to="/products">浏&nbsp;览&nbsp;产&nbsp;品 &gt;</Link>
                        </div>
                    </div>
                </div>
                <div className="header-image header-inner-image">
                    <img src={isDarkTheme ? teaImage2 : teaImage} alt="Tea" />
                </div>
            </div>
            <div className="header-icon-container">
                <div className="header-icon">
                    <img src={isDarkTheme ? companyLogo : companyLogo2} alt="Tea" />
                </div>
                <div className="header-icon-text-container">
                    <div className="header-icon-text">
                        春秋四季，采撷自然之美，<br />古茶之韵，品味生活之美。
                    </div>
                    <div className="header-icon-text">
                        自古以来，茶之雅韵，流传在诗词歌赋中。<br />双江古寨公司，承袭千年茶文化精髓，将自然的灵韵与匠心之技凝聚一杯，愿每一杯茶都带给您千古风雅。
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

