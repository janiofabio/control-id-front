import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import { HttpError } from "@refinedev/core";

// Interfaces
interface IGroupForm {
  description: string;
  person_id: number[];
}

interface IPerson {
  id: number;
  name: string;
}

// Função auxiliar segura para processar IDs
const processPersonIds = (rawIds: any): number[] => {
  if (!rawIds) return [];
  
  const idsArray = Array.isArray(rawIds) ? rawIds : [rawIds];
  return idsArray
    .filter(Boolean)
    .map(item => {
      if (typeof item === 'object' && item !== null) {
        return item.id;
      }
      return Number(item);
    })
    .filter(id => !isNaN(id));
};

export const GroupEdit: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm<IGroupForm, HttpError>();

  const groupData = queryResult?.data?.data;

  // Usando a função auxiliar
  const currentPersonIds = React.useMemo(() => {
    return processPersonIds(groupData?.person_id);
  }, [groupData]);

  const { autocompleteProps } = useAutocomplete<IPerson>({
    resource: "people",
    defaultValue: currentPersonIds,
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
      setValue("person_id", currentPersonIds);
    }
  }, [groupData, setValue, currentPersonIds]);

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
          helperText={errors.description?.message?.toString() || ""}
          margin="normal"
          fullWidth
          label="Descrição do Grupo"
          name="description"
        />
        
        <Controller
          control={control}
          name="person_id"
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete<IPerson, true>
              {...autocompleteProps}
              multiple
              options={autocompleteProps?.options || []}
              value={
                (autocompleteProps?.options || [])
                  .filter(option => field.value?.includes(option.id))
              }
              onChange={(_, newValue) => {
                field.onChange(newValue.map(item => item.id));
              }}
              getOptionLabel={(option: IPerson) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pessoas"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.person_id}
                  helperText={errors.person_id?.message?.toString() || ""}
                />
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
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