import React from "react";
import { Text } from "react-native";
import { MotiView, View } from "moti";

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
	delay?: number;
};

export function Message({ data, delay = 0 }: Props) {
	const randNum = Math.floor(Math.random() * 99);
	return (
		<MotiView
			from={{ opacity: 0, translateY: -50 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ type: "timing", duration: 700, delay }}
			style={styles.container}
		>
			<Text style={styles.message}>{data.text}</Text>
			<View style={styles.footer}>
				<UserPhoto
					// uri={`https://randomuser.me/api/portraits/thumb/men/${randNum}.jpg`}
					uri={data.user.avatar_url}
					size="SMALL"
				/>
				<Text style={styles.userName}>{data.user.name}</Text>
			</View>
		</MotiView>
	);
}
