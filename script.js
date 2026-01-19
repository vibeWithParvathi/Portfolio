// Mobile menu functionality
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', function() {
        navigation.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking nav links
const navAnchors = document.querySelectorAll('.nav-anchor');
navAnchors.forEach(function(link) {
    link.addEventListener('click', function() {
        if (navigation.classList.contains('active')) {
            navigation.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
});

// Smooth scroll implementation
const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
allAnchorLinks.forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const headerElement = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        headerElement.classList.add('scrolled');
    } else {
        headerElement.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation highlighting on scroll
const allSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-anchor');

function updateActiveNav() {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;

    allSections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Intersection Observer for scroll animations
const animationObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animationObserverOptions);

// Apply animations to elements
const animatedElements = document.querySelectorAll('.tech-item, .work-card, .achievement-box');
animatedElements.forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(element);
});

// Initialize EmailJS
(function() {
    emailjs.init("SgxR2x4PUSnepqRAx");
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;
        const formData = {};

        formInputs.forEach(function(input) {
            const value = input.value.trim();
            if (!value) {
                isValid = false;
            } else {
                const fieldName = input.placeholder.toLowerCase().replace(/\s+/g, '_');
                formData[fieldName] = value;
            }
        });

        if (isValid) {
            // Get form values
            const name = contactForm.querySelector('input[placeholder="Full Name"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject Line"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // EmailJS service parameters
            const serviceID = 'service_3uawass';
            const templateID = 'template_vi7ksiq';

            // Prepare email parameters
            const emailParams = {
                to_email: 'parvathijaya111@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                reply_to: email
            };

            // Send email using EmailJS
            emailjs.send(serviceID, templateID, emailParams)
                .then(function(response) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, function(error) {
                    alert('Sorry, there was an error sending your message. Please try again or contact me directly at parvathijaya111@gmail.com');
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    console.error('EmailJS Error:', error);
                });
        } else {
            alert('Please make sure all fields are filled out correctly.');
        }
    });
}

// Add some interactive hover effects
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Handle page load - set active nav based on hash
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector('.nav-anchor[href="' + hash + '"]');
        if (targetLink) {
            targetLink.classList.add('active');
        }
    } else {
        const homeLink = document.querySelector('.nav-anchor[href="#intro"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// Skills Slider Functionality
(function() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const techItems = document.querySelectorAll('.tech-item');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderTrack || !techItems.length) return;
    
    let currentIndex = 0;
    let itemsPerView = 3;
    let totalItems = techItems.length;
    
    // Calculate items per view based on screen size
    function updateItemsPerView() {
        if (window.innerWidth <= 768) {
            itemsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
        updateSlider();
    }
    
    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalSlides = Math.ceil(totalItems / itemsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update slider position
    function updateSlider() {
        if (techItems.length === 0) return;
        
        const container = sliderTrack.parentElement;
        const containerWidth = container.offsetWidth;
        const itemWidth = techItems[0].offsetWidth;
        const gap = 28;
        const totalItemWidth = itemWidth + gap;
        
        const translateX = -(currentIndex * totalItemWidth * itemsPerView);
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            prevBtn.disabled = currentIndex === 0;
        }
        
        const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
        if (nextBtn) {
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
            nextBtn.disabled = currentIndex >= maxIndex;
        }
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    // Auto-slide (optional)
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        }, 4000);
    }
    
    // Pause on hover
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        sliderWrapper.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
    
    // Initialize
    window.addEventListener('resize', function() {
        updateItemsPerView();
        createDots();
    });
    
    updateItemsPerView();
    createDots();
    startAutoSlide();
})();

