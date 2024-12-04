import React, { useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Switch, FormGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const GeralSection: React.FC = () => {
    // useFormContext permite acessar o estado do formulário no contexto global do react-hook-form
    const { control, register, formState: { errors }, setValue, watch, trigger } = useFormContext();
    
    // Verifica os valores dos campos observados, que são controlados por Switch
    const iDSecureAccess = watch("iDSecureAccess");
    const deviceAdmin = watch("deviceAdmin");

    // UseEffect que aciona a validação do campo de senha quando iDSecureAccess é true
    useEffect(() => {
        if (iDSecureAccess) {
            trigger("iDSecurePassword");
        } else {
            // Se iDSecureAccess for false, reseta o campo
            setValue("iDSecurePassword", "");
        }
    }, [iDSecureAccess, trigger, setValue]);

    // UseEffect que aciona a validação do campo de perfil de acesso quando deviceAdmin é true
    useEffect(() => {
        if (deviceAdmin) {
            trigger("accessProfile");
        } else {
            // Se deviceAdmin for false, reseta o campo
            setValue("accessProfile", "");
        }
    }, [deviceAdmin, trigger, setValue]);

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
                                        onChange={(event) => field.onChange(event.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Pessoa terá acesso ao iDSecure?"
                    />
                </FormGroup>

                {/* Campo de senha é exibido apenas quando iDSecureAccess é verdadeiro */}
                {iDSecureAccess && (
                    <TextField
                        {...register("iDSecurePassword", {
                            required: iDSecureAccess ? "Senha de Acesso ao iDSecure é obrigatória" : false,
                        })}
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

                {/* Campo de perfil de acesso é exibido apenas quando deviceAdmin é verdadeiro */}
                {deviceAdmin && (
                    <TextField
                        {...register("accessProfile", {
                            required: deviceAdmin ? "Perfil de Acesso é obrigatório" : false,
                        })}
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

export default GeralSection;
