
import React, { useRef } from 'react';
import { validateUrl } from '../../utils/helpers/validate';
import Publics from '../../public/public';
import './style.css';
import { PATHS } from '../../constants/paths';

function About(){
    const IMAGE_B = PATHS.SRC.ASSETS.SJGZ.ABOUT2;
    const IMAGE_C = PATHS.SRC.ASSETS.SJGZ.ABOUT3;
    const IMAGE_G = PATHS.SRC.ASSETS.IMAGES.TEA_1920;
    const IMAGE_H = PATHS.SRC.ASSETS.IMAGES.TEA4_1920;

    const containerRef = useRef(null);
    const containerRef2 = useRef(null);

    return (
        <div style={{ minheight: "100vh", width: "100vw"}}>
            <Publics.SizingBox.BorderBox width="100%" style={{ backgroundColor: "transparent", padding: "0px"}}>
                <div className="about-container">
                    {/* about_banner Section */}
                    <div className="about-about_banner">
                        <img src={IMAGE_G} alt="古寨茶业" className="about_banner-image" />
                        <div className="about_banner-overlay">
                            <h1 className="about_banner-title">双江古寨茶业有限责任公司</h1>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <div className="about-introduction" ref={containerRef}>
                        <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.4} thresholdout={0.3}  className="introduction-text">
                            <h2>古寨茶业</h2>
                            <p>双江古寨茶业有限责任公司创立于2023年，是一家致力于茶叶种植、初制、精加工及销售的综合性企业。公司主营普洱茶、红茶和白茶等多种茶类。</p>
                            <p>2024年，我们推出以双江县邦丙乡岔箐所产茶叶为原料制作的“岩羊香”系列茶品。凭借卓越的品质和对岔箐历史及“岩羊街”古老文化的致敬，“岩羊香”深受消费者喜爱，上市后反响热烈。</p>
                            <p>古寨茶业作为一家年轻而充满活力的企业，依托双江得天独厚的茶资源与优质茶园，从原料筛选、初制工艺到精加工的每一步都严格把控，只为带给爱茶人士一杯茶香浓郁、色泽饱满、韵味悠长的佳品。</p>
                        </Publics.SlidingBox.SlideInOutLeft>
                        <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="introduction-image">
                            <img src={IMAGE_B} alt="古寨茶业 1" />
                        </Publics.SlidingBox.SlideInOutRight>
                    </div>

                    {/* Additional Content Section */}
                    <div className="about-additional" ref={containerRef2}>
                        <Publics.SlidingBox.SlideInOutRight containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="additional-image">
                            <img src={IMAGE_C} alt="古寨茶业 2" />
                        </Publics.SlidingBox.SlideInOutRight>
                        <Publics.SlidingBox.SlideInOutLeft containerRef={containerRef} thresholdin={0.4} thresholdout={0.3} className="additional-text">
                            <p>
                                古寨茶业坚持绿色种植，采用传统与现代相结合的加工工艺，确保每一片茶叶都能保留其独特的香气和口感。我们的团队由经验丰富的茶艺师和农艺师组成，致力于为消费者提供最优质的茶叶产品。
                            </p>
                        </Publics.SlidingBox.SlideInOutLeft>
                    </div>

                    {/* Final Image Section */}
                    <Publics.SlidingBox.SlideInUp containerRef={containerRef2} thresholdin={0.4} thresholdout={0.3} className="about-final">
                        <img src={IMAGE_H} alt="古寨茶业 3" className="final-image" />
                    </Publics.SlidingBox.SlideInUp>
                </div>
            </Publics.SizingBox.BorderBox>
        </div>
    );
}

export default validateUrl(About);
