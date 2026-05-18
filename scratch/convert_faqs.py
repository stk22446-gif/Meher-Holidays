import os
import re
import json

def convert_file(filepath):
    print(f"Converting FAQs in {filepath}...")
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find the faqs array block
    # Regex to find: const faqs = [ ... ];
    faq_match = re.search(r'const faqs\s*=\s*(\[\s*\{.*?\}\s*\]);', content, re.DOTALL)
    if not faq_match:
        print(f"No faqs array found in {filepath}")
        return False

    faqs_str = faq_match.group(1)
    
    # Let's parse the javascript array safely using json or custom evaluation
    # Since it's a JS object literal, we can do some cleaning to make it valid JSON
    # or use eval since we are in a safe local environment.
    try:
        # Clean up some JS comments if any, and wrap keys in double quotes
        # A simpler way is to just evaluate it using Python's eval or safe_eval
        # Let's clean the string to make it JSON:
        # 1. Replace single quotes with double quotes (handling escaped quotes is tricky, but let's see if we can do a standard parse)
        # Or let's just use a simple state-machine or regex parser to pull questions and answers
        items = []
        qa_pairs = re.findall(r'question:\s*"(.*?)"\s*,\s*answer:\s*"(.*?)"', faqs_str, re.DOTALL)
        if not qa_pairs:
            # Try single quotes
            qa_pairs = re.findall(r"question:\s*'(.*?)'\s*,\s*answer:\s*'(.*?)'", faqs_str, re.DOTALL)
        
        for q, a in qa_pairs:
            # Clean up escape characters
            q = q.replace('\\"', '"').replace("\\'", "'").strip()
            a = a.replace('\\"', '"').replace("\\'", "'").strip()
            items.append({"question": q, "answer": a})

        if not items:
            # Let's do a fallback parser if regex missed it
            # We can evaluate the array using python's dict parsing if we replace Javascript structures
            # Let's try replacing keys with quotes
            cleaned = faqs_str
            cleaned = re.sub(r'(\w+):', r'"\1":', cleaned)
            cleaned = cleaned.replace("'", '"')
            # remove trailing commas before closing braces/brackets
            cleaned = re.sub(r',\s*([\]}])', r'\1', cleaned)
            try:
                items = json.loads(cleaned)
            except Exception as ex:
                print(f"JSON parsing failed: {ex}. Retrying with eval...")
                # Safe eval by defining local null/true/false if needed
                items = eval(faqs_str, {"__builtins__": None}, {})

        print(f"Parsed {len(items)} FAQ items from {filepath}")
    except Exception as e:
        print(f"Failed to parse FAQ array in {filepath}: {e}")
        return False

    # Generate HTML block
    html_lines = []
    html_lines.append('        <div class="faq-container">')
    for index, item in enumerate(items):
        q = item['question']
        a = item['answer']
        html_lines.append(f'            <!-- FAQ Item {index + 1} -->')
        html_lines.append(f'            <div class="faq-item" id="faq-{index}">')
        html_lines.append(f'                <div class="faq-question">')
        html_lines.append(f'                    <h3>Q: {q}</h3>')
        html_lines.append(f'                    <span class="faq-arrow"><i class="fas fa-chevron-down"></i></span>')
        html_lines.append(f'                </div>')
        html_lines.append(f'                <div class="faq-answer">')
        html_lines.append(f'                    <div class="faq-answer-content">')
        html_lines.append(f'                        A: {a}')
        html_lines.append(f'                    </div>')
        html_lines.append(f'                </div>')
        html_lines.append(f'            </div>')
    html_lines.append('        </div>')
    
    faq_html_block = '\n'.join(html_lines)

    # 1. Replace <div class="faq-container">...</div> with our static HTML block
    # Let's handle different spacing / tags
    new_content = re.sub(r'<div class="faq-container">.*?</div>', faq_html_block, content, flags=re.DOTALL)

    # 2. Remove the <script> const faqs = ... </script> block completely
    # It might be:
    # <script>
    #     const faqs = [ ... ];
    # </script>
    # Let's search for script tags containing 'const faqs'
    script_regex = r'<script>\s*const faqs\s*=\s*\[.*?\];\s*</script>'
    new_content = re.sub(script_regex, '', new_content, flags=re.DOTALL)

    # In case there's spaces or indentation variation:
    script_regex_var = r'<script>\s*const faqs\s*=\s*\[.*?\];?\s*</script>'
    new_content = re.sub(script_regex_var, '', new_content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Successfully converted FAQs in {filepath} to static HTML!")
    return True

# Scan all html files in directory
dir_path = r'c:\Users\hp\OneDrive\Desktop\Meher-Holidays'
for filename in os.listdir(dir_path):
    if filename.lower().endswith('.html') and filename.lower() != 'package-template.html':
        filepath = os.path.join(dir_path, filename)
        try:
            convert_file(filepath)
        except Exception as e:
            print(f"Error converting {filename}: {e}")
