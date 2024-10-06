import React from "react";
import Container from "./Container";
import Switch from "./Switch";

// 引入样式文件
import "../../css/components/TentLoader.css";

// 引入自定义 Hook
import { useTheme } from "../utility/myUse";

function TentLoader() {
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook
    return (
        <Container
            title="数据加载中..."
            outerClass="tent-loader_container"
            innerClass="tent-loader_inner-container"
            titleClass="tent-loader_title"
        >
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="tent-loader_scene">
                <div className="tent-loader_forest">
                    <div className="tent-loader_tree tent-loader_tree1">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree2">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree3">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree4">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree5">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree6">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>

                    <div className="tent-loader_tree tent-loader_tree7">
                        <div className="tent-loader_branch tent-loader_branch-top"></div>
                        <div className="tent-loader_branch tent-loader_branch-middle"></div>
                        <div className="tent-loader_branch tent-loader_branch-bottom"></div>
                    </div>
                </div>

                <div className="tent-loader_tent">
                    <div className="tent-loader_roof"></div>
                    <div className="tent-loader_roof-border-left">
                        <div className="tent-loader_roof-border tent-loader_roof-border1"></div>
                        <div className="tent-loader_roof-border tent-loader_roof-border2"></div>
                        <div className="tent-loader_roof-border tent-loader_roof-border3"></div>
                    </div>
                </div>

                <div className="tent-loader_floor">
                    <div className="tent-loader_ground tent-loader_ground1"></div>
                    <div className="tent-loader_ground tent-loader_ground2"></div>
                </div>

                <div className="tent-loader_fireplace">
                    <div className="tent-loader_support"></div>
                    <div className="tent-loader_support"></div>
                    <div className="tent-loader_bar"></div>
                    <div className="tent-loader_hanger"></div>
                    <div className="tent-loader_smoke"></div>
                    <div className="tent-loader_pan"></div>
                    <div className="tent-loader_fire">
                        <div className="tent-loader_line tent-loader_line1">
                            <div className="tent-loader_particle tent-loader_particle1"></div>
                            <div className="tent-loader_particle tent-loader_particle2"></div>
                            <div className="tent-loader_particle tent-loader_particle3"></div>
                            <div className="tent-loader_particle tent-loader_particle4"></div>
                        </div>
                        <div className="tent-loader_line tent-loader_line2">
                            <div className="tent-loader_particle tent-loader_particle1"></div>
                            <div className="tent-loader_particle tent-loader_particle2"></div>
                            <div className="tent-loader_particle tent-loader_particle3"></div>
                            <div className="tent-loader_particle tent-loader_particle4"></div>
                        </div>
                        <div className="tent-loader_line tent-loader_line3">
                            <div className="tent-loader_particle tent-loader_particle1"></div>
                            <div className="tent-loader_particle tent-loader_particle2"></div>
                            <div className="tent-loader_particle tent-loader_particle3"></div>
                            <div className="tent-loader_particle tent-loader_particle4"></div>
                        </div>
                    </div>
                </div>

                <div className="tent-loader_time-wrapper">
                    <div className="tent-loader_time">
                        <div className="tent-loader_day"></div>
                        <div className="tent-loader_night">
                            <div className="tent-loader_moon"></div>
                            <div className="tent-loader_star tent-loader_star1 tent-loader_star-big"></div>
                            <div className="tent-loader_star tent-loader_star2 tent-loader_star-big"></div>
                            <div className="tent-loader_star tent-loader_star3 tent-loader_star-big"></div>
                            <div className="tent-loader_star tent-loader_star4"></div>
                            <div className="tent-loader_star tent-loader_star5"></div>
                            <div className="tent-loader_star tent-loader_star6"></div>
                            <div className="tent-loader_star tent-loader_star7"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default TentLoader;
