# AGENTS.md - AI Assistant Guidelines for SimplifyLearning

This document contains essential context and guidelines for AI assistants working on the SimplifyLearning project.

## 🎯 Core Principles

### **Simplicity First**
- **Primary Principle**: Simplicity is the main guiding principle for this project
- Prefer clear, readable code over clever optimizations
- Choose straightforward solutions over complex ones
- Keep user interfaces clean and intuitive
- Avoid over-engineering - solve the immediate problem effectively

### **Educational Focus**
- This is an educational platform for algorithm learning
- Code should be readable and well-documented for learning purposes
- Prioritize clarity in explanations and visualizations
- Make algorithms accessible to learners at different levels

## 🔧 Development Conventions

### **Branch Management & PR Workflow**
- `master` is the main branch (not `main`)
- **NEVER push directly to `master` branch**
- **NEVER merge PRs directly without review**
- Always use feature branches for all development work
- Create descriptive branch names like `feature/fix-header-consistency`
- All changes must go through Pull Request (PR) process
- PRs require review before merging to maintain code quality

### **Development Scripts**
- **`dev.sh`** is the primary development utility script
  - `./dev.sh start` - Start development server
  - `./dev.sh stop` - Stop development server  
  - `./dev.sh restart` - Restart development server
  - Always use `dev.sh` for server management instead of manual commands

### **Project Structure**
```
algorithms-js/
├── src/                    # Algorithm implementations
│   ├── search/            # Search algorithms
│   ├── sort/              # Sorting algorithms
│   ├── patterns/          # Pattern/sequence algorithms
├── assets/                # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript utilities
│   └── images/           # Images and icons
├── demo.html             # Algorithm demo page
├── index.html            # Main landing page
└── dev.sh               # Development utility script
```

### **File Naming Conventions**
- Algorithm files: `algorithm-name.js` (main implementation)
- Core files: `algorithm-name-core.js` (core logic, no visualization)
- Config files: `algorithm-name.config.js` (configuration)
- Use kebab-case for file and directory names
- Be consistent with existing naming patterns

## 🏗️ Architecture Patterns

### **Algorithm Structure**
- **Core Files** (`-core.js`): Pure algorithm logic, no UI/visualization
- **Visualization Files** (`.js`): UI-specific code, step-by-step demos
- **Config Files** (`.config.js`): Algorithm metadata, inputs, examples
- Separate concerns: logic vs. presentation vs. configuration

### **JavaScript Patterns**
- Use modern ES6+ features where appropriate
- Export functions for both Node.js and browser environments:
  ```javascript
  // Export pattern
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = { functionName };
  } else if (typeof window !== 'undefined') {
      window.AlgorithmCore = { functionName };
  }
  ```

### **CSS Organization**
- Main styles in `assets/css/styles.css`
- Use CSS custom properties (variables) for theming
- Support both light and dark modes
- Mobile-first responsive design approach

## 🎨 UI/UX Guidelines

### **Design Principles**
- Clean, professional interface
- Responsive design for all screen sizes
- Accessibility considerations (WCAG guidelines)
- Consistent color scheme and typography

### **Dark Mode Support**
- All new CSS must include dark mode variants
- Use CSS custom properties for theme colors
- Test both light and dark modes

### **Mobile Responsiveness**
- Test on mobile devices (especially complexity tables)
- Ensure touch-friendly interface elements
- Optimize for small screen readability

## 🚀 Development Workflow

### **Testing Approach**
- Test algorithm functionality first (core logic)
- Verify UI/visualization works correctly
- Check responsive design on multiple screen sizes
- Test dark/light mode switching
- Validate in browser console (no 404s or errors)

### **Code Quality**
- Write clear, self-documenting code
- Add comments for complex algorithm logic
- Follow existing code style and patterns
- Ensure cross-browser compatibility

### **Performance Considerations**
- Algorithm demos should handle reasonable input sizes
- Avoid blocking the main thread during animations
- Optimize for smooth user experience

## 🐛 Common Issues & Solutions

### **404 Errors**
- Often caused by missing `-core.js` files
- Ensure config files point to correct paths
- Check that all referenced scripts exist
- Verify file is not excluded by gitignore patterns
- Consider adding files to git with `git add -f filename` if needed

### **Mobile Issues**
- Tables may need horizontal scrolling on small screens
- Touch targets should be at least 44px
- Test complexity table rendering on mobile

### **Dark Mode Issues**
- New styles must include dark mode variants
- Use CSS custom properties consistently
- Test theme switching functionality

## 📝 Documentation Standards

### **Code Comments**
- Document algorithm time/space complexity
- Explain non-obvious implementation choices
- Include examples in complex functions

### **Git Commits**
- Use clear, descriptive commit messages
- Reference issues or features being implemented
- Group related changes in single commits

### **Pull Request (PR) Process**
- Create feature branch: `git checkout -b feature/descriptive-name`
- Make all changes in the feature branch
- Push branch: `git push origin feature/descriptive-name`
- Create PR using GitHub CLI: `gh pr create --title "Title" --body "Description"`
- Or create PR via GitHub web interface
- Include clear description of changes and testing done
- Wait for review before merging
- Delete feature branch after successful merge

## 🎯 Current Focus Areas

### **Recent Priorities**
- Algorithm core/visualization separation
- Mobile responsiveness improvements
- Dark mode consistency
- 404 error elimination
- Icon consistency across pages

### **Ongoing Improvements**
- Code organization and maintainability
- User experience enhancements
- Educational value optimization
- Deployment reliability
- Cross-browser compatibility testing

## 💡 Tips for AI Assistants

### **🚨 CRITICAL: Workflow Requirements**
- **NEVER push directly to `master` branch - use feature branches only**
- **NEVER merge PRs without explicit approval from maintainer**
- **ALWAYS create PRs for any code changes, no matter how small**
- Use proper branch naming: `feature/`, `fix/`, or `enhancement/` prefix
- Test thoroughly before creating PR
- Include detailed PR descriptions with testing evidence

### **Context Awareness**
- Always consider the educational purpose of changes
- Maintain consistency with existing patterns
- Ask for clarification when simplicity conflicts with functionality
- Remember this is primarily an educational resource, not a production app

### **File Management**
- Check for existing files before creating new ones
- Update related configuration when adding new files
- Maintain proper file organization
- Be aware of `.gitignore` patterns that might affect new files
- Use `git add -f filename` when necessary to override gitignore

### **Deployment Awareness**
- Main URL: https://www.designforlife.co.in/algorithms/
- GitHub Pages: https://sachinlala.github.io/SimplifyLearning/
- Files at project root are accessible from both URLs
- Subdirectory files follow the same structure (e.g., `/src/sort/algorithm.html`)

### **Testing Reminders**
- Verify changes don't break existing functionality
- Test both desktop and mobile experiences  
- Check browser console for errors after changes
- Test in multiple browsers when possible
- Verify icon/asset consistency across pages
- **Always test changes in feature branch before creating PR**
- Include testing results in PR description
- Test on both localhost and production URLs when possible

---

**Last Updated**: September 2025
**Maintainer**: Sachin Lala  
**Purpose**: Ensure consistent AI assistance across development sessions