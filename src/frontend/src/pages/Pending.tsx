import { useState, useEffect } from "react";
import { useTask } from "../hooks/useTask";
import { searchTodos, updateTodo, deleteTodo } from "../services/todos";
import { useDebounce } from "../hooks/useDebounce";
import HorizontalTabs from "../components/HorizontalTabs.tsx";
import type { Task } from "../types/index";
import { toast } from "react-toastify";
import DoubleCheck from "../icons/DoubleCheck";
import Trash from "../icons/Trash";

export default function PendingTasksPage() {
    const { tasks, refreshTasks, deleteTask, updateTask } = useTask();

    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedFilter, setSelectedFilter] = useState("Todos");

    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 150);

    const tabs = [
        { key: "Todos", label: `Todas (${tasks.filter((t) => !t.completed).length})` },
        { key: "high", label: `Alta prioridad (${tasks.filter((t) => t.priority === "high" && !t.completed).length})` },
        {
            key: "medium",
            label: `Media prioridad (${tasks.filter((t) => t.priority === "medium" && !t.completed).length})`
        },
        { key: "low", label: `Baja prioridad (${tasks.filter((t) => t.priority === "low" && !t.completed).length})` }
    ];

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

    useEffect(() => {
        const applyFilters = (baseTasks: Task[]) => {
            let result = baseTasks.filter((task) => !task.completed);

            if (selectedFilter !== "Todos") {
                result = result.filter((task) => task.priority === selectedFilter);
            }

            setFilteredTasks(result);
        };

        if (debouncedQuery.trim().length > 0) {
            searchTodos(debouncedQuery)
                .then((data) => applyFilters(data))
                .catch(() => setFilteredTasks([]));
        } else {
            applyFilters(tasks);
        }
    }, [debouncedQuery, selectedFilter, tasks]);

    const handleCompleteTask = async (id: string | number) => {
        const numericId = Number(id);
        if (!numericId) return;

        const { error } = await updateTodo(numericId, { completed: true });
        if (error) {
            console.error("Error al completar la tarea:", error);
            toast.error("No se pudo completar la tarea");
            return;
        }

        const existing = tasks.find((t) => t.id === numericId.toString());
        if (existing) {
            updateTask(existing.id, { ...existing, completed: true });
        }

        toast.success("Tarea completada");
    };

    const handleDeleteTask = async (id: string | number) => {
        const numericId = Number(id);
        if (!numericId) return;
        const { error } = await deleteTodo(numericId);
        if (error) {
            console.error("Error al eliminar la tarea:", error);
            toast.error("No se pudo eliminar la tarea");
            return;
        }
        deleteTask(numericId.toString());
        toast.success("Tarea eliminada");
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <section className="flex w-full flex-col gap-5">
            <header className="bg-primary-beige-dark flex h-30 flex-col items-center justify-center rounded-2xl px-8 shadow-md">
                <h2 className="text-6xl font-bold capitalize">Pendientes</h2>
                <p>Todas las tareas pendientes</p>
            </header>
            <main className="bg-primary-beige-dark flex-1 rounded-2xl p-6 shadow-md">
                <div className="mb-4 flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="Buscar tarea..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-primary-active focus:border-primary-beige-dark focus:ring-primary-beige-dark border-primary-tag w-11/12 rounded-lg border p-4 text-lg shadow-sm outline-none focus:ring"
                    />
                </div>

                <HorizontalTabs
                    tabs={tabs}
                    initialActiveTab={selectedFilter}
                    onTabChange={(_: number, key: string) => setSelectedFilter(key)}
                    className="mb-6"
                />

                <ul className="space-y-4">
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-primary-active flex items-center justify-between rounded-lg p-4 shadow-sm"
                        >
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-500">{task.description}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(
                                        task.priority
                                    )}`}
                                >
                                    {getPriorityText(task.priority)}
                                </span>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleCompleteTask(task.id)}
                                        className="cursor-pointer rounded-full bg-green-100 p-2 transition-all hover:brightness-95"
                                        title="Marcar como completada"
                                    >
                                        <DoubleCheck className="h-5 w-5 text-green-600" />
                                    </button>

                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="cursor-pointer rounded-full bg-gray-200 p-2 transition-all hover:brightness-90"
                                        title="Eliminar tarea"
                                    >
                                        <Trash className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}

                    {filteredTasks.length === 0 && (
                        <p className="mt-10 text-center text-gray-500">No hay tareas para mostrar</p>
                    )}
                </ul>
            </main>
        </section>
    );
}
