import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ledger_loan_draft';

export function useMultiStepForm<T extends Record<string, any>>(steps: string[], defaultValues: T) {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_step');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [formData, setFormData] = useState<T>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_data');
    if (saved) {
      try { return JSON.parse(saved); } catch { return defaultValues; }
    }
    return defaultValues;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_step', String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    const { documents, ...rest } = formData as any;
    localStorage.setItem(STORAGE_KEY + '_data', JSON.stringify(rest));
  }, [formData]);

  const next = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 0));
  const goTo = (step: number) => setCurrentStep(step);
  const updateFields = (fields: Partial<T>) => setFormData(prev => ({ ...prev, ...fields }));
  const clearSaved = () => {
    localStorage.removeItem(STORAGE_KEY + '_step');
    localStorage.removeItem(STORAGE_KEY + '_data');
    setCurrentStep(0);
    setFormData(defaultValues);
  };

  return {
    currentStep, steps, formData, isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    next, prev, goTo, updateFields, clearSaved,
  };
}
