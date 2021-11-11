import React from "react";
import Typography from "@mui/material/Typography";
function AuthenticationHeader({ title }) {
  return (
    <Typography
      align="center"
      variant="h3"
      component="h3"
      pt={6}
      pb={2}
      fontWeight="bold"
    >
      {title}
    </Typography>
  );
}

export default AuthenticationHeader;
