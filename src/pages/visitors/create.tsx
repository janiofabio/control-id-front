import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const VisitorCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField

          error={!!errors.personType}
          helperText={errors.personType?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Person Type"
          name="personType"
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <TextField

          error={!!errors.registration}
          helperText={errors.registration?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Registration"
          name="registration"
        />
      </Box>
    </Create>
  );
};
