import { createElementWithClass, getRandomPosition } from '../../utils/helpers/others.js';
import { debounce, singleton } from '../../utils/helpers/standards.js';


class Star {
    selector = '.section-banner';
    num = 125;
    range = 100;
    constructor(selector, num, range) {
        this.selector = selector;
        this.num = num;
        this.range = range;
    }
    get Selector() {
        return this.selector;
    }
    get Num() {
        return this.num;
    }
    get Range() {
        return this.range;
    }

    createStar() {
        document.querySelectorAll(this.Selector).forEach((sectionBanner) =>{
            if (!sectionBanner) return;
            let unit = window.innerWidth > 1300 ? 'vw' : 'vh';
            let position = getRandomPosition(this.Num, unit, this.Range);

            for (let i = 0; i < this.Num; i++) {
                // 创建容器并获取容器的宽高
                let starDivContainer = createElementWithClass('div', 'starDiv');
                // let containerWidth = sectionBanner.clientWidth;
                // let containerHeight = sectionBanner.clientHeight;

                // // 生成位置并检查是否在范围内
                // let left = parseFloat(position[i].left);
                // let top = parseFloat(position[i].top);

                // if (left < 0 || left > containerWidth || top < 0 || top > containerHeight) {
                //     continue; // 如果位置超出容器范围则跳过
                // }

                let starDiv = document.createElement('div');
                starDiv.id = `star-${i}`;
                starDiv.style.position = 'absolute';
                starDiv.style.transform = `translate(-50%, -50%)`;
                starDiv.style.left = `calc(50% + ${position[i].left})`;
                starDiv.style.top = `calc(50% + ${position[i].top})`;
                starDiv.style.animation = `twinkling ${Math.floor(Math.random() * 5 + 1)}s infinite`;
    
                let star_up = createElementWithClass('div', 'curved-corner-star');
                let star_down = createElementWithClass('div', 'curved-corner-star');
                let star_up_right = createElementWithClass('div', 'curved-corner-topright');
                let star_up_left = createElementWithClass('div', 'curved-corner-topleft');
                let star_down_right = createElementWithClass('div', 'curved-corner-bottomright');
                let star_down_left = createElementWithClass('div', 'curved-corner-bottomleft');
    
                star_up.appendChild(star_up_right);
                star_up.appendChild(star_up_left);
                star_down.appendChild(star_down_right);
                star_down.appendChild(star_down_left);
                starDiv.appendChild(star_down);
                starDiv.appendChild(star_up);
                starDivContainer.appendChild(starDiv);
                sectionBanner.appendChild(starDivContainer);
            }
        });
    }

    generateStar() {
        document.querySelectorAll(this.Selector).forEach((sectionBanner) => {
            while (sectionBanner.firstChild) {
                sectionBanner.removeChild(sectionBanner.firstChild);
            }
        });        
        this.createStar();
        window.addEventListener('resize', debounce(() => {
            document.querySelectorAll(this.Selector).forEach((sectionBanner) => {
                while (sectionBanner.firstChild) {
                    sectionBanner.removeChild(sectionBanner.firstChild);
                }
            });
            this.createStar();
        }));        
    }
}

export default singleton(Star);