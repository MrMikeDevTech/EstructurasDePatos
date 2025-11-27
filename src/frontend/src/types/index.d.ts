export type Route = "login" | "register" | "home" | "schedule" | "pending" | "notifications" | "completed";
export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
};
