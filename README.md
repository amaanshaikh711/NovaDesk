# Employee Dashboard

A premium, modern employee dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Attendance stats, leave summary, recent announcements
- **Attendance History**: View daily attendance records
- **Leave Management**: Apply for leave and track requests
- **Team Directory**: Search and filter employees by department
- **Announcements**: Stay updated with company news
- **AI Chatbot / Summarizer**: Get quick summaries of announcements and interact with an AI assistant
- **Light/Dark Theme**: Toggle between themes, persisted in local storage

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Recharts (charts)
- Framer Motion (animations)
- Date-fns (date utilities)
- Google Generative AI (Gemini)

## Architecture

The application follows a modular, feature-centric architecture:
- **Component-Based UI:** UI elements are split into generic reusable components (`src/components/`) and complex feature-specific modules (`src/features/`).
- **State Management:** React's built-in hooks (`useState`, `useEffect`, `useContext`) handle local and global state (e.g., Theme context).
- **Styling & Theming:** Tailwind CSS is used for utility-first styling. A custom theme system in `src/index.css` enables dynamic Light/Dark mode switching using CSS variables.
- **Navigation:** Navigation is handled via state-based tab switching to maintain a lightweight Single Page Application (SPA) feel without requiring an external routing library.
- **AI Integration:** Client-side integration of the Gemini API (`@google/generative-ai`) provides conversational AI capabilities directly within the dashboard.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory (or use the existing one) and add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```
The app will be available at http://localhost:5173

4. Build for production:
```bash
npm run build
```

## AI Tools Used

This project was built and accelerated with the assistance of the following AI tools:
- **Trae:** Assisted with intelligent code generation, autocomplete, and rapid prototyping of React components.
- **Antigravity:** Acted as an autonomous agentic coding assistant to plan, implement, and refactor complex features.
- **Google Stitch (for design):** Provided design inspiration, modern aesthetic guidance, and helped translate UI/UX ideas into premium Tailwind CSS layouts.

## Assumptions and Trade-offs

- **Mock Data:** The application currently relies on static mock data to demonstrate functionality without needing a backend server.
- **Client-Side AI:** The Gemini API is called directly from the frontend for demonstration purposes. In a real-world production environment, API calls and keys should be securely managed on a backend server.
- **Simplified Routing:** A simple state-based tab mechanism is used instead of a robust routing library (like React Router) to keep the app lightweight, though it means there are no distinct URLs for different views.
- **State Persistence:** Except for the user's theme preference (persisted in `localStorage`), application state is memory-bound and resets upon page refresh.

## Project Structure

```text
src/
├── components/     # Reusable UI components (Button, Card, Input, Chatbot, etc.)
├── features/       # Feature modules (Dashboard, Leaves, etc.)
├── hooks/          # Custom hooks (useTheme)
├── lib/            # Utilities and mock data
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
├── main.tsx        # App entry point
└── index.css       # Global styles
```

## License

MIT
