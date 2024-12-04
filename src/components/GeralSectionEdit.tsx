import React, { useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Switch, FormGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const GeralSectionEdit: React.FC<{ peopleData: any }> = ({ peopleData }) => {
    const methods = useFormContext();

    // Verifica se o contexto é nulo e lança um erro se necessário
    if (!methods) {
        throw new Error("useFormContext must be used within a FormProvider.");
    }

    const { control, register, formState: { errors }, watch, trigger } = methods;

    const iDSecureAccess = watch("iDSecureAccess");
    const deviceAdmin = watch("deviceAdmin");

    useEffect(() => {
        if (iDSecureAccess) {
            trigger("iDSecurePassword");
        }
    }, [iDSecureAccess, trigger]);

    useEffect(() => {
        if (deviceAdmin) {
            trigger("accessProfile");
        }
    }, [deviceAdmin, trigger]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Conta
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Controller
                                name="iDSecureAccess"
                                control={control}
                                defaultValue={peopleData?.iDSecureAccess ?? false}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(event) => field.onChange(event.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Pessoa terá acesso ao iDSecure?"
                    />
                </FormGroup>
                {iDSecureAccess && (
                    <TextField
                        {...register("iDSecurePassword", { required: "Senha de Acesso ao iDSecure é obrigatória" })}
                        error={!!errors.iDSecurePassword}
                        helperText={errors.iDSecurePassword?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Senha de Acesso ao iDSecure"
                        type="password"
                        defaultValue={peopleData?.iDSecurePassword ?? ""}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Permissões
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Controller
                                name="blockList"
                                control={control}
                                defaultValue={peopleData?.blockList ?? false}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(event) => field.onChange(event.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Lista de Bloqueio"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Controller
                                name="deviceAdmin"
                                control={control}
                                defaultValue={peopleData?.deviceAdmin ?? false}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(event) => field.onChange(event.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Pessoa terá acesso de Administrador do Dispositivo?"
                    />
                </FormGroup>
                {deviceAdmin && (
                    <TextField
                        {...register("accessProfile", { required: "Perfil de Acesso é obrigatório" })}
                        error={!!errors.accessProfile}
                        helperText={errors.accessProfile?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Perfil de Acesso"
                        defaultValue={peopleData?.accessProfile ?? ""}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default GeralSectionEdit;
