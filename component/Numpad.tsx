import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCalculator } from '../context/CalculatorContext';
import { useTheme } from '../context/ThemeContext';
import { getStyles } from './Numpad.style';

// Updated button layout in rows for better mobile display
const buttonRows = [
  ['7', '8', '9', 'AC'],
  ['4', '5', '6', '⌫'],
  ['1', '2', '3', '='],
  ['.', '0', '<', '>']
];

export const Numpad = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { handleNumpadPress } = useCalculator();

  return (
    <View style={styles.numpad}>
      {buttonRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.buttonRow}>
          {row.map((btn) => {
            const isActionRed = ['AC', '⌫'].includes(btn);
            const isActionPrimary = ['=', '<', '>'].includes(btn);
            
            return (
              <Pressable 
                key={btn} 
                style={[
                  styles.button,
                  isActionRed && styles.actionButtonRed,
                  isActionPrimary && styles.actionButtonPrimary,
                ]}
                onPress={() => handleNumpadPress(btn)}
              >
                <Text style={[styles.buttonText, (isActionRed || isActionPrimary) && styles.actionButtonText]}>
                  {btn}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};