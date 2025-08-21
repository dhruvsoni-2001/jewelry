import React, { createContext, useContext, useEffect, useState } from 'react';

// Define which input fields can be active for the Sale calculator
type ActiveInput = 'sellWeight' | 'sellRate' | 'sellLabour';

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

interface CalculatorState {
  // Input Values
  sellWeight: string;
  sellRate: string;
  sellLabour: string;
  
  // Labour Mode
  isLabourPerGram: boolean;
  toggleLabourMode: () => void;
  
  // Output Values
  total: number;
  totalWithGst: number;

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
  const [inputs, setInputs] = useState({
    sellWeight: '0',
    sellRate: '0',
    sellLabour: '0',
  });
  const [activeInput, setActiveInput] = useState<ActiveInput | null>('sellWeight');
  const [total, setTotal] = useState(0);
  const [totalWithGst, setTotalWithGst] = useState(0);
  const [isLabourPerGram, setIsLabourPerGram] = useState(true); // Default to per gram

  // Toggle labour calculation mode
  const toggleLabourMode = () => {
    setIsLabourPerGram(!isLabourPerGram);
  };

  // Perform calculations whenever an input changes
  useEffect(() => {
    const w = parseFloat(inputs.sellWeight) || 0;
    const r = parseFloat(inputs.sellRate) || 0;
    const l = parseFloat(inputs.sellLabour) || 0;
    
    const goldValue = w * r;
    const labourCost = isLabourPerGram ? (w * l) : l; // Per gram or fixed rate
    const subtotal = goldValue + labourCost;
    
    setTotal(subtotal);
    setTotalWithGst(subtotal * (1 + GST_RATE));
  }, [inputs, isLabourPerGram]);

  const handleNumpadPress = (value: string) => {
    // Handle field navigation first
    const fields: ActiveInput[] = ['sellWeight', 'sellRate', 'sellLabour'];
    if (value === '<' || value === '>') {
      if (!activeInput) return;
      const idx = fields.indexOf(activeInput);
      if (idx === -1) return;
      const nextIdx = value === '>' ? Math.min(idx + 1, fields.length - 1) : Math.max(idx - 1, 0);
      setActiveInput(fields[nextIdx]);
      return;
    }

    if (!activeInput) return;
    const currentVal = inputs[activeInput];
    let newVal = currentVal;

    if (value === 'AC') {
      newVal = '0';
    } else if (value === '⌫') {
      newVal = currentVal.length > 1 ? currentVal.slice(0, -1) : '0';
    } else if (value === '.') {
      if (currentVal.includes('.')) return; // only one decimal
      newVal = `${currentVal}.`;
    } else if (value === '=') {
      // no-op for now; could trigger save
      return;
    } else {
      // digits
      newVal = currentVal === '0' ? value : currentVal + value;
    }

    setInputs(prev => ({ ...prev, [activeInput]: newVal }));
  };
  
  // Placeholder for save logic
  const saveCurrentCalculation = () => {
      console.log("Saving calculation...", { ...inputs, total, totalWithGst });
      // Here you would call your storage service
  };

  const value = {
    ...inputs,
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