# AnimUwU — Your Friendly Anime Search Pal!
## Powered by Jikan API | Look up your favourite animes!
Made with 💙 for a coding take home project.

A small React + TypeScript single-page app that lets users search anime and view detailed pages using the Jikan API (unofficial MyAnimeList API). 
#### This project follows the mini-project requirements: 
- React hooks
- TypeScript
- react-router
- Redux for state
- Server-side pagination
- Instant search with 250ms debouncing + request cancellation.

### Tech Stack
- React + TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite
- Vitest (unit + integration testing)

### Key goals:
Fast, responsive instant search (debounced + cancels in-flight requests).
Server-side pagination for search results.
Accessible detail pages with rich metadata.
Clean TypeScript types and modular code.

### Quick start:
1. Clone the repo: 
```git clone https://github.com/chanjiayee0248/animuwu.git```

2. Navigate to the project directory:
```cd animuwu```

3. Install dependencies:
```npm install```

4. Start the development server:
```npm run dev```

5. Open your browser and go to: 
```http://localhost:4000```

### Usage:
- Use the search bar on the homepage to look up anime titles.
- Additionally filter results with provided dropdowns.
- Navigate pages using the pagination controls at the bottom of the Homepage.
- Click on an anime from the search results to view its detailed page.
- Use the back button to return to your previous search results.

### Bonus Features:
#### User Experience:
- Custom responsive UI with hand-drawn favicon
- Adjustable theme colors — edit base hues (oklch) in `src/globalStyles/tailwindThemeColors`
- Simple and Skeleton Loaders to handle loading states
- Mobile responsive design for seamless experience across devices
- Additional dropdown filters for refined search results
- Button to quickly refresh filters without reloading the page

#### Technical Improvements:
- Error handling for API requests with user-friendly messages
- Race condition handling via AbortControllers
- Basic unit and integration tests with vitest for API-related functions
  - To run unit tests: ```npm run test:unit```
  - To run integration tests (rate-limited with delays): ```npm run test:integration```