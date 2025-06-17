import useTodoStore from '../store/tasksStore';

interface Props {
    projectId: number | null;
}

export default function TaskList({ projectId }: Props) {
    const { projects, toggleTask, deleteTask } = useTodoStore();

    const project = projects.find((p) => p.id === projectId);
    if (!project || !projectId) return (
        <div className="text-center py-8">
            <p className="text-secondary-500">Select a project to view its tasks</p>
        </div>
    );

    return (
        <div>
            <div className="space-y-3">
                {project.tasks.map((task) => (
                    <div
                        key={task.id}
                        className="task-item group"
                    >
                        <button
                            onClick={() => toggleTask(projectId, task.id)}
                            className={`task-checkbox ${task.completed ? 'task-checkbox-completed' : 'task-checkbox-uncompleted'
                                }`}
                        >
                            {task.completed && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        <span className={`task-text ${task.completed ? 'task-text-completed' : ''}`}>
                            {task.title}
                        </span>

                        <button
                            onClick={() => deleteTask(projectId, task.id)}
                            className="delete-button"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}

                {project.tasks.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-secondary-500">No tasks in this project yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
