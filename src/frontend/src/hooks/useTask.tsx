import { create } from "zustand";
import type { Task } from "../types";

const initialTasks: Task[] = [
    {
        id: "1",
        title: "Posada",
        description: "Posada de la carrera en el Rancho San Antonio",
        dueDate: "2025-11-28T19:30",
        priority: "high"
    },
    {
        id: "2",
        title: "Estudiar para examen de inglés",
        description: "Repasar vocabulario y gramática para el examen final",
        dueDate: "2025-11-20T18:00",
        priority: "medium"
    },
    {
        id: "3",
        title: "Recibir calificaciones",
        description: "Consultar las calificaciones finales en el portal",
        dueDate: "2025-11-26T10:00",
        priority: "low"
    },
    {
        id: "4",
        title: "Comprar ropa para la posada",
        description: "Ir al centro comercial y buscar un atuendo formal",
        dueDate: "2025-11-22T15:00",
        priority: "high"
    },
    {
        id: "5",
        title: "Preparar presentación",
        description: "Crear diapositivas para la exposición de fin de curso",
        dueDate: "2025-11-18T20:00",
        priority: "high"
    },
    {
        id: "6",
        title: "Hacer ejercicio",
        description: "Ir al gimnasio y completar la rutina semanal",
        dueDate: "2025-11-19T07:00",
        priority: "medium"
    },
    {
        id: "7",
        title: "Examen Departamental de Inglés",
        description: "Presentar el examen departamental en el aula designada",
        dueDate: "2025-11-28T09:00",
        priority: "high"
    }
];

export type NavigateStore = {
    tasks: Task[];
    /* eslint-disable-next-line no-unused-vars */
    addTask: (task: Task) => void;
};

export const useTask = create<NavigateStore>((set) => ({
    tasks: initialTasks,
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] }))
}));
