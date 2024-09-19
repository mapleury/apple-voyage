const rotateBtn = document.getElementById('rotateBtn');
const outerCircle = document.querySelector('.outer-circle');
const innerCircle = document.querySelector('.inner-circle');
const backgroundCircle = document.querySelector('.background-circle');
const mainTitle = document.getElementById('mainTitle');
const description = document.getElementById('description');

let isRotated = false;

rotateBtn.addEventListener('click', () => {
    // Rotate and fade out the current images and text
    outerCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(90deg)';
    innerCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(-90deg)';
    backgroundCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(90deg)';

    // Fade out the images and text
    outerCircle.style.opacity = '0';
    innerCircle.style.opacity = '0';
    backgroundCircle.style.opacity = '0';
    mainTitle.style.opacity = '0';
    description.style.opacity = '0';

    // After the opacity transition starts, swap the images and text, then rotate back
    setTimeout(() => {
        // Change the background images to the new ones
        backgroundCircle.style.backgroundImage = isRotated
            ? 'url("assets/bg1.jpg")'
            : 'url("assets/bg2.jpeg")';

        outerCircle.style.backgroundImage = isRotated
            ? 'url("assets/bg1.jpg")'
            : 'url("assets/bg2.jpeg")';

        innerCircle.style.backgroundImage = isRotated
            ? 'url("assets/bg1.jpg")'
            : 'url("assets/bg2.jpeg")';

        // Change the text content
        mainTitle.textContent = isRotated ? 'Title 1' : 'Title 2';
        description.textContent = isRotated ? 'Description 1' : 'Description 2';

        // Allow the opacity transition to complete
        setTimeout(() => {
            // Rotate back with the new images and text
            outerCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(90deg)' : 'translate(-50%, -50%) rotate(0deg)';
            innerCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(-90deg)' : 'translate(-50%, -50%) rotate(0deg)';
            backgroundCircle.style.transform = isRotated ? 'translate(-50%, -50%) rotate(90deg)' : 'translate(-50%, -50%) rotate(0deg)';

            // Fade in the new images and text
            outerCircle.style.opacity = '1';
            innerCircle.style.opacity = '1';
            backgroundCircle.style.opacity = '1';
            mainTitle.style.opacity = '1';
            description.style.opacity = '1';
        }, 100); // Short delay to ensure opacity transition is visible

    }, 500); // Delay matches half of the rotation time for smoothness

    isRotated = !isRotated;
});


