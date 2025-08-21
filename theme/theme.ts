// theme/theme.ts

const palette = {
  blue500: '#3B82F6',
  blue400: '#60A5FA',
  red500: '#EF4444',
  red400: '#F87171',
  black: '#111827',
  white: '#F9FAFB',
  gray800: '#1F2937',
  gray200: '#E5E7EB',
  gray50: '#F7F8FA',
};

export const theme = {
  light: {
    background: palette.gray50,
    foreground: palette.black,
    cardBackground: palette.white,
    primary: palette.blue500,
    border: palette.gray200,
    error: palette.red500,
  },
  dark: {
    background: palette.black,
    foreground: palette.white,
    cardBackground: palette.gray800,
    primary: palette.blue400,
    border: palette.gray800,
    error: palette.red400,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold' as 'bold',
    },
    body: {
      fontSize: 16,
    },
  },
};