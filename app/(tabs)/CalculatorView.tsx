import { ActionBar } from '@/component/ActionBar';
import { Numpad } from '@/component/Numpad';
import { PurchaseCalculator } from '@/component/PurchaseCalculator';
import { SaleCalculator } from '@/component/SaleCalculator';
import { CalculatorProvider, useCalculator } from '@/context/CalculatorContext';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Inner component that uses the calculator context
const CalculatorContent = () => {
  const { calculatorMode } = useCalculator();
  
  return (
    <>
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
          {calculatorMode === 'sell' ? <SaleCalculator /> : <PurchaseCalculator />}
          <Numpad />
        </View>
      </ScrollView>
      <ActionBar />
    </>
  );
};

// The main CalculatorView now assembles the two primary components
export const CalculatorView = () => {
  return (
    <CalculatorProvider>
      <View style={{ flex: 1 }}>
        <CalculatorContent />
      </View>
    </CalculatorProvider>
  );
};