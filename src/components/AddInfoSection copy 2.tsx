import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';

const ControlledDatePicker = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...field}
            label={label}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

const ControlledTextField = ({ name, label, multiline = false, select = false, children }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!error}
          helperText={error?.message}
          multiline={multiline}
          rows={multiline ? 4 : 1}
          select={select}
        >
          {children}
        </TextField>
      )}
    />
  );
};

const AddInfoSection: React.FC = () => {
  return (
    <Grid container spacing={2}>
 
      <Grid item xs={12}>
        <ControlledTextField name="observations" label="Observações" multiline />
      </Grid>
    </Grid>
  );
};

export default AddInfoSection;