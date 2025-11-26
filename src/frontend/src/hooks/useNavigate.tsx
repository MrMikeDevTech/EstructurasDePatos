import { create } from "zustand";
import type { Route } from "../types";

export type NavigateStore = {
    route: Route;
    /* eslint-disable-next-line no-unused-vars */
    navigate: (route: Route) => void;
};

export const useNavigate = create<NavigateStore>((set) => ({
    route: "home" as Route,
    navigate: (route: Route) => set({ route })
}));
