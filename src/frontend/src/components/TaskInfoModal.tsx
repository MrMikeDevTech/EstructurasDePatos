import { useEffect, useState } from "react";
import X from "../icons/X";
import type { Task } from "../types";

export function TaskInfoModal({
    task,
    onClose,
    onComplete,
    onDelete
}: {
    task: Task;
    onClose: () => void;
    onComplete: () => void;
    onDelete: () => void;
}) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const open = !!task;
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

    const handleComplete = () => {
        setIsCompleted(true);
        onComplete();
    };

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${open ? "bg-black/40 opacity-100 backdrop-blur-sm backdrop-saturate-150" : "opacity-0"} `}
            onClick={onClose}
        >
            <div
                className={`bg-primary-tag w-full max-w-md rounded-2xl p-8 shadow-xl transition-all duration-200 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"} `}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{task.title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2.5 transition-all duration-300 hover:bg-red-500/10 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label="Cerrar"
                    >
                        <X className="h-6 w-6 text-red-500" />
                    </button>
                </header>
                <div className="mb-4">
                    <h3 className="font-semibold">Descripción</h3>
                    <p>{task.description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Fecha de vencimiento</h3>
                    <p>
                        {new Date(task.dueDate).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Estado</h3>
                    <p>{isCompleted ? "Completado" : "Pendiente"}</p>
                </div>
                <footer className="flex justify-between">
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`cursor-pointer rounded-lg px-4 py-2 transition-all duration-300 ${isCompleted ? "bg-gray-300" : "bg-green-500 text-white hover:bg-green-600"}`}
                    >
                        Marcar Completo
                    </button>
                    <button
                        onClick={onDelete}
                        className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </footer>
            </div>
        </div>
    );
}
