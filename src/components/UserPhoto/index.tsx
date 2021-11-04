import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import Avatar from "../../assets/avatar.png";
import { COLORS } from "../../theme";

const SIZES = {
	SMALL: {
		containerSize: 32,
		avatarSize: 28,
	},
	NORMAL: {
		containerSize: 48,
		avatarSize: 42,
	},
};

type Props = {
	uri: string | undefined;
	size?: keyof typeof SIZES;
};

export function UserPhoto({ uri, size = "NORMAL" }: Props) {
	const { containerSize, avatarSize } = SIZES[size];

	// const AVATAR_DEFAULT = Image.resolveAssetSource(Avatar).uri;

	return (
		<LinearGradient
			colors={[COLORS.PINK, COLORS.YELLOW]}
			start={[0, 0.8]}
			end={[0.9, 1]}
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
				},
				,
			]}
		>
			<Image
				source={uri ? { uri } : Avatar}
				style={[
					styles.avatar,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
			/>
		</LinearGradient>
	);
}
