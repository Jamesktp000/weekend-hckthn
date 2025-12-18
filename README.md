# Web Search Chatbot

A modern web-based search engine and chatbot service with a unified interface. Built with Next.js, Express, TypeScript, and PostgreSQL.

## Project Structure

```
web-search-chatbot/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   └── app/          # Next.js App Router pages
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
├── backend/              # Express API server
│   ├── src/
│   │   └── index.ts     # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── shared/               # Shared TypeScript types
│   ├── src/
│   │   ├── index.ts
│   │   └── types.ts     # API contracts and interfaces
│   ├── package.json
│   └── tsconfig.json
└── package.json          # Root workspace configuration
```

## Tech Stack

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** with purple-pink dark theme
- **React 18**

### Backend
- **Node.js 20+**
- **Express.js**
- **TypeScript** (strict mode)
- **PostgreSQL** with pg driver
- **Winston** for logging

### Shared
- **TypeScript** interfaces for API contracts
- Type-safe communication between frontend and backend

## Getting Started

### Prerequisites
- Node.js 20+ LTS
- npm or yarn
- PostgreSQL 16+ (for database)

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

Or install individually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../shared && npm install
```

2. Set up environment variables:

**Frontend** (`.env.local`):
```bash
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your configuration
```

**Backend** (`.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

### Development

Build shared types first:
```bash
npm run build:shared
```

Run both frontend and backend:
```bash
npm run dev
```

Or run individually:
```bash
# Frontend (http://localhost:3000)
npm run dev:frontend

# Backend (http://localhost:4000)
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

This will build:
1. Shared types package
2. Frontend Next.js application
3. Backend Express server

## Code Quality

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## Configuration

### TypeScript
All projects use strict mode with the following enabled:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

### ESLint & Prettier
- ESLint configured for TypeScript
- Prettier for consistent code formatting
- Shared configuration across all packages

## Features

- 🔍 Web search functionality
- 💬 Interactive chatbot
- 🎨 Purple-pink dark theme
- 📱 Responsive design
- 🔒 Type-safe API contracts
- 🐳 Docker support (coming soon)

## License

ISC
