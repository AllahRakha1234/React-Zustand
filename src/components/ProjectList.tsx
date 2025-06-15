import { useState } from 'react';
import useTodoStore from '../store/todoStore';

interface Props {
    setActiveProjectId: (id: number | null) => void;
    activeProjectId: number | null;
}

export default function ProjectList({ setActiveProjectId, activeProjectId }: Props) {
    const { projects, addProject, deleteProject } = useTodoStore();
    const [projectName, setProjectName] = useState('');

    const handleDeleteProject = (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation(); // Prevent triggering the project selection
        deleteProject(projectId);
        if (activeProjectId === projectId) {
            setActiveProjectId(null);
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (projectName.trim() !== '') {
                        addProject(projectName);
                        setProjectName('');
                    }
                }}
                className="mb-6"
            >
                <div className="flex gap-2">
                    <input
                        className="input"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="New project name"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Project
                    </button>
                </div>
            </form>

            <div className="space-y-2">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative"
                    >
                        <button
                            onClick={() => setActiveProjectId(project.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3
                                ${activeProjectId === project.id
                                    ? 'bg-primary-100 hover:bg-primary-200'
                                    : 'hover:bg-secondary-100'}`}
                        >
                            <span className={`w-2 h-2 rounded-full transition-colors duration-200 
                                ${activeProjectId === project.id
                                    ? 'bg-primary-600'
                                    : 'bg-primary-500 group-hover:bg-primary-600'}`}>
                            </span>
                            <span className={`transition-colors duration-200
                                ${activeProjectId === project.id
                                    ? 'text-primary-900'
                                    : 'text-secondary-700 group-hover:text-secondary-900'}`}>
                                {project.name}
                            </span>
                        </button>
                        <button
                            onClick={(e) => handleDeleteProject(e, project.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-secondary-400 hover:text-red-500 p-1"
                            title="Delete project"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
