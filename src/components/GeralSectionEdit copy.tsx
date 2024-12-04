import React, { useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Switch, FormGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const GeralSectionEdit: React.FC = () => {
    const { control, register, formState: { errors }, setValue, watch, trigger } = useFormContext();
    
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
            {/* Sessão de Conta */}
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
                                defaultValue={false}
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
                        defaultValue="" // Coloque aqui o valor padrão vindo dos dados
                        error={!!errors.iDSecurePassword}
                        helperText={errors.iDSecurePassword?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Senha de Acesso ao iDSecure"
                        type="password"
                    />
                )}
            </Grid>

            {/* Sessão de Permissões */}
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
                                defaultValue={false}
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
                                defaultValue={false}
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
                        defaultValue="" // Coloque aqui o valor padrão vindo dos dados
                        error={!!errors.accessProfile}
                        helperText={errors.accessProfile?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Perfil de Acesso"
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default GeralSectionEdit;
