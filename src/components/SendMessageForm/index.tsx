import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";

import { api } from "../../services/api";

import { Button } from "../Button";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function SendMessageForm() {
	const [message, setMessage] = useState("");
	const [sendingMessage, setSendingMessage] = useState(false);

	async function sendMessage() {
		const sanitizedMessage = message.trim();

		if (sanitizedMessage.length > 0) {
			setSendingMessage(true);
			console.log("passou aqui", sanitizedMessage);

			try {
				await api.post("/messages", { message: sanitizedMessage });

				setMessage("");
				Keyboard.dismiss();
				Alert.alert("Mensagem enviada com sucesso!");
			} catch (error) {
				console.log(error);
			}
		} else {
			Alert.alert("Escreva uma mensagem para enviar");
		}
		setSendingMessage(false);
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				keyboardAppearance="dark"
				placeholder="Qual sua espectativa para o evento?"
				placeholderTextColor={COLORS.GRAY_PRIMARY}
				multiline
				maxLength={140}
				onChangeText={setMessage}
				value={message}
				editable={!sendingMessage}
			/>
			<Button
				title="ENVIAR MENSAGEM"
				backgroundColor={COLORS.PINK}
				color={COLORS.WHITE}
				isLoading={sendingMessage}
				onPress={sendMessage}
			/>
		</View>
	);
}
