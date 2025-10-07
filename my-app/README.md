# My App

## Setup and Running Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/butrinntt/aimz-assignment.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd aimz-assignment/my-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Features Implemented

- **User Dashboard:**
  - Displays user statistics and data visualizations.
  - Includes charts for gender distribution, email domains, and IP distribution.

- **User Management:**
  - Create, edit, and manage user profiles.

- **Theming:**
  - Light and dark mode toggle.

- **Pagination:**
  - Efficient navigation through large datasets.

- **Reusable Components:**
  - Modular and reusable UI components like buttons, modals, and tables.

## Technologies Used

- **Frontend Framework:** React
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS, CSS Modules
- **Type Checking:** TypeScript
- **Charts Library:** Recharts
- **Utilities:**
  - PapaParse for CSV parsing
  - Custom hooks for fetching data and debouncing
  - Utility functions for sorting and validation
- **Icons:** React Icons
- **Routing:** React Router DOM
- **Linting:** ESLint, TypeScript ESLint, and plugins for React and React Hooks
- **Other Libraries:** clsx for conditional classNames

### Development Tools

- **Type Definitions:** @types/react, @types/react-dom, @types/papaparse
- **Vite Plugins:** @vitejs/plugin-react, @tailwindcss/vite
- **Globals Management:** globals

This list reflects all the technologies and tools used in the project.

## Folder Structure

```
my-app/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── hooks/       # Custom hooks
│   ├── pages/       # Page components
│   ├── store/       # Redux store and slices
│   ├── types/       # TypeScript types
│   ├── utils/       # Utility functions
├── package.json     # Project metadata and dependencies
├── vite.config.ts   # Vite configuration
```

