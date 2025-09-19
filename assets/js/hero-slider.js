document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slider__slide');
    const pagination = document.querySelector('.hero-slider__pagination');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    if (slides.length < 2) {
        if(pagination) pagination.style.display = 'none';
        return;
    }

    function createPagination() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-slider__pagination-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (currentSlide !== index) {
                    goToSlide(index);
                }
            });
            pagination.appendChild(dot);
        });
    }

    function updatePagination() {
        const dots = document.querySelectorAll('.hero-slider__pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        if (isAnimating) return;
        isAnimating = true;

        const exitingSlide = slides[currentSlide];
        currentSlide = (slideIndex + slides.length) % slides.length;
        const incomingSlide = slides[currentSlide];

        exitingSlide.classList.remove('active');
        incomingSlide.classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 2500); // Match CSS opacity transition

        updatePagination();
        resetInterval();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startInterval() {
        slideInterval = setInterval(nextSlide, 8000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    function init() {
        createPagination();
        // Add active class to the first slide after a short delay to trigger the animation
        setTimeout(() => {
            if (slides.length > 0) {
                slides[0].classList.add('active');
            }
        }, 100);
        startInterval();
    }

    init();
});