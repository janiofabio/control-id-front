// src/components/FormContext.tsx
import React, { createContext, useContext } from 'react';
import { useForm, UseFormReturn, FormProvider } from 'react-hook-form';

interface FormContextProps {
  formMethods: UseFormReturn<any>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const formMethods = useForm(); // Inicializando o useForm

  return (
    <FormContext.Provider value={{ formMethods }}>
      <FormProvider {...formMethods}>{children}</FormProvider>
    </FormContext.Provider>
  );
};

export const useFormContextProvider = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContextProvider must be used within a FormProviderWrapper');
  }
  return context;
};
