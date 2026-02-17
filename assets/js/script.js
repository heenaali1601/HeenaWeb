// ===================================
// HEENA WELLNESS COACH - MAIN SCRIPT
// ===================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lead Magnet Form
const leadMagnetForm = document.getElementById('leadMagnetForm');
if (leadMagnetForm) {
    leadMagnetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        
        // Log form data
        console.log('Lead Magnet Form Submitted:', { name, email });
        
        // Show success message
        alert(`Thank you, ${name}! Check your email for your free guide.`);
        
        // Reset form
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.benefit-card, .program-card, .testimonial-card, .pillar-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Newsletter/Lead Magnet tracking
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (form.id === 'consultationForm' || form.id === 'leadMagnetForm') {
            // Log form submission for future analytics
            console.log('Form submitted:', form.id);
        }
    });
});

// Lazy load images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to top button (for future addition)
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6CC093 0%, #5DB07D 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 998;
        box-shadow: 0 5px 20px rgba(108, 192, 147, 0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
    });

    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Contact form validation
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!validateEmail(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(phone)) {
            e.preventDefault();
            alert('Please enter a valid phone number.');
            return;
        }
    });
}

// Add placeholder image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // This will be used when actual images are added
    document.querySelectorAll('img').forEach(img => {
        if (!img.src || img.src.includes('placeholder')) {
            img.style.backgroundColor = '#f0f0f0';
        }
    });
});

// Event tracking helper (for future analytics)
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    // This can be connected to Google Analytics or other tracking services
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.innerText,
            button_class: this.className
        });
    });
});

// Get URL parameters for pre-filling forms
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Pre-fill program field if passed via URL
document.addEventListener('DOMContentLoaded', function() {
    const programParam = getURLParameter('program');
    const programSelect = document.getElementById('program');
    
    if (programParam && programSelect) {
        programSelect.value = programParam;
    }
});

// Add dynamic year to footer
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(p => {
        if (p.textContent.includes('2026')) {
            p.textContent = p.textContent.replace('2026', year);
        }
    });
});

// Print-friendly styles (optional)
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.whatsapp-btn, .hamburger').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    document.querySelectorAll('.whatsapp-btn, .hamburger').forEach(el => {
        el.style.display = '';
    });
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is added
    // navigator.serviceWorker.register('/sw.js');
}

// Contact form improvements
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    if (form) {
        // Disable submit button until form is valid
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('change', function() {
            const isValid = form.checkValidity();
            submitBtn.disabled = !isValid;
        });

        // Real-time validation feedback
        form.addEventListener('invalid', function(e) {
            e.target.style.borderColor = '#ff6b6b';
        }, true);

        form.addEventListener('change', function(e) {
            if (e.target.checkValidity()) {
                e.target.style.borderColor = '#6CC093';
            }
        }, true);
    }
});

// Initialize all
console.log('Heena Wellness Coach - Website Loaded Successfully');
console.log('Website is ready for content and images to be added.');
