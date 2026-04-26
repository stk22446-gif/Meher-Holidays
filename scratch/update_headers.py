import os
import re

packages_dir = r'c:\Users\hp\OneDrive\Desktop\Meher-Holidays\packages'
files = [f for f in os.listdir(packages_dir) if f.endswith('.html')]

new_header = """    <header id="header">
        <div class="container nav-container">
            <a href="../index.html" class="logo"><img src="../images/logo.png" alt="Meher Holidays Logo"></a>
            <nav>
                <ul class="nav-links">
                    <li><a href="../index.html#home">Home</a></li>
                    <li><a href="../index.html#packages">Packages</a></li>
                    <li><a href="../index.html#about">About</a></li>
                    <li><a href="../index.html#gallery">Gallery</a></li>
                    <li><a href="../index.html#contact">Contact</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>"""

# Pattern to match the header block, including potential comments around it
# We'll look for <header id="header"> ... </header>
header_pattern = re.compile(r'<!--\s*Header\s*/\s*Nav\s*-->\s*<header id="header">.*?</header>', re.DOTALL)
# If no comment
header_pattern_no_comment = re.compile(r'<header id="header">.*?</header>', re.DOTALL)

for filename in files:
    filepath = os.path.join(packages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Also fix any color that is not gold in the Why Visit section
    content = content.replace('color: #2661be;', 'color: #ffd700;')
    
    if header_pattern.search(content):
        updated_content = header_pattern.sub(f'<!-- Header / Nav -->\n{new_header}', content)
    elif header_pattern_no_comment.search(content):
        updated_content = header_pattern_no_comment.sub(new_header, content)
    else:
        print(f"Header not found in {filename}")
        continue
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print(f"Updated {filename}")
