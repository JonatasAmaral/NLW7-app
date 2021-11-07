import React from "react";
import { Platform, Text, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

// BUG: SVG is not rendered on WEB
import LogoSvg from "../../assets/logo.svg";
import LogoSvgx from "../../assets/logo";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/auth";

export function Header() {
	const { user } = useAuth();
	return (
		<View style={styles.container}>
			{/* HACK: render svg from TSX on WEB */}
			{Platform.OS === "web" ? <LogoSvgx /> : <LogoSvg />}

			<View style={styles.logoutButton}>
				{user && (
					<TouchableOpacity>
						<Text style={styles.logoutText}>Sair</Text>
					</TouchableOpacity>
				)}
				<UserPhoto uri={user?.avatar_url} />
			</View>
		</View>
	);
}
