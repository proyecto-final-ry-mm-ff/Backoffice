import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ message, severity = "info", open, onClose, duration = 3000 }) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = (_, reason) => {
        if (reason === "clickaway") return;
        setIsOpen(false);
        onClose && onClose();
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
