import React, { createContext, useContext, useEffect, useState } from 'react';
import { savePurchaseEntry, saveSellEntry } from '../utils/storage';

// Define calculator modes
type CalculatorMode = 'sell' | 'purchase';

// Define which input fields can be active 
type ActiveInput = 'sellWeight' | 'sellRate' | 'sellLabour' | 'purchaseWeight' | 'purchaseTouch' | 'purchaseRate';

// Define the shape of a single calculation record
export type SaleCalculation = {
  id: string;
  date: string;
  weight: number;
  rate: number;
  labour: number;
  total: number;
  totalWithGst: number;
};

export type PurchaseCalculation = {
  id: string;
  date: string;
  weight: number;
  touch: number;
  rate: number;
  total: number;
};

interface CalculatorState {
  // Calculator Mode
  calculatorMode: CalculatorMode;
  setCalculatorMode: (mode: CalculatorMode) => void;
  
  // Sell Input Values
  sellWeight: string;
  sellRate: string;
  sellLabour: string;
  
  // Purchase Input Values
  purchaseWeight: string;
  purchaseTouch: string;
  purchaseRate: string;
  
  // Labour Mode (only for sell)
  isLabourPerGram: boolean;
  toggleLabourMode: () => void;
  
  // Output Values
  total: number;
  totalWithGst: number; // Only for sell

  // Active Input
  activeInput: ActiveInput | null;
  setActiveInput: (input: ActiveInput | null) => void;

  // Numpad Logic
  handleNumpadPress: (value: string) => void;

  // Calculation History
  saveCurrentCalculation: () => void;
}

const CalculatorContext = createContext<CalculatorState | undefined>(undefined);
const GST_RATE = 0.035; // 3.5% GST for gold

export const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('sell');
  const [inputs, setInputs] = useState({
    sellWeight: '0',
    sellRate: '0',
    sellLabour: '0',
  });
  const [purchaseInputs, setPurchaseInputs] = useState({
    purchaseWeight: '0',
    purchaseTouch: '0',
    purchaseRate: '0',
  });
  const [activeInput, setActiveInput] = useState<ActiveInput | null>('sellWeight');
  const [total, setTotal] = useState(0);
  const [totalWithGst, setTotalWithGst] = useState(0);
  const [isLabourPerGram, setIsLabourPerGram] = useState(true); // Default to per gram

  // Toggle labour calculation mode
  const toggleLabourMode = () => {
    setIsLabourPerGram(!isLabourPerGram);
  };

  // Switch calculator mode and reset active input
  const handleSetCalculatorMode = (mode: CalculatorMode) => {
    setCalculatorMode(mode);
    if (mode === 'sell') {
      setActiveInput('sellWeight');
    } else {
      setActiveInput('purchaseWeight');
    }
  };

  // Perform calculations whenever an input changes
  useEffect(() => {
    if (calculatorMode === 'sell') {
      const w = parseFloat(inputs.sellWeight) || 0;
      const r = parseFloat(inputs.sellRate) || 0;
      const l = parseFloat(inputs.sellLabour) || 0;
      
      const goldValue = w * r;
      const labourCost = isLabourPerGram ? (w * l) : l; // Per gram or fixed rate
      const subtotal = goldValue + labourCost;
      
      setTotal(subtotal);
      setTotalWithGst(subtotal * (1 + GST_RATE));
    } else {
      // Purchase calculation
      const w = parseFloat(purchaseInputs.purchaseWeight) || 0;
      const t = parseFloat(purchaseInputs.purchaseTouch) || 0;
      const r = parseFloat(purchaseInputs.purchaseRate) || 0;
      
      // Purchase total = Weight × (Touch/100) × Rate
      const purchaseTotal = w * (t / 100) * r;
      
      setTotal(purchaseTotal);
      setTotalWithGst(0); // No GST for purchase
    }
  }, [inputs, purchaseInputs, isLabourPerGram, calculatorMode]);

  const handleNumpadPress = (value: string) => {
    // Handle field navigation first
    const sellFields: ActiveInput[] = ['sellWeight', 'sellRate', 'sellLabour'];
    const purchaseFields: ActiveInput[] = ['purchaseWeight', 'purchaseTouch', 'purchaseRate'];
    const currentFields = calculatorMode === 'sell' ? sellFields : purchaseFields;
    
    if (value === '<' || value === '>') {
      if (!activeInput) return;
      const idx = currentFields.indexOf(activeInput);
      if (idx === -1) return;
      const nextIdx = value === '>' ? Math.min(idx + 1, currentFields.length - 1) : Math.max(idx - 1, 0);
      setActiveInput(currentFields[nextIdx]);
      return;
    }

    if (!activeInput) return;
    
    // Get current value from appropriate input set
    const currentVal = calculatorMode === 'sell' && activeInput in inputs 
      ? inputs[activeInput as keyof typeof inputs]
      : calculatorMode === 'purchase' && activeInput in purchaseInputs
      ? purchaseInputs[activeInput as keyof typeof purchaseInputs]
      : '0';
      
    let newVal = currentVal;

    if (value === 'AC') {
      newVal = '0';
    } else if (value === '⌫') {
      newVal = currentVal.length > 1 ? currentVal.slice(0, -1) : '0';
    } else if (value === '.') {
      if (currentVal.includes('.')) return; // only one decimal
      newVal = `${currentVal}.`;
    } else if (value === '=') {
      // Trigger save when equals is pressed
      saveCurrentCalculation();
      return;
    } else {
      // digits
      newVal = currentVal === '0' ? value : currentVal + value;
    }

    // Update appropriate input set
    if (calculatorMode === 'sell' && activeInput in inputs) {
      setInputs(prev => ({ ...prev, [activeInput]: newVal }));
    } else if (calculatorMode === 'purchase' && activeInput in purchaseInputs) {
      setPurchaseInputs(prev => ({ ...prev, [activeInput]: newVal }));
    }
  };
  
  // Save current calculation to history
  const saveCurrentCalculation = async () => {
    try {
      if (calculatorMode === 'sell') {
        const w = parseFloat(inputs.sellWeight) || 0;
        const r = parseFloat(inputs.sellRate) || 0;
        const l = parseFloat(inputs.sellLabour) || 0;
        
        if (w > 0 && r > 0) { // Only save if valid data
          await saveSellEntry({
            weight: w,
            rate: r,
            labour: l,
            labourUnit: isLabourPerGram ? 'perGram' : 'fixed',
            total: total,
            totalGst: totalWithGst,
          });
          console.log("Sell calculation saved");
        }
      } else {
        const w = parseFloat(purchaseInputs.purchaseWeight) || 0;
        const t = parseFloat(purchaseInputs.purchaseTouch) || 0;
        const r = parseFloat(purchaseInputs.purchaseRate) || 0;
        
        if (w > 0 && t > 0 && r > 0) { // Only save if valid data
          await savePurchaseEntry({
            weight: w,
            touch: t,
            rate: r,
            total: total,
          });
          console.log("Purchase calculation saved");
        }
      }
    } catch (error) {
      console.error("Error saving calculation:", error);
    }
  };

  const value = {
    // Calculator Mode
    calculatorMode,
    setCalculatorMode: handleSetCalculatorMode,
    
    // Sell inputs
    ...inputs,
    
    // Purchase inputs
    ...purchaseInputs,
    
    // Other state
    total,
    totalWithGst,
    activeInput,
    setActiveInput,
    handleNumpadPress,
    saveCurrentCalculation,
    isLabourPerGram,
    toggleLabourMode,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};