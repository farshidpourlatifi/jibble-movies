# Jibble Movies

A Vue.js application for searching and managing favorite movies. Live demo: [https://jibble-movies.web.app](https://jibble-movies.web.app)

## Features

- Search movies using the OMDB API
- Add/remove movies to favorites
- Responsive design
- Pagination
- Unit and E2E testing
- TypeScript support

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Vue Router
- Tailwind CSS
- Vite
- Vitest for unit testing
- Cypress for E2E testing
- Firebase Hosting

## Prerequisites

- Node.js (v20+)
- pnpm (v8+)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/jibble-movies.git
cd jibble-movies
```

2. Install dependencies:
```bash
pnpm install
```

## Available Commands

### Development
```bash
# Start development server
pnpm dev

# Type checking
pnpm type-check
```

### Testing
```bash
# Run unit tests
pnpm test:unit

# Run unit tests in watch mode
pnpm test:watch

# Run E2E tests in headless mode
pnpm test:e2e

# Open Cypress for E2E testing
pnpm test:e2e:dev

# Run E2E tests in CI mode
pnpm test:e2e:ci
```

### Building
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure
```
├── src/
│   ├── components/    # Reusable components
│   ├── stores/        # Pinia stores
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── types/         # TypeScript types
│   └── main.ts        # Application entry point
├── tests/
│   └── components/    # Unit tests
├── cypress/
│   ├── e2e/           # E2E tests
│   └── fixtures/      # Test data
└── public/            # Static assets
```

## Deployment

The application is automatically deployed to Firebase Hosting when changes are pushed to the `production` branch.


## Development Guidelines

### Code Style Rules (.cursorrules)

The project uses a `.cursorrules` file to define coding standards and best practices.


### Project Instructions (instructions.txt)

The `instructions.txt` file contains important project guidelines


## License

MIT
