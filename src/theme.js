import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// Paleta de colores equilibrada basada en las guías de diseño de Apple
export const colorsList = (mode) => ({
  ...(mode === "dark"
    ? {
        // Fondo principal (Background)
        background: generateColorPalette("#121212"), // Fondo base oscuro
        surface: generateColorPalette("#1E1E1E"), // Superficies elevadas
        // Colores de texto
        textPrimary: generateColorPalette("#FFFFFF"), // Texto principal (alto contraste).
        textSecondary: generateColorPalette("#8E8E93"), // Texto secundario (para no destacar tanto).
        textPlaceholder: generateColorPalette("#6C6C70"), // Texto de marcador de posición o inactivo.

        // Colores de botones
        buttonPrimary: generateColorPalette("#0A84FF"), // Botones importantes (azul Apple-style).
        buttonPrimaryHover: generateColorPalette("#0066CC"), // Botones al pasar el ratón (más oscuro).
        buttonSecondary: generateColorPalette("#30D158"), // Botones secundarios (verde brillante).

        // Colores de acento
        accentGreen: generateColorPalette("#30D158"), // Confirmación o éxito.
        accentRed: generateColorPalette("#FF3B30"), // Advertencias o errores.
        accentBlue: generateColorPalette("#0A84FF"), // Información o acciones neutrales.

        // Bordes
        border: generateColorPalette("#48484A"), // Bordes sutiles para delimitar.
      }
    : {
        // Fondo principal (Background)
        background: generateColorPalette("#F5F5F5"), // Fondo base claro
        surface: generateColorPalette("#FFFFFF"), // Superficies elevadas

        // Colores de texto
        textPrimary: generateColorPalette("#000000"), // Texto principal (alto contraste).
        textSecondary: generateColorPalette("#3C3C43"), // Texto secundario (disminuido).
        textPlaceholder: generateColorPalette("#8E8E93"), // Texto de marcador de posición o inactivo.

        // Colores de botones
        buttonPrimary: generateColorPalette("#007AFF"), // Botones importantes (azul Apple-style).
        buttonPrimaryHover: generateColorPalette("#005BBB"), // Botones al pasar el ratón (más oscuro).
        buttonSecondary: generateColorPalette("#34C759"), // Botones secundarios (verde brillante).

        // Colores de acento
        accentGreen: generateColorPalette("#34C759"), // Confirmación o éxito.
        accentRed: generateColorPalette("#FF3B30"), // Advertencias o errores.
        accentBlue: generateColorPalette("#0A84FF"), // Información o acciones neutrales.

        // Bordes
        border: generateColorPalette("#D1D1D6"), // Bordes ligeros y discretos.
      }),
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
  return reverse
    ? Object.fromEntries(Object.entries(palette).reverse())
    : palette;
};

const lightenDarkenColor = (col, amt) => {
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

  return (
    (usePound ? "#" : "") +
    (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

export const themeSettings = (mode) => {
  const colors = colorsList(mode);
  return {
    palette: {
      mode,
      primary: { main: colors.textPrimary[500] },
      secondary: { main: colors.accentGreen[500] },
      neutral: {
        dark: colors.textSecondary[700],
        main: colors.textSecondary[500],
        light: colors.textSecondary[300],
      },
      background: {
        default:
          mode === "dark" ? colors.background[400] : colors.background[700],
        paper:
          mode === "dark" ? colors.background[700] : colors.background[200],
      },
    },
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: "Source Sans 3",
        fontSize: 40,
        fontWeight: "bold",
        color: colors.textPrimary[500],
      },
      h2: {
        fontFamily: "Source Sans 3",
        fontSize: 32,
        fontWeight: "bold",
        color: colors.textPrimary[500],
      },
      h3: {
        fontFamily: "Source Sans 3",
        fontSize: 24,
        fontWeight: "bold",
        color: colors.textPrimary[500],
      },
      h4: {
        fontFamily: "Source Sans 3",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.textPrimary[500],
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //Crea el tema y le pasa la paleta de colores dependiendo el modo

  return [theme, colorMode];
};
