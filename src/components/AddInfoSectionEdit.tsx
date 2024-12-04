import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldValues, FieldErrors } from 'react-hook-form';

interface AddInfoSectionProps {
  errors: FieldErrors<FieldValues>;
  peopleData: any; // Tipo correto baseado nos dados de peopleData
}

const AddInfoSectionEdit: React.FC<AddInfoSectionProps> = ({ errors, peopleData }) => {
  const { control, setValue } = useFormContext<FieldValues>();

  // Função para converter string ISO 8601 para objeto Date
  const parseDate = (dateString: string | null) => {
    return dateString ? new Date(dateString) : null;
  };

  // Valores padrão que vêm de peopleData, caso estejam disponíveis
  const defaultValues = {
    releasePeriodStart: parseDate(peopleData?.releasePeriodStart || null),
    releasePeriodEnd: parseDate(peopleData?.releasePeriodEnd || null),
    occupation: peopleData?.occupation || '',
    admissionDate: parseDate(peopleData?.admissionDate || null),
    mobileNumber: peopleData?.mobileNumber || '',
    extensionNumber: peopleData?.extensionNumber || '',
    socialName: peopleData?.socialName || '',
    registryName: peopleData?.registryName || '',
    fatherName: peopleData?.fatherName || '',
    motherName: peopleData?.motherName || '',
    birthDate: parseDate(peopleData?.birthDate || null),
    gender: peopleData?.gender || '',
    maritalStatus: peopleData?.maritalStatus || '',
    nationality: peopleData?.nationality || '',
    naturalness: peopleData?.naturalness || '',
    rg: peopleData?.rg || '',
    cpf: peopleData?.cpf || '',
    passport: peopleData?.passport || '',
  };

  return (
    <Grid container spacing={2}>
      {/* Período de Liberação */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Período de Liberação
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="releasePeriodStart"
          control={control}
          defaultValue={defaultValues.releasePeriodStart}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Início da Liberação"
                value={field.value}
                onChange={(newValue) => setValue('releasePeriodStart', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.releasePeriodStart}
                    helperText={errors.releasePeriodStart?.message}
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="releasePeriodEnd"
          control={control}
          defaultValue={defaultValues.releasePeriodEnd}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fim da Liberação"
                value={field.value}
                onChange={(newValue) => setValue('releasePeriodEnd', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.releasePeriodEnd}
                    helperText={errors.releasePeriodEnd?.message}
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      
      {/* PROFISSIONAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PROFISSIONAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="occupation"
          control={control}
          defaultValue={defaultValues.occupation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ocupação"
              fullWidth
              error={!!errors.occupation}
              helperText={errors.occupation?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="admissionDate"
          control={control}
          defaultValue={defaultValues.admissionDate}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de Admissão"
                value={field.value}
                onChange={(newValue) => setValue('admissionDate', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.admissionDate}
                    helperText={errors.admissionDate?.message}
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="mobileNumber"
          control={control}
          defaultValue={defaultValues.mobileNumber}
          render={({ field }) => (
            <TextField
              {...field}
              label="Número de Celular"
              fullWidth
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="extensionNumber"
          control={control}
          defaultValue={defaultValues.extensionNumber}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ramal"
              fullWidth
              error={!!errors.extensionNumber}
              helperText={errors.extensionNumber?.message}
            />
          )}
        />
      </Grid>
      
      {/* PESSOAL */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PESSOAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="socialName"
          control={control}
          defaultValue={defaultValues.socialName}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome Social"
              fullWidth
              error={!!errors.socialName}
              helperText={errors.socialName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="registryName"
          control={control}
          defaultValue={defaultValues.registryName}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome de Registro"
              fullWidth
              error={!!errors.registryName}
              helperText={errors.registryName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="fatherName"
          control={control}
          defaultValue={defaultValues.fatherName}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome do Pai"
              fullWidth
              error={!!errors.fatherName}
              helperText={errors.fatherName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="motherName"
          control={control}
          defaultValue={defaultValues.motherName}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome da Mãe"
              fullWidth
              error={!!errors.motherName}
              helperText={errors.motherName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="birthDate"
          control={control}
          defaultValue={defaultValues.birthDate}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de Nascimento"
                value={field.value}
                onChange={(newValue) => setValue('birthDate', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="gender"
          control={control}
          defaultValue={defaultValues.gender}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Gênero"
              fullWidth
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Feminino</MenuItem>
              <MenuItem value="other">Outro</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="maritalStatus"
          control={control}
          defaultValue={defaultValues.maritalStatus}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Estado Civil"
              fullWidth
              error={!!errors.maritalStatus}
              helperText={errors.maritalStatus?.message}
            >
              <MenuItem value="single">Solteiro(a)</MenuItem>
              <MenuItem value="married">Casado(a)</MenuItem>
              <MenuItem value="divorced">Divorciado(a)</MenuItem>
              <MenuItem value="widowed">Viúvo(a)</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="nationality"
          control={control}
          defaultValue={defaultValues.nationality}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nacionalidade"
              fullWidth
              error={!!errors.nationality}
              helperText={errors.nationality?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="naturalness"
          control={control}
          defaultValue={defaultValues.naturalness}
          render={({ field }) => (
            <TextField
              {...field}
              label="Naturalidade"
              fullWidth
              error={!!errors.naturalness}
              helperText={errors.naturalness?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="rg"
          control={control}
          defaultValue={defaultValues.rg}
          render={({ field }) => (
            <TextField
              {...field}
              label="RG"
              fullWidth
              error={!!errors.rg}
              helperText={errors.rg?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="cpf"
          control={control}
          defaultValue={defaultValues.cpf}
          render={({ field }) => (
            <TextField
              {...field}
              label="CPF"
              fullWidth
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="passport"
          control={control}
          defaultValue={defaultValues.passport}
          render={({ field }) => (
            <TextField
              {...field}
              label="Passaporte"
              fullWidth
              error={!!errors.passport}
              helperText={errors.passport?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default AddInfoSectionEdit;
