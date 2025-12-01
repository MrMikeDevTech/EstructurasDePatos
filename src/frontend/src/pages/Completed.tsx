import { useEffect } from "react";
import { useTask } from "../hooks/useTask";
import type { Task } from "../types";
import { toast } from "react-toastify";
import { deleteTodo } from "../services/todos";
import Trash from "../icons/Trash";

export default function CompletedTasksPage() {
    const { tasks, refreshTasks, deleteTask } = useTask();
    const completedTasks = tasks.filter((task) => task.completed);

    useEffect(() => {
        refreshTasks();
    }, []);

    const getPriorityColor = (priority: Task["priority"]) => {
        if (priority === "high") {
            return "bg-red-500 text-white";
        } else if (priority === "medium") {
            return "bg-green-500 text-white";
        } else if (priority === "low") {
            return "bg-blue-500 text-white";
        } else {
            return "bg-gray-500 text-white";
        }
    };

    const getPriorityText = (priority: Task["priority"]) => {
        if (priority === "high") {
            return "Alta";
        } else if (priority === "medium") {
            return "Media";
        } else if (priority === "low") {
            return "Baja";
        } else {
            return "Sin prioridad";
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!id) return;
        const { error } = await deleteTodo(id);
        if (error) return console.error("Error al eliminar la tarea:", error);
        deleteTask(id.toString());
        toast.success("Tarea eliminada");
    };

    return (
        <section className="flex w-full flex-col gap-5">
            <header className="bg-primary-beige-dark flex h-30 flex-col items-center justify-center rounded-2xl px-8 shadow-md">
                <h2 className="text-6xl font-bold capitalize">Tareas completadas</h2>
                <p>Historial de tareas completadas</p>
            </header>
            <main className="bg-primary-beige-dark flex flex-1 flex-col gap-10 rounded-2xl p-6 shadow-md">
                <div className="mb-4 flex w-full items-center justify-center">
                    <span className="bg-primary-active rounded-2xl px-20 py-5 text-lg font-medium shadow-md">
                        <b className="font-bold">Tareas completadas:</b> {completedTasks.length}
                    </span>
                </div>
                <ul className="space-y-4">
                    {completedTasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-primary-beige-light bg-primary-active flex items-center justify-between rounded-lg p-4 shadow-sm transition-all hover:scale-[1.01]"
                        >
                            <div>
                                <h3 className="text-xl font-medium line-through">{task.title}</h3>
                                <p className="text-sm text-gray-500 line-through">{task.description}</p>
                                <span className="text-xs text-gray-400 line-through">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`rounded-full px-3 py-1 text-sm ${getPriorityColor(task.priority)}`}>
                                    {getPriorityText(task.priority)}
                                </span>
                                <button
                                    onClick={() => handleDeleteTask(Number(task.id))}
                                    className="cursor-pointer rounded-full bg-gray-200 p-1 transition-all hover:brightness-90"
                                >
                                    <Trash className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
}
