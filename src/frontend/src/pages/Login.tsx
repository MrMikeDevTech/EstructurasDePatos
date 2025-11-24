// Login.tsx

import React, { useState } from "react";
// Importamos los íconos (requiere 'react-icons' instalado)

// 1. Definición de la interfaz para las propiedades (sin cambios)
interface LoginProps {
    onLoginSuccess: (token: string) => void;
    isLoading?: boolean;
}

// 2. Componente Funcional como export default function
export default function Login({ onLoginSuccess, isLoading = false }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validaciones básicas
        if (!username || !password) {
            setError("Por favor, ingresa tu usuario y contraseña.");
            return;
        }

        // Lógica de autenticación simulada
        // Simulación de éxito
        if (username === "admin" && password === "12345") {
            console.log("Login exitoso!");
            onLoginSuccess("simulated-jwt-token-12345");
        } else {
            // Simulación de error
            setError("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
        }
    };

    // Clases basadas en la estética del diseño: esquinas redondeadas, sombra suave, color naranja.
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            {/* Tarjeta de Login (Card) */}
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm text-center transition-shadow hover:shadow-xl">
                {/* Encabezado */}
                <div className="mb-8">
                    {/* Círculo con Icono (Naranja: similar al botón +) */}
                    <div className="flex justify-center items-center w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4">
                        {/* <FiLock size={28} className="text-white" /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 text-white"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>

                    {/* Títulos */}
                    <h2 className="text-3xl text-gray-800 font-semibold mb-1">Iniciar Sesión</h2>
                    <p className="text-sm text-gray-500">Accede a tu Organizador de Tareas</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* Campo de Usuario */}
                    <div className="flex items-center bg-gray-100 rounded-lg mb-5 px-4">
                        {/* <FiUser className="text-gray-400 mr-3 min-w-[20px]" /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 text-gray-400 mr-3"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full py-3 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Campo de Contraseña */}
                    <div className="flex items-center bg-gray-100 rounded-lg mb-5 px-4">
                        {/* <FiLock className="text-gray-400 mr-3 min-w-[20px]" /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 text-gray-400 mr-3"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Mensaje de Error */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        className={`
              py-3.5 rounded-lg text-lg font-bold transition-all duration-200 
              ${
                  isLoading
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200"
              }
            `}
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Entrar"}
                    </button>

                    {/* Enlace para recordar contraseña */}
                    <a href="#" className="mt-4 text-sm text-orange-500 hover:text-orange-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </form>
            </div>
        </div>
    );
}
