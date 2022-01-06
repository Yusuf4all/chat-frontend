import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/home/home";
import Authentication from "./routing/authenticationRouting";
import Application from "./routing/applicationRouting";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";
import { useEffect } from "react";
import { socket } from "./common/socket/socket";
import { toast } from "react-toastify";
require("dotenv").config();

function App() {
  useEffect(() => {
    initializeSocketOperation();
  });
  const initializeSocketOperation = () => {
    socket.on("errorResponse", (message) => {
      toast.error(message);
    });
  };
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
