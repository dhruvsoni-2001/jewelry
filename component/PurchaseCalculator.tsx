import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getStyles } from "./CalculatorInput.style";

export const PurchaseCalculator = () => {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	const [weight, setWeight] = useState("");
	const [touch, setTouch] = useState("");
	const [rate, setRate] = useState("");
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const w = parseFloat(weight) || 0;
		const t = parseFloat(touch) || 0;
		const r = parseFloat(rate) || 0;
		setTotal(((w * t) / 100) * r);
	}, [weight, touch, rate]);

	return (
		<View style={styles.container}>
			<View style={styles.inputRow}>
				<Text style={styles.label}>Weight (g)</Text>
				<TextInput
					style={styles.input}
					value={weight}
					onChangeText={setWeight}
					keyboardType="numeric"
					placeholder="0"
				/>
			</View>
			<View style={styles.inputRow}>
				<Text style={styles.label}>Touch (%)</Text>
				<TextInput
					style={styles.input}
					value={touch}
					onChangeText={setTouch}
					keyboardType="numeric"
					placeholder="0"
				/>
			</View>
			<View style={styles.inputRow}>
				<Text style={styles.label}>Rate (₹/g)</Text>
				<TextInput
					style={styles.input}
					value={rate}
					onChangeText={setRate}
					keyboardType="numeric"
					placeholder="0"
				/>
			</View>
			<View style={styles.totalRow}>
				<Text style={styles.totalLabel}>Total (₹)</Text>
				<Text style={styles.totalValue}>{total.toFixed(2)}</Text>
			</View>
		</View>
	);
};
