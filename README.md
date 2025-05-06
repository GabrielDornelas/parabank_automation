# Parabank Automation with Playwright

This project contains automated tests for the Parabank demo site using Playwright.

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node.js package manager)

## Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Install required browsers:

```bash
npx playwright install
```

## Running Tests

To run tests in headless mode (without GUI):

```bash
npm test
```

To run tests with GUI:

```bash
npm run test:headed
```

## Test Flow

1. Navigates to Parabank website
2. Registers a new user with random credentials
3. Logs in with the created credentials
4. Performs a bill payment
5. Verifies the payment confirmation

## Screenshots

The test captures screenshots at key points in the `test-results` directory:

- Registration form filled
- Registration success
- Bill payment form
- Bill payment form filled
- Payment confirmation

## Test Reports

After test execution, you can view the HTML report:

```bash
npx playwright show-report
```

## Project Structure

- `tests/`: Contains test files
- `package.json`: Project settings and dependencies
- `playwright.config.ts`: Playwright configuration
- `test-results/`: Contains test execution results and screenshots

```
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
└── tests
    └── parabank.spec.ts
```
