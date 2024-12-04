import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldValues, FieldErrors } from 'react-hook-form';

interface AddInfoSectionProps {
  errors: FieldErrors<FieldValues>;
}

const logChange = (fieldName: string, value: any) => {
  console.log(`Campo ${fieldName} alterado para:`, value);
};

const AddInfoSection: React.FC<AddInfoSectionProps> = ({ errors }) => {
  const { control, setValue } = useFormContext<FieldValues>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Período de Liberação
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="releasePeriodStart"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Início da Liberação"
                onChange={(date) => {
                  setValue("releasePeriodStart", date);
                  logChange("releasePeriodStart", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.releasePeriodStart}
                    helperText={errors.releasePeriodStart?.message}
                    
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="releasePeriodEnd"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fim da Liberação"
                
                onChange={(date) => {
                  setValue("releasePeriodEnd", date);
                  logChange("releasePeriodEnd", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.releasePeriodEnd}
                    helperText={errors.releasePeriodEnd?.message}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PROFISSIONAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="occupation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Ocupação"
              onChange={(date) => {
                setValue("occupation", date);
                logChange("occupation", date);
              }}
              error={!!errors.occupation}
              helperText={errors.occupation?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="admissionDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Data de Admissão"
                onChange={(date) => {
                  setValue("admissionDate", date);
                  logChange("admissionDate", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.admissionDate}
                    helperText={errors.admissionDate?.message}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="mobileNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Número de Celular"
              onChange={(date) => {
                setValue("mobileNumber", date);
                logChange("mobileNumber", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Ramal"
              onChange={(date) => {
                setValue("extensionNumber", date);
                logChange("extensionNumber", date);
              }}
              error={!!errors.extensionNumber}
              helperText={errors.extensionNumber?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PESSOAL
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="socialName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nome Social"
              onChange={(date) => {
                setValue("socialName", date);
                logChange("socialName", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nome de Registro"
              onChange={(date) => {
                setValue("registryName", date);
                logChange("registryName", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nome do Pai"
              onChange={(date) => {
                setValue("fatherName", date);
                logChange("fatherName", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nome da Mãe"
              onChange={(date) => {
                setValue("motherName", date);
                logChange("motherName", date);
              }}
              error={!!errors.motherName}
              helperText={errors.motherName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Data de Nascimento"
                onChange={(date) => {
                  setValue("birthDate", date);
                  logChange("birthDate", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Selecionar Gênero"
              onChange={(date) => {
                setValue("gender", date);
                logChange("gender", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              select
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Selecionar Estado Civil"
              onChange={(date) => {
                setValue("maritalStatus", date);
                logChange("maritalStatus", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nacionalidade"
              onChange={(date) => {
                setValue("nationality", date);
                logChange("nationality", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Naturalidade"
              onChange={(date) => {
                setValue("naturalness", date);
                logChange("naturalness", date);
              }}
              error={!!errors.naturalness}
              helperText={errors.naturalness?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          DOCUMENTOS
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="rg"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="RG"
              onChange={(date) => {
                setValue("rg", date);
                logChange("rg", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="CPF"
              onChange={(date) => {
                setValue("cpf", date);
                logChange("cpf", date);
              }}
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
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Passaporte"
              onChange={(date) => {
                setValue("passport", date);
                logChange("passport", date);
              }}
              error={!!errors.passport}
              helperText={errors.passport?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default AddInfoSection;
