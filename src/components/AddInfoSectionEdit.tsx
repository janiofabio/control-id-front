import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';

interface AddInfoSectionProps {
  errors: FieldErrors;
  peopleData: {
    releasePeriodStart?: string;
    releasePeriodEnd?: string;
    occupation?: string;
    admissionDate?: string;
    mobileNumber?: string;
    extensionNumber?: string;
    socialName?: string;
    registryName?: string;
    fatherName?: string;
    motherName?: string;
    birthDate?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    naturalness?: string;
    rg?: string;
    cpf?: string;
    passport?: string;
  };
}

const AddInfoSectionEdit: React.FC<AddInfoSectionProps> = ({ errors, peopleData }) => {
  const { control, setValue } = useFormContext();

  const parseDate = (dateString?: string) => (dateString ? new Date(dateString) : null);

  const defaultValues = {
    releasePeriodStart: parseDate(peopleData?.releasePeriodStart),
    releasePeriodEnd: parseDate(peopleData?.releasePeriodEnd),
    occupation: peopleData?.occupation || '',
    admissionDate: parseDate(peopleData?.admissionDate),
    mobileNumber: peopleData?.mobileNumber || '',
    extensionNumber: peopleData?.extensionNumber || '',
    socialName: peopleData?.socialName || '',
    registryName: peopleData?.registryName || '',
    fatherName: peopleData?.fatherName || '',
    motherName: peopleData?.motherName || '',
    birthDate: parseDate(peopleData?.birthDate),
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
                slotProps={{
                  textField: {
                    error: !!errors.releasePeriodStart,
                    helperText: String(errors.releasePeriodStart?.message || ''),
                    fullWidth: true,
                  },
                }}
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
                slotProps={{
                  textField: {
                    error: !!errors.releasePeriodEnd,
                    helperText: String(errors.releasePeriodEnd?.message || ''),
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>

      {/* Seção Profissional */}
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
              helperText={String(errors.occupation?.message || '')}
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
                slotProps={{
                  textField: {
                    error: !!errors.admissionDate,
                    helperText: String(errors.admissionDate?.message || ''),
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>

      {/* Informações Pessoais */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          INFORMAÇÕES PESSOAIS
        </Typography>
      </Grid>
      {[
        { name: 'socialName', label: 'Nome Social' },
        { name: 'registryName', label: 'Nome de Registro' },
        { name: 'fatherName', label: 'Nome do Pai' },
        { name: 'motherName', label: 'Nome da Mãe' },
        { name: 'mobileNumber', label: 'Celular' },
        { name: 'extensionNumber', label: 'Ramal' },
        { name: 'cpf', label: 'CPF' },
        { name: 'rg', label: 'RG' },
        { name: 'passport', label: 'Passaporte' },
      ].map(({ name, label }) => (
        <Grid item xs={12} md={6} key={name}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValues[name as keyof typeof defaultValues]}
            render={({ field }) => (
              <TextField
                {...field}
                label={label}
                fullWidth
                error={!!errors[name as keyof typeof errors]}
                helperText={String(errors[name as keyof typeof errors]?.message || '')}
              />
            )}
          />
        </Grid>
      ))}

      {/* Dados Adicionais */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          DADOS ADICIONAIS
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="gender"
          control={control}
          defaultValue={defaultValues.gender}
          render={({ field }) => (
            <TextField
              {...field}
              label="Gênero"
              select
              fullWidth
              error={!!errors.gender}
              helperText={String(errors.gender?.message || '')}
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
              label="Estado Civil"
              fullWidth
              error={!!errors.maritalStatus}
              helperText={String(errors.maritalStatus?.message || '')}
            />
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
              helperText={String(errors.nationality?.message || '')}
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
              helperText={String(errors.naturalness?.message || '')}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default AddInfoSectionEdit;
