import { useState, useEffect } from "react";
import type { Task } from "../types";

export default function TasksAtHourModal({
    open,
    onClose,
    tasks
}: {
    open: boolean;
    onClose: () => void;
    tasks: Task[];
}) {
    const [show, setShow] = useState(open);

    useEffect(() => {
        if (open) {
            setShow(true);
            document.body.style.overflow = "hidden";
        } else {
            const timeout = setTimeout(() => setShow(false), 200);
            document.body.style.overflow = "";
            return () => clearTimeout(timeout);
        }
    }, [open]);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`bg-primary-beige-dark max-h-[80vh] w-150 overflow-y-auto rounded-2xl p-8 shadow-xl transition-all duration-200 ${
                    open ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <h2 className="mb-4 text-3xl font-bold">Tareas para esta hora</h2>

                {tasks.length === 0 ? (
                    <p className="text-center text-lg opacity-60">No hay tareas en esta hora.</p>
                ) : (
                    <ul className="flex flex-col gap-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="bg-primary-active flex flex-col rounded-lg border border-black/20 p-4 shadow"
                            >
                                <span className="text-xl font-bold">{task.title}</span>
                                <span className="text-sm opacity-70">{task.description}</span>
                                <span className="text-sm opacity-70">
                                    Prioridad:{" "}
                                    <strong
                                        className={(() => {
                                            if (task.priority === "high") {
                                                return "text-red-500";
                                            }
                                            if (task.priority === "medium") {
                                                return "text-orange-500";
                                            }
                                            return "text-green-600";
                                        })()}
                                    >
                                        {task.priority === "high"
                                            ? "Alta"
                                            : task.priority === "medium"
                                              ? "Media"
                                              : task.priority === "low"
                                                ? "Baja"
                                                : task.priority}
                                    </strong>
                                </span>
                                <span className="text-xs opacity-60">
                                    Fecha: {new Date(task.dueDate).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="bg-primary-active mt-6 w-full rounded-xl p-4 text-xl font-bold hover:brightness-90"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
