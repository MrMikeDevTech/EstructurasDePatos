import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "../hooks/useNavigate";
import { toast } from "react-toastify";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { navigate } = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            toast.error("Por favor, completa todos los campos.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        const { error } = await register({
            username,
            email,
            password,
            confirmPassword
        });

        if (error) {
            toast.error(error);
            return;
        }

        toast.success("Usuario registrado exitosamente, redireccionando al inicio de sesión...");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
            navigate("login");
        }, 2000);
    };

    return (
        <section className="bg-primary-white font-kalam flex flex-1 items-center justify-center p-5">
            <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/80 p-10 shadow-2xl backdrop-blur">
                <h2 className="mb-6 text-center text-4xl font-bold text-gray-800">Crear Cuenta</h2>

                <p className="mb-8 text-center text-gray-600">Regístrate para crear una nueva cuenta</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="mt-2 cursor-pointer rounded-xl bg-orange-500 p-3 font-semibold text-white shadow-md transition hover:bg-orange-600 active:scale-[0.98]"
                    >
                        Registrarse
                    </button>
                </form>

                <hr className="my-8 border-gray-300/50" />

                <button
                    onClick={() => navigate("login")}
                    className="w-full cursor-pointer rounded-xl border border-blue-500 p-3 font-semibold text-blue-600 transition hover:bg-blue-50 active:scale-[0.98]"
                >
                    Iniciar sesión
                </button>
            </div>
        </section>
    );
}
