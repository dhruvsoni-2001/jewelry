import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SellEntry {
  timestamp: string;
  weight: number;
  rate: number;
  labour: number;
  labourUnit: 'perGram' | 'fixed';
  total: number;
  totalGst: number;
}

export interface PurchaseEntry {
  timestamp: string;
  weight: number;
  touch: number;
  rate: number;
  total: number;
}

export interface HistoryData {
  sell: SellEntry[];
  purchase: PurchaseEntry[];
}

const HISTORY_KEY = 'JEWELLERY_CALCULATOR_HISTORY';

export const getHistory = async (): Promise<HistoryData> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    if (!data) {
      return { sell: [], purchase: [] };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting history:', error);
    return { sell: [], purchase: [] };
  }
};

export const saveSellEntry = async (entry: Omit<SellEntry, 'timestamp'>): Promise<void> => {
  try {
    const history = await getHistory();
    const newEntry: SellEntry = {
      ...entry,
      timestamp: new Date().toLocaleString()
    };
    
    history.sell.unshift(newEntry); // Add to beginning
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving sell entry:', error);
  }
};

export const savePurchaseEntry = async (entry: Omit<PurchaseEntry, 'timestamp'>): Promise<void> => {
  try {
    const history = await getHistory();
    const newEntry: PurchaseEntry = {
      ...entry,
      timestamp: new Date().toLocaleString()
    };
    
    history.purchase.unshift(newEntry); // Add to beginning
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving purchase entry:', error);
  }
};

export const deleteSellEntry = async (index: number): Promise<void> => {
  try {
    const history = await getHistory();
    history.sell.splice(index, 1);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error deleting sell entry:', error);
  }
};

export const deletePurchaseEntry = async (index: number): Promise<void> => {
  try {
    const history = await getHistory();
    history.purchase.splice(index, 1);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error deleting purchase entry:', error);
  }
};

// Utility functions for formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('₹', '');
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};
