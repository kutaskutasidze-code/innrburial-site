import re

nav_html = '''            <div class="nav-menu">
                <a href="book-burial.html">The Burial of Adam</a>
                <a href="book-instruction.html">Instruction to Reality</a>
                <a href="book-order.html">Order</a>
                <a href="contact.html">Contact</a>
            </div>'''

files = ['book-burial.html', 'book-instruction.html', 'book-order.html', 'contact.html', 'book.html']

for file in files:
    try:
        with open(file, 'r') as f:
            content = f.read()
        content = re.sub(r'<div class="nav-menu">.*?</div>', nav_html, content, flags=re.DOTALL)
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")
    except: pass
