/**
 * Enhanced Animations for Portfolio
 *
 * This script adds additional animations and effects to the portfolio
 * to make it more engaging and interactive.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: 'ease-out-sine',
        disable: function() {
            
            const maxWidth = 768;
            return window.innerWidth < maxWidth;
        }
    });

    
    const textSwitchContainer = document.querySelector('.text-switch-container');
    if (textSwitchContainer) {
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes textSwitch {
                0%, 50% {
                    opacity: 1;
                    transform: translateY(0);
                }
                45%, 55% {
                    opacity: 0;
                    transform: translateY(10px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .text-switch-container {
                position: relative;
                display: inline-block;
                height: 1.2em;
                overflow: hidden;
            }
            .text-switch {
                position: absolute;
                width: 100%;
                animation: textSwitch 6s ease-in-out infinite;
            }
            .text-switch:nth-child(2) {
                animation-delay: 3s;
            }
        `;
        document.head.appendChild(style);

        
        textSwitchContainer.style.position = 'relative';
        textSwitchContainer.style.display = 'inline-block';
        textSwitchContainer.style.height = '1.2em';
        textSwitchContainer.style.overflow = 'hidden';

        
        const textSwitches = textSwitchContainer.querySelectorAll('span');
        textSwitches.forEach((span, index) => {
            span.style.position = 'absolute';
            span.style.width = '100%';
            span.style.animation = 'textSwitch 6s ease-in-out infinite';
            if (index === 1) {
                span.style.animationDelay = '3s';
            }
        });
    }

    
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes profileLight {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.5;
                }
            }
            .profile-light {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120%;
                height: 120%;
                background: radial-gradient(circle, rgba(64, 201, 253, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                z-index: 0;
                animation: profileLight 4s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);

        
        const profileLight = document.createElement('div');
        profileLight.className = 'profile-light';
        profileContainer.querySelector('.relative').prepend(profileLight);
    }


    techIcons.forEach((icon, index) => {
        // Remove any existing inline styles and event listeners
        icon.style.transition = '';
        icon.style.animation = '';

        // Remove any existing event listeners
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);

        // Keep Tailwind classes for hover effect
        newIcon.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:animate-flickerTech');

        // Keep animation for fade-in effect when scrolling into view with delay
        newIcon.classList.add('animate-fadeIn', 'duration-800', 'ease-out');
        newIcon.style.animationDelay = `${index * 0.1}s`;
    });

    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Remove any existing inline styles and event listeners
        card.style.transition = '';
        card.style.transform = '';
        card.style.boxShadow = '';

        // Remove any existing event listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);

        // Add Tailwind classes for hover effect
        newCard.classList.add(
            'transition-all',
            'duration-300',
            'ease-in-out',
            'hover:scale-105',
            'hover:shadow-xl',
            'hover:bg-white/10'
        );

        // Add AOS animation for fade-up effect with delay (only animates once)
        newCard.setAttribute('data-aos', 'fade-up');
        newCard.setAttribute('data-aos-delay', `${index * 100}`);
        newCard.setAttribute('data-aos-once', 'true');

        // Add hover effect for tech icons
        newCard.addEventListener('mouseenter', function() {
            const cardTechIcons = this.querySelectorAll('.tech-icon');
            cardTechIcons.forEach(icon => {
                icon.classList.add('animate-flickerTech');
            });
        });

        newCard.addEventListener('mouseleave', function() {
            const cardTechIcons = this.querySelectorAll('.tech-icon');
            cardTechIcons.forEach(icon => {
                icon.classList.remove('animate-flickerTech');
            });
        });
    });

    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(64, 201, 253, 0.7)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 0 6px rgba(64, 201, 253, 0.7))';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    });

    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.color = '#40c9fd';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });

    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Remove any existing inline styles
        heroSection.style.animation = '';

        // Add Tailwind classes for animation
        heroSection.classList.add('animate-fadeIn', 'duration-1200', 'ease-out');
    }

    
    const sectionHeaders = document.querySelectorAll('h2');
    sectionHeaders.forEach(header => {
        // Remove any existing inline styles
        header.style.animation = '';

        // Add Tailwind classes for animation
        header.classList.add('animate-fadeIn', 'duration-800', 'ease-out');
    });

    
    const contactEmail = document.querySelector('footer h3');
    if (contactEmail) {
        // Remove any existing inline styles
        contactEmail.style.animation = '';

        // Add Tailwind classes for animation
        contactEmail.classList.add('animate-heartbeat');
    }

    
    const profileImage = document.querySelector('.hero-section img[alt="Victor Akande"]');
    if (profileImage) {
        // Remove any existing inline styles
        profileImage.parentElement.style.animation = '';

        // Add Tailwind classes for animation
        profileImage.parentElement.classList.add('animate-glow');
    }

    
    const codeImage = document.querySelector('img[alt="Code Editor"]');
    if (codeImage) {
        // Remove any existing inline styles
        codeImage.parentElement.style.animation = '';

        // Add Tailwind classes for animation
        codeImage.parentElement.classList.add('animate-pulse');
    }

    
    const techStacks = document.querySelectorAll('.tech-stack');
    techStacks.forEach(stack => {
        const icons = stack.querySelectorAll('img');
        icons.forEach((icon, index) => {
            // Remove any existing inline styles
            icon.style.animationDelay = '';

            // Add Tailwind classes for animation
            icon.classList.add('animate-fadeIn');
            icon.style.animationDelay = `${index * 0.1}s`;
        });
    });

    
    setTimeout(() => {
        AOS.refresh();
    }, 500);

    
    //const textSwitchContainer = document.querySelector('.text-switch-container');
    if (textSwitchContainer) {
        const textSwitches = textSwitchContainer.querySelectorAll('.text-switch');
        textSwitches.forEach((span, index) => {
            span.style.animation = 'textSwitch 6s ease-in-out infinite';
            if (index === 1) {
                span.style.animationDelay = '3s';
            }
        });
    }

    
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        // Remove any existing inline styles and event listeners
        icon.style.transition = '';
        icon.style.animation = '';

        // Remove any existing event listeners
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);

        // Keep Tailwind classes for hover effect
        newIcon.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:animate-flickerTech');

        // Keep animation for fade-in effect when scrolling into view
        newIcon.classList.add('animate-fadeIn');
    });
});
