import React from "react";
import { FormProvider, useForm, UseFormReturn } from "@refinedev/react-hook-form";

// Contexto para o FormProvider
const FormContext = React.createContext<UseFormReturn | undefined>(undefined);

// Wrapper para fornecer o contexto do formulário
export const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const formMethods = useForm(); // Inicializa o hook useForm

    return (
        <FormContext.Provider value={formMethods}>
            <FormProvider {...formMethods}>
                {children}
            </FormProvider>
        </FormContext.Provider>
    );
};

// Hook para acessar o contexto do formulário
export const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProviderWrapper");
    }
    return context;
};
