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

function VerifyOTPModal({
  isOTPModalOpen,
  handleOTPModal,
  handeleSubmitVeificationCode,
}) {
  const classes = useStyle();
  const [otpValue, setOTP] = useState("");

  const hadnelSend = () => {
    handeleSubmitVeificationCode(otpValue);
  };
  return (
    <React.Fragment>
      <Dialog open={isOTPModalOpen}>
        <DialogContent className={classes.formInputControl}>
          <DialogContentText>Enter verification code.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter OTP"
            type="email"
            variant="standard"
            fullWidth
            onChange={(e) => setOTP(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOTPModal}>Cancel</Button>
          <Button onClick={hadnelSend}>Submit Verification Code</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default VerifyOTPModal;
