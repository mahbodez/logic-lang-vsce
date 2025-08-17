// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Rule Logic Language Support extension is now active!');

	// Register validation command
	const validateCommand = vscode.commands.registerCommand('rule-logic-language-support.validateLogicFile', () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.document.languageId === 'rule-logic') {
			validateLogicFile(activeEditor.document);
		} else {
			vscode.window.showWarningMessage('Please open a .logic file to validate.');
		}
	});

	// Register hover provider for built-in functions
	const hoverProvider = vscode.languages.registerHoverProvider('rule-logic', {
		provideHover(document, position, token) {
			const word = document.getWordRangeAtPosition(position);
			const hoveredWord = document.getText(word);
			
			const functionDocs: { [key: string]: string } = {
				'expect': 'Declares which variables (features) the script expects to be provided.\n\nUsage: \n- `expect variable_name`\n- `expect variable1, variable2, variable3`\n\nExample: `expect mass_L, mass_R, birads_L, birads_R`\n\nShould be placed at the beginning of the script for better error handling.',
				'exactly_one': 'Creates exactly-one constraint for categorical probabilities.\n\nUsage: `exactly_one(probabilities)`\n\nEnsures that exactly one category is selected from mutually exclusive options.',
				'sum': 'Sums probabilities for specified class indices.\n\nUsage: `sum(probabilities, [indices])`\n\nExample: `sum(birads_L, [4, 5, 6])` combines high BI-RADS categories.',
				'mutual_exclusion': 'Creates mutual exclusion constraint between probabilities.\n\nUsage: `mutual_exclusion(prob1, prob2, ...)`\n\nEnsures at most one of the given probabilities can be high.',
				'clamp': 'Clamps tensor values to specified range.\n\nUsage: `clamp(tensor, min_val, max_val)`\n\nExample: `clamp(mass_L, 0.1, 0.9)`',
				'threshold': 'Applies threshold to tensor values.\n\nUsage: `threshold(tensor, threshold)`\n\nExample: `threshold(mass_L, 0.5)`',
				'at_least_k': 'Creates constraint that at least k elements must be true.\n\nUsage: `at_least_k(probabilities, k)`\n\nExample: `at_least_k(findings_combined, 2)`',
				'at_most_k': 'Creates constraint that at most k elements can be true.\n\nUsage: `at_most_k(probabilities, k)`\n\nExample: `at_most_k(high_birads_indicators, 1)`',
				'exactly_k': 'Creates constraint that exactly k elements must be true.\n\nUsage: `exactly_k(probabilities, k)`\n\nExample: `exactly_k(radiologist_agreement, 2)`',
				'threshold_implication': 'Creates threshold-based implication constraint.\n\nUsage: `threshold_implication(antecedent, consequent, threshold)`\n\nExample: `threshold_implication(high_risk_L, findings_L, 0.7)`',
				'conditional_probability': 'Creates conditional probability constraint.\n\nUsage: `conditional_probability(condition, event, target_prob)`\n\nExample: `conditional_probability(high_birads_L, findings_L, 0.85)`',
				'greater_than': 'Creates soft greater than comparison between two tensors.\n\nUsage: `greater_than(left, right)`\n\nExample: `greater_than(confidence, baseline)`',
				'less_than': 'Creates soft less than comparison between two tensors.\n\nUsage: `less_than(left, right)`\n\nExample: `less_than(risk_score, threshold_low)`',
				'equals': 'Creates soft equality comparison between two tensors.\n\nUsage: `equals(left, right)`\n\nExample: `equals(score_a, score_b)`',
				'threshold_constraint': 'Creates threshold constraint with specified comparison operator.\n\nUsage: `threshold_constraint(tensor, threshold, operator)`\n\nExample: `threshold_constraint(birads_score, 0.7, ">")`'
			};

			if (functionDocs[hoveredWord]) {
				return new vscode.Hover(new vscode.MarkdownString(functionDocs[hoveredWord]));
			}
		}
	});

	// Register completion provider for built-in functions and keywords
	const completionProvider = vscode.languages.registerCompletionItemProvider('rule-logic', {
		provideCompletionItems(document, position, token, context) {
			const items: vscode.CompletionItem[] = [];

			// Built-in functions
			const functions = [
				{ name: 'exactly_one', detail: 'exactly_one(probabilities)', doc: 'Exactly-one constraint for categorical probabilities' },
				{ name: 'sum', detail: 'sum(probabilities, [indices])', doc: 'Sum probabilities for specified class indices' },
				{ name: 'mutual_exclusion', detail: 'mutual_exclusion(prob1, prob2, ...)', doc: 'Mutual exclusion constraint' },
				{ name: 'clamp', detail: 'clamp(tensor, min_val, max_val)', doc: 'Clamp tensor values to range' },
				{ name: 'threshold', detail: 'threshold(tensor, threshold_val)', doc: 'Apply threshold to tensor' },
				{ name: 'at_least_k', detail: 'at_least_k(probabilities, k)', doc: 'At least k elements must be true' },
				{ name: 'at_most_k', detail: 'at_most_k(probabilities, k)', doc: 'At most k elements can be true' },
				{ name: 'exactly_k', detail: 'exactly_k(probabilities, k)', doc: 'Exactly k elements must be true' },
				{ name: 'threshold_implication', detail: 'threshold_implication(antecedent, consequent, threshold)', doc: 'Threshold-based implication constraint' },
				{ name: 'conditional_probability', detail: 'conditional_probability(condition, event, target_prob)', doc: 'Conditional probability constraint' },
				{ name: 'greater_than', detail: 'greater_than(left, right)', doc: 'Soft greater than comparison' },
				{ name: 'less_than', detail: 'less_than(left, right)', doc: 'Soft less than comparison' },
				{ name: 'equals', detail: 'equals(left, right)', doc: 'Soft equality comparison' },
				{ name: 'threshold_constraint', detail: 'threshold_constraint(tensor, threshold, operator)', doc: 'Threshold constraint with comparison operator' }
			];

			functions.forEach(func => {
				const item = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Function);
				item.detail = func.detail;
				item.documentation = new vscode.MarkdownString(func.doc);
				item.insertText = new vscode.SnippetString(`${func.name}($1)`);
				items.push(item);
			});

			// Keywords
			const keywords = ['define', 'constraint', 'const', 'expect', 'weight', 'transform'];
			keywords.forEach(keyword => {
				const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
				items.push(item);
			});

			// Transform types
			const transforms = ['logbarrier', 'hinge', 'linear'];
			transforms.forEach(transform => {
				const item = new vscode.CompletionItem(`"${transform}"`, vscode.CompletionItemKind.Value);
				item.detail = `Transform: ${transform}`;
				items.push(item);
			});

			return items;
		}
	});

	// Register document symbol provider for outline view
	const symbolProvider = vscode.languages.registerDocumentSymbolProvider('rule-logic', {
		provideDocumentSymbols(document, token) {
			const symbols: vscode.DocumentSymbol[] = [];
			const text = document.getText();
			const lines = text.split('\n');

			lines.forEach((line, lineIndex) => {
				// Split the line by semicolons to handle multiple statements
				const statements = splitLineByStatements(line, lineIndex);
				
				statements.forEach(({ statement, columnStart }) => {
					// Skip empty statements and comments
					if (!statement || statement.startsWith('#')) {
						return;
					}

					// Find define statements
					const defineMatch = statement.match(/^define\s+(\w+)\s*=/);
					if (defineMatch) {
						const symbol = new vscode.DocumentSymbol(
							defineMatch[1],
							'Variable Definition',
							vscode.SymbolKind.Variable,
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length)
						);
						symbols.push(symbol);
					}

					// Find const statements
					const constMatch = statement.match(/^const\s+(\w+)\s*=/);
					if (constMatch) {
						const symbol = new vscode.DocumentSymbol(
							constMatch[1],
							'Constant Definition',
							vscode.SymbolKind.Constant,
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length)
						);
						symbols.push(symbol);
					}

					// Find expect statements
					const expectMatch = statement.match(/^expect\s+(.+)/);
					if (expectMatch) {
						const variables = expectMatch[1].trim();
						const symbol = new vscode.DocumentSymbol(
							'Expected Variables',
							variables,
							vscode.SymbolKind.Interface,
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length)
						);
						symbols.push(symbol);
					}

					// Find constraint statements
					const constraintMatch = statement.match(/^constraint\s+(.+)/);
					if (constraintMatch) {
						const symbol = new vscode.DocumentSymbol(
							'Constraint',
							constraintMatch[1].trim(),
							vscode.SymbolKind.Function,
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
							new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length)
						);
						symbols.push(symbol);
					}
				});
			});

			return symbols;
		}
	});

	context.subscriptions.push(validateCommand, hoverProvider, completionProvider, symbolProvider);
}

// Helper function to split lines by semicolons while preserving line numbers
function splitLineByStatements(line: string, lineIndex: number): { statement: string, lineIndex: number, columnStart: number }[] {
	const statements: { statement: string, lineIndex: number, columnStart: number }[] = [];
	
	// Split by semicolons, but be careful about semicolons inside strings
	let currentStatement = '';
	let inString = false;
	let stringChar = '';
	let columnStart = 0;
	
	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		
		if (!inString && (char === '"' || char === "'")) {
			inString = true;
			stringChar = char;
			currentStatement += char;
		} else if (inString && char === stringChar && line[i-1] !== '\\') {
			inString = false;
			stringChar = '';
			currentStatement += char;
		} else if (!inString && char === ';') {
			// Found a statement separator
			const trimmed = currentStatement.trim();
			if (trimmed) {
				statements.push({
					statement: trimmed,
					lineIndex: lineIndex,
					columnStart: columnStart
				});
			}
			// Reset for next statement
			currentStatement = '';
			columnStart = i + 1;
		} else {
			currentStatement += char;
		}
	}
	
	// Add the last statement if it exists
	const trimmed = currentStatement.trim();
	if (trimmed) {
		statements.push({
			statement: trimmed,
			lineIndex: lineIndex,
			columnStart: columnStart
		});
	}
	
	return statements;
}

function validateLogicFile(document: vscode.TextDocument) {
	const text = document.getText();
	const diagnostics: vscode.Diagnostic[] = [];
	const lines = text.split('\n');

	lines.forEach((line, lineIndex) => {
		// Split the line by semicolons to handle multiple statements
		const statements = splitLineByStatements(line, lineIndex);
		
		statements.forEach(({ statement, columnStart }) => {
			// Skip empty statements and comments
			if (!statement || statement.startsWith('#')) {
				return;
			}

			// Validate define statements
			if (statement.startsWith('define')) {
				if (!statement.match(/^define\s+\w+\s*=\s*.+/)) {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
						'Invalid define statement. Expected: define variable_name = expression',
						vscode.DiagnosticSeverity.Error
					);
					diagnostics.push(diagnostic);
				}
			}

			// Validate const statements
			if (statement.startsWith('const')) {
				if (!statement.match(/^const\s+\w+\s*=\s*.+/)) {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
						'Invalid const statement. Expected: const constant_name = value',
						vscode.DiagnosticSeverity.Error
					);
					diagnostics.push(diagnostic);
				}
			}

			// Validate expect statements
			if (statement.startsWith('expect')) {
				// Check for single variable: expect variable_name
				// Check for multiple variables: expect var1, var2, var3
				if (!statement.match(/^expect\s+\w+(\s*,\s*\w+)*\s*$/)) {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
						'Invalid expect statement. Expected: expect variable_name or expect var1, var2, var3',
						vscode.DiagnosticSeverity.Error
					);
					diagnostics.push(diagnostic);
				}
			}

			// Validate constraint statements
			if (statement.startsWith('constraint')) {
				if (!statement.match(/^constraint\s+.+/)) {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
						'Invalid constraint statement. Expected: constraint expression [parameters]',
						vscode.DiagnosticSeverity.Error
					);
					diagnostics.push(diagnostic);
				}
			}

			// Check for unbalanced parentheses in each statement
			const openParen = (statement.match(/\(/g) || []).length;
			const closeParen = (statement.match(/\)/g) || []).length;
			if (openParen !== closeParen) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(lineIndex, columnStart, lineIndex, columnStart + statement.length),
					'Unbalanced parentheses',
					vscode.DiagnosticSeverity.Warning
				);
				diagnostics.push(diagnostic);
			}
		});
	});

	// Clear previous diagnostics and set new ones
	const collection = vscode.languages.createDiagnosticCollection('rule-logic');
	collection.set(document.uri, diagnostics);

	if (diagnostics.length === 0) {
		vscode.window.showInformationMessage('Logic file validation passed!');
	} else {
		vscode.window.showWarningMessage(`Found ${diagnostics.length} validation issue(s).`);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
