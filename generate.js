const fs = require('fs');
const path = require('path');

const destinations = [
    { id: 'kerala', name: 'Kerala', bg: '1E40AF', color: 'ffffff' },
    { id: 'ladakh', name: 'Ladakh', bg: '3B82F6', color: 'ffffff' },
    { id: 'rishikesh', name: 'Rishikesh', bg: 'DBEAFE', color: '1E293B' },
    { id: 'andaman', name: 'Andaman', bg: '1E40AF', color: 'ffffff' },
    { id: 'kashmir', name: 'Kashmir', bg: '3B82F6', color: 'ffffff' },
    { id: 'darjeeling', name: 'Darjeeling', bg: 'DBEAFE', color: '1E293B' },
    { id: 'udaipur', name: 'Udaipur', bg: '1E40AF', color: 'ffffff' },
    { id: 'varanasi', name: 'Varanasi', bg: '3B82F6', color: 'ffffff' },
    { id: 'agra', name: 'Agra', bg: 'DBEAFE', color: '1E293B' },
    { id: 'sikkim', name: 'Sikkim', bg: '1E40AF', color: 'ffffff' },
    { id: 'goa', name: 'Goa', bg: '1E40AF', color: 'ffffff' },
    { id: 'manali', name: 'Manali', bg: '3B82F6', color: 'ffffff' },
    { id: 'jaipur', name: 'Jaipur', bg: 'DBEAFE', color: '1E293B' }
];

destinations.forEach(dest => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${dest.name} - Meher Holidays</title>
    <meta name="description" content="Explore ${dest.name} with Meher Holidays.">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="footer.css">
</head>
<body>

    <!-- Header / Nav -->
    <header id="header">
        <div class="container nav-container">
            <a href="index.html" class="logo"><img src="images/logo.png" alt="Meher Holidays Logo"></a>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html#home">Home</a></li>
                    <li><a href="index.html#packages">Packages</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#gallery">Gallery</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>

    <!-- Destination Hero Section -->
    <section class="hero dest-page-hero" style="background-image: url('https://placehold.co/1200x600/${dest.bg}/${dest.color}?text=${dest.name}+Landscape'); height: 60vh;">
        <div class="hero-overlay"></div>
        <div class="hero-content" style="padding-top: 80px;">
            <h1 style="font-size: 3.5rem;">Discover <br><span>${dest.name}</span></h1>
        </div>
    </section>

    <!-- Destination Details -->
    <section class="section bg-light">
        <div class="container about-container" style="align-items: flex-start; text-align: left; max-width: 900px;">
            <div class="about-content" style="padding: 40px; width: 100%; text-align: left;">
                <h2 style="margin-bottom: 20px;">About ${dest.name}</h2>
                <div class="divider" style="margin: 0 0 30px 0;"></div>
                
                <p>Welcome to ${dest.name}, one of the most mesmerizing destinations in India. From its breathtaking landscapes to its vibrant culture, ${dest.name} offers an unforgettable experience for every traveler. Whether you're seeking adventure, relaxation, or spiritual awakening, this destination has something special for you.</p>
                <p>Join Meher Holidays as we take you on a carefully curated journey through the best spots, hidden gems, and local experiences that ${dest.name} has to offer.</p>
                

                <h3 style="margin-top: 40px; margin-bottom: 20px;">Travel Highlights</h3>
                <ul class="highlights-list">
                    <li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Scenic sightseeing and photography spots</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Comfortable premium accommodations</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Local culinary experiences</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Guided tours with expert local guides</li>
                </ul>

                <div style="margin-top: 50px; text-align: center;">
                    <a href="https://wa.me/917338132315?text=I'm interested in booking a trip to ${dest.name}" class="btn btn-primary" target="_blank" style="font-size: 1.1rem; padding: 15px 40px;">
                        <i class="fab fa-whatsapp"></i> Book Now via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Available Tour Packages -->
    <section class="section">
        <div class="container" style="max-width: 1000px;">
            <div class="section-title">
                <h2>Top Packages for ${dest.name}</h2>
                <p>Choose from our best-selling itineraries tailored for you</p>
            </div>
            <div class="tour-package-grid">
                <!-- Card 1 -->
                <div class="tour-package-card">
                    <div class="tp-img-wrap">
                        <img src="https://placehold.co/600x350/${dest.bg}/${dest.color}?text=${dest.name}+Highlights" alt="Package 1">
                    </div>
                    <div class="tp-content">
                        <h3>${dest.name} Essential Tour</h3>
                        <p class="trip-duration">4 Days / 3 Nights</p>
                        <div class="tp-details">
                            <p><i class="fas fa-route"></i> Arrival &#8594; City Tour &#8594; Scenic Spots &#8594; Departure</p>
                        </div>
                        <div class="tp-footer">
                            <div class="tp-price">
                                <span>Starting from</span>
                                <h4>INR 15,000/-</h4>
                            </div>
                            <div class="tp-actions">
                                <a href="https://wa.me/917338132315?text=I'm interested in the ${dest.name} Essential Tour" class="btn btn-outline" target="_blank">Contact Us</a>
                                <a href="${dest.id}.html" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="tour-package-card">
                    <div class="tp-img-wrap">
                        <img src="https://placehold.co/600x350/${dest.bg}/${dest.color}?text=${dest.name}+Adventure" alt="Package 2">
                    </div>
                    <div class="tp-content">
                        <h3>Ultimate ${dest.name} Adventure</h3>
                        <p class="trip-duration">6 Days / 5 Nights</p>
                        <div class="tp-details">
                            <p><i class="fas fa-route"></i> Arrival &#8594; Base Camp &#8594; Trekking &#8594; Departure</p>
                        </div>
                        <div class="tp-footer">
                            <div class="tp-price">
                                <span>Starting from</span>
                                <h4>INR 23,000/-</h4>
                            </div>
                            <div class="tp-actions">
                                <a href="https://wa.me/917338132315?text=I'm interested in the Ultimate ${dest.name} Adventure" class="btn btn-outline" target="_blank">Contact Us</a>
                                <a href="${dest.id}.html" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container footer-content">
            <p>&copy; 2026 Meher Holidays. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, `${dest.id}.html`), htmlContent);
});

console.log('Successfully generated 10 destination HTML files.');




