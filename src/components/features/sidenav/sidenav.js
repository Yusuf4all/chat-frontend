import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Drawer, Menu, MenuItem } from "@mui/material";
import { navigate } from "@reach/router";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";

const menuStyle = {
	overflow: "visible",
	filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
	ml: 9,
	mb: 0,

	"&:before": {
		content: '""',
		display: "block",
		position: "absolute",
		bottom: 10,
		left: -5,
		width: 10,
		height: 10,
		bgcolor: "background.paper",
		transform: "translateY(-50%) rotate(45deg)",
		zIndex: 0,
	},
};

const profileOptions = [
	{ text: "Profile", icon: <PersonIcon /> },
	{ text: "Edit Profile", icon: <EditIcon /> },
	{ text: "Logout", icon: <Logout /> },
];

const useStyle = makeStyles((theme) => ({
	paper: {
		background: theme.palette.primary.main,
	},
	iconStyle: {
		color: "#fff",
		transform: "scale(1.2)",
	},
	listStyle: {
		marginBottom: "30px",
		padding: "10px 37px",
		"&:hover": {
			backgroundColor: theme.palette.tertiary.main,
		},
		divider: theme.palette.divider.main,
	},
	menuOptionStyle: {
		color: theme.palette.black.main,
	},
}));

function SideNav() {
	const classes = useStyle();

	const [profileMenu, setProfileMenu] = React.useState(null);
	const open = Boolean(profileMenu);
	const handleClick = (event) => {
		setProfileMenu(event.currentTarget);
	};
	const handleClose = () => {
		setProfileMenu(null);
	};

	const itemList = [
		{
			text: "Chat",
			icon: <ChatIcon className={classes.iconStyle} />,
			onClick: () => navigate("/web-chat/chat"),
		},
		{
			text: "Friend",
			icon: <GroupIcon className={classes.iconStyle} />,
			onClick: () => navigate("/web-chat/friend-list"),
		},
		{
			text: "Add Friend",
			icon: <PersonAddIcon className={classes.iconStyle} />,
			onClick: () => navigate("/web-chat/add-frinend-list"),
		},
		{
			text: "Block Users",
			icon: <BlockIcon className={classes.iconStyle} />,
			onClick: () => navigate("/web-chat/blocked-users"),
		},
	];

	return (
		<React.Fragment>
			<Drawer
				classes={{ paper: classes.paper }}
				sx={{
					width: 100,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 100,
						boxSizing: "border-box",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar
					title="TITLE"
					sx={{
						display: "flex",
						justifyContent: "space-around",
						cursor: "pointer",
					}}
				>
					<img src="/assets/images/chatAppLogo.png" alt="Kitten" />
				</Toolbar>

				<Divider classes={classes.divider} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						height: "100%",
						alignItems: "center",
					}}
				>
					<Box sx={{ height: "100%" }}>
						<List>
							{itemList.map((item, index) => (
								<ListItem
									hover
									button
									key={item.text}
									className={classes.listStyle}
									onClick={item.onClick}
								>
									<ListItemIcon sx={{ minWidth: "100%" }}>
										{item.icon}
									</ListItemIcon>
								</ListItem>
							))}
						</List>
					</Box>
					<Box>
						<Avatar
							alt="Remy Sharp"
							src="https://c4.wallpaperflare.com/wallpaper/770/462/564/pretty-girl-pictures-1920x1200-wallpaper-preview.jpg"
							sx={{ width: 56, height: 56, cursor: "pointer" }}
							onClick={handleClick}
						/>
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
								<MenuItem className={classes.menuOptionStyle} key={option}>
									<ListItemIcon>{option.icon}</ListItemIcon>
									{option.text}
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Box>
			</Drawer>
		</React.Fragment>
	);
}

export default SideNav;
