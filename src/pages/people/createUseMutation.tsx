// PersonCreate.tsx
import React from "react";
import { useMutation } from '@tanstack/react-query';
import { useTranslate, useNavigation, HttpError } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress } from "@mui/material";
import PersonForm from "@components/PersonForm/PersonForm";
import QueryClientProviderWrapper from '@utils/QueryClientProviderWrapper';

export const PersonCreate: React.FC = () => {
  const { mutate, isLoading } = useMutation<any, HttpError, any>();
  const { goBack } = useNavigation();
  const { handleSubmit, control } = useForm();
  const translate = useTranslate();

  const onSubmit = async (data: any) => {
    await mutate(data, {
      onSuccess: () => {
        goBack();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <QueryClientProviderWrapper> {/* Envolve o componente com QueryClientProvider */}
      <Box sx={{ padding: 2 }}>
        <PersonForm onSubmit={handleSubmit(onSubmit)} formLoading={isLoading} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={() => goBack()} disabled={isLoading}>
            {translate("buttons.cancel")}
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : translate("buttons.save")}
          </Button>
        </Box>
      </Box>
    </QueryClientProviderWrapper>
  );
};

export default PersonCreate;
