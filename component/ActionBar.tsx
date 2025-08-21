import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getStyles } from './ActionBar.style';

export const ActionBar = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleSell = () => {
    // Handle sell action
    console.log('Sell pressed');
  };

  const handlePurchase = () => {
    // Handle purchase action
    console.log('Purchase pressed');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleSell}>
        <Text style={styles.buttonText}>Sell</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonSecondary]} onPress={handlePurchase}>
        <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Purchase</Text>
      </Pressable>
    </View>
  );
};
