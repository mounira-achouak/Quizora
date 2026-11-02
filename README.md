# Quizora — Interactive Quiz Platform

Quizora is a React-based quiz application with timed questions, automatic scoring, and an admin dashboard for managing quiz content and viewing user results.

## Features
- Interactive, timed quizzes
- Automatic score calculation and results
- Multiple quiz categories
- User sign-in interface
- Admin dashboard for managing questions and viewing results

## Tech Stack
- React 19
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React

## Getting Started

### Prerequisites
- Node.js (current LTS recommended)
- npm

### Installation
```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Project Notes
This is a frontend prototype. User results are stored in the browser using `localStorage`, while quiz question changes are held in application state and are not persisted after a page reload. It does not currently use a backend service or production-grade authentication.

## Build
```bash
npm run build
```

## License
No license has been specified yet.
