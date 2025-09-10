
document.addEventListener('DOMContentLoaded', function() {
    
    const panelToggle = document.getElementById('panelToggle');
    const mobilePanel = document.getElementById('mobilePanel');
    const panelClose = document.getElementById('panelClose');
    const navButtons = document.querySelectorAll('.nav-button');

    
    function togglePanel() {
        mobilePanel.classList.toggle('open');
        document.body.style.overflow = mobilePanel.classList.contains('open') ? 'hidden' : '';
    }

    
    function closePanel() {
        mobilePanel.classList.remove('open');
        document.body.style.overflow = '';
    }

    
    if (panelToggle && mobilePanel && panelClose) {
        panelToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            togglePanel();
        });

        panelClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closePanel();
        });

        
        document.addEventListener('click', function(event) {
            if (mobilePanel.classList.contains('open') &&
                !mobilePanel.contains(event.target) &&
                event.target !== panelToggle) {
                closePanel();
            }
        });

        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobilePanel.classList.contains('open')) {
                closePanel();
            }
        });
    }

    
    window.togglePanel = togglePanel;
    window.closePanel = closePanel;

    
    document.querySelectorAll('a[href^="#"], button[onclick*="window.location"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            
            let href = this.getAttribute('href');
            if (!href && this.getAttribute('onclick')) {
                const match = this.getAttribute('onclick').match(/'([^']+)'/);
                href = match ? match[1] : null;
            }

            if (href && href.startsWith('#')) {
                e.preventDefault();

                
                if (mobilePanel && mobilePanel.classList.contains('open')) {
                    closePanel();
                }

                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    
    if (mobilePanel) {
        const panelButtons = mobilePanel.querySelectorAll('button');
        panelButtons.forEach((button, index) => {
            button.classList.add('fade-in');
            button.style.animationDelay = `${0.1 + index * 0.1}s`;
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');

                
                element.classList.add(animation);

                
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    element.style.animationDelay = delay + 'ms';
                }

                
                const duration = element.getAttribute('data-aos-duration');
                if (duration) {
                    element.style.animationDuration = duration + 'ms';
                }
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, ' +
        '.slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, ' +
        '.zoom-in, .zoom-out, .flip, .glow, .shake, .heartbeat'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });

    
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
});


document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${0.1 + index * 0.05}s`;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.classList.add('fade-in');
        icon.style.animationDelay = `${0.1 + index * 0.1}s`;
    });
});
