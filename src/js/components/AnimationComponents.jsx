import React from "react";

import "../../css/animations/AEL.css";
import "../../css/animations/AS.css";
import "../../css/animations/ANS.css";
import "../../css/animations/AW.css";
import "../../css/animations/AC.css";
import "../../css/animations/AH.css";
import "../../css/animations/AFQ.css";
import "../../css/animations/AR.css";
import "../../css/animations/ACS.css";
import "../../css/animations/AB.css";
import "../../css/animations/AE.css";
import "../../css/animations/ASS.css";
import "../../css/animations/ARS.css";


function AnimationEffectLight() {
    return (
        <div className="ael_loading">
            <div className="ael_loading-wide">
                <div className="ael_l1 ael_color"></div>
                <div className="ael_l2 ael_color"></div>
                <div className="ael_e1 ael_color ael_animation-effect-light"></div>
                <div className="ael_e2 ael_color ael_animation-effect-light-d"></div>
                <div className="ael_e3 ael_animation-effect-rot">ProjectHub</div>
                <div className="ael_e4 ael_color ael_animation-effect-light"></div>
                <div className="ael_e5 ael_color ael_animation-effect-light-d"></div>
                <div className="ael_e6 ael_animation-effect-scale">*</div>
                <div className="ael_e7 ael_color"></div>
                <div className="ael_e8 ael_color"></div>
            </div>
        </div>
    );
}

function AnimationSpin() {
    return (
        <div className="as_container">
            <div className="as_spinner"></div>
        </div>

    );
}

function AnimationNineSquares() {
    return (
        <div className="ans_container">
            <div className="ans_loader">
                <div className="ans_load1"></div>
                <div className="ans_load2"></div>
                <div className="ans_load3"></div>
                <div className="ans_load4"></div>
                <div className="ans_load5"></div>
                <div className="ans_load6"></div>
                <div className="ans_load7"></div>
                <div className="ans_load8"></div>
                <div className="ans_load9"></div>
            </div>
        </div>
    );
}

function AnimationWaves() {
    return (
        <div className="aw_container">
            <div className="aw_center_div">
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
                <div className="aw_wave"></div>
            </div>
        </div>
    );
}

function AnimationCube() {
    return (
        <div className="ac_container">
            <div className="ac_cube">
                <div className="ac_topD"></div>
                <div>
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>

                <div className="ac_cube2">
                    <div>
                        <span style={{ "--i": 0 }}></span>
                        <span style={{ "--i": 1 }}></span>
                        <span style={{ "--i": 2 }}></span>
                        <span style={{ "--i": 3 }}></span>
                    </div>

                    <div className="ac_cube3">
                        <div className="ac_top3"></div>
                        <div>
                            <span style={{ "--i": 0 }}></span>
                            <span style={{ "--i": 1 }}></span>
                            <span style={{ "--i": 2 }}></span>
                            <span style={{ "--i": 3 }}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnimationHeart() {
    return (
        <div className="ah_container">
            <div className="ah_main">
                <div className="ah_heart">
                    <span className="ah_heartL"></span>
                    <span className="ah_heartR"></span>
                    <span className="ah_square"></span>
                </div>
                <div className="ah_shadow"></div>
            </div>
        </div>
    );
}

function AnimationFiveSquares() {
    return (
        <div className="afq_container">
            <ul className="afq_flex_container">
                <li>
                    <span className="afq_loading afq_one"></span>
                    <span className="afq_loading afq_two"></span>
                    <span className="afq_loading_center"></span>
                </li>
            </ul>
        </div>
    );
}

function AnimationRaining() {
    return (
        <div className="ar_container">
            <div className="ar_loader">
                <div className="ar_snow">
                    <span style={{ "--i": 11 }}></span>
                    <span style={{ "--i": 12 }}></span>
                    <span style={{ "--i": 15 }}></span>
                    <span style={{ "--i": 17 }}></span>
                    <span style={{ "--i": 18 }}></span>
                    <span style={{ "--i": 13 }}></span>
                    <span style={{ "--i": 14 }}></span>
                    <span style={{ "--i": 19 }}></span>
                    <span style={{ "--i": 20 }}></span>
                    <span style={{ "--i": 10 }}></span>
                    <span style={{ "--i": 18 }}></span>
                    <span style={{ "--i": 13 }}></span>
                    <span style={{ "--i": 14 }}></span>
                    <span style={{ "--i": 19 }}></span>
                    <span style={{ "--i": 20 }}></span>
                    <span style={{ "--i": 10 }}></span>
                    <span style={{ "--i": 18 }}></span>
                    <span style={{ "--i": 13 }}></span>
                    <span style={{ "--i": 14 }}></span>
                    <span style={{ "--i": 19 }}></span>
                    <span style={{ "--i": 20 }}></span>
                    <span style={{ "--i": 10 }}></span>
                </div>
            </div>
        </div>
    );
}

function AnimationCubeShadow() {
    return (
        <div className="acs_container">
            <div className="acs_cub"></div>
        </div>
    )
}

function AnimationBook() {
    return (
        <div className="ab_container">
            <div className="ab_loader">
                <div className="ab_book-wrapper">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="var(--book-background-color)"
                        viewBox="0 0 126 75"
                        className="ab_book"
                    >
                        <rect
                            strokeWidth="5"
                            stroke="var(--main-book-border-color)"
                            rx="7.5"
                            height="70"
                            width="121"
                            y="2.5"
                            x="2.5"
                        ></rect>
                        <line
                            strokeWidth="5"
                            stroke="var(--main-book-border-color)"
                            y2="75"
                            x2="63.5"
                            x1="63.5"
                        ></line>
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M25 20H50"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M101 20H76"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M16 30L50 30"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M110 30L76 30"
                        ></path>
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="var(--book-page-fill)"
                        viewBox="0 0 65 75"
                        className="ab_book-page"
                    >
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M40 20H15"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="4"
                            stroke="var(--book-line-color)"
                            d="M49 30L15 30"
                        ></path>
                        <path
                            strokeWidth="5"
                            stroke="var(--main-book-border-color)"
                            d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

function AnimationEarth() {
    return (
        <div className="ae_container">
            <div className="ae_earth"></div>
        </div>
    );
}

function AnimationSaturnSpin() {
    return (
        <div className="ass_container">
            <div className="ass_planet"></div>
        </div>
    );
}

function AnimationRibbonSpin() {
    return (
        <div className="ars_container">
            <div className="ars_page">
                <div className="ars_container">
                    <div className="ars_ring"></div>
                    <div className="ars_ring"></div>
                    <div className="ars_ring"></div>
                    <div className="ars_ring"></div>
                    <div className="ars_h3">loading</div>
                </div>
            </div>
        </div>
    );
}


export {
    AnimationEffectLight,
    AnimationSpin,
    AnimationNineSquares,
    AnimationWaves,
    AnimationCube,
    AnimationHeart,
    AnimationFiveSquares,
    AnimationRaining,
    AnimationCubeShadow,
    AnimationBook,
    AnimationEarth,
    AnimationSaturnSpin,
    AnimationRibbonSpin,
};  