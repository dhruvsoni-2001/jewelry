import { ActionBar } from '@/component/ActionBar';
import { Numpad } from '@/component/Numpad';
import { SaleCalculator } from '@/component/SaleCalculator';
import { CalculatorProvider } from '@/context/CalculatorContext';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// The main CalculatorView now assembles the two primary components
export const CalculatorView = () => {
  return (
    <CalculatorProvider>
      <View style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            paddingBottom: 80, // Space for ActionBar
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ 
            maxWidth: 475,
            width: '100%',
            alignSelf: 'center',
            minHeight: screenHeight * 0.6, // Reduced to allow more flexibility
          }}>
            <SaleCalculator />
            <Numpad />
          </View>
        </ScrollView>
        <ActionBar />
      </View>
    </CalculatorProvider>
  );
};