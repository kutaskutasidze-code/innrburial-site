// SOLUTION: Safari iOS shows play button when autoplay attribute is present
// We remove autoplay from HTML and trigger play via JavaScript instead
// This bypasses Safari's native play button overlay

function initVideo(video) {
    // Set all necessary attributes
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x-webkit-airplay', 'deny');
    
    // Force load
    video.load();
    
    // Play immediately
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Video started playing
            video.classList.add('playing');
            // Hide loading overlay
            const loadingOverlay = video.parentElement.querySelector('.video-loading');
            if (loadingOverlay) {
                loadingOverlay.classList.add('hide');
            }
        }).catch(error => {
            // Autoplay was prevented
            console.log('Autoplay prevented, will retry on interaction');
        });
    }
}

function initAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        initVideo(video);
    });
}

// Initialize videos as early as possible
initAllVideos();

// Retry on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initAllVideos();
    
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
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            video.classList.add('playing');
                            const loadingOverlay = video.parentElement.querySelector('.video-loading');
                            if (loadingOverlay) {
                                loadingOverlay.classList.add('hide');
                            }
                        }).catch(e => console.log('Play on scroll prevented:', e));
                    }
                }
            }
        });
    }, observerOptions);

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
});

// Retry on page load
window.addEventListener('load', () => {
    initAllVideos();
});

// Retry on visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        initAllVideos();
    }
});

// Retry on ANY user interaction (for Safari Low Power Mode)
const interactionEvents = ['click', 'touchstart', 'touchend', 'scroll'];
let hasInteracted = false;

interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, () => {
        if (!hasInteracted) {
            hasInteracted = true;
            initAllVideos();
        }
    }, { once: true, passive: true });
});
