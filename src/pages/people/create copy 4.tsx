import React, { useState } from "react";
import { useTranslate } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Button, TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { FormProvider } from 'react-hook-form';
import { useForm } from "@refinedev/react-hook-form";
import GeralSectionCreate from "@components/GeralSection";
import AddInfoSectionCreate from "@components/AddInfoSection";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PersonCreate = () => {
    const translate = useTranslate();
    const methods = useForm();
    const {
        saveButtonProps,
        register,
        control,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
    } = methods;

    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState<string>("");
    const [base64Image, setBase64Image] = useState<string>("");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Função para converter arquivo de imagem em base64
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                setPreview(base64data);
                setBase64Image(base64data);
                setValue("personphoto", base64data); // Definir o valor no form
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para submissão do formulário
    const onSubmit = async (data: any) => {
        // A imagem já foi adicionada ao campo `personphoto` quando o arquivo foi selecionado
        console.log("Dados enviados para o backend:", data);

        // Aqui você pode fazer a lógica para salvar os dados no backend
        saveButtonProps?.onClick?.();
    };

    return (
        <FormProvider {...methods}>
            <Create saveButtonProps={{ onClick: handleSubmit(onSubmit) }}>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {translate("Criar Pessoa")}
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
                                        {...register("name", {
                                            required: "Este campo é obrigatório",
                                        })}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label="Nome"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("email", {
                                            required: "Este campo é obrigatório",
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label="e-mail"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("registration")}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label="Matrícula"
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
                                        value={getValues("phoneNumber")}
                                        onChange={(value) => setValue("phoneNumber", value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Geral" />
                            <Tab label="Informações Adicionais" />
                            <Tab label="Documentos" />
                            <Tab label="Grupos" />
                        </Tabs>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TabPanel value={tabValue} index={0}>
                            <GeralSectionCreate />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <AddInfoSectionCreate errors={methods.formState.errors} />
                        </TabPanel>
                    </Box>
                </Box>
            </Create>
        </FormProvider>
    );
};

// Componente auxiliar para Tabs
const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};
