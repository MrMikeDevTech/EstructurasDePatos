"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente de contenedor de notificaciones que utiliza la librería "react-toastify".
 *
 * @component
 * @returns {JSX.Element} Un contenedor de notificaciones configurado con posición "top-center" y cierre automático en 2000ms.
 *
 * @remarks
 * Este componente debe ser utilizado para mostrar notificaciones en el layout o en la raíz de la aplicación.
 * Asegúrate de incluir los estilos de "react-toastify" en tu proyecto para que las notificaciones se rendericen correctamente.
 */
export default function Toast() {
    return <ToastContainer position="top-center" autoClose={2000} />;
}
