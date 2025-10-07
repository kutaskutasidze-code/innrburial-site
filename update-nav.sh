#!/bin/bash
# Update navigation on all HTML files
for file in *.html; do
  if [ "$file" != "book-instruction.html" ]; then
    sed -i '' 's|<a href="gallery.html">Gallery</a>|<a href="book-burial.html">The Burial of Adam</a><li><a href="book-instruction.html">Instruction to Reality</a></li>|g' "$file"
  fi
done
