# Task Manager App with Zustand and React

A modern, responsive Task Manager application built with React, Zustand for state management, and Tailwind CSS for styling. The app features project-based task management with a clean and intuitive user interface.

## Features

- 📋 Project-based task management
- ✅ Task completion tracking
- 🗑️ Project and task deletion
- 💾 Persistent storage using Zustand
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast and efficient state management

## Tech Stack

- React
- TypeScript
- Zustand (State Management)
- Tailwind CSS
- Vite (Build Tool)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ProjectList.tsx    # Project list and management
│   └── TaskList.tsx       # Task list and management
├── store/
│   └── todoStore.ts       # Zustand store configuration
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## Features in Detail

### Project Management
- Create new projects
- Delete existing projects
- Select active project
- Visual feedback for selected project

### Task Management
- Add tasks to projects
- Mark tasks as complete/incomplete
- Delete tasks
- Visual feedback for task status

### State Management
- Persistent storage using Zustand
- Automatic state synchronization
- Efficient state updates

### UI/UX Features
- Clean and modern design
- Responsive layout
- Hover effects and transitions
- Intuitive project and task organization

## Usage

1. **Creating a Project**
   - Enter project name in the input field
   - Click "Add Project" or press Enter

2. **Managing Tasks**
   - Select a project to view its tasks
   - Add new tasks using the input field
   - Toggle task completion by clicking the checkbox
   - Delete tasks using the delete button

3. **Deleting Projects**
   - Hover over a project to reveal the delete button
   - Click the delete button to remove the project

## Styling

The application uses Tailwind CSS for styling with a custom theme configuration:
- Custom color palette
- Consistent spacing
- Responsive design
- Interactive hover states
- Smooth transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool
