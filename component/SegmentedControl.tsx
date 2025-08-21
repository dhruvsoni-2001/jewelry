import React from 'react';
import { View, Text, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getStyles } from './SegmentedControl.style';

type SegmentedControlProps = {
  options: string[];
  activeOption: string;
  onOptionPress: (option: string) => void;
  style?: ViewStyle;
};

export const SegmentedControl = ({ options, activeOption, onOptionPress, style }: SegmentedControlProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => (
        <Pressable
          key={option}
          style={[styles.button, activeOption === option && styles.buttonActive]}
          onPress={() => onOptionPress(option)}
        >
          <Text style={[styles.text, activeOption === option && styles.textActive]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};