import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarWidget() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, currentDate.getMonth(), 1);
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0);

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));

    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-3 select-none">
            {/* Header */}
            <div className="mb-3 flex w-full max-w-80 items-center justify-between">
                <button onClick={prevMonth} className="rounded-full p-2 hover:bg-white/30">
                    <ChevronLeft size={22} />
                </button>

                <h2 className="text-center text-xl font-bold capitalize">
                    {monthName} {year}
                </h2>

                <button onClick={nextMonth} className="rounded-full p-2 hover:bg-white/30">
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid w-full max-w-80 flex-1 grid-cols-7 grid-rows-[auto_repeat(7,1fr)] gap-2 overflow-hidden">
                {dayNames.map((d) => (
                    <span key={d} className="text-center text-sm font-semibold">
                        {d}
                    </span>
                ))}

                {cells.map((day, i) => {
                    const isToday =
                        day &&
                        today.getDate() === day &&
                        today.getMonth() === currentDate.getMonth() &&
                        today.getFullYear() === currentDate.getFullYear();

                    return (
                        <div
                            key={i}
                            className={`flex items-center justify-center rounded-md text-base ${
                                day ? "text-black" : "text-transparent"
                            } ${isToday ? "bg-blue-500 font-bold text-white" : "bg-white"}`}
                        >
                            {day || ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
