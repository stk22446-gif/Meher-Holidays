import os
import glob

workspace = r"c:\Users\hp\OneDrive\Desktop\Meher-Holidays"
html_files = []

for root, dirs, files in os.walk(workspace):
    # skip hidden dirs or git
    dirs[:] = [d for d in dirs if not d.startswith('.') and not d.startswith('scratch')]
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

favicon_tag_template = """  <!-- Favicon Links -->
  <link rel="icon" type="image/png" href="{path_prefix}images/logo.png">
  <link rel="apple-touch-icon" href="{path_prefix}images/logo.png">
  <meta name="msapplication-TileImage" content="{path_prefix}images/logo.png">"""

for filepath in html_files:
    rel_path = os.path.relpath(filepath, workspace)
    depth = rel_path.count(os.sep)
    path_prefix = "../" * depth
    
    favicon_tag = favicon_tag_template.format(path_prefix=path_prefix)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if we already inserted the exact tag, if so skip
    if 'rel="icon"' in content and 'apple-touch-icon' in content:
        continue
    
    # if it had an old favicon, we can skip or replace, but for now just insert if it didn't have one
    if 'rel="icon"' not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'{favicon_tag}\n</head>', 1)
        elif '<head>' in content:
            content = content.replace('<head>', f'<head>\n{favicon_tag}', 1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Processed {len(html_files)} HTML files with complete favicon set.")
