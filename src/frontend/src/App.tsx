import React, { useEffect, useState } from "react";
import "./App.css";
import Checkbox from "./icons/Checkbox";
import Home from "./icons/Home";
import Calendar from "./icons/Calendar";
import DotList from "./icons/DotList";
import Notification from "./icons/Notification";
import CheckList from "./icons/CheckList";
import Plus from "./icons/Plus";
import type { Route, Task } from "./types";
import { useNavigate } from "./hooks/useNavigate";
import { toast } from "react-toastify";
import Toast from "./components/Toast";
import { useTask } from "./hooks/useTask";

export default function App() {
    const { route: routeStore } = useNavigate((state) => state);
    const [route, setRoute] = useState<Route>("home");

    useEffect(() => {
        setRoute(routeStore);
    }, [routeStore]);

    const pages: Record<Route, React.ReactNode> = {
        login: (
            <LayoutEmpty>
                <Login onLoginSuccess={() => setRoute("home")} />
            </LayoutEmpty>
        ),
        register: (
            <LayoutEmpty>
                <Register />
            </LayoutEmpty>
        ),
        home: (
            <LayoutMain>
                <HomePage />
            </LayoutMain>
        ),
        schedule: (
            <LayoutMain>
                <SchedulePage />
            </LayoutMain>
        ),
        pending: (
            <LayoutMain>
                <PendingTasksPage />
            </LayoutMain>
        ),
        notifications: (
            <LayoutMain>
                <NotificationsPage />
            </LayoutMain>
        ),
        completed: (
            <LayoutMain>
                <CompletedTasksPage />
            </LayoutMain>
        )
    };

    return (
        <>
            {pages[route] || (
                <LayoutEmpty>
                    <h1>404 - Page Not Found</h1>
                </LayoutEmpty>
            )}

            <Toast />
        </>
    );
}

/* LAYOUTS */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-primary-white font-kalam flex min-h-dvh flex-1 flex-row gap-5 p-5">{children}</section>
    );
}

function LayoutEmpty({ children }: { children: React.ReactNode }) {
    return <LayoutWrapper>{children}</LayoutWrapper>;
}

function LayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Sidebar />
            {children}
        </LayoutWrapper>
    );
}

/* PAGES WITHOUT LAYOUT */

function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-10 text-center shadow-lg">
                <h2 className="mb-1 text-3xl font-semibold text-gray-800">Iniciar Sesión</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onLoginSuccess();
                    }}
                    className="flex flex-col"
                >
                    <input type="text" placeholder="Usuario" className="mb-4 rounded border p-2" />
                    <input type="password" placeholder="Contraseña" className="mb-4 rounded border p-2" />
                    <button type="submit" className="rounded bg-orange-500 p-2 text-white">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-10 text-center shadow-lg">
                <h2 className="mb-1 text-3xl font-semibold text-gray-800">Crear Cuenta</h2>
                <form className="flex flex-col">
                    <input type="text" placeholder="Usuario" className="mb-4 rounded border p-2" />
                    <input type="email" placeholder="Correo Electrónico" className="mb-4 rounded border p-2" />
                    <input type="password" placeholder="Contraseña" className="mb-4 rounded border p-2" />
                    <button type="submit" className="rounded bg-orange-500 p-2 text-white">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}

/* PAGES WITH LAYOUT */
function HomePage() {
    const { tasks } = useTask((state) => state);

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() + 1;

    const tasksByDay = daysOfWeek.map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + index);

        return tasks
            .filter((task) => {
                const taskDate = new Date(task.dueDate);
                return taskDate.toDateString() === day.toDateString();
            })
            .sort((a, b) => {
                const timeA = new Date(a.dueDate).getTime();
                const timeB = new Date(b.dueDate).getTime();
                return timeA - timeB;
            });
    });

    return (
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
                            className={`flex flex-col gap-2 rounded-xl p-4 ${index === currentDayIndex ? "border-primary-active border-8 shadow-lg" : ""}`}
                            style={{ minHeight: "50%" }}
                        >
                            <h2 className="text-center text-lg font-semibold">{day}</h2>
                            <div className="bg-primary-beige flex h-full flex-col gap-4 rounded-lg p-4 shadow-md">
                                {tasksByDay[index].length > 0 ? (
                                    tasksByDay[index].map((task, taskIndex) => (
                                        <div
                                            key={taskIndex}
                                            className="even:bg-primary-tag odd:bg-primary-active flex items-center gap-2 rounded-lg p-2 shadow-sm"
                                        >
                                            <Checkbox className="h-5 w-5 text-black" />
                                            <span>{task.title}</span>
                                        </div>
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
    );
}

function SchedulePage() {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    return (
        <section className="flex w-full flex-row gap-5">
            <section className="flex w-1/4 flex-col gap-5">
                <article className="bg-primary-active flex h-80 items-center justify-center rounded-2xl shadow-md">
                    Calendar
                </article>
                <article className="bg-primary-beige-dark flex flex-1 items-center justify-center rounded-2xl shadow-md">
                    Completed task
                </article>
            </section>

            <section className="flex w-3/4 flex-col gap-5">
                <article className="flex h-30 items-center justify-center">
                    <h2 className="bg-primary-beige-dark -mb-5 inline rounded-4xl px-75 py-4 text-6xl font-bold capitalize">
                        {currentMonth}
                    </h2>
                </article>
                <article className="bg-primary-active flex flex-1 items-center justify-center rounded-2xl shadow-md">
                    Schedule
                </article>
            </section>
        </section>
    );
}

function PendingTasksPage() {
    return (
        <section className="flex w-full flex-col gap-5">
            <main className="bg-primary-beige-dark flex-1 rounded-2xl p-6 shadow-md">
                <h1>Pending Tasks Page</h1>
            </main>
        </section>
    );
}

function NotificationsPage() {
    return (
        <section className="flex w-full flex-col gap-5">
            <main className="bg-primary-beige-dark flex-1 rounded-2xl p-6 shadow-md">
                <h1>Notifications Page</h1>
            </main>
        </section>
    );
}

function CompletedTasksPage() {
    return (
        <section className="flex w-full flex-col gap-5">
            <main className="bg-primary-beige-dark flex-1 rounded-2xl p-6 shadow-md">
                <h1>Completed Tasks Page</h1>
            </main>
        </section>
    );
}

/* ASIDE COMPONENT */
function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const { navigate } = useNavigate((state) => state);

    const NavButtons: Record<string, React.ReactNode> = {
        home: <Home className="h-8 w-8 text-black" />,
        schedule: <Calendar className="h-8 w-8 text-black" />,
        pending: <DotList className="h-8 w-8 text-black" />,
        notifications: <Notification className="h-8 w-8 text-black" />,
        completed: <CheckList className="h-8 w-8 text-black" />
    };

    const NavButtonRoutes: Record<number, Route> = {
        0: "home",
        1: "schedule",
        2: "pending",
        3: "notifications",
        4: "completed"
    };

    const handleNavigation = (index: number) => {
        setActiveIndex(index);
        navigate(NavButtonRoutes[index]);
    };

    return (
        <>
            <aside className="bg-primary-beige border-primary-beige-dark/80 relative flex min-w-25 flex-1 flex-col items-center gap-4 rounded-2xl border p-4 shadow-xl">
                <div className="relative flex w-full flex-1 flex-col items-center gap-6">
                    <div
                        className="bg-primary-active absolute z-0 h-18 w-18 rounded-2xl transition-all duration-300"
                        style={{
                            top: `${activeIndex * 6}rem`
                        }}
                    />

                    {Object.values(NavButtons).map((icon, index) => (
                        <button
                            key={index}
                            className={`z-10 cursor-pointer rounded-2xl p-5 ${activeIndex === index ? "" : "hover:bg-primary-active/20"} `}
                            onClick={() => handleNavigation(index)}
                        >
                            {icon}
                        </button>
                    ))}
                </div>

                <button
                    className="bg-primary-active z-10 cursor-pointer rounded-2xl p-5 hover:brightness-90"
                    onClick={() => setOpenModal(true)}
                >
                    <Plus className="h-8 w-8 text-black" />
                </button>
            </aside>
            <NewTaskModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}

/* MODALES */
function NewTaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newTask: Omit<Task, "id"> = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            dueDate: new Date(formData.get("dueDate") as string).toISOString(),
            priority: formData.get("priority") as "high" | "medium" | "low"
        };

        console.log("Nueva tarea creada:", newTask);

        e.currentTarget.reset();
        onClose();
        toast.success("Tarea creada con éxito");
    };

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${open ? "bg-black/40 opacity-100" : "opacity-0"} `}
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
                        required
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
