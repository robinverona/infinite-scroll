let menu = document.querySelector('.menu');
let items = document.querySelectorAll('.menu-item');
let clones = []; // clones of the menu items
let disableScroll = false; // disable scroll when menu is open
let scrollpos = 0; // current scroll position
let clonesHeight = 0;

function getScrollPos() {
    return menu.scrollTop; // amount of window scrolled 

}

function setScrollPos(pos) {
    menu.scrollTop = pos; // set scroll position

}

function getClonesHeight() {
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; // offsetHeight returns height of element in pixels
    })

    return clonesHeight;
}

// Reecalculates dimensions when screen resized
function reCalc() {
    scrollpos = getScrollPos();
    scrollHeight = menu.scrollHeight; // Height of an element content, including content not visible on the screen due to overflow
    clonesHeight = getClonesHeight();

    if (scrollpos <= 0) {
        setScrollPos(1); // Initial set at 1px to enable upwards scrolling
    }
}

function scrollUpdate() {

    if (!disableScroll) {
        scrollpos = getScrollPos();
        if (clonesHeight + scrollpos >= scrollHeight) {
            // Scroll back to top when bottom reached
            setScrollPos(1);
            disableScroll = true;
        } else if (scrollpos <= 0) {
            // scroll to bottom when top reached
            setScrollPos(scrollHeight - clonesHeight);
            disableScroll = true;
        }
    }
    if (disableScroll) {
        // Disable scroll-jumping for a short time to avoid flickering
        window.setTimeout(() => {
            disableScroll = false;
        }, 40)
    }
}

function onLoad() {
    items.forEach(item => {
        const clone = item.cloneNode(true); // cloneNode() method creates a copy of the node
        menu.appendChild(clone);
        clone.classList.add('js-clone');
    });

    clones = document.querySelectorAll('.js-clone');

    reCalc();

    menu.addEventListener('scroll', () => {
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    }, false);
}

window.onload = onLoad();