import os

contact_html = """
  <!-- Get in Touch -->
  <section id="contact" class="section bg-pastel">
    <div class="container contact-container">
      <div class="contact-info">
        <h2>Get in Touch</h2>
        <p>Ready for your next adventure? Contact us today to plan your trip!</p>
        <div class="contact-details">
          <div class="contact-item">
            <i class="fas fa-phone-alt"></i>
            <span>+91 98765 43210</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>holidaysmeher@gmail.com</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>New Delhi, India</span>
          </div>
        </div>
        <div class="social-links">
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/917338132315" class="social-icon" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>

      <div class="contact-form-container">
        <form id="contactForm" class="contact-form">
          <div class="form-group">
            <input type="text" id="name" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <input type="tel" id="phone" placeholder="Your Phone Number" required>
          </div>
          <div class="form-group">
            <textarea id="message" rows="4" placeholder="How can we help you plan your trip?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Send Message</button>
        </form>
      </div>
    </div>
  </section>
"""

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    if 'index.html' in filepath:
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="contact"' in content:
        print(f"ALREADY_PRESENT: {filepath}")
        return

    if '<footer>' in content:
        new_content = content.replace('<footer>', contact_html + '\n  <footer>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"UPDATED: {filepath}")
    elif '<!-- Footer -->' in content:
         new_content = content.replace('<!-- Footer -->', contact_html + '\n  <!-- Footer -->')
         with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
         print(f"UPDATED: {filepath}")
    else:
        print(f"NO_FOOTER: {filepath}")

# Process all HTML files in root
root_files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in root_files:
    process_file(f)

# Process all HTML files in packages
packages_dir = "packages"
if os.path.exists(packages_dir):
    package_files = [os.path.join(packages_dir, f) for f in os.listdir(packages_dir) if f.endswith('.html')]
    for f in package_files:
        process_file(f)
