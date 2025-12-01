import { useNavigate } from "../hooks/useNavigate";
import { useState } from "react";
import Calendar from "../icons/Calendar";
import CheckList from "../icons/CheckList";
import DotList from "../icons/DotList";
import Home from "../icons/Home";
import NewTaskModal from "./NewModalTask";
import Notification from "../icons/Notification";
import Plus from "../icons/Plus";
import type { Route } from "../types";
import Logout from "../icons/Logout";
import { logout } from "../services/auth";

export default function Sidebar() {
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

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {}
    };

    return (
        <>
            <aside className="bg-primary-beige border-primary-beige-dark/80 fixed flex h-full max-h-[calc(100vh-2.5rem)] min-w-25 flex-1 flex-col items-center gap-4 rounded-2xl border p-4 shadow-xl">
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
                            className={`z-10 cursor-pointer rounded-2xl p-5 transition-colors duration-200 ${activeIndex === index ? "" : "hover:bg-primary-active/20"} `}
                            onClick={() => handleNavigation(index)}
                        >
                            {icon}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    <button
                        className="bg-primary-active z-10 cursor-pointer rounded-2xl p-5 transition-colors duration-200 hover:bg-red-200 hover:brightness-90"
                        onClick={handleLogout}
                    >
                        <Logout className="h-8 w-8 text-black" />
                    </button>
                    <button
                        className="bg-primary-active z-10 cursor-pointer rounded-2xl p-5 transition-colors duration-200 hover:brightness-90"
                        onClick={() => setOpenModal(true)}
                    >
                        <Plus className="h-8 w-8 text-black" />
                    </button>
                </div>
            </aside>
            <NewTaskModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}
