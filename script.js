// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get carousel elements with null checks
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");

  // Exit early if carousel elements don't exist
  if (!wrapper || !carousel) {
    console.warn('Carousel elements not found on this page');
    return;
  }

  const firstCard = carousel.querySelector(".card");
  if (!firstCard) {
    console.warn('No cards found in carousel');
    return;
  }

  const firstCardWidth = firstCard.offsetWidth;
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const carouselChildren = [...carousel.children];

  let isDragging = false;
  let isAutoPlay = true;
  let startX = 0;
  let startScrollLeft = 0;
  let timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at appropriate position to hide first few duplicate cards
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  // Drag start handler (works with mouse and touch)
  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  // Dragging handler (works with mouse and touch)
  const dragging = (e) => {
    if (!isDragging) return;
    // Prevent default to avoid scrolling issues on touch devices
    if (e.touches) {
      e.preventDefault();
    }
    // Updates the scroll position of the carousel based on the cursor movement
    const currentX = e.pageX || (e.touches && e.touches[0].pageX);
    carousel.scrollLeft = startScrollLeft - (currentX - startX);
  };

  // Drag stop handler
  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  // Infinite scroll handler
  const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  // Autoplay function
  const autoPlay = () => {
    // Return if window is smaller than 800 or isAutoPlay is false
    if (window.innerWidth < 800 || !isAutoPlay) return;
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => {
      carousel.scrollLeft += firstCardWidth;
    }, 2500);
  };

  // Mouse event listeners
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  // Touch event listeners for mobile support
  carousel.addEventListener("touchstart", dragStart, { passive: true });
  carousel.addEventListener("touchmove", dragging, { passive: false });
  carousel.addEventListener("touchend", dragStop);

  // Scroll and hover event listeners
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Start autoplay
  autoPlay();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    }, 250);
  });
});
