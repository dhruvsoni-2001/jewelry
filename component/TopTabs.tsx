import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { theme as appTheme } from '../theme/theme';

type TopTabsProps = {
  activeTab: 'calculator' | 'history';
  onTabPress: (tab: 'calculator' | 'history') => void;
};

export const TopTabs: React.FC<TopTabsProps> = ({ activeTab, onTabPress }) => {
  const { theme } = useTheme();
  const themeColors = appTheme[theme];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: themeColors.background,
      borderRadius: 24,
      padding: 4,
      marginHorizontal: 8,
      marginBottom: 16,
    }}>
      <Pressable
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 20,
          backgroundColor: activeTab === 'calculator' ? themeColors.primary : 'transparent',
          alignItems: 'center',
        }}
        onPress={() => onTabPress('calculator')}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: activeTab === 'calculator' ? '#FFFFFF' : themeColors.foreground,
        }}>
          Calculator
        </Text>
      </Pressable>

      <Pressable
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 20,
          backgroundColor: activeTab === 'history' ? themeColors.primary : 'transparent',
          alignItems: 'center',
        }}
        onPress={() => onTabPress('history')}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: activeTab === 'history' ? '#FFFFFF' : themeColors.foreground,
        }}>
          History
        </Text>
      </Pressable>
    </View>
  );
};
