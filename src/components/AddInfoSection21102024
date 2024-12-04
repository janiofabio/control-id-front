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
      {/* Período de Liberação */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Período de Liberação
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="releasePeriodStart" label="Início da Liberação" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="releasePeriodEnd" label="Fim da Liberação" />
      </Grid>

      {/* PROFISSIONAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PROFISSIONAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="occupation" label="Ocupação" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="admissionDate" label="Data de Admissão" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="mobileNumber" label="Número de Celular" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="extensionNumber" label="Ramal" />
      </Grid>

      {/* PESSOAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PESSOAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="socialName" label="Nome Social" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="registryName" label="Nome de Registro" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="fatherName" label="Nome do Pai" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="motherName" label="Nome da Mãe" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledDatePicker name="birthDate" label="Data de Nascimento" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="gender" label="Gênero" select>
          <MenuItem value="male">Masculino</MenuItem>
          <MenuItem value="female">Feminino</MenuItem>
          <MenuItem value="other">Outro</MenuItem>
        </ControlledTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="maritalStatus" label="Estado Civil" select>
          <MenuItem value="single">Solteiro(a)</MenuItem>
          <MenuItem value="married">Casado(a)</MenuItem>
          <MenuItem value="divorced">Divorciado(a)</MenuItem>
          <MenuItem value="widowed">Viúvo(a)</MenuItem>
        </ControlledTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="nationality" label="Nacionalidade" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="naturalness" label="Naturalidade" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="rg" label="RG" />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledTextField name="cpf" label="CPF" />
      </Grid>


      
      <Grid item xs={12}>
        <ControlledTextField name="observations" label="Observações" multiline />
      </Grid>
    </Grid>
  );
};

export default AddInfoSection;