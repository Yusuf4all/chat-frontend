import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/home/home";
import Authentication from "./routing/authenticationRouting";
import Application from "./routing/applicationRouting";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";
import React from "react";
require("dotenv").config();

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<React.Suspense fallback={<h1>Loading</h1>}>
				<Box>
					<Router>
						<Home exact path="/" />
						<Authentication path="/auth/*" />
						<Application path="/web-chat/*" />
					</Router>
				</Box>
			</React.Suspense>
		</ThemeProvider>
	);
}

export default App;
