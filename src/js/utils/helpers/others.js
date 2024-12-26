function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function getRandomPosition(num, unit, range) {
    let position = [];
    for (let i = 0; i < num; i++) {
        let left = Math.floor(Math.random() * range - range / 2);
        let top = Math.floor(Math.random() * range - range / 2);
        let right = Math.floor(Math.random() * range - range / 2);
        let bottom = Math.floor(Math.random() * range - range / 2);
        position.push({
            left: `${left}${unit}`,
            top: `${top}${unit}`,
            right: `${right}${unit}`,
            bottom: `${bottom}${unit}`
        });
    }
    return position;
}

export { 
    createElementWithClass,
    getRandomPosition
}