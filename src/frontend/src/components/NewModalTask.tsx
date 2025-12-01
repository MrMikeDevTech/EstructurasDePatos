import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import type { Task } from "../types";
import { createTodo } from "../services/todos";
import { useTask } from "../hooks/useTask";

export default function NewTaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [show, setShow] = useState(open);
    const { refreshTasks } = useTask((state) => state);

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

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newTask: Omit<Task, "id" | "completed"> = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            dueDate: (() => {
                const dueDateInput = formData.get("dueDate") as string;
                let [datePart, timePart] = dueDateInput.split("T");
                if (timePart.split(":").length === 2) timePart = `${timePart}:00`;
                return `${datePart}T${timePart}`;
            })(),
            priority: (() => {
                const priority = formData.get("priority") as string;
                if (priority === "alta") return "high";
                if (priority === "media") return "medium";
                return "low";
            })() as "high" | "medium" | "low"
        };

        const { error } = await createTodo({
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            priority: newTask.priority
        });

        if (error) {
            toast.error("Error al crear la tarea");
            return;
        }

        onClose();
        toast.success("Tarea creada con éxito");
        refreshTasks();
    };

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${open ? "bg-black/40 opacity-100 backdrop-blur-sm backdrop-saturate-150" : "opacity-0"} `}
            onClick={onClose}
        >
            <form
                className={`bg-primary-tag w-full max-w-md rounded-2xl p-8 shadow-xl transition-all duration-200 md:w-200 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"} `}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h1 className="mb-4 text-2xl font-bold">Crear nueva tarea</h1>

                <label className="flex flex-col">
                    <span className="mb-2">Titulo:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Titulo de la tarea"
                        className="bg-primary-beige mb-4 w-full rounded-xl border-none p-3 focus:outline-none"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="mb-2">Descripcion:</span>
                    <textarea
                        name="description"
                        required
                        placeholder="Descripcion de la tarea"
                        className="bg-primary-beige mb-4 w-full rounded-xl border-none p-3 focus:outline-none"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="mb-2">Fecha de vencimiento:</span>
                    <input
                        type="datetime-local"
                        name="dueDate"
                        min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
                            .toISOString()
                            .slice(0, 16)}
                        required
                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            const currentDateTime = new Date(
                                new Date().getTime() - new Date().getTimezoneOffset() * 60000
                            )
                                .toISOString()
                                .slice(0, 16);
                            if (input.value < currentDateTime) {
                                input.value = currentDateTime;
                            }
                        }}
                        className="bg-primary-beige mb-4 w-full rounded-xl border-none p-3 focus:outline-none"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="mb-2">Prioridad:</span>
                    <select
                        name="priority"
                        defaultValue="media"
                        className="bg-primary-beige mb-4 w-full rounded-xl border-none p-3 focus:outline-none"
                    >
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </label>

                <div className="justify-endgap-4 mt-4 flex flex-row">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-primary-white mr-4 w-full cursor-pointer rounded-xl p-3 transition-all duration-300 hover:brightness-95"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-primary-active w-full cursor-pointer rounded-xl p-3 transition-all duration-300 hover:brightness-95"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
}
