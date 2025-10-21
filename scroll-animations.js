// Ultra-aggressive video autoplay - eliminate ALL play buttons
function forceVideoAutoplay() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Set ALL attributes
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('preload', 'auto');
        video.setAttribute('disablePictureInPicture', '');
        
        // Remove ALL controls
        video.removeAttribute('controls');
        video.controls = false;
        video.disablePictureInPicture = true;
        
        // Mute completely
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        
        // Hide controls via style
        video.style.pointerEvents = 'none';
        
        // Force load
        video.load();
        
        // Force play immediately
        const playVideo = () => {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('✓ Video playing:', video.src);
                }).catch(error => {
                    console.log('⚠ Autoplay prevented, retrying...', error);
                    // Retry immediately
                    setTimeout(() => video.play(), 100);
                });
            }
        };
        
        playVideo();
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
                video.muted = true;
                video.play().catch(e => {
                    console.log('Video play on scroll prevented, retrying...', e);
                    setTimeout(() => video.play(), 100);
                });
            }
        }
    });
}, observerOptions);

// Run autoplay IMMEDIATELY - before DOM loads
forceVideoAutoplay();

// Run again when DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    forceVideoAutoplay();
    
    // Observe all elements with data-animate attribute
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
    
    // Force play again after 200ms
    setTimeout(forceVideoAutoplay, 200);
});

// Run on page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        forceVideoAutoplay();
    }
});

// Run on page load (final backup)
window.addEventListener('load', () => {
    forceVideoAutoplay();
    setTimeout(forceVideoAutoplay, 100);
    setTimeout(forceVideoAutoplay, 500);
    setTimeout(forceVideoAutoplay, 1000);
});

// Force play on ANY user interaction
const interactionEvents = ['click', 'touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'];
let interactionTriggered = false;

interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, () => {
        if (!interactionTriggered) {
            interactionTriggered = true;
            forceVideoAutoplay();
        }
    }, { once: true, passive: true });
});
