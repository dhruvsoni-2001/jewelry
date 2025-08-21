import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const getStyles = (currentTheme: 'light' | 'dark') => {
  const themeColors = theme[currentTheme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: currentTheme === 'dark' ? theme.dark.cardBackground : theme.light.cardBackground,
      borderRadius: 50, // Large value for a pill shape
      padding: 4,
      marginVertical: theme.spacing.m,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      transform: [{ scale: 0.98 }],
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonActive: {
      backgroundColor: themeColors.primary,
    },
    text: {
      fontWeight: '600',
      color: themeColors.foreground,
      fontSize: 16,
    },
    textActive: {
      color: currentTheme === 'dark' ? theme.dark.foreground : theme.light.cardBackground,
    },
  });
};