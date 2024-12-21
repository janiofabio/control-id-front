import React from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useTranslate, useCreate } from "@refinedev/core";

interface CompanyFormData {
  description: string;
  type: string;
  blackList: boolean;
  companyName: string;
  totalPersons: number;
}

export const CompanyCreate: React.FC = () => {
  const translate = useTranslate();
  const { mutate: createCompany } = useCreate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompanyFormData>();

  const { autocompleteProps: companyAutocompleteProps } = useAutocomplete({
    resource: "companies",
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await createCompany({
        resource: "companies",
        values: data,
      });
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <Create saveButtonProps={{ onClick: handleSubmit(onSubmit) }}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          name="description"
          control={control}
          rules={{ required: "Este campo é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Description"
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          rules={{ required: "Este campo é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.type}
              helperText={errors.type?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Type"
            />
          )}
        />
        
        <Controller
          name="blackList"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              label={translate("companies.fields.blackList")}
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />

        <Controller
          name="companyName"
          control={control}
          rules={{ required: "Este campo é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={translate("companies.fields.companyName")}
            />
          )}
        />

        <Controller
          name="totalPersons"
          control={control}
          rules={{ 
            required: "Este campo é obrigatório",
            valueAsNumber: true,
            min: { value: 0, message: "O valor deve ser maior ou igual a 0" }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.totalPersons}
              helperText={errors.totalPersons?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              label={translate("companies.fields.totalPersons")}
            />
          )}
        />
      </Box>
    </Create>
  );
};