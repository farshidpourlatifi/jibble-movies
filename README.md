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

3. Create a `.env` file in the root directory:
```bash
VITE_API_BASE_URL=https://jsonmock.hackerrank.com/api/movies
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
│   ├── components/     # Reusable components
│   ├── stores/        # Pinia stores
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── types/         # TypeScript types
│   └── main.ts        # Application entry point
├── tests/
│   └── components/    # Unit tests
├── cypress/
│   ├── e2e/          # E2E tests
│   └── fixtures/     # Test data
└── public/           # Static assets
```

## Deployment

The application is automatically deployed to Firebase Hosting when changes are pushed to the `production` branch.

### Manual Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (first time only):
```bash
firebase init hosting
```

4. Deploy:
```bash
firebase deploy
```

## Environment Variables

- `VITE_API_BASE_URL`: API base URL (required)
- `FIREBASE_PROJECT_ID`: Firebase project ID (for deployment)
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (for CI/CD)

## GitHub Actions Secrets Required

For the CI/CD pipeline to work, you need to set these secrets in your GitHub repository:

- `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account JSON
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_API_BASE_URL`: Your API base URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
