const TABLET_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 320;

const productsCarousel = {
    selector: '.products-carousel',
    options: {
        dots: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 3
    }
}

const laptopCarousels = [productsCarousel];
const tabletCarousels = [];
const mobileCarousels = [];

function debounce(callback, timeoutDelay = 500) {
    let timeoutId;

    return (...rest) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
}

function startCarousels(carousels) {
    for (let carousel of carousels) {
        document.querySelector(carousel.selector).classList.remove('owl-stoped');
        // Escape multiple load
        if (!document.querySelector(carousel.selector).classList.contains('owl-loaded')) {
            $(carousel.selector).owlCarousel(carousel.options);
        }
    }
}

function stopCarousels(carousels) {
    for (let carousel of carousels) {
        document.querySelector(carousel.selector).classList.add('owl-stoped');
        // Escape multiple destroy
        if (document.querySelector(carousel.selector).classList.contains('owl-loaded')) {
            $(carousel.selector).trigger('destroy.owl.carousel');
        }
    }
}

function validateCarousels() {
    const windowWidth = window.innerWidth;

    // Laptop carousels
    if (windowWidth > TABLET_BREAKPOINT) {
        stopCarousels(tabletCarousels);
        stopCarousels(mobileCarousels);
        startCarousels(laptopCarousels);
    }

    // Tablet carousels
    else if (windowWidth <= TABLET_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT) {
        stopCarousels(laptopCarousels);
        stopCarousels(mobileCarousels);
        startCarousels(tabletCarousels);
    }

    // Mobile carousels
    else if (windowWidth <= MOBILE_BREAKPOINT) {
        stopCarousels(laptopCarousels);
        stopCarousels(tabletCarousels);
        startCarousels(mobileCarousels);
    }
}

window.addEventListener('load', () => {
    validateCarousels();
});

window.addEventListener('resize', () => {
    debounce(validateCarousels())
});