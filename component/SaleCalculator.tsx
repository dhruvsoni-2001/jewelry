import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCalculator } from '../context/CalculatorContext';
import { useTheme } from '../context/ThemeContext';
import { theme as appTheme } from '../theme/theme';
import { getStyles } from './SaleCalculator.style';

type InputRowProps = {
  label: string;
  fieldId: 'sellWeight' | 'sellRate' | 'sellLabour';
  toggleButton?: React.ReactNode; // Optional toggle button for labour
};

const InputRow: React.FC<InputRowProps> = ({ label, fieldId, toggleButton }) => {
  const { theme } = useTheme();
  const { activeInput, setActiveInput, sellWeight, sellRate, sellLabour } = useCalculator();
  const value = fieldId === 'sellWeight' ? sellWeight : fieldId === 'sellRate' ? sellRate : sellLabour;
  const isActive = activeInput === fieldId;
  const activeBorderColor = appTheme[theme].primary;

  return (
    <Pressable style={{ marginBottom: 16 }} onPress={() => setActiveInput(fieldId)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={[getStyles(theme).label]}>{label}</Text>
          {toggleButton}
        </View>
        <View style={[getStyles(theme).inputContainer, { borderColor: isActive ? activeBorderColor : 'transparent' }]}>
          <Text style={getStyles(theme).inputValue}>{value}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export const SaleCalculator = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { 
    total, 
    totalWithGst,
    isLabourPerGram,
    toggleLabourMode
  } = useCalculator();

  // Toggle button for labour input
  const labourToggle = (
    <Pressable style={styles.toggleButton} onPress={toggleLabourMode}>
      <Text style={styles.toggleText}>
        {isLabourPerGram ? '₹/g' : 'Fix'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.card}>
      <InputRow label="Weight (g)" fieldId="sellWeight" />
      <InputRow label="Rate (₹/g)" fieldId="sellRate" />
      <InputRow label="Labour" fieldId="sellLabour" toggleButton={labourToggle} />

      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total (₹)</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total with GST (₹)</Text>
        <Text style={styles.totalValue}>{totalWithGst.toFixed(2)}</Text>
      </View>
    </View>
  );
};