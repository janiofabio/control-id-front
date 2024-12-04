import React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';


const AddInfoSection: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    return (
        <Grid container spacing={2}>
            {/* Período de Liberação */}
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
                                onChange={(date) => setValue("releasePeriodStart", date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
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
                                onChange={(date) => setValue("releasePeriodEnd", date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.releasePeriodEnd}
                                        helperText={errors.releasePeriodEnd?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Grid>

            {/* Profissional */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    PROFISSIONAL
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Ocupação"
                    fullWidth
                    margin="normal"
                    {...register("occupation")}
                    error={!!errors.occupation}
                    helperText={errors.occupation?.message}
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
                                onChange={(date) => setValue("admissionDate", date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.admissionDate}
                                        helperText={errors.admissionDate?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Grid>

            {/* Pessoal */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    PESSOAL
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Nome Social"
                    fullWidth
                    margin="normal"
                    {...register("socialName")}
                    error={!!errors.socialName}
                    helperText={errors.socialName?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Nome de Registro"
                    fullWidth
                    margin="normal"
                    {...register("registryName")}
                    error={!!errors.registryName}
                    helperText={errors.registryName?.message}
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
                                onChange={(date) => setValue("birthDate", date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
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
                <TextField
                    select
                    label="Selecionar Gênero"
                    fullWidth
                    margin="normal"
                    {...register("gender")}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                >
                    <MenuItem value="male">Masculino</MenuItem>
                    <MenuItem value="female">Feminino</MenuItem>
                    <MenuItem value="other">Outro</MenuItem>
                </TextField>
            </Grid>

            {/* Documentos */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    DOCUMENTOS
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="RG"
                    fullWidth
                    margin="normal"
                    {...register("rg")}
                    error={!!errors.rg}
                    helperText={errors.rg?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="CPF"
                    fullWidth
                    margin="normal"
                    {...register("cpf")}
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                />
            </Grid>
        </Grid>
    );
};

export default AddInfoSection;
