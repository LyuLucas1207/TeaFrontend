import React from 'react';
import './style.css';

const PureContentBox = ({ children, className, reference, style  }) => {
    return (
        <div className={`FramingBox-PureContentBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const PureFlexBox = ({ children, className, reference, style }) => {
    return (
        <div className={`FramingBox-PureFlexBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const PureFixedBox = ({ children, className, reference, style }) => {
    return (
        <div className={`FramingBox-PureFixedBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const PureAbsoluteBox = ({ children, className, reference, style }) => {
    return (
        <div className={`FramingBox-PureAbsoluteBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const FlexColumnMiddleBox = ({ children, className, reference, style }) => {
    return (
        <div className={`FramingBox-FlexColumnMiddleBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const FlexRowMiddleBox = ({ children, className, reference, style }) => {
    return (
        <div className={`FramingBox-FlexRowMiddleBox ${className}`} style={style} ref={reference}>
            {children}
        </div>
    );
}

const FramingBox = {
    PureContentBox,
    PureFlexBox,
    PureFixedBox,
    PureAbsoluteBox,
    FlexColumnMiddleBox,
    FlexRowMiddleBox
};

export default FramingBox;