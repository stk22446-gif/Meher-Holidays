import os
import re

root_dir = r'c:\Users\hp\OneDrive\Desktop\Meher-Holidays'
packages_dir = os.path.join(root_dir, 'packages')

# 1. Update Destination Pages (root files)
dest_files = [f for f in os.listdir(root_dir) if f.endswith('.html') and f != 'index.html']
for filename in dest_files:
    filepath = os.path.join(root_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if Reviews already exists
    if '#reviews' in content:
        continue
        
    # Insert before Contact
    new_content = content.replace('<li><a href="index.html#contact">Contact</a></li>', 
                                  '<li><a href="index.html#reviews">Reviews</a></li>\n                    <li><a href="index.html#contact">Contact</a></li>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filename}")

# 2. Update Package Pages
package_files = [f for f in os.listdir(packages_dir) if f.endswith('.html')]
for filename in package_files:
    filepath = os.path.join(packages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '#reviews' in content:
        continue
        
    # Insert before Contact
    new_content = content.replace('<li><a href="../index.html#contact">Contact</a></li>', 
                                  '<li><a href="../index.html#reviews">Reviews</a></li>\n                    <li><a href="../index.html#contact">Contact</a></li>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated packages/{filename}")
