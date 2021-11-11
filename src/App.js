import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/home/home";
import Authentication from "./routing/authenticationRouting";
import Application from "./routing/applicationRouting";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";
require("dotenv").config();

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Router>
          <Home exact path="/" />
          <Authentication path="/auth/*" />
          <Application path="/web-chat/*" />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
