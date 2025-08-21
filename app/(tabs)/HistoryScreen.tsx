import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Calculation, getHistory } from '../../data/storage'; // Adjust path
import { useTheme } from '../../context/ThemeContext';
import { theme as appTheme } from '../../theme/theme';

const HistoryScreen = () => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    // Load history when the component mounts
    const loadHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }: { item: Calculation }) => (
    <View style={styles.card}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.priceText}>₹ {item.totalPrice.toFixed(2)}</Text>
      <Text style={styles.detailText}>{item.weight}g @ ₹{item.pricePerGram}/g</Text>
    </View>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>No calculations saved yet.</Text>}
    />
  );
};

// Co-locating styles for simplicity
const getStyles = (currentTheme: 'light' | 'dark') => {
    const themeColors = appTheme[currentTheme];
    return StyleSheet.create({
        container: {
            padding: appTheme.spacing.m,
        },
        card: {
            backgroundColor: themeColors.cardBackground,
            padding: appTheme.spacing.m,
            borderRadius: 12,
            marginBottom: appTheme.spacing.m,
        },
        dateText: {
            color: themeColors.background,
            marginBottom: 4,
        },
        priceText: {
            color: themeColors.primary,
            fontSize: 22,
            fontWeight: 'bold',
        },
        detailText: {
            color: themeColors.foreground,
            marginTop: 4,
        },
        emptyText: {
            textAlign: 'center',
            marginTop: 40,
            color: themeColors.background,
        }
    });
}

export default HistoryScreen;