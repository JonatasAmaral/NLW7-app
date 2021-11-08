import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { io } from "socket.io-client";

import { api } from "../../services/api";
import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (message: MessageProps) => {
	messagesQueue.push(message);
});

export function MessageList() {
	const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

	useEffect(() => {
		async function fetchMessages() {
			const response = await api.get<MessageProps[]>("/messages/last3");
			setCurrentMessages(response.data);
		}
		fetchMessages();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messagesQueue.length > 0) {
				setCurrentMessages((prev) => [
					messagesQueue.shift() as MessageProps,
					prev[0],
					prev[1],
				]);
			}
		}, 2000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="never"
		>
			{currentMessages.map((message) => {
				return <Message key={message.id} data={message} />;
			})}
		</ScrollView>
	);
}
