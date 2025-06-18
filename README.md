# BBC iPlayer Test Automation Framework

A comprehensive test automation framework for BBC iPlayer website using Playwright, TypeScript, and Page Object Model pattern.

## Tech Stack

- **Test Framework**: [Playwright](https://playwright.dev/)
- **Programming Language**: TypeScript 5.0+
- **Design Pattern**: Page Object Model (POM)
- **Reporting**: 
  - HTML Reports (built-in Playwright)
- **Additional Features**:
  - Screenshots on failure
  - Video recording on failure
  - Trace files for debugging
  - Cross-browser testing (Chrome, Firefox, Safari)
  - Parallel test execution
  - Custom fixtures for page objects



##  Pre-Installation Requirements

### System Requirements
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)


### Browser Requirements
The framework will automatically install and manage browser binaries:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)

## Installation & Setup

### 1. Clone/Download the Project
```bash
git clone <repository-url>
cd bbc-iplayer-playwright
```

### 2. Install Dependencies
```bash
# Install all required packages
npm install

# Install Playwright browsers (required)
npx playwright install

# Install system dependencies for browsers (Linux only)
npx playwright install-deps
```

### 3. Verify Installation
```bash
# Check Playwright installation
npx playwright --version
```



##  Running Tests

### Basic Test Execution
```bash
# Run all tests (headless mode)
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# If any of the above doesn't work the Run tests with following command
npx playwright test
```

### Browser-Specific Testing
```bash
# Run tests in Chrome only
npm run test:chrome

# Run tests in Firefox only
npm run test:firefox

# Run tests in Safari only
npm run test:safari
```

### Environment-Specific Testing
```bash
# Run tests in QA Env
npm run test:qa

# Run tests in Dev Env
npm run test:dev

# Run tests in Prod Env
npm run test:prod
```

### Parallel Execution
```bash
# Run tests in parallel (default: 4 workers)
npm run test:parallel

# Custom worker count
npx playwright test --workers=8
```


## Test Reporting

### Generate and View Reports
```bash
# Run tests and generate Playwright HTML report
npm run test:report

# Run tests and generate Allure report
npm run test:allure-report

# Generate Allure report only
npm run allure-report:generate

# View Allure report
npm run allure-report

# View Playwright HTML report
npx playwright show-report


# sample allure report - please take a look at the following file.
Screenshot 2025-06-18 at 21.48.43.png
```