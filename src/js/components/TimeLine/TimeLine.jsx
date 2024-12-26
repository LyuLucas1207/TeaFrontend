import React, { useEffect } from 'react';
import './style.css';

const TimeLine = ({timelineData}) => {

    useEffect(() => {
        // Initialize timeline
        initializeTimeline();

        // Create observer with custom trigger point
        const triggerPointVH = 60; // Customize as needed
        createObserver(triggerPointVH);
    }, []);

    /**
     * Initialize the timeline by activating the first item and setting the background image.
     */
    const initializeTimeline = () => {
        const shell = document.getElementById("timeline-shell");
        const items = shell.querySelectorAll(".timeline-item");
        const activeClass = "timeline-item--active";
        const imgSelector = ".timeline-img";

        if (items.length > 0) {
            // Activate the first item
            items[0].classList.add(activeClass);
            // Set background image to the first item's image
            const firstImgSrc = items[0].querySelector(imgSelector).getAttribute("src");
            shell.style.backgroundImage = `url(${firstImgSrc})`;
        }
    };

    /**
     * Create and set up the IntersectionObserver.
     * @param {number} triggerPointVH - The viewport height percentage for the trigger point.
     */
    const createObserver = (triggerPointVH) => {
        const shell = document.getElementById("timeline-shell");

        const items = shell.querySelectorAll(".timeline-item");
        const imgSelector = ".timeline-img";

        // Calculate trigger point in pixels
        const triggerPointPx = (window.innerHeight * triggerPointVH) / 100;

        // Calculate rootMargin to position the trigger point
        const rootMarginTop = `-${window.innerHeight - triggerPointPx}px`;
        const rootMargin = `${rootMarginTop} 0px -${triggerPointPx}px 0px`;

        const observerOptions = {
            root: null, // viewport
            rootMargin: rootMargin,
            threshold: 0 // trigger when any part is visible
        };

        // Callback for IntersectionObserver
        const observerCallback = (entries) => {
            const activeClass = "timeline-item--active";

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all items
                    items.forEach(it => it.classList.remove(activeClass));
                    // Add active class to the current item
                    entry.target.classList.add(activeClass);
                    // Update background image
                    const imgSrc = entry.target.querySelector(imgSelector).getAttribute("src");
                    shell.style.backgroundImage = `url(${imgSrc})`;
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each timeline item
        items.forEach(item => {
            observer.observe(item);
        });
    };

    return (
        <>
        <div className="timeline-shell" id="timeline-shell">
            <div className="timeline-header">
                <h2 className="timeline-title">茶史大事记</h2>
                <h3 className="timeline-subtitle">中国茶文化发展历程</h3>
            </div>
            <div className="timeline-timeline">
                {/* Timeline Items */}
                {timelineData.map((item, index) => (
                    <div className="timeline-item" data-text={item.dataText} key={index}>
                        <div className="timeline-content">
                            <img className="timeline-img" src={item.imgSrc} alt={`Year ${item.year}`} />
                            <h2 className="timeline-content-title">{item.year}</h2>
                            <p className="timeline-content-desc">
                                {item.description}
                            </p>
                            <div className="timeline-content-ref">
                                <h3>参考文献</h3>
                                <ul>
                                    {Object.entries(item.reference).map(([author, title], idx) => (
                                        <li key={idx}>
                                            <span className="timeline-content-ref-author">{author}：</span>
                                            <span className="timeline-content-ref-title">{title}</span>
                                        </li>
                                    ))}
                                </ul>
                              </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="timeline-summary">
                <div className="timeline-summary-content">
                自古至今，中国茶叶的发展历程横跨数千年。从上古的原初发现与利用，到唐宋时期的文化定型与鼎盛，再至明清时期的工艺精进与全球化扩散，
                茶不仅是中国经济与对外贸易的重要部分，更是中国人生活、艺术与思想体系中的一环。
                近代以来，虽然世界茶叶生产中心有了新分布，但中国茶文化的影响力仍延续至今，并为全球各国的饮茶习惯奠定了深远基础。
                </div>
            </div>
        </div>
        </>
    );
};

// Sample data for the timeline



export default TimeLine;
