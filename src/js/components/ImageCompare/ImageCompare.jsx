import React from "react";
import "./style.css";

const ImageCompare = ({ beforeImage, afterImage }) => {
    const handleRangeChange = (event) => {
        const root = document.documentElement;
        root.style.setProperty('--pos', `${event.target.value}%`);
    };

    return (
        <div className="compare">
            <div className="before">
                <img src={beforeImage} alt="Before" />
            </div>
            <div className="after">
                <img src={afterImage} alt="After" />
            </div>
            <input
                type="range"
                id="range"
                onInput={handleRangeChange}
                defaultValue={50}
                min={0}
                max={100}
            />
        </div>
    );
};

export default ImageCompare;
