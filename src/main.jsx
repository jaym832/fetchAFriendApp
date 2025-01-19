import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue, teal } from "@mui/material/colors";

import App from "./App.jsx";
const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: lightBlue[900],
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
