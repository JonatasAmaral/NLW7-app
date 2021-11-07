import React, { useState } from "react";
import { TextInput, View } from "react-native";

import { Button } from "../Button";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function SendMessageForm() {
	const [message, setMessage] = useState("");
	const [sendingMessage, setSendingMessage] = useState(false);
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
			/>
		</View>
	);
}
