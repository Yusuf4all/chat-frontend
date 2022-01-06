import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  formInputControl: {
    width: "500px",
  },
}));

function VerifyEmailModal({
  isEmailModalOpen,
  handleEmailModal,
  handeleSendVeificationCode,
}) {
  const classes = useStyle();
  const [email, setEmail] = useState("");

  const hadnelSend = () => {
    handeleSendVeificationCode(email);
  };
  return (
    <React.Fragment>
      <Dialog open={isEmailModalOpen}>
        <DialogContent className={classes.formInputControl}>
          <DialogContentText>Enter email for verification.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            variant="standard"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailModal}>Cancel</Button>
          <Button onClick={hadnelSend}>Send verification code</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default VerifyEmailModal;
