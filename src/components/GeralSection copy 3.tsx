import React, { useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Switch, FormGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const GeralSection: React.FC = () => {
    const { control, watch, setValue } = useFormContext();
    
    const iDSecureAccess = watch("iDSecureAccess");
    const deviceAdmin = watch("deviceAdmin");

    useEffect(() => {
        if (!iDSecureAccess) {
            setValue("iDSecurePassword", "");
        }
        if (!deviceAdmin) {
            setValue("accessProfile", "");
        }
    }, [iDSecureAccess, deviceAdmin, setValue]);

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
                                defaultValue={false}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Pessoa terá acesso ao iDSecure?"
                    />
                </FormGroup>
                {iDSecureAccess && (
                    <Controller
                        name="iDSecurePassword"
                        control={control}
                        defaultValue=""
                        rules={{ required: iDSecureAccess ? "Senha de Acesso ao iDSecure é obrigatória" : false }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Senha de Acesso ao iDSecure"
                                type="password"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                                margin="normal"
                            />
                        )}
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
                                defaultValue={false}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
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
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Pessoa terá acesso de Administrador do Dispositivo?"
                    />
                </FormGroup>
                {deviceAdmin && (
                    <Controller
                        name="accessProfile"
                        control={control}
                        defaultValue=""
                        rules={{ required: deviceAdmin ? "Perfil de Acesso é obrigatório" : false }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Perfil de Acesso"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                                margin="normal"
                            />
                        )}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default GeralSection;