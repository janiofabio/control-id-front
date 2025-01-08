import React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useAutocomplete } from "@refinedev/mui";

interface Group {
  id: number;
  description: string;
}

const GroupSection: React.FC = () => {
  const { control } = useFormContext();

  const { autocompleteProps } = useAutocomplete<Group>({
    resource: "groups",
    defaultValue: [],
    onSearch: (value) => [
      {
        field: "description",
        operator: "contains",
        value,
      },
    ],
  });

  return (
    <Box sx={{ p: 2 }}>
      <Controller
        name="groups"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            {...autocompleteProps}
            multiple
            value={value || []}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            getOptionLabel={(item) => item.description}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Grupos"
                placeholder="Selecione os grupos"
                variant="outlined"
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default GroupSection;

