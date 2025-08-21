import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Helper function to scale font size based on device
const scaleFont = (size: number) => {
  const scale = screenWidth / 320; // Base width of 320dp
  const newSize = size * scale;
  return Math.max(14, PixelRatio.roundToNearestPixel(newSize)); // Minimum 14px
};

export const getStyles = (currentTheme: 'light' | 'dark') => {
  const themeColors = theme[currentTheme];

  return StyleSheet.create({
    card: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 24,
      padding: theme.spacing.l,
      marginBottom: theme.spacing.m,
      maxHeight: screenHeight * 0.45, // 45% of screen height
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.m,
    },
    labourRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.m,
    },
    labourLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      maxWidth: '40%', // Ensure consistent width with other labels
    },
    toggleButton: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 16,
      marginLeft: 8,
      alignSelf: 'center', // Center vertically with the label
    },
    toggleText: {
      color: theme.light.cardBackground,
      fontSize: scaleFont(12),
      fontWeight: '600',
    },
    label: {
      ...theme.typography.body,
      color: themeColors.primary,
      flex: 1,
      fontSize: scaleFont(16),
    },
    inputContainer: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 100, // Pill shape
      borderWidth: 2,
      marginLeft: theme.spacing.m,
      minHeight: Math.max(44, scaleFont(32)), // Dynamic height based on font scaling
      justifyContent: 'center', // Center content vertically
    },
    inputValue: {
      ...theme.typography.body,
      fontWeight: '600',
      color: themeColors.foreground,
      textAlign: 'right',
      fontSize: scaleFont(16),
      lineHeight: scaleFont(20), // Add line height for better spacing
    },
    divider: {
      height: 1,
      backgroundColor: themeColors.border,
      marginVertical: theme.spacing.m,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 6,
      backgroundColor: themeColors.background,
      borderRadius: 12,
      paddingHorizontal: theme.spacing.m,
      marginVertical: 2,
    },
    totalLabel: {
      ...theme.typography.body,
      fontWeight: '600',
      color: themeColors.foreground,
      fontSize: scaleFont(16),
    },
    totalValue: {
      ...theme.typography.body,
      color: themeColors.primary,
      fontSize: scaleFont(16),
      fontWeight: '700',
    },
  });
};