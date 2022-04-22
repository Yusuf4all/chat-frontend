import React from "react";
import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
	containerStyle: {
		border: "1px solid #293145",
		borderRadius: "5px",
		padding: " 10px 10px",
		margin: "10px 0px;",
	},

	textStyle: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	btnStyle: {
		fontSize: "12px",
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
		textTransform: "capitalize",
		whiteSpace: "nowrap",
	},
}));
function FriendCard({ user, handleOnClick, text }) {
	const classes = useStyle();
	return (
		<Grid item container className={classes.containerStyle}>
			<Grid item xs={2}>
				<Avatar
					alt="Remy Sharp"
					src="https://picsum.photos/seed/picsum/200/300"
					sx={{ width: 48, height: 48 }}
				/>
			</Grid>

			<Grid item xs={6}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						height: "100%",
					}}
					pl={1}
				>
					<Box>
						<Typography className={classes.textStyle} variant="subtitle1">
							{user?.First_Name} {user?.Last_Name}
						</Typography>
					</Box>
					<Box>
						<Typography className={classes.textStyle} variant="subtitle2">
							I have to Sacrifies
						</Typography>
					</Box>
				</Box>
			</Grid>

			<Grid item xs={4}>
				<Box
					sx={{
						height: "100%",
						alignItems: "center",
						display: "flex",
						width: "90%",
						margin: "auto",
					}}
				>
					<Button
						className={classes.btnStyle}
						onClick={() => handleOnClick(user)}
					>
						{text}{" "}
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}

export default FriendCard;
