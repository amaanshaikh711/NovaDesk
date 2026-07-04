# Employee Dashboard

A premium, modern employee dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Attendance stats, leave summary, recent announcements
- **Attendance History**: View daily attendance records
- **Leave Management**: Apply for leave and track requests
- **Team Directory**: Search and filter employees by department
- **Announcements**: Stay updated with company news
- **AI Summarizer**: Get quick summaries of announcements
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

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app will be available at http://localhost:5173

### Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components (Button, Card, Input, etc.)
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
