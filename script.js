// ========================================
// NAVIGATION & MOBILE MENU
// ========================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL & NAVBAR EFFECTS
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = scrollPosition;
});

// ========================================
// CTA BUTTONS - SMOOTH SCROLL
// ========================================

const ctaButtons = document.querySelectorAll('.cta-button, a[href^="#"]');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========================================
// COUNTER ANIMATION
// ========================================

const counters = document.querySelectorAll('.performance-counter');
const counterDuration = 2000;

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const startTime = Date.now();
    const startValue = 0;

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / counterDuration, 1);
        
        const current = Math.floor(startValue + (target - startValue) * progress);
        counter.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('performance-counter')) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// ========================================
// FAQ ACCORDION
// ========================================

const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const faqItem = header.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================================
// COPY TO CLIPBOARD
// ========================================

function copyToClipboard() {
    const address = '0x4B3ed8fA94b013e417e0A7F2ec5b8A84abc917Ed';
    const button = event.target;
    
    navigator.clipboard.writeText(address).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed!';
    });
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================

const testimonialsSlider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function updateSlider() {
    if (!testimonialsSlider || testimonialCards.length === 0) return;

    const currentCard = testimonialCards[currentTestimonial];
    if (!currentCard) return;

    currentCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    if (prevBtn) prevBtn.disabled = currentTestimonial === 0;
    if (nextBtn) nextBtn.disabled = currentTestimonial === testimonialCards.length - 1;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentTestimonial > 0) {
            currentTestimonial -= 1;
            updateSlider();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentTestimonial < testimonialCards.length - 1) {
            currentTestimonial += 1;
            updateSlider();
        }
    });
}

window.addEventListener('resize', updateSlider);

// Auto-swipe carousel - only start when testimonials section is visible
let autoSwipeTimer;
let isAutoSwiping = false;

function autoSwipeCarousel() {
    if (testimonialsSlider && testimonialCards.length > 0) {
        if (currentTestimonial < testimonialCards.length - 1) {
            currentTestimonial += 1;
        } else {
            currentTestimonial = 0;
        }
        updateSlider();
    }
}

function startAutoSwipe() {
    if (!isAutoSwiping) {
        isAutoSwiping = true;
        autoSwipeTimer = setInterval(autoSwipeCarousel, 4000);
    }
}

function stopAutoSwipe() {
    clearInterval(autoSwipeTimer);
    isAutoSwiping = false;
}

// Use Intersection Observer to start auto-swipe only when testimonials are visible
const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoSwipe();
            } else {
                stopAutoSwipe();
            }
        });
    }, { threshold: 0.1 });
    sectionObserver.observe(testimonialsSection);
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoSwipe();
        setTimeout(startAutoSwipe, 5000);
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const animatedElements = document.querySelectorAll('.feature-card, .achievement-item, .pricing-card, .faq-item');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
});

// ========================================
// FORM VALIDATION & INTERACTION
// ========================================

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, a.button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ========================================
// LAZY LOAD IMAGES
// ========================================

// Using native loading="lazy" attribute on images instead of data-src
// Add loading state styling
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img.testimonial-photo').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
        img.addEventListener('error', () => {
            img.classList.add('error');
        });
    });
});

// ========================================
// EXTERNAL LINK HANDLING
// ========================================

const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Open in new tab
        e.preventDefault();
        window.open(link.href, '_blank');
    });
});

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

// Parallax disabled to keep page completely static on load.

// ========================================
// PERFORMANCE METRICS
// ========================================

// Log page performance metrics
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Tab navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// LOCAL STORAGE & USER PREFERENCES
// ========================================

function setUserPreference(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.log('LocalStorage not available');
    }
}

function getUserPreference(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.log('LocalStorage not available');
        return null;
    }
}

// ========================================
// ANALYTICS & TRACKING
// ========================================

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('button, a.button')) {
        const buttonText = e.target.textContent.trim();
        console.log('Button clicked:', buttonText);
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for resize events
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ERROR HANDLING & LOGGING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ========================================
// PAGE VISIBILITY API
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlideTimer);
    } else {
        autoSlideTimer = setInterval(nextTestimonial, 5000);
    }
});

// ========================================
// INTERSECTION OBSERVER FOR ELEMENTS
// ========================================

const elements = document.querySelectorAll('[data-animate]');
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

elements.forEach(element => elementObserver.observe(element));

console.log('JUST CALL ME PROF - Premium Crypto Trading Platform');
console.log('Website loaded successfully');
