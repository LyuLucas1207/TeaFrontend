// BoxComponents.js
import React from 'react';
import './style.css';


const BorderBox = ({ width, height, children, className, style  }) => {
    return (
        <div className={`SizingBox border-SizingBox ${className}`} style={{ width, height, ...style }}>
            {children}
        </div>
    );
};

const ContentBox = ({ width, height, children, className, style  }) => {
    return (
        <div className={`SizingBox content-SizingBox ${className}`} style={{ width, height, ...style }}>
            {children}
        </div>
    );
};

const PaddingBox = ({ width, height, children, className, style  }) => {
    return (
        <div className={`SizingBox padding-SizingBox ${className}`} style={{ width, height, ...style }}>
            {children}
        </div>
    );
};

const MarginBox = ({ width, height, children, className, style  }) => {
    return (
        <div className={`SizingBox margin-SizingBox ${className}`} style={{ width, height, ...style }}>
            {children}
        </div>
    );
}

const SizingBox = {
    BorderBox,
    ContentBox,
    PaddingBox,
    MarginBox
};

export default SizingBox;