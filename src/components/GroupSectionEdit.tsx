import React, { useEffect } from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useAutocomplete } from "@refinedev/mui";

interface Group {
  id: number;
  description: string;
}

/*
interface GroupSectionEditProps {
  peopleData: {
    groups?: Group[];
  };
}*/

interface GroupSectionEditProps {
  peopleData: any;
}

const GroupSectionEdit: React.FC<GroupSectionEditProps> = ({ peopleData }) => {
  const { control, setValue } = useFormContext();

  const { autocompleteProps } = useAutocomplete<Group>({
    resource: "groups",
    defaultValue: peopleData?.groups || [],
    onSearch: (value) => [
      {
        field: "description",
        operator: "contains",
        value,
      },
    ],
  });

  // Inicializa os grupos quando os dados da pessoa são carregados
  useEffect(() => {
    if (peopleData?.groups) {
      setValue('groups', peopleData.groups);
    }
  }, [peopleData, setValue]);

  return (
    <Box sx={{ p: 2 }}>
      <Controller
        name="groups"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            {...autocompleteProps}
            multiple
            value={field.value || []}
            onChange={(_, newValue) => {
              field.onChange(newValue);
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
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  label={option.description}
                />
              ))
            }
            isOptionEqualToValue={(option, value) => 
              option.id === value.id
            }
          />
        )}
      />
    </Box>
  );
};

export default GroupSectionEdit;

