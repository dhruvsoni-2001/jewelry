import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { deletePurchaseEntry, deleteSellEntry, formatNumber, getHistory, PurchaseEntry, SellEntry } from '../utils/storage';

type TabType = 'sell' | 'purchase';

export const History: React.FC = () => {
  const { theme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<TabType>('sell');
  const [sellHistory, setSellHistory] = useState<SellEntry[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    try {
      const history = await getHistory();
      setSellHistory(history.sell);
      setPurchaseHistory(history.purchase);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  // Load history when component mounts
  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = (index: number, type: TabType) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (type === 'sell') {
                await deleteSellEntry(index);
              } else {
                await deletePurchaseEntry(index);
              }
              await loadHistory();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const renderSellItem = ({ item, index }: { item: SellEntry; index: number }) => (
    <View style={[styles.historyItem, { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937' }]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.timestamp, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>
          {item.timestamp}
        </Text>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
          onPress={() => handleDelete(index, 'sell')}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Weight:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            {formatNumber(item.weight)}g
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Rate:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            ₹{formatNumber(item.rate)}/g
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Labour:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            ₹{formatNumber(item.labour)} ({item.labourUnit === 'perGram' ? '/g' : 'fix'})
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme === 'light' ? '#E5E7EB' : '#374151' }]} />
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>Total:</Text>
          <Text style={[styles.value, styles.totalValue, { color: '#3B82F6' }]}>
            ₹{formatNumber(item.total)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>With GST:</Text>
          <Text style={[styles.value, styles.totalValue, { color: '#3B82F6' }]}>
            ₹{formatNumber(item.totalGst)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPurchaseItem = ({ item, index }: { item: PurchaseEntry; index: number }) => (
    <View style={[styles.historyItem, { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937' }]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.timestamp, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>
          {item.timestamp}
        </Text>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
          onPress={() => handleDelete(index, 'purchase')}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Weight:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            {formatNumber(item.weight)}g
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Touch:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            {formatNumber(item.touch)}%
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>Rate:</Text>
          <Text style={[styles.value, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>
            ₹{formatNumber(item.rate)}/g
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme === 'light' ? '#E5E7EB' : '#374151' }]} />
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel, { color: theme === 'light' ? '#111827' : '#F9FAFB' }]}>Total:</Text>
          <Text style={[styles.value, styles.totalValue, { color: '#3B82F6' }]}>
            ₹{formatNumber(item.total)}
          </Text>
        </View>
      </View>
    </View>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyText, { color: theme === 'light' ? '#6B7280' : '#9CA3AF' }]}>
        {message}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F7F8FA' : '#111827' }]}>
      {/* History List */}
      <View style={{ flex: 1 }}>
        {activeTab === 'sell' ? (
          <FlatList
            data={sellHistory}
            keyExtractor={(item, index) => `${item.timestamp}-${index}`}
            renderItem={renderSellItem}
            contentContainerStyle={[styles.listContainer, { paddingBottom: 80 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#3B82F6']}
                tintColor={'#3B82F6'}
              />
            }
            ListEmptyComponent={
              <EmptyState
                message="No sell history found. Start calculating to see your history here."
              />
            }
          />
        ) : (
          <FlatList
            data={purchaseHistory}
            keyExtractor={(item, index) => `${item.timestamp}-${index}`}
            renderItem={renderPurchaseItem}
            contentContainerStyle={[styles.listContainer, { paddingBottom: 80 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#3B82F6']}
                tintColor={'#3B82F6'}
              />
            }
            ListEmptyComponent={
              <EmptyState
                message="No purchase history found. Start calculating to see your history here."
              />
            }
          />
        )}
      </View>

      {/* Tab Navigation - Now at bottom */}
      <View style={[styles.bottomTabContainer, { 
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
        borderTopColor: theme === 'light' ? '#E5E7EB' : '#374151'
      }]}>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            activeTab === 'sell' ? styles.bottomTabActive : [
              styles.bottomTabInactive, 
              { borderColor: theme === 'light' ? '#D1D5DB' : '#4B5563' }
            ]
          ]}
          onPress={() => setActiveTab('sell')}
        >
          <Text
            style={[
                styles,
              styles.bottomTabText,
              activeTab === 'sell' ? styles.bottomTabTextActive : styles.bottomTabTextInactive,
              { color: activeTab === 'sell' ? '#FFFFFF' : (theme === 'light' ? '#111827' : '#F9FAFB') }
            ]}
          >
            Sell History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            activeTab === 'purchase' ? styles.bottomTabActive : [
              styles.bottomTabInactive,
              { borderColor: theme === 'light' ? '#D1D5DB' : '#4B5563' }
            ]
          ]}
          onPress={() => setActiveTab('purchase')}
        >
          <Text
            style={[
              styles.bottomTabText,
              activeTab === 'purchase' ? styles.bottomTabTextActive : styles.bottomTabTextInactive,
              { color: activeTab === 'purchase' ? '#FFFFFF' : (theme === 'light' ? '#111827' : '#F9FAFB') }
            ]}
          >
            Purchase History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  historyItem: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
  },
  itemContent: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
  },
  totalLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
  totalValue: {
    fontWeight: '700',
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bottomTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bottomTabActive: {
    backgroundColor: '#3B82F6',
  },
  bottomTabInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  bottomTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomTabTextActive: {
    color: '#FFFFFF',
  },
  bottomTabTextInactive: {
    // Color will be set dynamically
  },
});
