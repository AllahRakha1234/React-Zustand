import { useState } from 'react';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import PostList from './components/PostList';
import './index.css';

function App() {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a href={"/"}>
            <h1 className="text-3xl font-bold text-primary-600 text-center">Task Manager</h1></a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="w-full lg:w-1/3">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">Projects</h2>
              <ProjectList setActiveProjectId={setActiveProjectId} activeProjectId={activeProjectId} />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">Add New Task</h2>
              <AddTaskForm projectId={activeProjectId} />
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">Tasks</h2>
              <TaskList projectId={activeProjectId} />
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-secondary-50 px-4 text-secondary-500 text-sm">API Integration Example</span>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">Posts from API</h2>
          <PostList />
        </div>
      </main>
    </div>
  );
}

export default App;
