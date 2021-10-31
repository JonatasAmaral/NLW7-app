import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";
import { StatusBar } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BLACK_SECONDARY,
		paddingTop: StatusBar.currentHeight,
	},
	text: {
		color: COLORS.WHITE,
		fontSize: 20,
	},
});
