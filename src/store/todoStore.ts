import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../types';

interface TodoState {
    projects: Project[];
    addProject: (name: string) => void;
    addTask: (projectId: number, title: string) => void;
    toggleTask: (projectId: number, taskId: number) => void;
    deleteTask: (projectId: number, taskId: number) => void;
}

const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            projects: [],

            addProject: (name) =>
                set((state) => ({
                    projects: [
                        ...state.projects,
                        { id: Date.now(), name, tasks: [] },
                    ],
                })),

            addTask: (projectId, title) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === projectId
                            ? {
                                ...project,
                                tasks: [
                                    ...project.tasks,
                                    { id: Date.now(), title, completed: false },
                                ],
                            }
                            : project
                    ),
                })),

            toggleTask: (projectId, taskId) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === projectId
                            ? {
                                ...project,
                                tasks: project.tasks.map((task) =>
                                    task.id === taskId
                                        ? { ...task, completed: !task.completed }
                                        : task
                                ),
                            }
                            : project
                    ),
                })),

            deleteTask: (projectId, taskId) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === projectId
                            ? {
                                ...project,
                                tasks: project.tasks.filter((task) => task.id !== taskId),
                            }
                            : project
                    ),
                })),
        }),
        {
            name: 'todo-storage', // unique name for localStorage key
        }
    )
);

export default useTodoStore;
