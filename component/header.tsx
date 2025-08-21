// component/header.tsx

import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { theme as appTheme } from '../theme/theme'; // Import the main theme object
import { getStyles } from './header.style';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const isDarkMode = theme === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Jewellery Calculator
      </Text>
      
      <Pressable onPress={toggleTheme} style={styles.iconButton}>
        {isDarkMode ? (
          <Feather name="sun" size={24} color={appTheme.dark.foreground} />
        ) : (
          <FontAwesome name="moon-o" size={24} color={appTheme.light.foreground} />
        )}
      </Pressable>
    </View>
  );
};

export default Header;