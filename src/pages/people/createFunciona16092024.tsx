import React, { useState } from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import DocumentSection from "@components/DocumentSection";
import GroupSection from "@components/GroupSection";
import GeralSection from "@components/GeralSection";
import AddInfoSection from "@components/AddInfoSection";
import { FormProviderWrapper } from '@components/FormContext'; // Importando o contexto do formulário

// Componente principal PersonCreate
export const PersonCreate: React.FC = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const { saveButtonProps, refineCore: { formLoading }, control, register, formState: { errors }, setValue, watch, trigger } = useForm();
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState<string>("");

    // Função para mudança de abas
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Função para mudança de foto
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue("personPhoto", file);
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Nova Pessoa
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
                                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                                <PhotoCamera />
                            </IconButton>
                            {preview && (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: '50%',
                                        mt: 2,
                                    }}
                                    alt="Foto da pessoa"
                                    src={preview}
                                />
                            )}
                            <Typography variant="body2">Adicionar Foto</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("name", { required: "Este campo é obrigatório" })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nome"}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("email", { required: "Este campo é obrigatório" })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={"E-mail"}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration", { required: "Este campo é obrigatório" })}
                                    error={!!errors.registration}
                                    helperText={errors.registration?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={"Matrícula"}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color={theme.palette.text.primary}>
                                    Número do Celular
                                </Typography>
                                <PhoneInput
                                    country={"br"}
                                    onlyCountries={["br", "us", "es", "cn"]}
                                    countryCodeEditable={false}
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
                                    onChange={(value) => setValue("phoneNumber", value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <FormProviderWrapper>
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
                            <GeralSection control={control} register={register} errors={errors} setValue={setValue} watch={watch} trigger={trigger} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <AddInfoSection register={register} setValue={setValue} errors={errors} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <DocumentSection />
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            <GroupSection />
                        </TabPanel>
                    </Box>
                </FormProviderWrapper>
            </Box>
        </Create>
    );
};

// Componente TabPanel
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            sx={{ display: value === index ? 'block' : 'none' }}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Box>
    );
};
