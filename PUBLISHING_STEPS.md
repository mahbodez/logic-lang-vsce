# Publishing Steps for Rule Logic Language Support Extension

## Prerequisites Setup

### 1. Create Publisher Account
- Go to: https://marketplace.visualstudio.com/manage/publishers/
- Sign in with Microsoft/Azure account
- Create publisher with ID: `mahbodez` (or your preferred ID)
- Fill in publisher details

### 2. Create Personal Access Token (PAT)
- Go to: https://dev.azure.com/_usersSettings/tokens
- Create new token with:
  - Name: "VS Code Extension Publishing"
  - Organization: All accessible organizations  
  - Scopes: Custom defined → Marketplace (Manage)
- Copy the generated token

### 3. Authenticate vsce
```bash
vsce login mahbodez
# Enter your PAT when prompted
```

### 4. Publish Extension
```bash
vsce publish
```

## Alternative: Manual Upload

If you prefer manual upload:
1. Go to https://marketplace.visualstudio.com/manage/publishers/mahbodez
2. Click "New extension" → "Visual Studio Code"
3. Upload the `rule-logic-language-support-1.0.0.vsix` file
4. Fill in the required details and publish

## Extension Details

- **Name**: Rule Logic Language Support
- **Version**: 1.0.0
- **Description**: Language support for Rule Logic DSL files (.logic) with syntax highlighting and IntelliSense
- **Publisher**: mahbodez
- **Categories**: Programming Languages
- **License**: MIT

## Post-Publication

After publishing, your extension will be available at:
`https://marketplace.visualstudio.com/items?itemName=mahbodez.rule-logic-language-support`

Users can install it with:
```bash
ext install mahbodez.rule-logic-language-support
```