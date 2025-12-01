import "./App.css";
import { useNavigate } from "./hooks/useNavigate";
import { useSession } from "./hooks/useSession";
import CompletedTasksPage from "./pages/Completed";
import HomePage from "./pages/Home";
import LayoutEmpty from "./layouts/Empty";
import LayoutMain from "./layouts/Main";
import Login from "./pages/Login";
import NotificationsPage from "./pages/Notifications";
import PendingTasksPage from "./pages/Pending";
import React, { useEffect } from "react";
import Register from "./pages/Register";
import SchedulePage from "./pages/Schedule";
import Toast from "./components/Toast";
import type { Route } from "./types";
import { useTask } from "./hooks/useTask";
import { getAllTodos } from "./services/todos";

export default function App() {
    const { route, navigate } = useNavigate((state) => state);
    const { hasSession } = useSession();
    const { setTask } = useTask();

    const PUBLIC_ROUTES: Route[] = ["login", "register"];

    useEffect(() => {
        if (hasSession && PUBLIC_ROUTES.includes(route)) {
            navigate("home");
        }
        if (!hasSession && !PUBLIC_ROUTES.includes(route)) {
            navigate("login");
        }
    }, [hasSession, route, navigate]);

    useEffect(() => {
        if (route === "home" && hasSession) {
            getAllTodos()
                .then((data) => setTask(data))
                .catch(() => setTask([]));
        } else {
            setTask([]);
        }
    }, [route]);

    const PAGES: Record<Route, React.ReactNode> = {
        login: (
            <LayoutEmpty>
                <Login />
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
            {PAGES[route] || (
                <LayoutEmpty>
                    <h1>404 - Page not found</h1>
                </LayoutEmpty>
            )}
            <Toast />
        </>
    );
}
