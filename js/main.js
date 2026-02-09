/* ============================================
   Persons Industries LLC - Main JavaScript
   Carousel, Navigation, and Interactions
   ============================================ */

// ========== Document Ready ==========
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initStickyNav();
    initCarousel();
    initSmoothScroll();
});

// ========== Mobile Navigation Toggle ==========
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ========== Sticky Navigation ==========
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ========== Automatic Carousel ==========
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;
    
    // Pause on hover (desktop only)
    if (window.matchMedia('(min-width: 768px)').matches) {
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Ensure smooth infinite loop
    // The CSS animation handles the continuous scrolling
    // Items are duplicated in HTML for seamless loop
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process if it's a hash link on the same page
            if (href !== '#' && !href.includes('http')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const socialBarHeight = document.querySelector('.social-bar')?.offsetHeight || 0;
                    const offset = navbarHeight + socialBarHeight;
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========== Intersection Observer for Fade-in Animations (Optional Enhancement) ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elements = document.querySelectorAll('.info-card, .mvv-card, .service-card, .project-card');
    elements.forEach(el => observer.observe(el));
}

// ========== Form Validation (Optional Enhancement) ==========
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            
            // Basic validation
            if (name && name.value.trim() === '') {
                isValid = false;
                showError(name, 'Name is required');
            }
            
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Valid email is required');
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                showError(message, 'Message is required');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(element, message) {
    // Remove any existing error
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    element.style.borderColor = '#ef4444';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    element.parentElement.appendChild(errorDiv);
    
    // Remove error on input
    element.addEventListener('input', function() {
        element.style.borderColor = '';
        const error = element.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }, { once: true });
}

// ========== Initialize Optional Enhancements ==========
initScrollAnimations();
initFormValidation();