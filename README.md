# Rule Logic Language Support

A VS Code extension that provides comprehensive language support for Rule Logic DSL files (`.logic`), designed for defining soft logic constraints in mammography classification and other medical imaging applications.

## Features

### 🎨 **Syntax Highlighting**
- Keywords: `define`, `constraint`, `const`, `weight`, `transform`
- Logical operators: `|` (OR), `&` (AND), `~` (NOT), `>>` (IMPLIES), `^` (XOR)
- Comparison operators: `>`, `<`, `>=`, `<=`, `==`
- Tensor operations: `| tensor` (OR_n), `& tensor` (AND_n)
- Indexing syntax: `tensor[index]`, `tensor[start:end]`, `tensor[i, j]`
- Built-in functions: `exactly_one`, `sum`, `mutual_exclusion`, `at_least_k`, `at_most_k`, `exactly_k`, `threshold_implication`, `conditional_probability`, `greater_than`, `less_than`, `equals`, `threshold_constraint`, `clamp`, `threshold`
- Comments, strings, numbers, and identifiers

### 🔍 **IntelliSense & Auto-completion**
- Context-aware suggestions for built-in functions
- Keyword completion with snippets
- Transform type suggestions (`logbarrier`, `hinge`, `linear`)
- Function parameter hints

### 📖 **Hover Documentation**
- Detailed documentation for built-in functions
- Usage examples and parameter descriptions
- Function signatures and return types

### 🎯 **Code Snippets**
- Quick templates for common constraint patterns
- Mammography-specific rule templates
- Variable definition shortcuts
- Complete rule file templates

### 🔧 **Language Features**
- Document outline view showing variables and constraints
- Basic syntax validation
- Parentheses matching and auto-closing
- Comment toggling support

### ⚡ **Commands**
- **Validate Logic File**: Check syntax and structure of `.logic` files

## Usage

### Creating Logic Files

1. Create a new file with `.logic` extension
2. Start typing rule definitions using the provided snippets
3. Use IntelliSense for function completion and documentation

### Example Logic File

```logic
# Mammography Constraint Rules
# ============================

# Define constants for reusable thresholds
const high_risk_threshold = 0.7
const low_risk_threshold = 0.3
const birads_high_cutoff = 4

# Feature definitions - combine findings per breast
define findings_L = mass_L | mc_L
define findings_R = mass_R | mc_R

# BI-RADS probability groups using constants
define high_birads_L = sum(birads_L, [4, 5, 6])
define high_birads_R = sum(birads_R, [4, 5, 6])

# Threshold-based risk assessments
define high_risk_L = birads_score_L > high_risk_threshold
define high_risk_R = birads_score_R > high_risk_threshold

# Consensus patterns with tensor operations
define radiologist_consensus = & radiologist_assessments
define any_concern = | radiologist_assessments

# Multi-dimensional indexing
define patient_subset = patient_data[:3]
define senior_opinions = assessments[:, :, 0]

# Range constraints using comparison operators
define valid_range_L = (birads_score_L >= 0.0) & (birads_score_L <= 1.0)

# Categorical exclusivity constraints
constraint exactly_one(birads_L) weight=1.0 transform="logbarrier"
constraint exactly_one(birads_R) weight=1.0 transform="logbarrier"

# Logical implication constraints
constraint high_risk_L >> findings_L weight=0.8 transform="logbarrier"
constraint high_risk_R >> findings_R weight=0.8 transform="logbarrier"

# Advanced constraint types
constraint at_least_k(findings_combined, 2) weight=0.6 transform="logbarrier"
constraint conditional_probability(high_birads_L, findings_L, 0.85) weight=0.8
constraint equals(left_assessment, right_assessment) weight=0.4 transform="hinge"
```

### Available Snippets

Type the following prefixes for quick templates:

**Basic Constructs:**
- `define` - Variable definition
- `const` - Constant definition  
- `constraint` - Basic constraint
- `comment` - Comment block

**Constraint Types:**
- `exactly_one` - Categorical constraint
- `at_least_k` - At-least-k constraint
- `at_most_k` - At-most-k constraint
- `exactly_k` - Exactly-k constraint
- `implies` - Implication constraint
- `threshold_implication` - Threshold-based implication
- `conditional_probability` - Conditional probability constraint
- `mutual_exclusion` - Mutual exclusion constraint

**Functions & Comparisons:**
- `sum` - Sum function
- `greater_than` - Soft greater than comparison
- `less_than` - Soft less than comparison
- `equals` - Soft equality comparison
- `threshold_constraint` - Threshold constraint with operators
- `clamp` - Clamp function
- `threshold` - Threshold function

**Comparison Operators:**
- `greater` - Greater than comparison (`>`)
- `less` - Less than comparison (`<`)
- `equal` - Equality comparison (`==`)
- `range` - Range constraint with min/max

**Tensor Operations:**
- `index` - Tensor indexing
- `slice` - Tensor slicing
- `multi_index` - Multi-dimensional indexing
- `and_tensor` - AND across tensor (`& tensor`)
- `or_tensor` - OR across tensor (`| tensor`)
- `consensus` - Consensus definition
- `any_evidence` - Any evidence definition

**Medical Domain Templates:**
- `findings` - Findings definition template
- `high_birads` - High BI-RADS definition
- `risk_assessment` - Risk assessment with threshold
- `constants` - Constants section template
- `mammo_template` - Complete mammography rule template
- `advanced_template` - Advanced template with tensor operations

## Language Syntax

### Keywords

- `define` - Define variables and expressions
- `const` - Define constants for reusable values
- `constraint` - Create constraint rules
- `weight` - Set constraint importance (default: 1.0)
- `transform` - Choose penalty function (`logbarrier`, `hinge`, `linear`)

### Operators

**Logical Operators:**
- `|` - Logical OR (binary and n-ary: `| tensor`)
- `&` - Logical AND (binary and n-ary: `& tensor`)
- `~` - Logical NOT
- `^` - Logical XOR
- `>>` - Logical IMPLIES
- `=` - Assignment

**Comparison Operators:**
- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal
- `<=` - Less than or equal
- `==` - Equal

**Indexing Operations:**
- `tensor[index]` - Single element indexing
- `tensor[start:end]` - Slicing
- `tensor[i, j]` - Multi-dimensional indexing
- `tensor[:2]` - Slice from beginning
- `tensor[::2]` - Step slicing

### Built-in Functions

**Basic Constraints:**
- `exactly_one(probabilities)` - Exactly-one constraint for categorical data
- `sum(probabilities, [indices])` - Sum specific class probabilities
- `mutual_exclusion(prob1, prob2, ...)` - Mutual exclusion constraint

**Counting Constraints:**
- `at_least_k(probabilities, k)` - At least k elements must be true
- `at_most_k(probabilities, k)` - At most k elements can be true
- `exactly_k(probabilities, k)` - Exactly k elements must be true

**Advanced Constraints:**
- `threshold_implication(antecedent, consequent, threshold)` - Threshold-based implication
- `conditional_probability(condition, event, target_prob)` - Conditional probability constraint

**Comparison Functions:**
- `greater_than(left, right)` - Soft greater than comparison
- `less_than(left, right)` - Soft less than comparison
- `equals(left, right)` - Soft equality comparison
- `threshold_constraint(tensor, threshold, operator)` - Threshold with operator

**Utility Functions:**
- `clamp(tensor, min, max)` - Clamp values to range
- `threshold(tensor, threshold)` - Apply threshold

### Data Types

- **Numbers**: `1.0`, `0.5`, `2`, `0.85`
- **Strings**: `"logbarrier"`, `'hinge'`, `">"`, `"=="`
- **Lists**: `[1, 2, 3]`, `[4, 5, 6]`
- **Identifiers**: `mass_L`, `birads_R`, `findings_L`
- **Constants**: User-defined reusable values

## Requirements

- Visual Studio Code version 1.103.0 or higher
- No additional dependencies required

## Extension Commands

This extension contributes the following commands:

- `rule-logic-language-support.validateLogicFile`: Validate the current .logic file for syntax errors

Access commands via:
- Command Palette (`Ctrl+Shift+P`): Search for "Validate Logic File"
- Right-click context menu in .logic files

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Search for "Rule Logic Language Support"
4. Click Install

### From VSIX Package
1. Download the `.vsix` file
2. Open VS Code
3. Run command: `Extensions: Install from VSIX...`
4. Select the downloaded file

## Development

### Building the Extension
```bash
npm install
npm run compile
```

### Testing
```bash
npm test
```

### Packaging
```bash
npm install -g vsce
vsce package
```

## Related Projects

This extension is designed to work with the Rule Logic DSL framework for mammography constraint definitions. For more information about the underlying language and framework, see the main project documentation.

## Known Issues

- Advanced semantic validation is not yet implemented
- Error recovery could be improved for malformed syntax
- No language server protocol implementation yet

## Release Notes

### 1.0.0

Major update with comprehensive Rule Language support:

- **Enhanced Syntax Highlighting**: Added support for `const` keyword, comparison operators (`>`, `<`, `>=`, `<=`, `==`), tensor operations (`| tensor`, `& tensor`), and indexing syntax
- **Expanded Built-in Functions**: Added `at_least_k`, `at_most_k`, `exactly_k`, `threshold_implication`, `conditional_probability`, `greater_than`, `less_than`, `equals`, `threshold_constraint`
- **Constant Definitions**: Support for `const` statements and reusable constants
- **Tensor Operations**: AND_n and OR_n operations across tensors, multi-dimensional indexing with numpy/pytorch syntax
- **Comparison Operators**: Native support for `>`, `<`, `>=`, `<=`, `==` with proper syntax highlighting
- **Advanced Snippets**: 40+ new code snippets covering all language features including tensor operations, consensus patterns, and medical domain templates
- **Enhanced IntelliSense**: Completion for all new functions and operators
- **Improved Documentation**: Comprehensive hover help for all built-in functions
- **Better Validation**: Recognition of `const` statements and expanded syntax validation

### 0.0.1

Initial release of Rule Logic Language Support:
- Basic syntax highlighting for .logic files
- IntelliSense with function completion
- Code snippets for common patterns
- Hover documentation for built-in functions
- Document outline support
- Basic syntax validation

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## License

This extension is released under the MIT License.

---

**Enjoy using Rule Logic Language Support!**
