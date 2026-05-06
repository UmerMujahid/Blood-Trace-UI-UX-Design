import { Icon } from "@iconify/react";
import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColors = {
        success: "bg-green-100 border-green-500 text-green-800",
        error: "bg-red-100 border-red-500 text-red-800",
        info: "bg-blue-100 border-blue-500 text-blue-800",
    };

    const icons = {
        success: "charm:circle-tick",
        error: "fluent:error-circle-24-regular",
        info: "mdi:information-outline",
    };

    return (
        <div className={`fixed bottom-5 right-5 z-[9999] px-4 py-3 border-l-4 rounded shadow-lg flex items-center gap-3 ${bgColors[type]}`}>
            <Icon icon={icons[type]} className="w-6 h-6" />
            <div className="font-medium text-sm">{message}</div>
            <button onClick={onClose} className="ml-4 cursor-pointer">
                <Icon icon="maki:cross" className="w-3 h-3 opacity-60 hover:opacity-100" />
            </button>
        </div>
    );
}

export default Toast;
