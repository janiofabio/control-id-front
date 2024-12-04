import React from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, TextField, Grid, Typography, Button, IconButton, Tab, Tabs } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export const PersonCreate = () => {
    const translate = useTranslate();
    const { saveButtonProps, refineCore: { formLoading }, control, register, formState: { errors } } = useForm();
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Adicionar Nova Pessoa
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ddd',
                                padding: 2,
                                borderRadius: 1,
                                mb: 2,
                                backgroundColor: 'background.paper'
                            }}
                        >
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera />
                            </IconButton>
                            <Typography variant="body2">Adicionar Foto</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("name", { required: "This field is required" })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("people.fields.name")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration", { required: "This field is required" })}
                                    error={!!errors.registration}
                                    helperText={errors.registration?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("people.fields.registration")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("observations")}
                                    error={!!errors.observations}
                                    helperText={errors.observations?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("people.fields.observations")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("phoneNumber", { required: "This field is required", valueAsNumber: true })}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="number"
                                    label={translate("people.fields.phoneNumber")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("descriptions")}
                                    error={!!errors.descriptions}
                                    helperText={errors.descriptions?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("people.fields.descriptions")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("phoneDDI", { required: "This field is required", valueAsNumber: true })}
                                    error={!!errors.phoneDDI}
                                    helperText={errors.phoneDDI?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="number"
                                    label={translate("people.fields.phoneDDI")}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Geral" />
                        <Tab label="Informações Adicionais" />
                        <Tab label="Documentos" />
                        <Tab label="Grupos e Empresas" />
                        <Tab label="Senhas" />
                        <Tab label="Cartões" />
                        <Tab label="Digitais" />
                        <Tab label="Facial" />
                        <Tab label="QR Code" />
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && (
                        <Grid container spacing={2}>
                            {/* Geral Tab */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("account")}
                                    error={!!errors.account}
                                    helperText={errors.account?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Conta"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("permissions")}
                                    error={!!errors.permissions}
                                    helperText={errors.permissions?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Permissões"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("iDSecureAccess")}
                                    error={!!errors.iDSecureAccess}
                                    helperText={errors.iDSecureAccess?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Pessoa terá acesso ao iDSecure?"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("blockList")}
                                    error={!!errors.blockList}
                                    helperText={errors.blockList?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Lista de Bloqueio"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("deviceAdmin")}
                                    error={!!errors.deviceAdmin}
                                    helperText={errors.deviceAdmin?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Administrador dos Dispositivos"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("iDSecurePassword")}
                                    error={!!errors.iDSecurePassword}
                                    helperText={errors.iDSecurePassword?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Senha de Acesso ao iDSecure"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("accessProfile")}
                                    error={!!errors.accessProfile}
                                    helperText={errors.accessProfile?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Perfil de Acesso"
                                />
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 1 && (
                        <Grid container spacing={2}>
                            {/* Informações Adicionais Tab */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("releasePeriodStart")}
                                    error={!!errors.releasePeriodStart}
                                    helperText={errors.releasePeriodStart?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Início da Liberação"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("releasePeriodEnd")}
                                    error={!!errors.releasePeriodEnd}
                                    helperText={errors.releasePeriodEnd?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Fim da Liberação"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("occupation")}
                                    error={!!errors.occupation}
                                    helperText={errors.occupation?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Ocupação"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("admissionDate", { required: "This field is required" })}
                                    error={!!errors.admissionDate}
                                    helperText={errors.admissionDate?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    label={translate("people.fields.admissionDate")}
                                    defaultValue={new Date().toISOString().substring(0, 10)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("cellPhoneNumber")}
                                    error={!!errors.cellPhoneNumber}
                                    helperText={errors.cellPhoneNumber?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Número de Celular"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("extension")}
                                    error={!!errors.extension}
                                    helperText={errors.extension?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label="Ramal"
                                />
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 2 && (
                        <Grid container spacing={2}>
                            {/* Documentos Tab */}
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary">
                                    Adicionar Documento
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Exemplo de Tabela de Documentos */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Documentos
                                    </Typography>
                                    {/* lógica da tabela de documentos */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 3 && (
                        <Grid container spacing={2}>
                            {/* Grupos e Empresas Tab */}
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary">
                                    Adicionar Grupo ou Empresa
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Teste Tabela de Grupos e Empresas */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Grupos e Empresas
                                    </Typography>
                                    {/* lógica da tabela de grupos e empresas */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {/* Continuar para outras tabs  */}
                </Box>
            </Box>
        </Create>
    );
};
