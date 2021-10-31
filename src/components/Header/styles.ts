import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 17,
		paddingHorizontal: 20,
	},
	logoutText: {
		// fontFamily: FONTS.REGULAR,
		fontSize: 15,
		color: COLORS.WHITE,
	},
});
