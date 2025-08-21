import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

// Define the shape of a single calculation record
export type Calculation = {
  id: string; // A unique ID like a timestamp
  date: string;
  totalPrice: number;
  weight: number;
  pricePerGram: number;
  // Add other details like making charges, GST, etc. later
};

const historyFileUri = FileSystem.documentDirectory + 'calculationHistory.json';

// Function to read all calculations from the file
export const getHistory = async (): Promise<Calculation[]> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(historyFileUri);
    if (!fileInfo.exists) {
      return []; // Return empty array if file doesn't exist yet
    }
    const fileContents = await FileSystem.readAsStringAsync(historyFileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading history:", error);
    return [];
  }
};

// Function to add a new calculation to the file
export const saveCalculation = async (newCalculation: Omit<Calculation, 'id' | 'date'>) => {
  const history = await getHistory();
  const calculationWithId: Calculation = {
    ...newCalculation,
    id: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
  };

  history.unshift(calculationWithId); // Add new calculation to the top

  try {
    const jsonString = JSON.stringify(history, null, 2); // Pretty print JSON
    await FileSystem.writeAsStringAsync(historyFileUri, jsonString);
  } catch (error) {
    console.error("Error saving calculation:", error);
  }
};