// Optimized scroll-animations.js for innrburial-site
// Performance improvements: debouncing, passive listeners, IntersectionObserver

(function() {
    'use strict';
    
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Video initialization function
    function initVideo(video) {
        // Set all necessary attributes for Safari compatibility
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
        
        // Play with error handling
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                video.classList.add('playing');
                const loadingOverlay = video.parentElement.querySelector('.video-loading');
                if (loadingOverlay) {
                    loadingOverlay.classList.add('hide');
                }
            }).catch(error => {
                console.log('Autoplay prevented:', error.message);
            });
        }
    }
    
    // Initialize all videos
    function initAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.classList.contains('initialized')) {
                video.classList.add('initialized');
                initVideo(video);
            }
        });
    }
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Lazy load images
    function lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => img.classList.add('loaded'));
                }
            });
        } else {
            // Fallback to IntersectionObserver
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Initialize videos immediately
        initAllVideos();
        
        // Lazy load images
        lazyLoadImages();
        
        // Smooth scroll reveal animations
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Force play videos when they come into view
                    const video = entry.target.querySelector('video');
                    if (video && !video.classList.contains('playing')) {
                        video.muted = true;
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                video.classList.add('playing');
                                const loadingOverlay = video.parentElement.querySelector('.video-loading');
                                if (loadingOverlay) {
                                    loadingOverlay.classList.add('hide');
                                }
                            }).catch(e => console.log('Play on scroll prevented:', e.message));
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.setAttribute('data-animate', '');
            scrollObserver.observe(section);
        });
        
        // Parallax effect on hero video (disabled on Safari for performance)
        if (!isSafari) {
            const heroVideo = document.querySelector('.hero-video, .hero-section video');
            if (heroVideo) {
                const handleScroll = throttle(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;
                    heroVideo.style.transform = `translate3d(0, ${rate}px, 0)`;
                }, 16); // ~60fps
                
                window.addEventListener('scroll', handleScroll, { passive: true });
            }
        }
    }
    
    // Retry video initialization on page load
    window.addEventListener('load', initAllVideos, { once: true });
    
    // Retry on visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            initAllVideos();
        }
    }, { passive: true });
    
    // Retry on user interaction (for Safari Low Power Mode)
    const interactionEvents = ['click', 'touchstart', 'scroll'];
    let hasInteracted = false;
    
    interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {
            if (!hasInteracted) {
                hasInteracted = true;
                setTimeout(initAllVideos, 100);
            }
        }, { once: true, passive: true });
    });
    
})();