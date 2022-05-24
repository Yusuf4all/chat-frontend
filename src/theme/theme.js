import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	overrides: {
		// MuiMenu: {
		// 	list: {
		// 		backgroundColor: "red",
		// 	},
		// },
		// // Applied to the <li> elements
		// MuiMenuItem: {
		// 	root: {
		// 		color: "red",
		// 		fontSize: 12,
		// 	},
		// },
	},
	palette: {
		background: {
			default: "#241642",
		},

		divider: "#363636",
		primary: { main: "#5653F8" },
		secondary: { main: "#100130" },
		tertiary: { main: "#241642" },
		greyscale: { main: "#40444B" },
		neutrals: { main: "#ffff" },
		black: { main: "black" },
	},

	icon: {
		primary: { main: "#CACACA" },
	},
	typography: {
		h1: {},
		h2: {},
		h3: {
			fontSize: "28px",
		},
		h4: {},
		h5: {
			color: "#FFFF",
		},

		h6: {},

		body1: { color: "#FFFF", lineHeight: "1.3", fontSize: "16px" },
		body2: {},
		subtitle1: {
			color: "#FFFF",
			fontSize: " 14px",
		},
		subtitle2: {
			color: "#CACACA",
			fontSize: " 12px",
		},
	},
});

const darkTheme = createTheme({});

export { darkTheme, lightTheme };
