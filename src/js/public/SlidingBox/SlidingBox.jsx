import React, { useEffect, useState } from 'react';
import './style.css';

function useVisibilityIn(ref, threshold = 0.3) { 
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, threshold, setIsVisible, isVisible]);

    return isVisible;
}

function useVisibilityOut(ref, threshold = 0.3) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setIsVisible(false);
                    observer.disconnect();
                }
            },
            {
                threshold: threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, threshold, setIsVisible, isVisible]);

    return isVisible;
}

function useVisibilityInOut(ref, thresholdin = 0.4, thresholdout = 0.3) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= thresholdin) {
                    setIsVisible(true);
                } else if (entry.intersectionRatio <= thresholdout) {
                    setIsVisible(false);
                }
            },
            {
                threshold: [thresholdout, thresholdin],
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, thresholdin, thresholdout, setIsVisible, isVisible]);

    return isVisible;
}


// 简单的仅入场动画组件
const SlideInLeft = ({ containerRef, thresholdin, className = '', children,  style }) => {
    const isVisible = useVisibilityIn(containerRef, thresholdin);
    return (
        <div className={` ${className} SlidingBox-Left ${isVisible ? 'SlidingBox-SlideInLeft' : ''}`} style={style}>
            {children}
        </div>
    );
};

const SlideInRight = ({ containerRef, thresholdin, children, className = '', style }) => {
    const isVisible = useVisibilityIn(containerRef, thresholdin);
    return (
        <div className={`${className} SlidingBox-Right ${isVisible ? 'SlidingBox-SlideInRight' : ''} `} style={style}>
            {children}
        </div>
    );
};

const SlideInUp = ({ containerRef, thresholdin, children, className = '', style }) => {
    const isVisible = useVisibilityIn(containerRef, thresholdin);
    return (
        <div className={`${className} SlidingBox-Up ${isVisible ? 'SlidingBox-SlideInUp' : ''}`} style={style}>
            {children}
        </div>
    );
};

const SlideInDown = ({ containerRef, thresholdin, children, className = '', style }) => {
    const isVisible = useVisibilityIn(containerRef, thresholdin);
    return (
        <div SizingBoxclassName={`${className} SlidingBox-Down ${isVisible ? 'SlidingBox-SlideInDown' : ''}`} style={style}>
            {children}
        </div>
    );
};

const SlideOutLeft = ({ containerRef, thresholdout, children, className = '', style }) => {
    const isVisible = useVisibilityOut(containerRef, thresholdout);
    return (
        <div SizingBoxclassName={` ${className} SlidingBox-Left ${isVisible ? '' : 'SlidingBox-SlideOutLeft'}`} style={style}>
            {children}
        </div>
    );
};

const SlideOutRight = ({ containerRef, thresholdout, children, className = '', style }) => {
    const isVisible = useVisibilityOut(containerRef, thresholdout);
    return (
        <div SizingBoxclassName={` ${className} SlidingBox-Right ${isVisible ? '' : 'SlidingBox-SlideOutRight'}`} style={style}>
            {children}
        </div>
    );
};

const SlideOutUp = ({ containerRef, thresholdout, children, className = '', style }) => {
    const isVisible = useVisibilityOut(containerRef, thresholdout);
    return (
        <div SizingBoxclassName={`${className} SlidingBox-Up ${isVisible ? '' : 'SlidingBox-SlideOutUp'} `} style={style}>
            {children}
        </div>
    );
};

const SlideOutDown = ({ containerRef, thresholdout, children, className = '', style }) => {
    const isVisible = useVisibilityOut(containerRef, thresholdout);
    return (
        <div SizingBoxclassName={`${className} SlidingBox-Down ${isVisible ? '' : 'SlidingBox-SlideOutDown'} `} style={style}>
            {children}
        </div>
    );
};



// 进入退出动画组件（元素进入视窗时 slideIn，离开时 slideOut）
const SlideInOutLeft = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {
    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Left ${isVisible ? 'SlidingBox-SlideInLeft' : 'SlidingBox-SlideOutLeft'} `}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInLeftOutRight = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {
    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    // 可根据 isVisible 切换进入/退出动画，这里假设退出是从右侧消失
    return (
        <div
            className={`${className} SlidingBox-Left ${isVisible ? 'SlidingBox-SlideInLeft' : 'SlidingBox-SlideOutRight'} `}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInOutRight = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {
    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Right ${isVisible ? 'SlidingBox-SlideInRight' : 'SlidingBox-SlideOutRight'} `}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInRightOutLeft = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {

    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Right ${isVisible ? 'SlidingBox-SlideInRight' : 'SlidingBox-SlideOutLeft'} `}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInOutUp = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {

    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Up ${isVisible ? 'SlidingBox-SlideInUp' : 'SlidingBox-SlideOutUp'}`}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInUpOutDown = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {

    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={` ${className} SlidingBox-Up ${isVisible ? 'SlidingBox-SlideInUp' : 'SlidingBox-SlideOutDown'} `}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInOutDown = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {

    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Down ${isVisible ? 'SlidingBox-SlideInDown' : 'SlidingBox-SlideOutDown'}`}
            style={style}
        >
            {children}
        </div>
    );
};

const SlideInDownOutUp = ({ containerRef, thresholdin = 0.4, thresholdout = 0.3, children, className = '', style }) => {

    const isVisible = useVisibilityInOut(containerRef, thresholdin, thresholdout);
    return (
        <div
            className={`${className} SlidingBox-Down ${isVisible ? 'SlidingBox-SlideInDown' : 'SlidingBox-SlideOutUp'} `}
            style={style}
        >
            {children}
        </div>
    );
};


// 导出您需要的组件，这里仅列出基础的四个进入动画组件
const SlidingBox = {
    SlideInLeft,
    SlideInRight,
    SlideInUp,
    SlideInDown,

    SlideOutLeft,
    SlideOutRight,
    SlideOutUp,
    SlideOutDown,

    // 若需要其他组件，请自行添加
    SlideInOutLeft,
    SlideInLeftOutRight,
    SlideInOutRight,
    SlideInRightOutLeft,
    SlideInOutUp,
    SlideInUpOutDown,
    SlideInOutDown,
    SlideInDownOutUp
};

export default SlidingBox;
