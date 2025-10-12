// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add data-animate to sections if not already present
    const sections = document.querySelectorAll('section:not([data-animate])');
    sections.forEach(section => {
        section.setAttribute('data-animate', '');
        observer.observe(section);
    });
    
    // Smooth parallax effect on hero video
    const heroVideo = document.querySelector('.hero-video, .hero-section video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroVideo.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
});
