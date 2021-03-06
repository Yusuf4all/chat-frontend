import { Divider } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { LeftMessage, RightMessage } from "./message";

function ChatBody() {
	const messagesEndRef = useRef(null);
	useEffect(() => {
		scrollToBottom();
	}, []);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	return (
		<React.Fragment>
			<Box sx={{ padding: "15px 10px", maxHeight: "80vh", overflow: "auto" }}>
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<LeftMessage />
				<RightMessage />
				<Box ref={messagesEndRef}></Box>
			</Box>
		</React.Fragment>
	);
}

export default ChatBody;
