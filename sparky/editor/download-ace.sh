#!/bin/bash
# Script to download Ace Editor files locally
# Run this script from the editor directory: ./download-ace.sh

ACE_VERSION="1.32.0"
ACE_DIR="ace-editor"

echo "Downloading Ace Editor v${ACE_VERSION}..."

# Create directory for Ace Editor
mkdir -p ${ACE_DIR}

# Download Ace Editor files
cd ${ACE_DIR}

# Main Ace Editor file
curl -L "https://cdnjs.cloudflare.com/ajax/libs/ace/${ACE_VERSION}/ace.js" -o ace.js

# JavaScript mode
curl -L "https://cdnjs.cloudflare.com/ajax/libs/ace/${ACE_VERSION}/mode-javascript.js" -o mode-javascript.js

# Monokai theme
curl -L "https://cdnjs.cloudflare.com/ajax/libs/ace/${ACE_VERSION}/theme-monokai.js" -o theme-monokai.js

# Optional: Download other useful files
# Worker file (for better performance, but can be disabled)
curl -L "https://cdnjs.cloudflare.com/ajax/libs/ace/${ACE_VERSION}/worker-javascript.js" -o worker-javascript.js

echo "Ace Editor files downloaded to ${ACE_DIR}/"
echo "Files:"
ls -lh

cd ..
