import { create } from "zustand";
import type { Task } from "../types";

const initialTasks: Task[] = [
    {
        id: "1",
        title: "Posada",
        description: "Posada de la carrera en el Rancho San Antonio",
        dueDate: "2025-11-28T19:30",
        priority: "high",
        completed: false
    },
    {
        id: "2",
        title: "Estudiar para examen de inglés",
        description: "Repasar vocabulario y gramática para el examen final",
        dueDate: "2025-11-20T18:00",
        priority: "medium",
        completed: false
    },
    {
        id: "3",
        title: "Recibir calificaciones",
        description: "Consultar las calificaciones finales en el portal",
        dueDate: "2025-11-26T10:00",
        priority: "low",
        completed: true
    },
    {
        id: "4",
        title: "Comprar ropa para la posada",
        description: "Ir al centro comercial y buscar un atuendo formal",
        dueDate: "2025-11-22T15:00",
        priority: "high",
        completed: true
    },
    {
        id: "5",
        title: "Preparar presentación",
        description: "Crear diapositivas para la exposición de fin de curso",
        dueDate: "2025-11-24T20:00",
        priority: "high",
        completed: false
    },
    {
        id: "6",
        title: "Hacer ejercicio",
        description: "Ir al gimnasio y completar la rutina semanal",
        dueDate: "2025-11-25T07:00",
        priority: "medium",
        completed: true
    },
    {
        id: "7",
        title: "Examen Departamental de Inglés",
        description: "Presentar el examen departamental en el aula designada",
        dueDate: "2025-11-28T08:00",
        priority: "high",
        completed: false
    },
    {
        id: "8",
        title: "Revisar proyecto final",
        description: "Hacer una revisión final del proyecto antes de entregarlo",
        dueDate: "2025-11-27T14:00",
        priority: "medium",
        completed: false
    },
    {
        id: "9",
        title: "Comprar regalos",
        description: "Comprar regalos para el intercambio de la posada",
        dueDate: "2025-11-29T16:00",
        priority: "low",
        completed: false
    },
    {
        id: "10",
        title: "Estudiar para examen de inglés",
        description: "Repasar vocabulario y gramática para el examen final",
        dueDate: "2025-11-24T18:00",
        priority: "medium",
        completed: false
    },
    {
        id: "11",
        title: "Organizar la casa",
        description: "Limpiar y organizar la casa para recibir visitas",
        dueDate: "2025-11-30T10:00",
        priority: "low",
        completed: false
    },
    {
        id: "12",
        title: "Cierre de la posada",
        description: "Asegurarse de que todo esté en orden después del evento",
        dueDate: "2025-11-29T03:00",
        priority: "low",
        completed: false
    },
    {
        id: "13",
        title: "Examen Departamental de Inglés",
        description: "Presentar el examen departamental en el aula designada",
        dueDate: "2025-11-28T08:00",
        priority: "high",
        completed: false
    },
    {
        id: "14",
        title: "Revisar notas",
        description: "Revisar las notas de la clase de matemáticas",
        dueDate: "2025-11-25T12:00",
        priority: "medium",
        completed: true
    },
    {
        id: "15",
        title: "Planear vacaciones",
        description: "Organizar el itinerario para las vacaciones de diciembre",
        dueDate: "2025-11-30T18:00",
        priority: "low",
        completed: false
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
