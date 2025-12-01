import { create } from "zustand";
import type { Task } from "../types";
import { getAllTodos } from "../services/todos";

export type NavigateStore = {
    tasks: Task[];
    /* eslint-disable no-unused-vars */
    addTask: (task: Task) => void;
    setTask: (tasks: Task[]) => void;
    updateTask: (taskId: string, updatedTask: Task) => void;
    deleteTask: (taskId: string) => void;
    refreshTasks: () => Promise<void>;
    /* eslint-enable no-unused-vars */
};

export const useTask = create<NavigateStore>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    setTask: (tasks) => set({ tasks }),
    updateTask: (taskId, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
        })),
    deleteTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId)
        })),
    refreshTasks: async () => {
        const data = await getAllTodos();
        set({ tasks: data });
    }
}));
