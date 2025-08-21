// app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
// 1. Import the provider
import { ThemeProvider } from '../context/ThemeContext'; // Adjust path if needed

// Note: If you have a global.css, it should be imported here
// import "../styles/global.css";

export default function RootLayout() {
  return (
    // 2. Wrap the entire Stack navigator with the ThemeProvider
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}