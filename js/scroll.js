window.addEventListener('scroll', () => {
    const letters = document.querySelectorAll('.letter');
    const detailText = document.querySelector('.detailus');
    const smallText = document.querySelector('.text-small');
    const section = document.querySelector('.section');
    const rectangles = document.querySelectorAll('.rectangle');

    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;


    if (sectionPosition < windowHeight - 100) { 
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('visible');
            }, index * 400);
        });

        smallText.classList.add('visible');

        setTimeout(() => {
            detailText.classList.add('visible');
        }, letters.length * 400);

     
        if (sectionPosition < windowHeight - 500){
            setTimeout(() => {
                rectangles.forEach((rectangle, index) => {
                    setTimeout(() => {
                        rectangle.classList.add('visible');
                    }, index * 300); 
                });
            }, letters.length * 400 + 400);
        }
    }
});
