# VS Code Extension for Rule Logic DSL

This project is a VS Code extension for the Rule Logic domain-specific language (DSL). The extension provides:

- Syntax highlighting for .logic files
- Language support for mammography constraint rules
- IntelliSense for built-in functions and keywords
- Error detection and validation
- Code snippets for common patterns

## Language Features

The Rule Logic DSL includes:
- **Keywords**: define, constraint, weight, transform
- **Logical Operators**: | (OR), & (AND), ~ (NOT), >> (IMPLIES), ^ (XOR)
- **Built-in Functions**: exactly_one, sum, mutual_exclusion, clamp, threshold
- **Data Types**: numbers, strings, lists, identifiers
- **Comments**: # single-line comments

## Development Guidelines

- Follow VS Code extension best practices
- Use TypeScript for type safety
- Implement proper language server features
- Include comprehensive test coverage
- Provide clear documentation and examples

## Project Status

The extension is complete and ready for use with the following features implemented:
- ✅ Syntax highlighting via TextMate grammar
- ✅ Language configuration for .logic files
- ✅ IntelliSense and auto-completion
- ✅ Hover documentation for built-in functions
- ✅ Code snippets for common patterns
- ✅ Document outline support
- ✅ Basic syntax validation
- ✅ File association for .logic extensions