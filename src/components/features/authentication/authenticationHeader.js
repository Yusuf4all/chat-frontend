import React from "react";
import Typography from "@mui/material/Typography";
function AuthenticationHeader({ title }) {
	return (
		<Typography
			variant="h3"
			component="h3"
			pb={2}
			fontWeight="bold"
			textAlign="center"
		>
			{title}
		</Typography>
	);
}

export default AuthenticationHeader;
