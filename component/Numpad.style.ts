import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const getStyles = (currentTheme: 'light' | 'dark') => {
  const themeColors = theme[currentTheme];
  // Better button sizing calculation for different screen sizes
  const availableWidth = Math.min(screenWidth * 0.9, 450); // Max width constraint
  const buttonSize = Math.min((availableWidth - 80) / 4, screenHeight * 0.07); // 4 buttons per row with padding
  
  return StyleSheet.create({
    numpad: {
        backgroundColor: themeColors.cardBackground,
        padding: theme.spacing.s,
        borderRadius: 24,
        marginTop: theme.spacing.m,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        alignSelf: 'center',
        maxWidth: 450,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.s,
    },
    button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.background,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: Math.min(buttonSize * 0.35, 18), // Font size relative to button size
        fontWeight: '600',
        color: themeColors.foreground,
    },
    // Style for blue action buttons
    actionButtonPrimary: {
        backgroundColor: themeColors.primary,
    },
    actionButtonRed: {
        backgroundColor: themeColors.error,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});
};