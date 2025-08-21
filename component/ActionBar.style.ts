import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const getStyles = (currentTheme: 'light' | 'dark') => {
  const themeColors = theme[currentTheme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.m,
      paddingVertical: theme.spacing.s,
      backgroundColor: themeColors.cardBackground,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    button: {
      flex: 1,
      backgroundColor: themeColors.primary,
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    buttonSecondary: {
      backgroundColor: themeColors.background,
      borderWidth: 2,
      borderColor: themeColors.border,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.light.cardBackground,
    },
    buttonTextSecondary: {
      color: themeColors.foreground,
    },
  });
};
