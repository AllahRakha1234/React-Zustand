import { useState } from 'react';
import useTodoStore from '../store/todoStore';

interface Props {
    setActiveProjectId: (id: number) => void;
}

export default function ProjectList({ setActiveProjectId }: Props) {
    const { projects, addProject } = useTodoStore();
    const [projectName, setProjectName] = useState('');

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
                    <button
                        key={project.id}
                        onClick={() => setActiveProjectId(project.id)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary-100 transition-colors duration-200 flex items-center gap-3 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-500 group-hover:bg-primary-600 transition-colors duration-200"></span>
                        <span className="text-secondary-700 group-hover:text-secondary-900">{project.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
