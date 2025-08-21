import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCalculator } from '../context/CalculatorContext';
import { useTheme } from '../context/ThemeContext';
import { getStyles } from './ActionBar.style';

export const ActionBar = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { calculatorMode, setCalculatorMode } = useCalculator();

  return (
    <View style={styles.container}>
      <Pressable 
        style={[
          styles.button, 
          calculatorMode === 'sell' ? styles.buttonActive : styles.buttonSecondary
        ]} 
        onPress={() => setCalculatorMode('sell')}
      >
        <Text style={[
          styles.buttonText, 
          calculatorMode === 'sell' ? styles.buttonTextActive : styles.buttonTextSecondary
        ]}>
          Sell
        </Text>
      </Pressable>
      <Pressable 
        style={[
          styles.button, 
          calculatorMode === 'purchase' ? styles.buttonActive : styles.buttonSecondary
        ]} 
        onPress={() => setCalculatorMode('purchase')}
      >
        <Text style={[
          styles.buttonText, 
          calculatorMode === 'purchase' ? styles.buttonTextActive : styles.buttonTextSecondary
        ]}>
          Purchase
        </Text>
      </Pressable>
    </View>
  );
};
