import React from "react";
import { View, Text } from "react-native";

import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

export type MessageProps = {
	id: string;
	text: string;
	user: {
		name: string;
		avatar_url: string;
	};
};

type Props = {
	data: MessageProps;
};

export function Message({ data }: Props) {
	const randNum = Math.floor(Math.random() * 99);
	return (
		<View style={styles.container}>
			<Text style={styles.message}>{data.text}</Text>
			<View style={styles.footer}>
				<UserPhoto
					// uri={`https://randomuser.me/api/portraits/thumb/men/${randNum}.jpg`}
					uri={data.user.avatar_url}
					size="SMALL"
				/>
				<Text style={styles.userName}>{data.user.name}</Text>
			</View>
		</View>
	);
}
