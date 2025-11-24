import Login from "./pages/Login";
import "./App.css";
import type React from "react";

export default function App() {
    return (
        <>
            <Login onLoginSuccess={() => {}} />;
            <LayoutMain>
                <h1>Hola Mundo</h1>
            </LayoutMain>
            <LayoutLogin>
                <h1>Hola Mundo</h1>
            </LayoutLogin>
        </>
    );
}

function LayoutLogin({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

function LayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <>
            <aside></aside>
            <header></header>
            <main>{children}</main>
        </>
    );
}
