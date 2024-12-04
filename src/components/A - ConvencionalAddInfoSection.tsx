import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldValues, FieldErrors } from 'react-hook-form';

interface AddInfoSectionProps {
  errors: FieldErrors<FieldValues>;
}

// Reuso de Componente DatePicker com ajustes de slots
const ControlledDatePicker = ({ name, label, errors }) => {
  const { control, setValue } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={field.value || null} // Garantindo que o valor seja controlado
            onChange={(newValue) => setValue(name, newValue)}
            slots={{ textField: (params) => (
              <TextField
                {...params}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                fullWidth
              />
            )}}
          />
        </LocalizationProvider>
      )}
    />
  );
};

// Reuso de Componente TextField
const ControlledTextField = ({ name, label, errors, multiline = false, select = false, children }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value || ''} // Garantindo valor inicial não undefined
          label={label}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message}
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

const AddInfoSection: React.FC<AddInfoSectionProps> = ({ errors }) => {
  return (
    <Grid container spacing={2}>
      {/* Período de Liberação */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Período de Liberação
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="releasePeriodStart" label="Início da Liberação" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="releasePeriodEnd" label="Fim da Liberação" errors={errors} />
      </Grid>

      {/* PROFISSIONAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PROFISSIONAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="occupation" label="Ocupação" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="admissionDate" label="Data de Admissão" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="mobileNumber" label="Número de Celular" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="extensionNumber" label="Ramal" errors={errors} />
      </Grid>

      {/* PESSOAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PESSOAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="socialName" label="Nome Social" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="registryName" label="Nome de Registro" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="fatherName" label="Nome do Pai" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="motherName" label="Nome da Mãe" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="birthDate" label="Data de Nascimento" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="gender" label="Gênero" errors={errors} select>
          <MenuItem value="male">Masculino</MenuItem>
          <MenuItem value="female">Feminino</MenuItem>
          <MenuItem value="other">Outro</MenuItem>
        </ControlledTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="maritalStatus" label="Estado Civil" errors={errors} select>
          <MenuItem value="single">Solteiro(a)</MenuItem>
          <MenuItem value="married">Casado(a)</MenuItem>
          <MenuItem value="divorced">Divorciado(a)</MenuItem>
          <MenuItem value="widowed">Viúvo(a)</MenuItem>
        </ControlledTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="nationality" label="Nacionalidade" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="naturalness" label="Naturalidade" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="rg" label="RG" errors={errors} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="cpf" label="CPF" errors={errors} />
      </Grid>
      <Grid item xs={12}>
        <ControlledTextField name="observations" label="Observações" errors={errors} multiline />
      </Grid>
    </Grid>
  );
};

export default AddInfoSection;
