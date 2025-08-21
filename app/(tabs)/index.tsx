import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Header from '@/component/header';
import { SegmentedControl } from '@/component/SegmentedControl';
import { useTheme } from '@/context/ThemeContext';
import { getStyles } from './index.style';

// 1. Import the REAL CalculatorView and HistoryScreen from their files
import { CalculatorView } from './CalculatorView';
import HistoryScreen from './HistoryScreen';

export default function IndexScreen() {
  const { theme, isDarkMode } = useTheme();
  const styles = getStyles(theme);
  
  const [activeTab, setActiveTab] = useState('Calculator');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      
      <View style={styles.contentContainer}>
        <SegmentedControl 
          options={['Calculator', 'History']}
          activeOption={activeTab}
          onOptionPress={setActiveTab}
        />
        
        {/* This will now render the correct, complex components */}
        {activeTab === 'Calculator' ? <CalculatorView /> : <HistoryScreen />}
      </View>
    </SafeAreaView>
  );
}