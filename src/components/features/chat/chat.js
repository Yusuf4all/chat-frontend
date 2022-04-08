import { Box, Divider } from "@mui/material";
import React from "react";
import ChatHeader from "./chatHeader";
import ChatBody from "./chatBody";
import ChatFooter from "./chatFooter";

function Chat() {
	return (
		<Box>
			<ChatHeader />
			<Divider />
			<ChatBody />
			<Divider />
			<ChatFooter />
		</Box>
	);
}
export default Chat;
