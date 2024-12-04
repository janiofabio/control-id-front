import React, { useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Switch, FormGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useForm } from "@refinedev/react-hook-form";



const GeralSection: React.FC = () => {
    const { control, register, formState: { errors }, setValue, watch, trigger } = useForm();
    
    // Observa os valores dos switches
    const iDSecureAccess = watch("iDSecureAccess");
    const deviceAdmin = watch("deviceAdmin");

    // Efeito para lidar com a validação condicional dos campos
    useEffect(() => {
        iDSecureAccess ? trigger("iDSecurePassword") : setValue("iDSecurePassword", "");
        deviceAdmin ? trigger("accessProfile") : setValue("accessProfile", "");
    }, [iDSecureAccess, deviceAdmin, trigger, setValue]);

    // Função para renderizar campos baseados no estado dos switches
    const renderConditionalField = (condition: boolean, fieldName: string, label: string, errorMessage: string, type = "text") => (
        condition && (
            <TextField
                {...register(fieldName, { required: condition ? errorMessage : false })}
                error={!!errors[fieldName]}
                helperText={errors[fieldName]?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={label}
                type={type}
            />
        )
    );

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
                {renderConditionalField(iDSecureAccess, "iDSecurePassword", "Senha de Acesso ao iDSecure", "Senha de Acesso ao iDSecure é obrigatória", "password")}
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
                {renderConditionalField(deviceAdmin, "accessProfile", "Perfil de Acesso", "Perfil de Acesso é obrigatório")}
            </Grid>
        </Grid>
    );
};

export default GeralSection;
