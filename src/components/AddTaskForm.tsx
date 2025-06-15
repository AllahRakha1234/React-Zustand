import { useState } from 'react';
import useTodoStore from '../store/todoStore';

interface Props {
    projectId: number | null;
}

export default function AddTaskForm({ projectId }: Props) {
    const [title, setTitle] = useState('');
    const addTask = useTodoStore((state) => state.addTask);

    if (!projectId) return null;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (title.trim() !== '') {
                    addTask(projectId, title);
                    setTitle('');
                }
            }}
        >
            <div className="flex gap-2">
                <input
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
}
