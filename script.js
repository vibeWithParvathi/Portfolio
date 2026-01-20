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

// Blog Lightbox Functionality
(function() {
    const blogItems = document.querySelectorAll('.blog-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Get unique images (remove duplicates)
    const imageMap = new Map();
    const images = [];
    blogItems.forEach(function(item) {
        const imagePath = item.getAttribute('data-image');
        if (!imageMap.has(imagePath)) {
            imageMap.set(imagePath, images.length);
            images.push(imagePath);
        }
    });
    
    let currentImageIndex = 0;
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[currentImageIndex];
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }
    
    blogItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const imagePath = item.getAttribute('data-image');
            const index = imageMap.get(imagePath);
            openLightbox(index);
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal && lightboxModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
})();

// Achievements Certificate Modal (Supports both PDF and Images)
(function() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    const certificateModal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    const certificateClose = document.querySelector('.certificate-close');
    
    achievementItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const certificatePath = item.getAttribute('data-certificate');
            const fileType = item.getAttribute('data-type') || 'image';
            
            if (certificatePath) {
                if (fileType === 'pdf') {
                    // Open PDF in new tab
                    window.open(certificatePath, '_blank');
                } else {
                    // Show image in modal
                    certificateImage.src = certificatePath;
                    certificateModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    if (certificateClose) {
        certificateClose.addEventListener('click', function() {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (certificateModal) {
        certificateModal.addEventListener('click', function(e) {
            if (e.target === certificateModal) {
                certificateModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (certificateModal && certificateModal.style.display === 'block' && e.key === 'Escape') {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
})();

// Testimonials System - Form Submission and Display
(function() {
    const STORAGE_KEY = 'portfolio_testimonials';
    const DELETE_PASSWORD = 'admin123'; // Change this to your desired password
    const TESTIMONIALS_COLLECTION = 'testimonials';
    
    // Check if Firebase is available
    const useFirebase = typeof window.firebaseDB !== 'undefined' && window.firebaseDB.db;
    
    // Get all elements
    const testimonialForm = document.getElementById('testimonialSubmitForm');
    const testimonialType = document.getElementById('testimonialType');
    const companyRow = document.getElementById('companyRow');
    const organizationRow = document.getElementById('organizationRow');
    const testimonialCompany = document.getElementById('testimonialCompany');
    const testimonialOrganization = document.getElementById('testimonialOrganization');
    const formContainer = document.getElementById('testimonialFormContainer');
    const testimonialsDisplay = document.getElementById('testimonialsDisplay');
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const toggleDisplayBtn = document.getElementById('toggleDisplayBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    // Toggle form/display visibility
    if (toggleFormBtn) {
        toggleFormBtn.addEventListener('click', function() {
            formContainer.style.display = 'block';
            testimonialsDisplay.style.display = 'none';
            toggleFormBtn.style.display = 'none';
            toggleDisplayBtn.style.display = 'inline-block';
        });
    }
    
    if (toggleDisplayBtn) {
        toggleDisplayBtn.addEventListener('click', async function() {
            formContainer.style.display = 'none';
            testimonialsDisplay.style.display = 'block';
            toggleFormBtn.style.display = 'inline-block';
            toggleDisplayBtn.style.display = 'none';
            await loadAndDisplayTestimonials();
            updateClearAllButton();
        });
    }
    
    // Show/hide company or organization field based on type
    if (testimonialType) {
        testimonialType.addEventListener('change', function() {
            if (this.value === 'colleague') {
                companyRow.style.display = 'flex';
                organizationRow.style.display = 'none';
                testimonialCompany.required = true;
                testimonialOrganization.required = false;
            } else if (this.value === 'mentor') {
                companyRow.style.display = 'none';
                organizationRow.style.display = 'flex';
                testimonialCompany.required = false;
                testimonialOrganization.required = true;
            } else {
                companyRow.style.display = 'none';
                organizationRow.style.display = 'none';
                testimonialCompany.required = false;
                testimonialOrganization.required = false;
            }
        });
    }
    
    // Handle form submission
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const type = testimonialType.value;
            const name = document.getElementById('testimonialName').value.trim();
            const company = testimonialCompany.value.trim();
            const organization = testimonialOrganization.value.trim();
            const designation = document.getElementById('testimonialDesignation').value.trim();
            const email = document.getElementById('testimonialEmail').value.trim();
            const contact = document.getElementById('testimonialContact').value.trim();
            const experience = document.getElementById('testimonialExperience').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            
            if (!type || !name || !designation || !email || !experience || !rating) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (type === 'colleague' && !company) {
                alert('Please enter company name.');
                return;
            }
            
            if (type === 'mentor' && !organization) {
                alert('Please enter organization name.');
                return;
            }
            
            // Create testimonial object
            const testimonial = {
                type: type,
                name: name,
                company: type === 'colleague' ? company : null,
                organization: type === 'mentor' ? organization : null,
                designation: designation,
                email: email,
                contact: contact || null,
                experience: experience,
                rating: parseInt(rating),
                date: new Date().toISOString()
            };
            
            // Save to Firebase or localStorage
            if (useFirebase) {
                try {
                    console.log('💾 Attempting to save testimonial to Firebase...');
                    console.log('📝 Testimonial data:', testimonial);
                    
                    const { collection, addDoc, db } = window.firebaseDB;
                    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
                    const docRef = await addDoc(testimonialsRef, testimonial);
                    
                    console.log('✅ Testimonial saved successfully to Firebase!');
                    console.log('🆔 Document ID:', docRef.id);
                    console.log('📍 Collection path: testimonials/' + docRef.id);
                    console.log('🔗 View in Firebase Console: https://console.firebase.google.com/project/portfolio-testimonials-c493c/firestore/data/~2Ftestimonials~2F' + docRef.id);
                    
                    // Reset form
                    testimonialForm.reset();
                    companyRow.style.display = 'none';
                    organizationRow.style.display = 'none';
                    
                    // Show success message and display testimonials
                    alert('Thank you for your testimonial! It has been submitted successfully and is now visible to all visitors.\n\nDocument ID: ' + docRef.id + '\n\nCheck the console for Firebase link.');
                    
                    // Switch to display view and reload testimonials
                    formContainer.style.display = 'none';
                    testimonialsDisplay.style.display = 'block';
                    toggleFormBtn.style.display = 'inline-block';
                    toggleDisplayBtn.style.display = 'none';
                    await loadAndDisplayTestimonials();
                    await updateClearAllButton();
                } catch (error) {
                    console.error('❌ Error saving to Firebase:', error);
                    console.error('Error details:', error.message);
                    console.error('Error code:', error.code);
                    alert('Error saving testimonial. Please check the console for details or contact the site owner.');
                }
            } else {
                // Fallback to localStorage
                testimonial.id = Date.now();
                const testimonials = await getTestimonials();
                testimonials.push(testimonial);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
                
                // Reset form
                testimonialForm.reset();
                companyRow.style.display = 'none';
                organizationRow.style.display = 'none';
                
                // Show success message and display testimonials
                alert('Thank you for your testimonial! It has been submitted successfully.');
                
                // Switch to display view and reload testimonials
                formContainer.style.display = 'none';
                testimonialsDisplay.style.display = 'block';
                toggleFormBtn.style.display = 'inline-block';
                toggleDisplayBtn.style.display = 'none';
                await loadAndDisplayTestimonials();
                updateClearAllButton();
            }
        });
    }
    
    // Get testimonials from Firebase or localStorage (fallback)
    async function getTestimonials() {
        if (useFirebase) {
            try {
                const { collection, getDocs, query, orderBy, db } = window.firebaseDB;
                const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
                const q = query(testimonialsRef, orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                const testimonials = [];
                querySnapshot.forEach((docSnap) => {
                    testimonials.push({
                        id: docSnap.id,
                        ...docSnap.data()
                    });
                });
                console.log(`✅ Loaded ${testimonials.length} testimonial(s) from Firebase`);
                return testimonials;
            } catch (error) {
                console.error('❌ Error fetching testimonials from Firebase:', error);
                console.log('⚠️ Falling back to localStorage');
                // Fallback to localStorage
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : [];
            }
        } else {
            console.log('⚠️ Firebase not available, using localStorage');
            // Fallback to localStorage
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        }
    }
    
    // Prompt for password
    function promptPassword(action) {
        return prompt(`Please enter the password to ${action}:`);
    }
    
    // Verify password
    function verifyPassword(inputPassword) {
        return inputPassword === DELETE_PASSWORD;
    }
    
    // Delete a single testimonial
    async function deleteTestimonial(id) {
        const password = promptPassword('delete this testimonial');
        
        if (password === null) {
            // User cancelled
            return;
        }
        
        if (!verifyPassword(password)) {
            alert('Incorrect password! Deletion cancelled.');
            return;
        }
        
        if (!confirm('Are you sure you want to delete this testimonial?')) {
            return;
        }
        
        if (useFirebase) {
            try {
                const { deleteDoc, doc, db } = window.firebaseDB;
                await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));
                await loadAndDisplayTestimonials();
                updateClearAllButton();
                
                const testimonials = await getTestimonials();
                if (testimonials.length === 0) {
                    testimonialsDisplay.style.display = 'none';
                    formContainer.style.display = 'block';
                    toggleFormBtn.style.display = 'none';
                    toggleDisplayBtn.style.display = 'none';
                }
                
                alert('Testimonial deleted successfully!');
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Error deleting testimonial. Please try again.');
            }
        } else {
            const testimonials = await getTestimonials();
            const filtered = testimonials.filter(function(t) {
                return t.id !== id;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            await loadAndDisplayTestimonials();
            updateClearAllButton();
            
            if (filtered.length === 0) {
                testimonialsDisplay.style.display = 'none';
                formContainer.style.display = 'block';
                toggleFormBtn.style.display = 'none';
                toggleDisplayBtn.style.display = 'none';
            }
            
            alert('Testimonial deleted successfully!');
        }
    }
    
    // Clear all testimonials
    async function clearAllTestimonials() {
        const password = promptPassword('delete ALL testimonials');
        
        if (password === null) {
            // User cancelled
            return;
        }
        
        if (!verifyPassword(password)) {
            alert('Incorrect password! Deletion cancelled.');
            return;
        }
        
        if (!confirm('Are you sure you want to delete ALL testimonials? This action cannot be undone.')) {
            return;
        }
        
        if (useFirebase) {
            try {
                const { collection, getDocs, deleteDoc, doc, db } = window.firebaseDB;
                const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
                const querySnapshot = await getDocs(testimonialsRef);
                const deletePromises = [];
                querySnapshot.forEach((docSnap) => {
                    deletePromises.push(deleteDoc(doc(db, TESTIMONIALS_COLLECTION, docSnap.id)));
                });
                await Promise.all(deletePromises);
                
                testimonialsDisplay.style.display = 'none';
                formContainer.style.display = 'block';
                toggleFormBtn.style.display = 'none';
                toggleDisplayBtn.style.display = 'none';
                if (clearAllBtn) clearAllBtn.style.display = 'none';
                
                alert('All testimonials deleted successfully!');
            } catch (error) {
                console.error('Error deleting all testimonials:', error);
                alert('Error deleting testimonials. Please try again.');
            }
        } else {
            localStorage.removeItem(STORAGE_KEY);
            testimonialsDisplay.style.display = 'none';
            formContainer.style.display = 'block';
            toggleFormBtn.style.display = 'none';
            toggleDisplayBtn.style.display = 'none';
            if (clearAllBtn) clearAllBtn.style.display = 'none';
            
            alert('All testimonials deleted successfully!');
        }
    }
    
    // Clear all button event listener
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllTestimonials);
    }
    
    // Display star rating
    function displayStars(rating) {
        let starsHtml = '<div class="star-rating-display">';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star star"></i>';
            } else {
                starsHtml += '<i class="far fa-star star empty"></i>';
            }
        }
        starsHtml += '</div>';
        return starsHtml;
    }
    
    // Load and display testimonials
    async function loadAndDisplayTestimonials() {
        const testimonials = await getTestimonials();
        
        if (!testimonialsTrack) return;
        
        testimonialsTrack.innerHTML = '';
        
        if (testimonials.length === 0) {
            testimonialsTrack.innerHTML = '<div class="testimonial-card"><div class="testimonial-content"><p>No testimonials yet. Be the first to share your feedback!</p></div></div>';
            return;
        }
        
        testimonials.forEach(function(testimonial) {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            
            const companyOrOrg = testimonial.type === 'colleague' 
                ? testimonial.company 
                : testimonial.organization;
            
            const contactInfo = testimonial.contact 
                ? `<p class="author-contact"><i class="fas fa-phone"></i> ${testimonial.contact}</p>` 
                : '';
            
            card.innerHTML = `
                <div class="testimonial-content">
                    <button class="delete-testimonial-btn" data-id="${testimonial.id}" title="Delete this testimonial">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4 class="author-name">${testimonial.name}</h4>
                            <p class="author-role">${testimonial.designation}</p>
                            <p class="author-company">${companyOrOrg}</p>
                            <p class="author-email"><i class="fas fa-envelope"></i> ${testimonial.email}</p>
                            ${contactInfo}
                        </div>
                    </div>
                    <p class="testimonial-text">"${testimonial.experience}"</p>
                    ${displayStars(testimonial.rating)}
                </div>
            `;
            
            testimonialsTrack.appendChild(card);
        });
        
        // Add delete button event listeners
        const deleteButtons = testimonialsTrack.querySelectorAll('.delete-testimonial-btn');
        deleteButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const testimonialId = parseInt(this.getAttribute('data-id'));
                deleteTestimonial(testimonialId);
            });
        });
        
        // Initialize slider after loading testimonials
        initializeTestimonialSlider();
    }
    
    // Initialize testimonial slider
    function initializeTestimonialSlider() {
        const track = document.getElementById('testimonialsTrack');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        const dotsContainer = document.getElementById('testimonialDots');
        const testimonialCards = track.querySelectorAll('.testimonial-card');
        
        if (!track || !testimonialCards.length) return;
        
        let currentTestimonial = 0;
        const totalTestimonials = testimonialCards.length;
        
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function() {
                    currentTestimonial = i;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider() {
            const translateX = -(currentTestimonial * 100);
            track.style.transform = `translateX(${translateX}%)`;
            
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentTestimonial);
            });
            
            if (prevBtn) {
                prevBtn.style.opacity = currentTestimonial === 0 ? '0.5' : '1';
                prevBtn.disabled = currentTestimonial === 0;
            }
            
            if (nextBtn) {
                nextBtn.style.opacity = currentTestimonial >= totalTestimonials - 1 ? '0.5' : '1';
                nextBtn.disabled = currentTestimonial >= totalTestimonials - 1;
            }
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                if (currentTestimonial < totalTestimonials - 1) {
                    currentTestimonial++;
                    updateSlider();
                }
            };
        }
        
        if (prevBtn) {
            prevBtn.onclick = function() {
                if (currentTestimonial > 0) {
                    currentTestimonial--;
                    updateSlider();
                }
            };
        }
        
        // Auto-slide
        let autoSlide;
        function startAutoSlide() {
            autoSlide = setInterval(function() {
                if (currentTestimonial >= totalTestimonials - 1) {
                    currentTestimonial = 0;
                } else {
                    currentTestimonial++;
                }
                updateSlider();
            }, 5000);
        }
        
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', function() {
                clearInterval(autoSlide);
            });
            testimonialsSection.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
        
        createDots();
        updateSlider();
        startAutoSlide();
    }
    
    // Update clear all button visibility
    async function updateClearAllButton() {
        const testimonials = await getTestimonials();
        if (clearAllBtn) {
            if (testimonials.length > 0 && testimonialsDisplay.style.display === 'block') {
                clearAllBtn.style.display = 'inline-block';
            } else {
                clearAllBtn.style.display = 'none';
            }
        }
    }
    
    // Load testimonials on page load
    window.addEventListener('DOMContentLoaded', async function() {
        // Wait for Firebase to initialize (if using Firebase)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const testimonials = await getTestimonials();
        if (testimonials.length > 0) {
            testimonialsDisplay.style.display = 'block';
            formContainer.style.display = 'none';
            toggleFormBtn.style.display = 'inline-block';
            toggleDisplayBtn.style.display = 'none';
            await loadAndDisplayTestimonials();
            await updateClearAllButton();
        } else {
            testimonialsDisplay.style.display = 'none';
            formContainer.style.display = 'block';
            toggleFormBtn.style.display = 'none';
            toggleDisplayBtn.style.display = 'none';
            if (clearAllBtn) clearAllBtn.style.display = 'none';
        }
    });
})();

