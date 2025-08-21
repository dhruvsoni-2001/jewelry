import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCalculator } from '../context/CalculatorContext';
import { useTheme } from '../context/ThemeContext';
import { theme as appTheme } from '../theme/theme';
import { getStyles } from './SaleCalculator.style'; // Reuse the same styles

type InputRowProps = {
  label: string;
  fieldId: 'purchaseWeight' | 'purchaseTouch' | 'purchaseRate';
};

const InputRow: React.FC<InputRowProps> = ({ label, fieldId }) => {
  const { theme } = useTheme();
  const { activeInput, setActiveInput, purchaseWeight, purchaseTouch, purchaseRate } = useCalculator();
  const value = fieldId === 'purchaseWeight' ? purchaseWeight : fieldId === 'purchaseTouch' ? purchaseTouch : purchaseRate;
  const isActive = activeInput === fieldId;
  const activeBorderColor = appTheme[theme].primary;

  return (
    <Pressable style={{ marginBottom: 16 }} onPress={() => setActiveInput(fieldId)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={[getStyles(theme).label]}>{label}</Text>
        </View>
        <View style={[getStyles(theme).inputContainer, { borderColor: isActive ? activeBorderColor : 'transparent' }]}>
          <Text style={getStyles(theme).inputValue}>{value}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export const PurchaseCalculator = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { total } = useCalculator();

  return (
    <View style={styles.card}>
      <InputRow label="Weight (g)" fieldId="purchaseWeight" />
      <InputRow label="Touch (%)" fieldId="purchaseTouch" />
      <InputRow label="Rate (₹/g)" fieldId="purchaseRate" />

      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total (₹)</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)}</Text>
      </View>
    </View>
  );
};
