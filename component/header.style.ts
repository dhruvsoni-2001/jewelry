import { Platform, StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const getStyles = (currentTheme: "light" | "dark") => {
	const themeColors = theme[currentTheme];

	return StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			padding: theme.spacing.m,
			backgroundColor: themeColors.cardBackground,
			borderBottomWidth: 1,
			borderBottomColor: theme.light.background, // Example of using a static color
			// Shadow properties (cross-platform)
			...Platform.select({
				ios: {
					shadowColor: "#0f0f0fr",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
				},
				android: {
					elevation: 2, // Android uses elevation for shadow
				},
			}),
		},
		title: {
			...theme.typography.h1,
			color: themeColors.foreground,
		},
		iconButton: {
			padding: theme.spacing.s,
		},
	});
};
