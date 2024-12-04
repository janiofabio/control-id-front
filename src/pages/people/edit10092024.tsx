import React from "react";
import { useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, Typography, Grid, Tabs, Tab, Button, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const PersonEdit = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();

    const peopleData = queryResult?.data?.data;

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Editar Pessoa
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
                            {/* Área para upload de foto */}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="contained" component="span">
                                    {translate("Upload Photo")}
                                </Button>
                            </label>
                            {peopleData?.profilePicture && (
                                <img
                                    src={peopleData.profilePicture}
                                    alt="Foto de Perfil"
                                    style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("name", {
                                        required: "This field is required",
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.name")}
                                    name="name"
                                    defaultValue={peopleData?.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration", {
                                        required: "This field is required",
                                    })}
                                    error={!!errors.registration}
                                    helperText={errors.registration?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.registration")}
                                    name="registration"
                                    defaultValue={peopleData?.registration}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("observations")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.observations")}
                                    name="observations"
                                    defaultValue={peopleData?.observations}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("phoneNumber")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.phoneNumber")}
                                    name="phoneNumber"
                                    defaultValue={peopleData?.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("descriptions")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.descriptions")}
                                    name="descriptions"
                                    defaultValue={peopleData?.descriptions}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("phoneDDI")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={translate("people.fields.phoneDDI")}
                                    name="phoneDDI"
                                    defaultValue={peopleData?.phoneDDI}
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
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Conta"
                                    name="account"
                                    defaultValue={peopleData?.account}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("permissions")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Permissões"
                                    name="permissions"
                                    defaultValue={peopleData?.permissions}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("iDSecureAccess")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Pessoa terá acesso ao iDSecure?"
                                    name="iDSecureAccess"
                                    defaultValue={peopleData?.iDSecureAccess}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("blockList")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Lista de Bloqueio"
                                    name="blockList"
                                    defaultValue={peopleData?.blockList}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("deviceAdmin")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Administrador dos Dispositivos"
                                    name="deviceAdmin"
                                    defaultValue={peopleData?.deviceAdmin}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("iDSecurePassword")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Senha de Acesso ao iDSecure"
                                    name="iDSecurePassword"
                                    defaultValue={peopleData?.iDSecurePassword}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("accessProfile")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Perfil de Acesso"
                                    name="accessProfile"
                                    defaultValue={peopleData?.accessProfile}
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
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Início da Liberação"
                                    name="releasePeriodStart"
                                    defaultValue={peopleData?.releasePeriodStart}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("releasePeriodEnd")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Fim da Liberação"
                                    name="releasePeriodEnd"
                                    defaultValue={peopleData?.releasePeriodEnd}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("occupation")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Ocupação"
                                    name="occupation"
                                    defaultValue={peopleData?.occupation}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        {...register("admissionDate")}
                                        label="Data de Admissão"
                                        value={peopleData?.admissionDate}
                                        onChange={(date) => setValue("admissionDate", date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                margin="normal"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                name="admissionDate"
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("cellPhoneNumber")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Número de Celular"
                                    name="cellPhoneNumber"
                                    defaultValue={peopleData?.cellPhoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("extension")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label="Ramal"
                                    name="extension"
                                    defaultValue={peopleData?.extension}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 2 && (
                        <Grid container spacing={2}>
                            {/* Documentos Tab */}
                            <Grid item xs={12}>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Documentos
                                    </Typography>
                                    {/* Adicione a lógica da tabela de documentos aqui */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 3 && (
                        <Grid container spacing={2}>
                            {/* Grupos e Empresas Tab */}
                            <Grid item xs={12}>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Grupos e Empresas
                                    </Typography>
                                    {/* Adicione a lógica da tabela de grupos e empresas aqui */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {/* Repita para outras tabs conforme necessário */}
                </Box>
            </Box>
        </Edit>
    );
};
