import React, { useState, useEffect } from "react";
import { useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Button, TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme, FormGroup, FormControlLabel, Switch } from "@mui/material"; // Componentes da biblioteca Material-UI
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PhotoCamera from '@mui/icons-material/PhotoCamera'; // Ícone de câmera para upload de imagem
import PhoneInput from "react-phone-input-2"; // Componente para input de telefone
import "react-phone-input-2/lib/style.css"; // Estilos necessários para o PhoneInput
import GroupSection from "@components/GroupSectionEdit";
import GeralSectionEdit from "@components/GeralSectionEdit";
import { Controller } from "react-hook-form";

export const PersonEdit = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
        setValue,
        getValues,
        watch,
        trigger,
    } = useForm();

    const peopleData = queryResult?.data?.data;
    console.log("peopleData file:", queryResult?.data?.data);

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
                                    label={"Nome"}
                                    name="name"
                                    defaultValue={peopleData?.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("email", {
                                        required: "This field is required",
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={"e-mail"}
                                    name="email"
                                    defaultValue={peopleData?.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={"Matrícula"}
                                    name="registration"
                                    defaultValue={peopleData?.registration}
                                />
                            </Grid>
                            {/* Campo para número de celular com máscara de telefone */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color={theme.palette.text.primary}>
                                    Número do Celular
                                </Typography>
                                <PhoneInput
                                    country={"br"} // País padrão Brasil
                                    onlyCountries={["br", "us", "es", "cn"]} // Países permitidos
                                    countryCodeEditable={false} // Não permite edição do código do país
                                    containerStyle={{
                                        margin: 'normal',
                                        width: '100%',
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary
                                    }}
                                    buttonStyle={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                    inputProps={{
                                        name: 'phoneNumber',
                                        required: true,
                                    }}
                                    specialLabel="Número do Celular"
                                    value={getValues("phoneNumber") || peopleData?.phoneNumber} // Define o valor padrão como o valor existente
                                    onChange={(value) => setValue("phoneNumber", value)} // Atualiza o valor do telefone
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
                        <Tab label="Grupos" />
                    </Tabs>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={2}>
                            {/* Coluna direita */}
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
                                                defaultValue={peopleData?.iDSecureAccess}
                                                render={({ field }) => (
                                                    <Switch
                                                        {...field}
                                                        checked={!!field.value}
                                                        onChange={(event) => field.onChange(event.target.checked ? true : null)}
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
                                        defaultValue={peopleData?.iDSecurePassword}
                                    />
                                )}
                            </Grid>
                            {/* Coluna esquerda */}
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
                                                defaultValue={peopleData?.blockList}
                                                render={({ field }) => (
                                                    <Switch
                                                        {...field}
                                                        checked={!!field.value}
                                                        onChange={(event) => field.onChange(event.target.checked ? true : null)}
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
                                                defaultValue={peopleData?.deviceAdmin}
                                                render={({ field }) => (
                                                    <Switch
                                                        {...field}
                                                        checked={!!field.value}
                                                        onChange={(event) => field.onChange(event.target.checked ? true : null)}
                                                    />
                                                )}
                                            />
                                        }
                                        label="Pessoa terá acesso de Administrador do Dispositivo?"
                                    />
                                </FormGroup>
                                {deviceAdmin == true && (
                                    <TextField
                                        {...register("accessProfile", { required: "Perfil de Acesso é obrigatório" })}
                                        error={!!errors.accessProfile}
                                        helperText={errors.accessProfile?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label="Perfil de Acesso"
                                        defaultValue={peopleData?.accessProfile}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>
            </Box>
        </Edit>
    );
};

// Componente auxiliar para renderizar o conteúdo das abas
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index} // Esconde o conteúdo se não for a aba ativa
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            sx={{ display: value === index ? 'block' : 'none' }} // Mostra o conteúdo se a aba for ativa
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Box>
    );
};
