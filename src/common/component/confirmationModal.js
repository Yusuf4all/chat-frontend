import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function ConfirmationModal({
	handleConfirmationDialog,
	isConfirmationDialog,
	handleConfirmation,
	text,
	user,
}) {
	return (
		<div>
			<Dialog
				open={isConfirmationDialog}
				onClose={handleConfirmationDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{text && text.header}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{text && text.body}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleConfirmation(user)}>
						{text && text.leftBtn}
					</Button>
					<Button onClick={handleConfirmationDialog} autoFocus>
						{text && text.rightBtn}{" "}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
