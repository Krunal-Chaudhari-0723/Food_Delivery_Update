import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111827", // Dark slate for text/navbar
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6b35", // Your brand orange
      light: "#ff895d",
      dark: "#e85d2a",
    },
    background: {
      default: "#f9fafb", // Very light grey (cool tone)
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280", // Muted grey for captions
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontWeight: 800 },
    h4: { fontWeight: 800, letterSpacing: "-0.5px" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 500 },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "0.95rem",
    },
  },
  shape: {
    borderRadius: 16, // Softer, more modern corners
  },
  components: {
    // Global Button Styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 24px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        },
        containedSecondary: {
          boxShadow: "0 8px 16px rgba(255, 107, 53, 0.25)",
          "&:hover": {
            boxShadow: "0 10px 20px rgba(255, 107, 53, 0.35)",
          },
        },
      },
    },
    // Global Paper/Card Styles
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)", // Ultra-soft shadows
          border: "1px solid rgba(0,0,0,0.05)",
        },
      },
    },
    // Global Input Styles
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f4f6",
          borderRadius: 14,
          padding: "4px 12px",
          "&.Mui-focused": {
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
});

export default theme;