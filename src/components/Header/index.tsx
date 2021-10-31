import React from "react";
import { Platform, Text, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

// BUG: SVG is not rendered on WEB
import LogoSvg from "../../assets/logo.svg";
import LogoSvgx from "../../assets/logo";

export function Header() {
	return (
		<View style={styles.container}>
			{/* HACK: render svg from TSX on WEB */}
			{Platform.OS === "web" ? <LogoSvgx /> : <LogoSvg />}

			<TouchableOpacity>
				<Text style={styles.logoutText}>Sair</Text>
			</TouchableOpacity>
		</View>
	);
}
