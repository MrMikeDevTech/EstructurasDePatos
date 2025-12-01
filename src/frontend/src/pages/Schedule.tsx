import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTask";
import Calendar from "../icons/Calendar";
import CircleCheck from "../icons/CircleCheck";
import Disgusting from "../icons/Disgusting";
import DoubleCheck from "../icons/DoubleCheck";
import TasksAtHourModal from "../components/TaskAtHourModal";
import type { Task } from "../types";
import { getAllTodos } from "../services/todos";
import CalendarWidget from "../components/CalendarWidget";

export default function SchedulePage() {
    const [openHourModal, setOpenHourModal] = useState(false);
    const [tasksAtSelectedHour, setTasksAtSelectedHour] = useState<Task[]>([]);

    const getMonday = (date: Date): Date => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const getWeekDays = (sunday: Date): Date[] => {
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(sunday);
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const hours = [
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "00:00"
    ];

    const currentDate = new Date();
    const sunday = getMonday(currentDate);
    const weekDays = getWeekDays(sunday);

    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const { tasks, setTask } = useTask((state) => state);

    const currentHourLabel = `${String(currentDate.getHours()).padStart(2, "0")}:00`;

    const tasksSummary = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter((task: Task) => task.completed).length,
        pendingTasks: tasks.filter((task: Task) => !task.completed).length,
        tasksForToday: tasks.filter((task: Task) => {
            const taskDate = new Date(task.dueDate);
            const today = new Date();
            return taskDate.toDateString() === today.toDateString();
        }).length,
        overdueTasks: tasks.filter((task: Task) => {
            const taskDate = new Date(task.dueDate);
            const today = new Date();
            return taskDate < today && !task.completed;
        }).length
    };

    useEffect(() => {
        getAllTodos()
            .then((data) => setTask(data))
            .catch(() => setTask([]));
    }, []);

    return (
        <section className="flex w-full flex-row gap-5">
            <section className="flex w-1/4 flex-col gap-5">
                <article className="bg-primary-active flex h-80 items-center justify-center rounded-2xl shadow-md">
                    <CalendarWidget />
                </article>

                <article className="bg-primary-beige-dark flex max-h-142 flex-1 items-center justify-center rounded-2xl shadow-md">
                    <section className="flex w-4/5 flex-col gap-6">
                        <div className="flex w-full items-center justify-between rounded-xl border-2 border-blue-500 bg-blue-100 p-6 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold text-blue-500">Total de tareas</span>
                                <span className="text-2xl font-bold text-blue-500">{tasksSummary.totalTasks}</span>
                            </div>
                            <CircleCheck className="h-8 w-8 text-blue-500" />
                        </div>

                        <div className="flex w-full items-center justify-between rounded-xl border-2 border-green-500 bg-green-100 p-6 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold text-green-500">Completadas</span>
                                <span className="text-2xl font-bold text-green-500">
                                    {tasksSummary.completedTasks}{" "}
                                    <span className="text-xl italic">
                                        (
                                        {Math.round((tasksSummary.completedTasks / tasksSummary.totalTasks) * 100) || 0}
                                        %)
                                    </span>
                                </span>
                            </div>
                            <DoubleCheck className="h-8 w-8 text-green-500" />
                        </div>

                        <div className="flex w-full items-center justify-between rounded-xl border-2 border-orange-500 bg-orange-100 p-6 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold text-orange-500">Para hoy</span>
                                <span className="text-2xl font-bold text-orange-500">{tasksSummary.tasksForToday}</span>
                            </div>
                            <Calendar className="h-8 w-8 text-orange-500" />
                        </div>

                        <div className="flex w-full items-center justify-between rounded-xl border-2 border-red-500 bg-red-100 p-6 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold text-red-500">Vencidas</span>
                                <span className="text-2xl font-bold text-red-500">{tasksSummary.overdueTasks}</span>
                            </div>
                            <Disgusting className="h-8 w-8 text-red-500" />
                        </div>
                    </section>
                </article>
            </section>

            <section className="flex w-3/4 flex-col gap-5">
                <article className="flex h-30 items-center justify-center">
                    <h2 className="bg-primary-beige-dark -mb-5 inline rounded-4xl px-75 py-4 text-6xl font-bold capitalize">
                        {currentMonth}
                    </h2>
                </article>

                <article className="bg-primary-active flex flex-1 rounded-2xl shadow-md">
                    <table className="max-h-20 w-full border-collapse">
                        <thead className="before:bg-primary-beige relative before:absolute before:inset-y-0 before:top-2 before:left-1/2 before:z-0 before:h-[85%] before:w-[95%] before:-translate-x-1/2 before:rounded-2xl">
                            <tr>
                                <th className="w-[50px]"></th>
                                {weekDays.map((date, index) => (
                                    <th key={index} className="relative p-4">
                                        <div className="relative flex flex-col items-center">
                                            <span className="text-lg font-medium">{dayNames[date.getDay()]}</span>
                                            <span className="bg-primary-active rounded-full px-5 py-2 text-2xl font-bold">
                                                {date.getDate()}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hourLabel) => {
                                const isCurrentHour = hourLabel === currentHourLabel;

                                const effectToHighlight = "brightness-90 animate-pulse";

                                return (
                                    <tr
                                        key={hourLabel}
                                        className={`h-[50px] border-b border-gray-300 ${isCurrentHour ? effectToHighlight : ""}`}
                                    >
                                        <td className="hour-label border-t border-r border-gray-300 pr-2 text-right text-sm font-medium">
                                            {hourLabel}
                                        </td>
                                        {weekDays.map((date, dayIndex) => {
                                            const tasksInCell = tasks.filter((t: Task) => {
                                                const taskDate = new Date(t.dueDate);

                                                return (
                                                    taskDate.getFullYear() === date.getFullYear() &&
                                                    taskDate.getMonth() === date.getMonth() &&
                                                    taskDate.getDate() === date.getDate() &&
                                                    taskDate.getHours() === Number(hourLabel.split(":")[0])
                                                );
                                            });

                                            const isToday = date.toDateString() === currentDate.toDateString();

                                            return (
                                                <td
                                                    key={dayIndex}
                                                    className={`bg-primary-active relative border-t border-l border-gray-300 text-center ${isToday && !isCurrentHour ? effectToHighlight : ""}`}
                                                >
                                                    {tasksInCell.length > 0 && (
                                                        <button
                                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
                                                            onClick={() => {
                                                                setTasksAtSelectedHour(tasksInCell);
                                                                setOpenHourModal(true);
                                                            }}
                                                        >
                                                            +{tasksInCell.length}
                                                        </button>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <TasksAtHourModal
                        open={openHourModal}
                        onClose={() => setOpenHourModal(false)}
                        tasks={tasksAtSelectedHour}
                    />
                </article>
            </section>
        </section>
    );
}
