# Ace Editor Migration Guide

If CodeJar continues to have cursor jumping issues on Firefox, you can switch to Ace Editor.

## Steps to Migrate:

1. **Add Ace Editor to HTML** (replace CodeJar scripts):
```html
<!-- Replace these lines in index.html -->
<!-- <script src="src/codejar-linenumbers.js"></script> -->
<!-- <script src="src/codejar.js"></script> -->

<!-- With Ace Editor CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/ace.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/mode-javascript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.0/theme-monokai.js"></script>
```

2. **Update main.js** - Replace CodeJar initialization:
```javascript
// Remove:
// const jar = CodeJar(document.querySelector(".editor"), highlight);

// Add:
let aceEditor;
function initAceEditor() {
  aceEditor = ace.edit(document.querySelector(".editor"));
  aceEditor.setTheme("ace/theme/monokai");
  aceEditor.session.setMode("ace/mode/javascript");
  aceEditor.setOptions({
    fontSize: 14,
    showPrintMargin: false,
    wrap: true,
    useWorker: false, // Disable worker for better compatibility
  });
  
  aceEditor.on("change", () => {
    previewGame(aceEditor.getValue());
    saveCode();
  });
  
  return aceEditor;
}

// Initialize after DOM loads
const aceEditor = initAceEditor();

// Update code loading:
if (gameCode[0]) {
  aceEditor.setValue(gameCode[0], -1);
}

// Update code saving:
function saveCode() {
  appEditState.codeContents[appEditState.activeCodeTab] = aceEditor.getValue();
  localStorage.setItem(LOCAL_STORAGE_CODE_KEY, JSON.stringify(appEditState.codeContents));
}

// Update tab switching:
gameCodeTabs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.dataset.tab) {
      appEditState.activeCodeTab = parseInt(e.target.dataset.tab);
    }
    // Save current tab
    appEditState.codeContents[appEditState.activeCodeTab] = aceEditor.getValue();
    // Load new tab
    aceEditor.setValue(appEditState.codeContents[appEditState.activeCodeTab] || "", -1);
  });
});
```

3. **Update CSS** - Add Ace Editor styles:
```css
.editor {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
```

## Benefits of Ace Editor:
- ✅ No cursor jumping issues on Firefox
- ✅ Better performance
- ✅ More features (autocomplete, multiple cursors, etc.)
- ✅ Actively maintained
- ✅ Better mobile support

## Drawbacks:
- ⚠️ Larger file size (~500KB vs ~20KB for CodeJar)
- ⚠️ Requires CDN or local files
