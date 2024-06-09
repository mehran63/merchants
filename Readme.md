# Web Assignment

ZipCo code challenge

## Prerequisites

Before you begin, ensure you have installed the latest version of:

- Node.js
- npm

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

## Running the optimised version

To start the optimised, production-ready, instance, run:

```bash
npm run build
npm run start
```

## Code Structure

- /pages/index.tsx
  - The only page has SSR and CSR
- /pages/api/
  - The GraphQL api to get merchants for both SSR and CSR
- /components/
  - The components
- /service/
  - The GraphQL api consumer logic for both SSR and CSR
- /styles/
  - CSS styles
- .next/
  - build outpur directory

## Running Unit Tests

To run the test suite, execute:

```bash
npm run test
```

## Running E2E Tests

Firs run the app if it is not up already:

```bash
npm run build
npm run start
```

To run the test suite, execute:

```bash
npm run e2e
```
