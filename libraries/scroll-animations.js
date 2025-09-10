/**
 * scroll-animations.js - Enhanced
 *
 * This script observes elements with animation classes and toggles their animation
 * when they enter or leave the viewport. It also adds additional animation effects.
 *
 * Usage: Just include this script at the end of your HTML body or after DOMContentLoaded.
 */

const ANIMATION_CLASSES = [
  'fade-in',
  'fade-in-left',
  'fade-in-right',
  'fade-in-up',
  'fade-in-down',
  'slide-in-left',
  'slide-in-right',
  'slide-in-up',
  'slide-in-down',
  'zoom-in',
  'zoom-out',
  'flip',
  'glow',
  'shake',
  'heartbeat'
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
    .fade-in-left-reset { opacity: 0 !important; transform: translateX(-30px) !important; }
    .fade-in-right-reset { opacity: 0 !important; transform: translateX(30px) !important; }
    .fade-in-up-reset { opacity: 0 !important; transform: translateY(30px) !important; }
    .fade-in-down-reset { opacity: 0 !important; transform: translateY(-30px) !important; }
    .slide-in-left-reset { opacity: 0 !important; transform: translateX(-100%) !important; }
    .slide-in-right-reset { opacity: 0 !important; transform: translateX(100%) !important; }
    .slide-in-up-reset { opacity: 0 !important; transform: translateY(100%) !important; }
    .slide-in-down-reset { opacity: 0 !important; transform: translateY(-100%) !important; }
    .zoom-in-reset { opacity: 0 !important; transform: scale(0.8) !important; }
    .zoom-out-reset { opacity: 0 !important; transform: scale(1.2) !important; }
    .flip-reset { transform: rotateY(0) !important; }
    .glow-reset { box-shadow: none !important; }
    .shake-reset { transform: translateX(0) !important; }
    .heartbeat-reset { transform: scale(1) !important; }
  `;
  document.head.appendChild(style);
}

// Add additional animations to elements
function addElementAnimations() {
  // Add animations to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${0.2 + index * 0.1}s`;
  });

  // Add animations to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.animationDelay = `${0.1 + index * 0.05}s`;
  });

  // Add animations to social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach((icon, index) => {
    icon.classList.add('fade-in');
    icon.style.animationDelay = `${0.1 + index * 0.1}s`;
  });

  // Add animations to decorative elements
  const decorativeElements = document.querySelectorAll('.decorative-element');
  decorativeElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.animationDelay = `${0.1 + index * 0.1}s`;
  });
}

function setupScrollAnimations() {
  injectResetStyles();
  addElementAnimations();

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
      threshold: 0.2, // Adjust as needed
      rootMargin: '0px 0px -50px 0px' // Trigger animation a bit before element is fully in view
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

  // Add section animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('section-animate');
    observer.observe(section);
  });

  // Add animation to sections when they come into view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
  setupScrollAnimations();
}