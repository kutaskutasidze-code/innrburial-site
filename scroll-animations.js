// Force video autoplay on all devices
function forceVideoAutoplay() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Set attributes programmatically
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Remove controls
        video.removeAttribute('controls');
        video.controls = false;
        
        // Mute and play
        video.muted = true;
        video.defaultMuted = true;
        
        // Force play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video playing:', video.src);
            }).catch(error => {
                console.log('Autoplay prevented, trying again on user interaction:', error);
                
                // Retry on any user interaction
                const playOnInteraction = () => {
                    video.play().then(() => {
                        console.log('Video playing after interaction');
                    }).catch(e => console.log('Still failed:', e));
                    
                    // Remove listeners after successful play
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('scroll', playOnInteraction);
                };
                
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('scroll', playOnInteraction, { once: true });
            });
        }
    });
}

// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Force play videos when they come into view
            const video = entry.target.querySelector('video');
            if (video) {
                video.play().catch(e => console.log('Video play on scroll failed:', e));
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Force autoplay immediately
    forceVideoAutoplay();
    
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add data-animate to sections if not already present
    const sections = document.querySelectorAll('section:not([data-animate])');\n    sections.forEach(section => {
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

// Also try to play videos when page becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        forceVideoAutoplay();
    }
});

// Force play on page load (backup)
window.addEventListener('load', () => {
    setTimeout(forceVideoAutoplay, 100);
});
