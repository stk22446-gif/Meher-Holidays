/**
 * MEHER HOLIDAYS - JAVASCRIPT LOGIC GUIDE
 * =======================================
 * 1. HEADER: Handles sticky background and visibility on scroll.
 * 2. MOBILE NAV: Manages the hamburger menu and drawer overlay.
 * 3. ANIMATIONS: Handles Intersection Observer for fade-in effects.
 * 4. DESTINATION PAGES: Destination-specific logic is often kept inside the page's <script> tag.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Drawer Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Create Drawer Overlay
        const overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        document.body.appendChild(overlay);

        // Create Drawer Header
        const drawerHeader = document.createElement('div');
        drawerHeader.className = 'drawer-header';
        drawerHeader.innerHTML = `
            <a href="index.html" class="drawer-logo"><img src="images/logo.png" alt="Logo"></a>
            <button class="drawer-close"><i class="fas fa-times"></i></button>
        `;
        navLinks.insertBefore(drawerHeader, navLinks.firstChild);

        const drawerCloseBtn = drawerHeader.querySelector('.drawer-close');

        const openDrawer = () => {
            navLinks.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeDrawer = () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openDrawer);
        drawerCloseBtn.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // AJAX Form Submission for Formspree with Success Video
    const contactForm = document.getElementById('contactForm');
    const successWrap = document.getElementById('success-video-wrap');
    const successVideo = document.getElementById('success-video');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! 
                    // 1. Hide form smoothly
                    contactForm.style.transition = 'opacity 0.4s ease';
                    contactForm.style.opacity = '0';

                    setTimeout(() => {
                        contactForm.style.display = 'none';

                        // 2. Show Video Scene
                        if (successWrap) {
                            successWrap.classList.add('active');
                            if (successVideo) {
                                successVideo.currentTime = 0;
                                successVideo.play();
                            }

                            // 3. Reset back to form after 5 seconds
                            setTimeout(() => {
                                successWrap.classList.remove('active');
                                contactForm.style.display = 'block';
                                setTimeout(() => {
                                    contactForm.style.opacity = '1';
                                }, 50);
                            }, 5000); // 5 seconds (allows video to finish)
                        }
                    }, 400);

                    contactForm.reset();
                } else {
                    console.error("Form submission failed");
                }
            } catch (error) {
                console.error("Network error during form submission", error);
            } finally {
                // We don't reset button state here because the form is hidden on success
                // but we keep it for error cases
                if (!contactForm.style.display || contactForm.style.display !== 'none') {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

    // Add sticky class to header on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Typing Animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text');
        let charIndex = 0;

        // Start typing after a short delay
        setTimeout(() => {
            const typeWriter = setInterval(() => {
                if (charIndex < textToType.length) {
                    typingElement.textContent += textToType.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 60); // typing speed
        }, 1000); // initial delay to sync with fade in
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (slides.length > 0) {
        const initialActiveIndex = Array.from(slides).findIndex((slide) => slide.classList.contains('active'));
        let currentSlide = initialActiveIndex >= 0 ? initialActiveIndex : 0;
        let sliderInterval;

        const updateDots = (index) => {
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        };

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');

            currentSlide = index;

            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;

            slides[currentSlide].classList.add('active');
            updateDots(currentSlide);
        };

        const showNextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const showPrevSlide = () => {
            goToSlide(currentSlide - 1);
        };

        const startSlider = () => {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(() => {
                showNextSlide();
            }, 2000);
        };

        const stopSlider = () => {
            clearInterval(sliderInterval);
        };

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlider();
            } else {
                startSlider();
            }
        });

        const bindSliderControl = (button, handler) => {
            if (!button) return;

            const trigger = (event) => {
                event.preventDefault();
                handler();
                startSlider();
            };

            button.addEventListener('click', trigger);
            button.addEventListener('touchstart', trigger, { passive: false });
        };

        bindSliderControl(nextBtn, showNextSlide);
        bindSliderControl(prevBtn, showPrevSlide);

        // Dot Navigation
        dots.forEach((dot) => {
            const handleDotClick = (event) => {
                event.preventDefault();
                const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
                goToSlide(slideIndex);
                startSlider();
            };

            const inputEvent = window.PointerEvent ? 'pointerup' : 'click';
            dot.addEventListener(inputEvent, handleDotClick);

            // Keyboard support (Enter and Space)
            dot.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleDotClick(event);
                }
            });
        });

        startSlider();
    }

    // Travel Memories View More toggle
    const galleryToggleBtn = document.getElementById('gallery-view-more');
    const hiddenGalleryItems = document.querySelectorAll('.gallery-grid .gallery-item.hidden');

    if (galleryToggleBtn && hiddenGalleryItems.length > 0) {
        let galleryExpanded = false;

        galleryToggleBtn.addEventListener('click', () => {
            galleryExpanded = !galleryExpanded;

            hiddenGalleryItems.forEach((item) => {
                item.classList.toggle('hidden', !galleryExpanded);
            });

            galleryToggleBtn.textContent = galleryExpanded ? 'Show Less' : 'View More';
        });
    }

    // Show More Destinations Logic
    const destCards = document.querySelectorAll('.dest-card');
    const showMoreBtn = document.getElementById('show-more-dest-btn');

    if (destCards.length > 6 && showMoreBtn) {
        // Initially hide cards past the 6th one
        destCards.forEach((card, index) => {
            if (index >= 6) {
                card.classList.add('hidden-dest');
            }
        });

        let isExpanded = false;

        showMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            destCards.forEach((card, index) => {
                if (index >= 6) {
                    if (isExpanded) {
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                    }
                }
            });

            if (isExpanded) {
                showMoreBtn.innerText = 'Show Less';
            } else {
                showMoreBtn.innerText = 'Show More';
                // Scroll back to the destinations section
                const destSection = document.getElementById('destinations');
                if (destSection) {
                    destSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Travel Theme Background Animation
    const addTravelBackground = () => {
        if (document.querySelector('.travel-bg-animation')) return;
        
        const bgContainer = document.createElement('div');
        bgContainer.className = 'travel-bg-animation';

        bgContainer.innerHTML = `
            <i class="fas fa-cloud cloud c1"></i>
            <i class="fas fa-cloud cloud c2"></i>
            <i class="fas fa-cloud cloud c3"></i>
            <i class="fas fa-plane plane"></i>
            <i class="fas fa-motorcycle bike"></i>
            <svg class="houseboat" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 300 Q 50 360 400 360 L 650 360 Q 750 360 780 180 Q 750 280 650 300 L 50 300 Z" fill="currentColor" />
                <path d="M120 300 L 120 200 L 180 160 L 580 160 L 640 200 L 640 300 Z" fill="currentColor" opacity="0.8" />
                <path d="M180 160 L 380 110 L 580 160 Z" fill="currentColor" />
                <rect x="180" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="230" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="280" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="330" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="380" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="430" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="480" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
                <rect x="530" y="210" width="30" height="50" rx="3" fill="white" opacity="0.3" />
            </svg>
        `;
        // Append as first child to stay under content
        document.body.insertBefore(bgContainer, document.body.firstChild);
    };

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Add background animation
    addTravelBackground();

    // Inject Floating Action Buttons (WhatsApp & Scroll to Top)
    (function injectFloatingBtns() {
        const btnsHTML = `
            <div class="floating-btns">
                <!-- Popup Menu -->
                <div id="whatsappMenu" class="wa-popup">
                    <button class="wa-close-btn" id="waClose"><i class="fas fa-times"></i></button>
                    <div class="wa-header">
                        <p>How can we help you?</p>
                    </div>
                    <div class="wa-options">
                        <a href="tel:+917338132315" class="wa-option">
                            <div class="wa-opt-icon call"><i class="fas fa-phone-alt"></i></div>
                            <span>Call Us For Trip Inquiry</span>
                        </a>
                        <a href="https://wa.me/917338132315?text=Hi Meher Holidays, I am interested in a trip." class="wa-option" target="_blank">
                            <div class="wa-opt-icon chat"><i class="fab fa-whatsapp"></i></div>
                            <span>Chat With Our Executive</span>
                        </a>
                    </div>
                </div>

                <button id="scrollToTop" class="floating-btn scroll-btn" aria-label="Scroll to top">
                    <i class="fas fa-chevron-up"></i>
                </button>
                <button id="waToggle" class="floating-btn whatsapp-btn" aria-label="Open WhatsApp Menu">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', btnsHTML);

        const scrollBtn = document.getElementById('scrollToTop');
        const waToggle = document.getElementById('waToggle');
        const waMenu = document.getElementById('whatsappMenu');
        const waClose = document.getElementById('waClose');

        const container = document.querySelector('.floating-btns');
        let scrollTimeout;

        // Scroll Logic
        if (scrollBtn && container) {
            window.addEventListener('scroll', () => {
                // Show container while scrolling
                container.classList.add('visible');

                // Toggle scroll-to-top button visibility
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('show');
                } else {
                    scrollBtn.classList.remove('show');
                }

                // Hide after 2 seconds of inactivity
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    // Only hide if the WhatsApp menu is NOT open
                    if (waMenu && !waMenu.classList.contains('active')) {
                        container.classList.remove('visible');
                    }
                }, 2000);
            });

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // WhatsApp Menu Logic
        if (waToggle && waMenu) {
            waToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                waMenu.classList.toggle('active');
            });

            if (waClose) {
                waClose.addEventListener('click', () => {
                    waMenu.classList.remove('active');
                });
            }

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!waMenu.contains(e.target) && e.target !== waToggle) {
                    waMenu.classList.remove('active');
                }
            });
        }
    })();

    // Inject a reusable, responsive footer across all pages.
    (function createFooter() {
        try {
            const year = new Date().getFullYear();
            const footerHTML = `
<footer class="site-footer">
  <div class="skyline"></div>
  <div class="container">
    <p>© ${year} Meher Holidays. All rights reserved.</p>
  </div>
</footer>`;

            const existingFooter = document.querySelector('footer');
            if (existingFooter) {
                // Replace the existing footer with the new consistent one
                existingFooter.outerHTML = footerHTML;
            } else {
                // Append at end of body
                document.body.insertAdjacentHTML('beforeend', footerHTML);
            }
        } catch (e) {
            // Non-fatal: don't break the rest of the site
            console.error('Footer injection failed', e);
        }
    })();
});
