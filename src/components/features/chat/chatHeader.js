import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
	Box,
	Avatar,
	Typography,
	Badge,
	Stack,
	Divider,
	Menu,
	MenuItem,
	IconButton,
	Tooltip,
	ListItemIcon,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BlockIcon from "@mui/icons-material/Block";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { UserStore } from "../../../store/user/userStore";
import { socket } from "../../../common/socket/socket";
import { ConfirmationModal } from "../../../common/component/confirmationModal";

const menuStyle = {
	overflow: "visible",
	filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
	mt: 1.5,
	"& .MuiAvatar-root": {
		width: 32,
		height: 32,
		ml: -0.5,
		mr: 1,
	},
	"&:before": {
		content: '""',
		display: "block",
		position: "absolute",
		top: 0,
		right: 14,
		width: 10,
		height: 10,
		bgcolor: "background.paper",
		transform: "translateY(-50%) rotate(45deg)",
		zIndex: 0,
	},
};

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

const useStyle = makeStyles((theme) => ({
	iconsStyle: {
		color: theme.icon.primary.main,
		cursor: "pointer",
	},
	chatHeaderStyle: {
		display: "flex",
		justifyContent: "space-between",
		padding: "10px 10px",
	},
	menuOptionStyle: {
		color: theme.palette.black.main,
	},
}));

function ChatHeader() {
	const profileOptions = [
		{
			text: "Profile",
			icon: <PersonIcon />,
			handleClick: () => handleProfile(),
		},
		{
			text: "Unfriend",
			icon: <PersonRemoveIcon />,
			handleClick: () => handleUnfriendConfirmationDialog(),
		},
		{
			text: "Block",
			icon: <BlockIcon />,
			handleClick: () => handleBlockConfirmationDialog(),
		},
	];
	const classes = useStyle();
	const { userStore, userDispatch } = useContext(UserStore);

	const [profileMenu, setProfileMenu] = useState(null);
	const open = Boolean(profileMenu);
	const [selectedUser, setSelectedUser] = useState(null);
	const [dialogText, setDialogText] = useState(null);
	const [isUnfriendConfirmationDialog, setUnfriendConfirmationDialog] =
		useState(false);
	const [isBlockConfirmationDialog, setBlockConfirmationDialog] =
		useState(false);

	useEffect(() => {
		setSelectedUser(userStore.selectedUser);
	}, [userStore.selectedUser]);

	const handleClick = (event) => {
		setProfileMenu(event.currentTarget);
	};
	const handleClose = () => {
		setProfileMenu(null);
	};

	const handleUnfriendConfirmationDialog = () => {
		const TEXT = {
			header: `Are you sure to unfriend  ${
				selectedUser && selectedUser.First_Name
			} ${selectedUser && selectedUser.Last_Name}?`,
			body: "You will not able to chat selected user after unfriend.",
			leftBtn: "Unfriend",
			rightBtn: "Cancle",
		};
		setDialogText(TEXT);
		setUnfriendConfirmationDialog(!isUnfriendConfirmationDialog);
	};

	const handleBlockConfirmationDialog = () => {
		const TEXT = {
			header: `Are you sure to block user  ${
				selectedUser && selectedUser.First_Name
			} ${selectedUser && selectedUser.Last_Name}?`,
			body: "You will not able to chat selected user after block.",
			leftBtn: "Block",
			rightBtn: "Cancle",
		};
		setDialogText(TEXT);
		setBlockConfirmationDialog(!isBlockConfirmationDialog);
	};

	const handleBlockUSer = () => {
		socket.emit("blockUser", userStore.userSelfDetails, selectedUser);
		setBlockConfirmationDialog(!isBlockConfirmationDialog);
	};
	const handleUnfriend = () => {
		socket.emit("unfriendUser", userStore.userSelfDetails, selectedUser);
		setUnfriendConfirmationDialog(!isUnfriendConfirmationDialog);
	};
	const handleProfile = () => {};

	return (
		<React.Fragment>
			<Box className={classes.chatHeaderStyle}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box mr={1}>
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							variant="dot"
						>
							<Avatar
								alt="Remy Sharp"
								src="https://c4.wallpaperflare.com/wallpaper/770/462/564/pretty-girl-pictures-1920x1200-wallpaper-preview.jpg"
								sx={{ width: 45, height: 45 }}
							/>
						</StyledBadge>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-around",
						}}
					>
						<Typography variant="subtitle1">
							{selectedUser && selectedUser.First_Name}{" "}
							{selectedUser && selectedUser.Last_Name}
						</Typography>
						<Typography variant="subtitle2">Online</Typography>
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Stack direction="row" spacing={2}>
						<SearchIcon className={classes.iconsStyle} />
						<PhoneIcon className={classes.iconsStyle} />
						<VideocamIcon className={classes.iconsStyle} />
					</Stack>
					<Box>
						<IconButton
							aria-label="more"
							id="long-button"
							aria-controls={open ? "long-menu" : undefined}
							aria-expanded={open ? "true" : undefined}
							aria-haspopup="true"
							className={classes.iconsStyle}
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>

						<Menu
							anchorEl={profileMenu}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: menuStyle,
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							{profileOptions.map((option) => (
								<MenuItem
									className={classes.menuOptionStyle}
									key={option}
									onClick={option.handleClick}
								>
									<ListItemIcon>{option.icon}</ListItemIcon>
									{option.text}
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Box>
			</Box>
			<Divider />
			<ConfirmationModal
				handleConfirmationDialog={handleUnfriendConfirmationDialog}
				isConfirmationDialog={isUnfriendConfirmationDialog}
				handleConfirmation={handleUnfriend}
				text={dialogText}
				user={selectedUser}
			/>
			<ConfirmationModal
				handleConfirmationDialog={handleBlockConfirmationDialog}
				isConfirmationDialog={isBlockConfirmationDialog}
				handleConfirmation={handleBlockUSer}
				text={dialogText}
				user={selectedUser}
			/>
		</React.Fragment>
	);
}

export default ChatHeader;
