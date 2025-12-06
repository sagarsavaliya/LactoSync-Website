// Cursor Follower Effect
document.addEventListener('DOMContentLoaded', function () {
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.opacity = '0.6';
    });

    function animate() {
        // Smooth following effect
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .faq-question');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = '#4F46E5';
        });

        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = '#4F46E5';
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Pricing Calculator
const customerCountInput = document.getElementById('customerCount');
const chargeableCustomersSpan = document.getElementById('chargeableCustomers');
const dailyCostSpan = document.getElementById('dailyCost');
const monthlyCostSpan = document.getElementById('monthlyCost');

function calculatePricing() {
    const customerCount = parseInt(customerCountInput.value);

    // Handle invalid input
    if (isNaN(customerCount) || customerCount < 0) {
        chargeableCustomersSpan.textContent = '0';
        dailyCostSpan.textContent = '0';
        monthlyCostSpan.textContent = '0';
        return;
    }

    const freeLimit = 50;
    const dailyRatePerCustomer = 1;
    const daysInMonth = 30;

    let chargeableCustomers = Math.max(0, customerCount - freeLimit);
    let dailyCost = chargeableCustomers * dailyRatePerCustomer;
    let monthlyCost = dailyCost * daysInMonth;

    // Update display - ensure proper formatting
    chargeableCustomersSpan.textContent = chargeableCustomers.toLocaleString('en-IN');
    dailyCostSpan.textContent = dailyCost.toLocaleString('en-IN');
    monthlyCostSpan.textContent = monthlyCost.toLocaleString('en-IN');
}

if (customerCountInput) {
    customerCountInput.addEventListener('input', calculatePricing);
    // Initialize with default value
    calculatePricing();
}

// Floating Elements Animation
document.addEventListener('DOMContentLoaded', function () {
    const floatingElements = document.querySelectorAll('.float-element');

    floatingElements.forEach((element, index) => {
        // Random starting positions
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;

        element.style.left = randomX + '%';
        element.style.top = randomY + '%';

        // Add parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

            element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-45deg)`;
        });
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .problem-card, .who-card, .step-card, .pricing-card'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000, options = {}) {
    const { prefix = '', suffix = '', isDecimal = false, startValue = 0, countDown = false } = options;

    let start = countDown ? startValue : 0;
    const end = target;
    const range = Math.abs(end - start);
    const increment = countDown ? -(range / (duration / 16)) : (range / (duration / 16));
    let current = start;

    function updateCounter() {
        current += increment;

        // Check if animation should continue
        const shouldContinue = countDown ? (current > end) : (current < end);

        if (shouldContinue) {
            const displayValue = isDecimal ? current.toFixed(2) : Math.floor(current);
            element.textContent = prefix + displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            const finalValue = isDecimal ? end.toFixed(2) : end;
            element.textContent = prefix + finalValue + suffix;
        }
    }

    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');

                // Get data attributes
                const targetValue = parseFloat(statNumber.getAttribute('data-target'));
                const prefix = statNumber.getAttribute('data-prefix') || '';
                const suffix = statNumber.getAttribute('data-suffix') || '';
                const isDecimal = statNumber.getAttribute('data-decimal') === 'true';
                const startValue = parseFloat(statNumber.getAttribute('data-start'));

                // Determine if we're counting down
                const countDown = startValue && startValue > targetValue;

                // Set initial display
                if (countDown) {
                    statNumber.textContent = prefix + (isDecimal ? startValue.toFixed(2) : startValue) + suffix;
                } else {
                    statNumber.textContent = prefix + '0' + suffix;
                }

                // Animate
                animateCounter(statNumber, targetValue, 2000, {
                    prefix,
                    suffix,
                    isDecimal,
                    startValue: startValue || 0,
                    countDown
                });
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function () {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// Enhanced Phone Mockup Animation
document.addEventListener('DOMContentLoaded', function () {
    const phoneMockup = document.querySelector('.phone-mockup');

    if (phoneMockup) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;

            phoneMockup.style.transform = `translateY(${rate}px) rotate(${rate * 0.05}deg)`;
        });

        // Mouse move parallax effect
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 30;

            phoneMockup.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
    }
});

// Pricing Card Hover Effect
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Feature Card Interactive Effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Gradient Text Animation
document.addEventListener('DOMContentLoaded', function () {
    const gradientTexts = document.querySelectorAll('.gradient-text');

    gradientTexts.forEach(text => {
        let hue = 0;

        setInterval(() => {
            hue = (hue + 1) % 360;
            text.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    });
});

// Progress Bar for Page Scroll
document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// CTA Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Section Reveal Animation
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

// Testimonial Carousel (if needed in future)
class Carousel {
    constructor(element) {
        this.element = element;
        this.items = element.querySelectorAll('.carousel-item');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (this.items.length === 0) return;

        setInterval(() => {
            this.next();
        }, 5000);
    }

    next() {
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.items[this.currentIndex].classList.add('active');
    }

    prev() {
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.items[this.currentIndex].classList.add('active');
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach(carousel => {
        new Carousel(carousel);
    });
});

// Form Validation (for future contact form)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4F46E5;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
    });
});

// Performance Optimization: Debounce scroll events
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

// Optimize scroll event listeners
const optimizedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ========== LIVE ANIMATED ELEMENTS FOR ALL SECTIONS ==========

// Problem Section - Animated Icons with Pulse Effect
document.addEventListener('DOMContentLoaded', function () {
    const problemCards = document.querySelectorAll('.problem-card');

    problemCards.forEach((card, index) => {
        const icon = card.querySelector('.problem-icon');

        // Add pulse animation on hover
        card.addEventListener('mouseenter', () => {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.animation = '';
        });

        // Staggered entrance animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Features Section - Icon Bounce on Scroll
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const icon = entry.target.querySelector('.feature-icon');
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (icon) {
                    icon.style.animation = 'bounce 1s ease';
                }
            }, index * 100);
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function () {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        featureObserver.observe(card);
    });
});

// Who Section - Scale Animation
const whoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 150);
            whoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function () {
    const whoCards = document.querySelectorAll('.who-card');
    whoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        whoObserver.observe(card);
    });
});

// Benefits Section - Number Animation with Glow
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.benefit-number');
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                if (number) {
                    number.style.textShadow = '0 0 20px rgba(79, 70, 229, 0.6)';
                }
            }, index * 100);
            benefitObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function () {
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        card.style.transition = 'all 0.6s ease';
        benefitObserver.observe(card);
    });
});

// How It Works Section - Progressive Step Reveal with Line Animation
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step-card');
            const arrows = entry.target.querySelectorAll('.step-arrow');

            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'scale(1) rotate(0deg)';

                    // Animate arrow after step
                    if (arrows[index]) {
                        setTimeout(() => {
                            arrows[index].style.opacity = '1';
                            arrows[index].style.transform = 'translateX(0)';
                        }, 300);
                    }
                }, index * 500);
            });

            stepObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function () {
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
        const steps = stepsGrid.querySelectorAll('.step-card');
        const arrows = stepsGrid.querySelectorAll('.step-arrow');

        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'scale(0.8) rotate(-5deg)';
            step.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        arrows.forEach(arrow => {
            arrow.style.opacity = '0';
            arrow.style.transform = 'translateX(-20px)';
            arrow.style.transition = 'all 0.4s ease';
        });

        stepObserver.observe(stepsGrid);
    }
});

// Pricing Section - Card Float Animation
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.animation = `float 3s ease-in-out ${index * 0.3}s infinite`;
});

// Comparison Section - Animated Table Rows with Check/Cross Icons
const comparisonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const rows = entry.target.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 100);
            });
            comparisonObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function () {
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        const rows = comparisonTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'all 0.5s ease';
        });
        comparisonObserver.observe(comparisonTable);
    }
});


// CTA Section - Pulsating Button Effect
document.addEventListener('DOMContentLoaded', function () {
    const ctaButtons = document.querySelectorAll('.cta-section .btn-primary');

    ctaButtons.forEach(btn => {
        // Add continuous pulse animation
        setInterval(() => {
            btn.style.animation = 'pulse 1.5s ease-in-out';
            setTimeout(() => {
                btn.style.animation = '';
            }, 1500);
        }, 3000);
    });
});

// Pricing Calculator - Live Animated Update
if (customerCountInput) {
    customerCountInput.addEventListener('input', function () {
        const resultElements = [chargeableCustomersSpan, dailyCostSpan, monthlyCostSpan];
        resultElements.forEach(el => {
            if (el) {
                el.style.transform = 'scale(1.1)';
                el.style.color = '#4F46E5';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                    el.style.color = '';
                }, 200);
            }
        });
    });
}

// Section Headers - Typing Effect for Tags
document.addEventListener('DOMContentLoaded', function () {
    const sectionTags = document.querySelectorAll('.section-tag');

    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.opacity = '1';

                let index = 0;
                const typeInterval = setInterval(() => {
                    if (index < originalText.length) {
                        entry.target.textContent += originalText[index];
                        index++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);

                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTags.forEach(tag => {
        tag.style.opacity = '0';
        tagObserver.observe(tag);
    });
});

// Add floating particles to hero section
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: rgba(79, 70, 229, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 15}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }
});

// Add CSS animations for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Console Art (Easter Egg)
console.log(`
%c
🥛 LactoSync - Modern Dairy Management 🥛
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with ❤️ by Akshara Technologies
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interested in working with us?
Contact: info@aksharatech.com
`,
    'color: #4F46E5; font-size: 14px; font-weight: bold;'
);

// Analytics Placeholder (Google Analytics, etc.)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // Integrate with Google Analytics:
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track pricing calculator usage
if (customerCountInput) {
    customerCountInput.addEventListener('change', function () {
        trackEvent('Pricing Calculator', 'Calculate', this.value);
    });
}

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        trackEvent('FAQ', 'Click', this.textContent.trim());
    });
});