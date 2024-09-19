
function openModal() {
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prevstrap');
    const nextButton = document.querySelector('.nextstrap');
    const strapWrapper = document.querySelector('.strap-wrapper');
    const straps = document.querySelectorAll('.strap');
    let currentIndex = 0;
    let isAnimating = false;
    let scrollAnimationDone = false;

    function updateStrapDisplay() {
        if (isAnimating) return; // Prevent multiple animations at once

        isAnimating = true;

        // Apply blur effect to all straps
        straps.forEach((strap, index) => {
            strap.style.filter = index === currentIndex ? 'blur(0px)' : 'blur(10px)';
        });

        // Move strap wrapper to show current strap
        const strapWidth = straps[0].offsetWidth;
        const margin = parseInt(getComputedStyle(straps[0]).marginRight, 10);
        const offset = -currentIndex * (strapWidth + margin);

        // Animate sliding effect
        let start = null;
        const duration = 500; // Duration in milliseconds
        const initialTransform = parseFloat(getComputedStyle(strapWrapper).transform.split(',')[4]) || 0;
        const distance = offset - initialTransform;

        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            const easedProgress = easeInOutQuad(progressRatio);
            strapWrapper.style.transform = `translateX(${initialTransform + distance * easedProgress}px)`;

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                strapWrapper.style.transform = `translateX(${offset}px)`;
                isAnimating = false;
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animate);
    }

    function handleScrollAnimation() {
        if (scrollAnimationDone) return; // Run this animation only once

        // Slide between first and second items twice
        let scrollCounter = 0;
        function slideBetweenItems() {
            if (scrollCounter < 2) {
                currentIndex = 0; // Show the first item
                updateStrapDisplay();
                setTimeout(() => {
                    currentIndex = 1; // Slide to the second item
                    updateStrapDisplay();
                    setTimeout(() => {
                        currentIndex = 0; // Return to the first item
                        updateStrapDisplay();
                        scrollCounter++;
                        slideBetweenItems(); // Repeat animation
                    }, 500); // Duration of each slide
                }, 500); // Duration of each slide
            } else {
                scrollAnimationDone = true;
            }
        }

        slideBetweenItems();
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? straps.length - 1 : currentIndex - 1;
        updateStrapDisplay();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === straps.length - 1) ? 0 : currentIndex + 1;
        updateStrapDisplay();
    });

    window.addEventListener('scroll', handleScrollAnimation);

    // Initialize display
    updateStrapDisplay();
});

