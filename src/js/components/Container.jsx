import React from "react";

function Container({ children, title = "Loading...", outerClass = "outerContainer", innerClass = "innerContainer", titleClass = "title" }) {
    return (
        <div className={outerClass}>
            <div className={innerClass}>
                <p className={titleClass}>{title}</p>
                {children}
            </div>
        </div>
    );
}

export default Container;
