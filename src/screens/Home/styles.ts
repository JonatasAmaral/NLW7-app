import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.BLACK_SECONDARY,
	},
	text: {
		color: COLORS.WHITE,
		fontSize: 20,
	},
});
