# CineGrid — Movie Discovery App

EPITA Bachelor in Computer Science — S5  
Front-End Frameworks (2627_BSI_CS_S05_PROG_FEF)

CineGrid is a React application that lets users discover and explore movies using data from the TMDB API. It includes movie search, genre filtering, sorting, favourites, and a personal watchlist.

## Features

- **Movie discovery:** Browse popular movies using the TMDB API.
- **Search:** Find movies by title.
- **Genre filtering:** Filter movies by genre.
- **Sorting:** Organise movies using different sorting criteria.
- **Favourites:** Save and manage favourite movies.
- **Watchlist:** Add movies you want to watch later. Your watchlist is saved in localStorage.
- **Theme:** Switch between dark and light mode. Your preference is saved.
- **Movie details:** Open a modal to view more information about a movie.
- **Routing:** Navigate between the home page and About page, with a 404 page for unknown routes.
- **Fallback data:** The application can use sample movies when no TMDB API key is configured.

## Prerequisites

- Node.js 18 or higher — https://nodejs.org
- A free TMDB account and API key — https://www.themoviedb.org/settings/api

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the TMDB API key

Create a `.env` file in the project root and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_read_access_token
```

Use the API Read Access Token from TMDB Settings → API.

If no API key is configured, the application uses its local sample movie data.

### 3. Start the development server

```bash
npm run dev
```

The application runs at http://localhost:5173.

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Type-check and production build
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
npm run test:run         # Run tests once
npm run test:run:verbose # Run tests with per-test detail
npm run test             # Run tests in watch mode
npm run preview          # Preview the production build
```

## Project Architecture

- **App.tsx:** Configures application routing and providers.
- **AppContext.tsx:** Manages shared application state, including theme, favourites, and watchlist.
- **HomePage.tsx:** Handles the home page, search, filters, sorting, and local UI state.
- **MovieCard.tsx:** Displays individual movies and provides favourite and watchlist actions.
- **MovieModal.tsx:** Displays additional movie information.
- **movieService.ts:** Fetches movie data from TMDB or uses local fallback data.
- **storage.ts:** Handles persistent data using localStorage.

## State Management

The application uses React Context and useReducer to share global state between components without passing props through multiple levels.

localStorage is used to preserve favourites, watchlist items, and theme preferences across page reloads.

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| React Router 6 | Client-side routing |
| TypeScript 5 | Static typing |
| Vite 5 | Build tool and development server |
| Vitest + Testing Library | Testing |
| TMDB API v3 | Movie data |
| Context API + useReducer | Global state management |
| localStorage | Persistent user preferences and lists |

## Submitting

Each milestone has its own tag. Push the tag for the milestone you are submitting to trigger the automated tests on GitHub Actions.

| Milestone | Tag |
|---|---|
| Milestone 1 — Props, State, useState | `milestone-1` |
| Milestone 2 — Routing & API | `milestone-2` |
| Milestone 3 — Complete SPA | `milestone-3` |

Tags are unique. To resubmit a milestone, delete the old tag before creating and pushing it again:

```bash
git tag -d milestone-3
git push origin --delete milestone-3
git tag milestone-3
git push origin milestone-3
```