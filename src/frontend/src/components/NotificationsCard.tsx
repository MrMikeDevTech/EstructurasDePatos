import type { Task } from "../types";

function normalize(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setMinutes(0, 0, 0);
    d.setSeconds(0, 0);
    d.setMilliseconds(0);
    return d;
}

export default function NotificationsCard({ title, description, dueDate }: Task) {
    const today = normalize(new Date());
    const taskDate = normalize(new Date(dueDate));

    const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let label = "Lejano";
    let chipColor = "bg-gray-500 text-white";
    let cardStyle = "border border-gray-200 bg-white";

    if (diffDays <= 3 && diffDays >= 0) {
        label = "Urgente";
        chipColor = "bg-red-600 text-white";
        cardStyle = "border border-red-300 bg-red-100";
    } else if (diffDays <= 7 && diffDays >= 4) {
        label = "Medio";
        chipColor = "bg-green-600 text-white";
        cardStyle = "border border-green-300 bg-green-100";
    } else if (diffDays <= 14 && diffDays >= 8) {
        label = "Bajo";
        chipColor = "bg-blue-600 text-white";
        cardStyle = "border border-blue-300 bg-blue-100";
    } else if (diffDays < 0) {
        label = "Vencida";
        chipColor = "bg-red-800 text-white";
        cardStyle = "border border-red-400 bg-red-50";
    }

    let dueText = "";
    if (diffDays < 0) dueText = "vencida";
    else if (diffDays === 0) dueText = "hoy";
    else if (diffDays === 1) dueText = "mañana";
    else if (diffDays <= 3) dueText = `en ${diffDays} días`;
    else if (diffDays <= 7) dueText = `en ${diffDays} días`;
    else if (diffDays <= 14) dueText = `en ${diffDays} días`;
    else dueText = `en ${diffDays} días`;

    return (
        <div className={`flex flex-col rounded-2xl p-5 shadow-md ${cardStyle}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{title}</h3>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${chipColor}`}>{label}</span>
            </div>

            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H5V9h14v9z" />
                    </svg>
                    <span>
                        {new Date(dueDate).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                </div>

                <span
                    className={`text-sm font-semibold ${label === "Urgente" ? "text-red-600" : label === "Medio" ? "text-green-600" : label === "Bajo" ? "text-blue-600" : "text-gray-600"}`}
                >
                    {dueText}
                </span>
            </div>
        </div>
    );
}
