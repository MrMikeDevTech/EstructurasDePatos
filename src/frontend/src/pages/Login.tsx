import { useState } from "react";
import { login } from "../services/auth";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "../hooks/useNavigate";
import { toast } from "react-toastify";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setSession } = useSession();
    const { navigate } = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                toast.error("Por favor, completa todos los campos.");
                return;
            }

            const { token, error } = await login({
                username,
                password
            });

            if (error) {
                toast.error("Usuario o contraseña incorrectos.");
                return;
            }

            if (!token) toast.error("No se recibió token de autenticación.");
            else {
                setSession(token);
                window.location.reload();
            }
        } catch (err) {
            toast.error("Ocurrió un error al iniciar sesión.");
        } finally {
            setUsername("");
            setPassword("");
        }
    };

    return (
        <section className="bg-primary-white font-kalam flex flex-1 items-center justify-center p-5">
            <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/80 p-10 shadow-2xl backdrop-blur">
                <h2 className="mb-6 text-center text-4xl font-bold text-gray-800">Bienvenido 👋</h2>

                <p className="mb-8 text-center text-gray-600">Inicia sesión en tu cuenta para continuar</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="mt-2 cursor-pointer rounded-xl bg-orange-500 p-3 font-semibold text-white shadow-md transition hover:bg-orange-600 active:scale-[0.98]"
                    >
                        Entrar
                    </button>
                </form>

                <hr className="my-8 border-gray-300/50" />

                <button
                    onClick={() => navigate("register")}
                    className="w-full cursor-pointer rounded-xl border border-blue-500 p-3 font-semibold text-blue-600 transition hover:bg-blue-50 active:scale-[0.98]"
                >
                    Crear cuenta nueva
                </button>
            </div>
        </section>
    );
}
