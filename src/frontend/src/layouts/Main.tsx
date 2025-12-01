import Sidebar from "../components/Sidebar";
import LayoutWrapper from "./Wrapper";

export default function LayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Sidebar />
            <div style={{ width: "calc(7rem)" }}></div>
            {children}
        </LayoutWrapper>
    );
}
