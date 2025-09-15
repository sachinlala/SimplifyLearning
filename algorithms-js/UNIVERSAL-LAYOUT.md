# Universal Layout System

## 🎯 Purpose
The Universal Layout System ensures consistent header and footer across ALL pages in the SimplifyLearning project, preventing future layout inconsistencies.

## ✅ Correct Header Sequence
**Desktop**: Ham Menu → SL Logo → GitHub Icon  
**Mobile**: Ham Menu (left), SL Logo (center), Theme Toggle (right)

## 🚀 Quick Usage

### For New Pages
Add this to any new HTML page:

```html
<!-- Include the universal layout script -->
<script src="assets/js/universal-layout.js"></script>

<!-- Initialize after DOM loads -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    UniversalLayout.init();
  });
</script>
```

### For Existing Pages
The system can replace existing headers/footers:

```html
<!-- Your existing header/footer will be replaced automatically -->
<script src="assets/js/universal-layout.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    UniversalLayout.init({
      isSortingAlgorithm: true  // Optional: for sorting algorithm pages
    });
  });
</script>
```

## 🔧 Configuration Options

```javascript
UniversalLayout.init({
  isSortingAlgorithm: true,  // Adds "Sorting Algorithms" navigation link
  // Additional config options can be added as needed
});
```

## 🏗️ Implementation Details

### Automatic Detection
- **Base Path**: Auto-detects production vs localhost paths
- **Sorting Algorithm Pages**: Auto-detects based on URL patterns
- **Asset Paths**: Handles relative vs absolute paths correctly

### What Gets Replaced
- `<header>` element → Standardized header with correct sequence
- `#sidebar-overlay` element → Standardized sidebar with mobile controls  
- `<footer>` element → Standardized footer with current year

### Path Handling
- **Production**: Uses full paths like `/algorithms/assets/...`
- **Development**: Uses relative paths like `assets/...`
- **Subdirectories**: Handles algorithm demo pages correctly

## 📋 Migration Guide

### Step 1: Include the Script
Add `universal-layout.js` to your page:
```html
<script src="assets/js/universal-layout.js"></script>
```

### Step 2: Initialize
Call the init function after DOM loads:
```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    UniversalLayout.init();
  });
</script>
```

### Step 3: Remove Old Code (Optional)
You can remove existing header/footer HTML as it will be replaced automatically.

## 🎨 Benefits

1. **Consistency**: All pages have identical header sequence
2. **Maintainability**: Single source of truth for layout
3. **Future-Proof**: New pages automatically get correct layout
4. **Path Safety**: Handles production/development differences
5. **Mobile Responsive**: Consistent mobile experience

## 🧪 Testing

After implementing, verify:
- [ ] Desktop header shows: Ham Menu → SL Logo → GitHub Icon
- [ ] Mobile header shows SL Logo in center
- [ ] All navigation links work correctly
- [ ] Theme toggle functions properly
- [ ] Console shows: "✅ Universal Layout initialized..."

## 🚨 Important Notes

- Include this script on EVERY new page
- Do not manually create headers/footers anymore
- The system auto-detects context and adjusts accordingly
- Always test on both localhost and production

## 📖 Examples

### Basic Page
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Algorithm Page</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <!-- Header will be inserted here -->
  <main>
    <!-- Your content -->
  </main>
  <!-- Footer will be inserted here -->
  
  <script src="assets/js/universal-layout.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      UniversalLayout.init();
    });
  </script>
</body>
</html>
```

### Sorting Algorithm Page
```html
<!-- For pages in /src/sort/ or related to sorting -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    UniversalLayout.init({
      isSortingAlgorithm: true  // Adds sorting algorithms navigation
    });
  });
</script>
```

---

**Last Updated**: September 2025  
**Maintainer**: AI Assistant following AGENTS.md principles  
**Status**: Ready for implementation across all pages