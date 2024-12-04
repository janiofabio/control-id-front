import React from "react";
import { useShow, useTranslate } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
    EmailField,
} from "@refinedev/mui";
import {
    Box,
    Typography,
    Stack,
    Grid,
    Tab,
    Tabs,
} from "@mui/material";

export const PersonShow = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const [tabValue, setTabValue] = React.useState(0);

    const record = data?.data;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Show isLoading={isLoading}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Visualizar Pessoa
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
                            {/* Área para foto do perfil */}
                            <img
                                src={record?.profilePicture}
                                alt="Foto de Perfil"
                                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.name")}
                                </Typography>
                                <TextField value={record?.name} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.registration")}
                                </Typography>
                                <TextField value={record?.registration} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.observations")}
                                </Typography>
                                <TextField value={record?.observations} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.phoneNumber")}
                                </Typography>
                                <NumberField value={record?.phoneNumber ?? ""} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.descriptions")}
                                </Typography>
                                <TextField value={record?.descriptions} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.phoneDDI")}
                                </Typography>
                                <NumberField value={record?.phoneDDI ?? ""} />
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
                                <Typography variant="body1" fontWeight="bold">
                                    Conta
                                </Typography>
                                <TextField value={record?.account} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Permissões
                                </Typography>
                                <TextField value={record?.permissions} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Pessoa terá acesso ao iDSecure?
                                </Typography>
                                <TextField value={record?.iDSecureAccess} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Lista de Bloqueio
                                </Typography>
                                <TextField value={record?.blockList} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Administrador dos Dispositivos
                                </Typography>
                                <TextField value={record?.deviceAdmin} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Senha de Acesso ao iDSecure
                                </Typography>
                                <TextField value={record?.iDSecurePassword} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Perfil de Acesso
                                </Typography>
                                <TextField value={record?.accessProfile} />
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 1 && (
                        <Grid container spacing={2}>
                            {/* Informações Adicionais Tab */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Início da Liberação
                                </Typography>
                                <TextField value={record?.releasePeriodStart} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Fim da Liberação
                                </Typography>
                                <TextField value={record?.releasePeriodEnd} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Ocupação
                                </Typography>
                                <TextField value={record?.occupation} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Data de Admissão
                                </Typography>
                                <DateField value={record?.admissionDate} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Número de Celular
                                </Typography>
                                <NumberField value={record?.cellPhoneNumber ?? ""} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    Ramal
                                </Typography>
                                <TextField value={record?.extension} />
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 2 && (
                        <Grid container spacing={2}>
                            {/* Documentos Tab */}
                            <Grid item xs={12}>
                                {/* Exemplo de Tabela de Documentos */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Documentos
                                    </Typography>
                                    {/* Aqui você pode adicionar a lógica da tabela de documentos */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {tabValue === 3 && (
                        <Grid container spacing={2}>
                            {/* Grupos e Empresas Tab */}
                            <Grid item xs={12}>
                                {/* Exemplo de Tabela de Grupos e Empresas */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Grupos e Empresas
                                    </Typography>
                                    {/* Aqui você pode adicionar a lógica da tabela de grupos e empresas */}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    {/* Repita para outras tabs conforme necessário */}
                </Box>
            </Box>
        </Show>
    );
};
