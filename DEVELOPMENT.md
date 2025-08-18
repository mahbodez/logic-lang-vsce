# Development Guide

## Quick Start

### Setup
```bash
npm install
npm run compile
```

### Development
```bash
npm run watch  # Auto-compile on changes
```

### Testing
- Press `F5` in VS Code to launch Extension Development Host
- Open a `.logic` file to test features
- Use `Ctrl+Shift+P` → "Validate Logic File" to test validation

### Building
```bash
npm run compile
vsce package  # Creates .vsix file
```

### Project Structure
```
├── src/
│   ├── extension.ts       # Main extension logic
│   └── test/              # Test files
├── syntaxes/
│   └── rule-logic.tmLanguage.json  # Syntax highlighting
├── snippets/
│   └── rule-logic.json    # Code snippets
├── language-configuration.json    # Language config
├── logo.png               # Extension icon
├── example.logic          # Example file
└── package.json           # Extension manifest
```

## Features Implemented

- ✅ Syntax highlighting for all Rule Logic constructs
- ✅ IntelliSense with function completion and documentation
- ✅ Code snippets for common patterns
- ✅ Document outline and symbol navigation
- ✅ Basic syntax validation
- ✅ Semicolon statement separation support
- ✅ Support for expect keyword
- ✅ Comprehensive built-in function library

## Publishing

See `PUBLISHING_STEPS.md` for detailed publishing instructions.