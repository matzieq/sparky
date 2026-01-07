# Ace Editor Setup Instructions

## ⚠️ IMPORTANT: Download Required Files

The Ace Editor JavaScript files need to be downloaded manually. The CSS file is already included, but you need these 3 JavaScript files:

## Quick Setup (Choose One Method)

### Method 1: Direct Browser Download (Easiest)

1. Navigate to the `sparky/editor/ace-editor/` directory
2. Open these URLs in your browser and save the files:
   - https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ace.js → save as `ace.js`
   - https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-javascript.js → save as `mode-javascript.js`
   - https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-monokai.js → save as `theme-monokai.js`

### Method 2: Using wget or curl

```bash
cd sparky/editor/ace-editor
wget https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ace.js
wget https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-javascript.js
wget https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-monokai.js
```

### Method 3: Using npm

```bash
cd sparky/editor
npm install ace-builds
cp node_modules/ace-builds/src-min/ace.js ace-editor/
cp node_modules/ace-builds/src-min/mode-javascript.js ace-editor/
cp node_modules/ace-builds/src-min/theme-monokai.js ace-editor/
```

## Verify Files

After downloading, your `ace-editor/` directory should contain:
- ✅ `ace.js` (main editor file, ~500KB)
- ✅ `mode-javascript.js` (JavaScript syntax, ~50KB)
- ✅ `theme-monokai.js` (Monokai theme, ~10KB)
- ✅ `ace.css` (already included)

## What Changed

The code has been migrated from CodeJar to Ace Editor. All editor functionality now uses Ace Editor's API:
- ✅ No more cursor jumping on Firefox
- ✅ Better performance
- ✅ Built-in line numbers
- ✅ Better error handling

### Option 1: Using the download script (if SSL is configured)
```bash
cd sparky/editor
./download-ace.sh
```

### Option 2: Manual download

1. Create the `ace-editor` directory:
```bash
mkdir -p sparky/editor/ace-editor
cd sparky/editor/ace-editor
```

2. Download the following files from CDN (or from the Ace Editor GitHub releases):

**Required files:**
- `ace.js` - Main Ace Editor file
  - URL: https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ace.js
  - Or: https://github.com/ajaxorg/ace-builds/releases/download/v1.32.0/ace.js

- `mode-javascript.js` - JavaScript syntax highlighting
  - URL: https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-javascript.js
  - Or: https://github.com/ajaxorg/ace-builds/releases/download/v1.32.0/mode-javascript.js

- `theme-monokai.js` - Monokai theme
  - URL: https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-monokai.js
  - Or: https://github.com/ajaxorg/ace-builds/releases/download/v1.32.0/theme-monokai.js

- `ace.css` - Basic styles (optional but recommended)
  - You can create a minimal CSS file or download from: https://github.com/ajaxorg/ace-builds

### Option 3: Using npm (if you have Node.js)

```bash
cd sparky/editor
npm install ace-builds
# Then copy files from node_modules/ace-builds/src-min/ to ace-editor/
cp node_modules/ace-builds/src-min/ace.js ace-editor/
cp node_modules/ace-builds/src-min/mode-javascript.js ace-editor/
cp node_modules/ace-builds/src-min/theme-monokai.js ace-editor/
```

### Option 4: Download from GitHub releases

1. Visit: https://github.com/ajaxorg/ace-builds/releases
2. Download the latest release (e.g., `ace-builds-v1.32.0.zip`)
3. Extract and copy the following files from `src-min/` to `ace-editor/`:
   - `ace.js`
   - `mode-javascript.js`
   - `theme-monokai.js`

## File Structure

After setup, your directory should look like:
```
sparky/editor/
  ├── ace-editor/
  │   ├── ace.js
  │   ├── mode-javascript.js
  │   ├── theme-monokai.js
  │   └── ace.css (optional)
  ├── index.html
  ├── src/
  └── ...
```

## Verification

Once files are in place, open the editor in your browser. The Ace Editor should load automatically. If you see errors in the console, check that all files are in the `ace-editor/` directory and paths are correct.

## Benefits of Ace Editor

- ✅ No cursor jumping issues on Firefox
- ✅ Better performance
- ✅ Built-in line numbers
- ✅ Better mobile support
- ✅ More reliable than contenteditable-based editors
