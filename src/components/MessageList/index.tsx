import React from "react";
import { ScrollView } from "react-native";

import { Message } from "../Message";

import { styles } from "./styles";

export function MessageList() {
	const messagesList = [...Array(3)];
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="never"
		>
			{messagesList.map((_, j) => {
				const randNum = Math.floor(Math.random() * 99);
				const message = {
					id: `${randNum}`,
					text: "um texto qualquer",
					user: {
						name: "O Nome",
						avatar_url: `https://randomuser.me/api/portraits/thumb/men/${randNum}.jpg`,
					},
				};

				return (
					<Message
						key={message.id}
						data={message}
						delay={100 * (messagesList.length - j)}
					/>
				);
			})}
		</ScrollView>
	);
}
