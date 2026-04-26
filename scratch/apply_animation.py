import os
import re

# New animation markup WITHOUT the standard boat (only houseboat remains)
new_animation_html = """
    <!-- Travel Background Animation -->
    <div class="travel-bg-animation">
        <i class="fas fa-solid fa-cloud cloud c1"></i>
        <i class="fas fa-solid fa-cloud cloud c2"></i>
        <i class="fas fa-solid fa-cloud cloud c3"></i>
        <i class="fas fa-solid fa-plane plane"></i>
        <i class="fas fa-solid fa-motorcycle bike"></i>
        <!-- Custom Houseboat SVG -->
        <svg class="houseboat" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M496 384H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h480c8.8 0 16-7.2 16-16s-7.2-16-16-16zM464 336c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v32h416v-32zM80 192v112h352V192H80zm144 32h64v48h-64v-48zm96 0h64v48h-64v-48zm-192 0h64v48H128v-48zM256 32L64 160h384L256 32z"/>
        </svg>
    </div>
"""

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Remove ANY version of the animation block
    pattern = r'<!-- Travel Background Animation -->\s*<div class="travel-bg-animation">.*?</div>'
    new_content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # 2. Add the NEW animation before </body>
    if '</body>' in new_content:
        new_content = new_content.replace('</body>', new_animation_html + '</body>')
        
        # 3. Save if changed
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"CLEANED: {filepath}")
    else:
        print(f"NO_BODY_TAG: {filepath}")

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
