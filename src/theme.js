import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00A3FF",
    },
    background: {
      default: "#F7F7FB",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ",",
    ),
    fontSize: 14,
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.6rem", fontWeight: 700 },
    h3: { fontSize: "1.35rem", fontWeight: 700 },
    h4: { fontSize: "1.15rem", fontWeight: 700 },
    body1: { fontSize: "0.95rem" },
    body2: { fontSize: "0.86rem" },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
  },
  shape: {
    borderRadius: 8,
  },
});

theme = responsiveFontSizes(theme, { factor: 2 });

export default theme;
