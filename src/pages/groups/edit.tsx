import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete, Chip } from "@mui/material";
import { Controller } from "react-hook-form";

export const GroupEdit: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const groupData = queryResult?.data?.data;

  const { autocompleteProps } = useAutocomplete({
    resource: "people",
    defaultValue: groupData?.pessoasGrupo,
    onSearch: (value) => [
      {
        field: "name",
        operator: "contains",
        value,
      },
    ],
  });

  React.useEffect(() => {
    if (groupData) {
      setValue("description", groupData.description);
      setValue("pessoasGrupo", groupData.pessoasGrupo || []);
    }
  }, [groupData, setValue]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("description", {
            required: "Este campo é obrigatório",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          fullWidth
          label="Descrição do Grupo"
          name="description"
          InputLabelProps={{ shrink: true }}
        />
        <Controller
          control={control}
          name="pessoasGrupo"
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              multiple
              disablePortal
              options={autocompleteProps.options || []}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(option) => option.name || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pessoas"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.pessoasGrupo}
                  helperText={errors.pessoasGrupo?.message}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option: any, index: number) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.name}
                  />
                ))
              }
            />
          )}
        />
      </Box>
    </Edit>
  );
};