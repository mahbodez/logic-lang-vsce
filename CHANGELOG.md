# Change Log

All notable changes to the "rule-logic-language-support" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.3.0] - 2025-08-17

### Added
- **Semicolon Statement Separation**: Support for using semicolons (`;`) to separate multiple statements on a single line
- Enhanced syntax highlighting for semicolons as statement separators
- Updated validation logic to handle semicolon-separated statements correctly
- New code snippets demonstrating semicolon usage:
  - `multi_statements`: Multiple statements on one line using semicolons
  - `const_multi`: Multiple constants and definitions using semicolons
  - `expect_define`: Expect variable and define result using semicolon
  - `quick_setup`: Quick setup with constant, expect, define, and constraint
- Improved document symbol provider to recognize statements separated by semicolons
- Enhanced language configuration for better semicolon handling

### Changed
- Updated TextMate grammar to properly highlight semicolons as punctuation
- Modified validation function to parse statements separated by semicolons
- Enhanced document outline to show individual statements from semicolon-separated lines
- Improved error reporting with accurate column positions for semicolon-separated statements

### Technical Details
- Added `splitLineByStatements()` helper function to parse semicolon-separated statements while respecting string boundaries
- Updated all language features (validation, symbols, etc.) to work with both traditional line-based and semicolon-based statement separation
- Trailing semicolons are supported and ignored as per language specification

## [1.2.0] - 2025-08-17

### Added
- **Expect Keyword Support**: New `expect` keyword for declaring which variables the script expects to be provided
- Enhanced validation for `expect` statements (single variable and comma-separated multiple variables)
- Updated hover documentation for the `expect` keyword
- New code snippets for expect statements:
  - `expect`: Single variable expectation
  - `expect_multi`: Multiple variable expectations
  - `expect_section`: Complete expected variables section template
- Updated mammography rule template to include expect declarations

### Changed
- Enhanced syntax highlighting to include the `expect` keyword
- Updated document symbol provider to recognize expect statements in outline view
- Improved IntelliSense completion to include the `expect` keyword

## [1.1.0] - 2025-08-17

### Added
- Comprehensive syntax highlighting for Rule Logic DSL
- IntelliSense support with auto-completion for:
  - Built-in functions: `exactly_one`, `sum`, `mutual_exclusion`, `clamp`, `threshold`, and more
  - Keywords: `define`, `constraint`, `const`, `weight`, `transform`
  - Transform types: `logbarrier`, `hinge`, `linear`
- Hover documentation for built-in functions
- Document outline support showing variables, constants, and constraints
- Basic syntax validation with error reporting
- Comprehensive code snippets for common patterns
- Language configuration for proper bracket matching and auto-closing

### Features
- **Built-in Functions**: Support for all Rule Logic functions including comparison operators, tensor operations, and constraint functions
- **Syntax Highlighting**: Complete TextMate grammar for operators, keywords, strings, numbers, and identifiers
- **Advanced Features**: Support for tensor indexing, multi-dimensional arrays, and complex expressions
- **Code Snippets**: Ready-to-use templates for mammography constraint rules and common patterns
- **Validation**: Real-time syntax checking with helpful error messages

## [Unreleased]

- Initial release