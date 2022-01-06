import React from "react";
import Typography from "@mui/material/Typography";
function AuthenticationHeader({ title }) {
  return (
    <Typography
      align="center"
      variant="h5"
      component="h5"
      pt={2}
      pb={2}
      fontWeight="bold"
    >
      {title}
    </Typography>
  );
}

export default AuthenticationHeader;
