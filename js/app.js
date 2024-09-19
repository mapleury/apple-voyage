let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}


window.addEventListener('scroll', () => {
    const words = document.querySelectorAll('.word');
    const section = document.querySelector('.quotes-section');
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the section is within the viewport
    if (sectionPosition < windowHeight && sectionPosition + section.offsetHeight > 0) {
        const scrollPercent = Math.min(1, Math.max(0, (windowHeight - sectionPosition) / (windowHeight + section.offsetHeight)));

        words.forEach((word) => {

            const white = { r: 255, g: 255, b: 255 };
            const black = { r: 0, g: 0, b: 0 };

        
            const r = Math.round(white.r + scrollPercent * (black.r - white.r));
            const g = Math.round(white.g + scrollPercent * (black.g - white.g));
            const b = Math.round(white.b + scrollPercent * (black.b - white.b));

            word.style.color = `rgb(${r}, ${g}, ${b})`;
        });
    }

    
});

