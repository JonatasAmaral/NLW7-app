import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import { api } from "../../services/api";
import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

export function MessageList() {
	const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

	useEffect(() => {
		async function fetchMessages() {
			const response = await api.get<MessageProps[]>("/messages/last3");
			setCurrentMessages(response.data);
		}
		fetchMessages();
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
