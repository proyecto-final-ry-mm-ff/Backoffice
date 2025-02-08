import React, { createContext, useContext, useState } from "react";
import Toast from "../componentes/Extras/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

    const showToast = (message, severity = "info") => {
        setToast({ open: true, message, severity });
    };

    const closeToast = () => {
        setToast((prev) => ({ ...prev, open: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={closeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
