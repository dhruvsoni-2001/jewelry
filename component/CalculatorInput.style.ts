import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const getStyles = (currentTheme: "light" | "dark") => {
	const themeColors = theme[currentTheme];

	return StyleSheet.create({
		container: {
			backgroundColor: themeColors.cardBackground,
			borderRadius: 12,
			padding: theme.spacing.m,
			marginBottom: theme.spacing.m,
		},
		inputRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: theme.spacing.s,
		},
		label: {
			flex: 1,
			fontWeight: "500",
			color: themeColors.foreground,
		},
		input: {
			flex: 1,
			backgroundColor: themeColors.background,
			paddingVertical: 8,
			paddingHorizontal: 12,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: themeColors.border,
			color: themeColors.foreground,
			textAlign: "right",
			marginLeft: theme.spacing.s,
		},
		totalRow: {
			paddingTop: theme.spacing.m,
			borderTopWidth: 1,
			borderTopColor: themeColors.border,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		totalLabel: {
			fontWeight: "bold",
			color: themeColors.foreground,
		},
		totalValue: {
			fontWeight: "bold",
			color: themeColors.primary,
			textAlign: "right",
		},
	});
};
