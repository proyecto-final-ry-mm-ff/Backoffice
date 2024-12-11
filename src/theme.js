import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// Paleta de colores equilibrada basada en las guías de diseño de Apple
export const codigos = (mode) => ({
    ...(mode === 'dark' ? {
        grey: generateColorPalette("#828282"),
        primary: generateColorPalette("#202124"),
        greenAccent: generateColorPalette("#64D99A"),
        redAccent: generateColorPalette("#FF6666"),
        blueAccent: generateColorPalette("#6699FF"),

    } : {
        grey: generateColorPalette("#F2F2F2"),
        primary: generateColorPalette("#FFFFFF"),
        greenAccent: generateColorPalette("#34C759"),
        redAccent: generateColorPalette("#FF3B30"),
        blueAccent: generateColorPalette("#007AFF"),
    })
});

const generateColorPalette = (baseColor, reverse = false) => {
    const palette = {
        100: lightenDarkenColor(baseColor, 40),
        200: lightenDarkenColor(baseColor, 30),
        300: lightenDarkenColor(baseColor, 20),
        400: lightenDarkenColor(baseColor, 10),
        500: baseColor, // El color base se establece aquí.
        600: lightenDarkenColor(baseColor, -10),
        700: lightenDarkenColor(baseColor, -20),
        800: lightenDarkenColor(baseColor, -30),
        900: lightenDarkenColor(baseColor, -40),
    };
    return reverse ? Object.fromEntries(Object.entries(palette).reverse()) : palette;
};

function lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00ff) + amt;
    let b = (num & 0x0000ff) + amt;

    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);

    return (usePound ? "#" : "") + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const themeSettings = (mode) => {
    const colors = codigos(mode);
    return {
        palette: {
            mode,
            primary: { main: colors.primary[500] },
            secondary: { main: colors.greenAccent[500] },
            neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[300],
            },
            background: {
                default: mode === 'dark' ? colors.primary[600] : colors.primary[100], // Incluye background.default
                paper: mode === 'dark' ? colors.primary[700] : colors.primary[200], // Opcional
            },
        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 12,
            h1: { fontFamily: "Source Sans 3", fontSize: 40 },
            h2: { fontFamily: "Source Sans 3", fontSize: 32 },
            h3: { fontFamily: "Source Sans 3", fontSize: 24 },
            h4: { fontFamily: "Source Sans 3", fontSize: 20 },
        }
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");  //Almacena el tema

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
            //Si el tema anterior era 'claro' que sea 'oscuro', sino, 'claro'
        }), []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    //Crea el tema y le pasa la paleta de colores dependiendo el modo

    return [theme, colorMode]
}