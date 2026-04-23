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

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just simulate a successful submission for now
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sent successfully!';
            btn.style.backgroundColor = '#4caf50'; // green success

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = ''; // reset to default
            }, 3000);
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
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

            currentSlide = index;

            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;

            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlider = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 2000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlider();
                startSlider();
            });
        });

        // Start auto slide
        startSlider();
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
        const bgContainer = document.createElement('div');
        bgContainer.className = 'travel-bg-animation';

        bgContainer.innerHTML = `
            <i class="fas fa-cloud cloud c1"></i>
            <i class="fas fa-cloud cloud c2"></i>
            <i class="fas fa-cloud cloud c3"></i>
            <i class="fas fa-plane plane"></i>
        `;
        // Append as first child to stay under content
        document.body.insertBefore(bgContainer, document.body.firstChild);
    };

    // Add background animation
    addTravelBackground();
});
