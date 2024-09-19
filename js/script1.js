const watchSlider = document.querySelector('.watch-slider');
const watchSlides = document.querySelectorAll('.watch-slide');
const nextWatchButton = document.querySelector('.watch-next');
const prevWatchButton = document.querySelector('.watch-prev');
let currentWatchIndex = 0;

function updateWatchSlider() {
    watchSlides.forEach((slide, index) => {
        slide.classList.remove('watch-active', 'watch-left', 'watch-right');
        
        if (index === currentWatchIndex) {
            slide.classList.add('watch-active');
        } else if (index === (currentWatchIndex - 1 + watchSlides.length) % watchSlides.length) {
            slide.classList.add('watch-left');
        } else if (index === (currentWatchIndex + 1) % watchSlides.length) {
            slide.classList.add('watch-right');
        }
    });
}

function showNextWatchSlide() {
    currentWatchIndex = (currentWatchIndex + 1) % watchSlides.length;
    updateWatchSlider();
}

function showPrevWatchSlide() {
    currentWatchIndex = (currentWatchIndex - 1 + watchSlides.length) % watchSlides.length;
    updateWatchSlider();
}

nextWatchButton.addEventListener('click', showNextWatchSlide);
prevWatchButton.addEventListener('click', showPrevWatchSlide);

// Initialize the slider
updateWatchSlider();

// Update hover effect based on mouse position
watchSlider.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = watchSlider.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const offsetX = ((x - centerX) / centerX) * 10; // Adjust the multiplier for tilt strength
    const offsetY = ((y - centerY) / centerY) * -10; // Adjust the multiplier for tilt strength
    watchSlider.style.setProperty('--hover-x', `${offsetX}deg`);
    watchSlider.style.setProperty('--hover-y', `${offsetY}deg`);
});

watchSlider.addEventListener('mouseleave', () => {
    watchSlider.style.setProperty('--hover-x', '0deg');
    watchSlider.style.setProperty('--hover-y', '0deg');
});
