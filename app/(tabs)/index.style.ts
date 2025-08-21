// app/(tabs)/index.style.ts

import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme'; // Adjust path

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const getStyles = (currentTheme: 'light' | 'dark') => {
  const themeColors = theme[currentTheme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: '10%',
      backgroundColor: themeColors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: screenWidth * 0.04, // 4% of screen width
      paddingVertical: screenHeight * 0.01, // 1% of screen height
      alignItems: 'center', // Center the content
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: theme.spacing.s,
      width: '100%',
      maxWidth: 475, // Maximum width constraint
      alignSelf: 'center',
    },
    title: {
      ...theme.typography.h1,
      color: themeColors.primary,
      textAlign: 'center',
    },
    subtitle: {
      ...theme.typography.body,
      color: themeColors.foreground,
      textAlign: 'center',
      marginTop: theme.spacing.s,
    },
  });
};