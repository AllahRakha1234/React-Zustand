import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../types';

interface TodoState {
    projects: Project[];
    addProject: (name: string) => void;
    deleteProject: (projectId: number) => void;
    addTask: (projectId: number, title: string) => void;
    toggleTask: (projectId: number, taskId: number) => void;
    deleteTask: (projectId: number, taskId: number) => void;
}

const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({       // set is a function to update the state
            projects: [], // initial state

            addProject: (name) =>    // addProject is a function to add a project
                set((state) => ({    // set is a function to update the state (state is the current state)
                    projects: [
                        ...state.projects,
                        { id: Date.now(), name, tasks: [] },
                    ],
                })),

            deleteProject: (projectId) => set((state) => ({
                projects: state.projects.filter((project) => project.id !== projectId)
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
