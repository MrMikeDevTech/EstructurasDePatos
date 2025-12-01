import { TaskInfoModal } from "../components/TaskInfoModal";
import { useTask } from "../hooks/useTask";
import Checkbox from "../icons/Checkbox";
import { useState } from "react";
import { updateTodo, deleteTodo } from "../services/todos";
import type { Task } from "../types";
import { toast } from "react-toastify";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const getStartOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - (day === 0 ? 6 : day - 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

const groupTasksByDay = (tasks: Task[], startOfWeek: Date) => {
    return daysOfWeek.map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + index);

        return tasks
            .filter((task) => {
                const taskDate = new Date(task.dueDate);
                return taskDate.toDateString() === day.toDateString();
            })
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    });
};

export default function HomePage() {
    const { tasks, updateTask, deleteTask } = useTask();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const tasksByDay = groupTasksByDay(tasks, startOfWeek);
    const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const handleCompleteTask = async () => {
        if (!selectedTask) return;
        const { error } = await updateTodo(Number(selectedTask.id), { completed: true });
        if (error) return console.error("Error al completar la tarea:", error);
        updateTask(selectedTask.id, { ...selectedTask, completed: true });
        toast.success("Tarea completada");
    };

    const handleDeleteTask = async () => {
        if (!selectedTask) return;
        const { error } = await deleteTodo(Number(selectedTask.id));
        if (error) return console.error("Error al eliminar la tarea:", error);
        deleteTask(selectedTask.id);
        toast.success("Tarea eliminada");
        setSelectedTask(null);
    };

    return (
        <>
            <section className="flex w-full flex-col gap-5">
                <header className="bg-primary-beige border-primary-beige-dark/80 flex flex-row items-center gap-5 rounded-2xl border p-6 shadow-md">
                    <Checkbox className="text-primary-active/75 h-16 w-16" />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Organizador de Tareas</h1>
                        <p>Tus tareas de la semana</p>
                    </div>
                </header>

                <main className="bg-primary-beige-dark h-full flex-1 rounded-2xl p-6 shadow-md">
                    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {daysOfWeek.map((day, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 rounded-xl p-4 ${
                                    index === currentDayIndex ? "bg-primary-white/50 shadow-lg" : ""
                                }`}
                                style={{ minHeight: "50%" }}
                            >
                                <h2 className="text-center text-lg font-semibold">{day}</h2>

                                <div className="bg-primary-beige flex h-full flex-col gap-4 rounded-lg p-4 shadow-md">
                                    {tasksByDay[index].length > 0 ? (
                                        tasksByDay[index].map((task) => (
                                            <button
                                                key={task.id}
                                                onClick={() => setSelectedTask(task)}
                                                className="even:bg-primary-tag odd:bg-primary-active flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"
                                            >
                                                <Checkbox className="h-5 w-5 text-black" />
                                                <span>
                                                    <b>
                                                        {new Date(task.dueDate).toLocaleTimeString("es-ES", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </b>{" "}
                                                    — {task.title}
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="flex flex-1 items-center justify-center">
                                            <p className="text-center text-sm text-gray-500">No hay tareas</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </section>

            {selectedTask && (
                <TaskInfoModal
                    task={selectedTask}
                    onClose={handleCloseModal}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                />
            )}
        </>
    );
}
