import { API_KEY, API_URL } from "../data";
import type { Task } from "../types";
import { TOKEN_KEY } from "../data";

const getSessionToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

const token = getSessionToken();

const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
    Authorization: `${token}`
};

const getAllTodos = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/todos`, {
        method: "GET",
        headers
    });
    if (!response.ok) throw new Error(`Error al obtener ToDos: ${response.statusText}`);

    const rawData = await response.json();
    if (!Array.isArray(rawData)) {
        throw new Error("Unexpected response format");
    }
    const normalizedTasks = rawData.map(
        (item: {
            id: number;
            title: string;
            description: string;
            date_due: string;
            user_id: number;
            priority: "high" | "medium" | "low";
            done: boolean;
            created_at: string;
            updated_at: string;
        }) => {
            const normalizedTask: Task = {
                id: item.id.toString(),
                title: item.title,
                description: item.description,
                priority: item.priority,
                completed: item.done,
                dueDate: item.date_due
            };
            return normalizedTask;
        }
    );
    return normalizedTasks;
};

const getTodoById = async (id: number): Promise<Task> => {
    const todos = await getAllTodos();

    const task = todos.find((todo) => Number(todo.id) === id);

    if (!task) throw new Error("ToDo no encontrado");

    return task;
};

const createTodo = async (todo: Partial<Task>): Promise<{ message?: string; error?: string }> => {
    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            date_due: todo.dueDate
        })
    });
    if (!response.ok) throw new Error(`Error al crear ToDo: ${response.statusText}`);

    return response.json();
};

const updateTodo = async (id: number, updates: Partial<Task>): Promise<{ message?: string; error?: string }> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            title: updates.title,
            description: updates.description,
            priority: updates.priority,
            date_due: updates.dueDate,
            done: updates.completed
        })
    });
    if (!response.ok) return { error: `Error al actualizar ToDo: ${response.statusText}` };
    return response.json();
};

const deleteTodo = async (
    id: number
): Promise<{
    message?: string;
    todo?: {
        created_at: string;
        date_due: null;
        description: string;
        done: boolean;
        id: number;
        priority: string;
        title: string;
        updated_at: string;
    };
    error?: string;
}> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers
    });
    if (!response.ok) {
        throw new Error(`Error al eliminar ToDo: ${response.statusText}`);
    }
    return response.json();
};

const searchTodos = async (query: string): Promise<Task[]> => {
    const token = getSessionToken();
    if (!token) {
        throw new Error("No se encontró token de sesión");
    }
    const response = await fetch(`${API_URL}/todos/search?q=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
            ...headers,
            Authorization: `${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`Error al buscar ToDos: ${response.statusText}`);
    }
    return response.json();
};

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, searchTodos };
