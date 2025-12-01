import { useTask } from "../hooks/useTask";
import NotificationsCard from "../components/NotificationsCard";
import { useEffect } from "react";

export default function NotificationsPage() {
    const { tasks, refreshTasks } = useTask();

    const normalize = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const today = normalize(new Date());

    const filteredTasks = tasks
        .filter((task) => !task.completed)
        .filter((task) => {
            const taskDate = normalize(new Date(task.dueDate));

            const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            return diffDays >= 0 && diffDays <= 14;
        })
        .sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return dateA - dateB;
        });

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <section className="flex w-full flex-col gap-5">
            <header className="bg-primary-beige-dark flex h-30 flex-col items-center justify-center rounded-2xl px-8 shadow-md">
                <h2 className="text-6xl font-bold capitalize">Notificaciones</h2>
                <p>Tareas próximas que requieren tu atención</p>
            </header>

            <article className="bg-primary-active flex flex-1 flex-col gap-5 rounded-2xl p-8 shadow-md">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <NotificationsCard key={task.id} {...task} />)
                ) : (
                    <p className="text-center text-lg">No hay tareas próximas que requieran tu atención.</p>
                )}
            </article>
        </section>
    );
}
