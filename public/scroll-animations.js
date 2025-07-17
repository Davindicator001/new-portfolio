/**
 * scroll-animations.js
 * 
 * This script observes elements with animation classes (e.g., .fade-in, .slide-in-left, .slide-in-right)
 * and toggles their animation when they enter or leave the viewport.
 * 
 * Usage: Just include this script at the end of your HTML body or after DOMContentLoaded.
 */

const ANIMATION_CLASSES = [
  'fade-in',
  'slide-in-left',
  'slide-in-right',
];

// Helper: Remove animation classes and reset styles
function resetAnimation(el, animationClass) {
  el.classList.remove(animationClass);
  void el.offsetWidth;
  el.classList.add(animationClass + '-reset');
}

// Helper: Add animation class and remove reset
function playAnimation(el, animationClass) {
  el.classList.remove(animationClass + '-reset');
  el.classList.add(animationClass);
}

// Add reset CSS for each animation (to reverse)
function injectResetStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in-reset { opacity: 0 !important; transform: translateY(16px) !important; }
    .slide-in-left-reset { opacity: 0 !important; transform: translateX(-30px) !important; }
    .slide-in-right-reset { opacity: 0 !important; transform: translateX(30px) !important; }
  `;
  document.head.appendChild(style);
}

function setupScrollAnimations() {
  injectResetStyles();

  const elements = [];
  ANIMATION_CLASSES.forEach(cls => {
    document.querySelectorAll('.' + cls).forEach(el => {
      elements.push({ el, cls });
    });
  });

  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const { target, isIntersecting } = entry;
        const animationClass = ANIMATION_CLASSES.find(cls => 
          target.classList.contains(cls) || target.classList.contains(cls + '-reset')
        );
        if (!animationClass) return;

        if (isIntersecting) {
          playAnimation(target, animationClass);
        } else {
          resetAnimation(target, animationClass);
        }
      });
    },
    {
      threshold: 0.3 // Adjust as needed
    }
  );

  // Observe and set initial state based on intersection
  elements.forEach(({ el, cls }) => {
    observer.observe(el);
    // Use getBoundingClientRect to check if in view
    const rect = el.getBoundingClientRect();
    const inView = (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth)
    );
    if (!inView) {
      el.classList.add(cls + '-reset');
    } else {
      el.classList.remove(cls + '-reset');
      el.classList.add(cls);
    }
  });
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
  setupScrollAnimations();
}