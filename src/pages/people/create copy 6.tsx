import React, { useState, useContext } from "react";
import { useTranslate } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Button, TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { FormProvider } from 'react-hook-form';
import { useForm } from "@refinedev/react-hook-form";
import GeralSection from "@components/GeralSection";
import AddInfoSection from "@components/AddInfoSection";
import DocumentSection, { DocumentContext } from "@components/DocumentSection";
import GroupSection from "@components/GroupSection";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton"; // Import for loading button
import { Controller } from "react-hook-form";
import { API_URL_AUTH, TOKEN_KEY } from "../../constants";

// Função para enviar arquivos ao Strapi
const uploadFileToStrapi = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    const response = await fetch(`${API_URL_UPLOAD}`, {
    //const response = await fetch("https://seu-endpoint-strapi/upload", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        const result = await response.json();
        return result[0]; // Retorna o primeiro arquivo se sucesso
    }
    throw new Error("Erro ao enviar arquivo");
};

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
        watch, // Watching changes in form
    } = methods;

    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [isUploadLoading, setIsUploadLoading] = useState(false); // For handling loading state during upload
    const imageInput = watch("personphoto");

    const { documents } = useContext(DocumentContext); // Obtendo documentos do contexto

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Convert file to Base64
    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Handle file upload
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setIsUploadLoading(true);

            const file = event.target.files?.[0];
            if (file) {
                const base64data = await convertBase64(file);
                setValue("personphoto", base64data as string, { shouldValidate: true });
                setIsUploadLoading(false);
            }
        } catch (error) {
            setIsUploadLoading(false);
            console.error("Upload failed", error);
        }
    };

    // Handle form submission
    const onSubmit = async (data: any) => {
        try {
            // Realiza o upload dos documentos apenas no submit final
            const uploadedDocuments = await Promise.all(
                documents.map(async (doc) => {
                    if (doc.file) {
                        const uploadedFile = await uploadFileToStrapi(doc.file);
                        return {
                            ...doc,
                            fileUrl: uploadedFile.url, // Adiciona a URL do arquivo ao documento
                        };
                    }
                    return doc;
                })
            );

            const finalData = { ...data, documents: uploadedDocuments };
            console.log("Dados enviados para o backend:", finalData);
            saveButtonProps?.onClick?.();
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
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
                                <label htmlFor="images-input">
                                    <input
                                        id="images-input"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <LoadingButton
                                        loading={isUploadLoading}
                                        loadingPosition="end"
                                        endIcon={<PhotoCamera />} // Keep the camera icon
                                        variant="contained"
                                        component="span"
                                    >
                                    </LoadingButton>
                                </label>
                                {errors.personphoto && (
                                    <Typography variant="caption" color="error">
                                        {errors.personphoto?.message?.toString()}
                                    </Typography>
                                )}
                                {imageInput && (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: '50%',
                                            mt: 2,
                                        }}
                                        alt="Foto da pessoa"
                                        src={imageInput.toString()}
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
                            <GeralSection />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <AddInfoSection errors={methods.formState.errors} />
                        </TabPanel>


                        <TabPanel value={tabValue} index={2}>
                            <DocumentSection errors={methods.formState.errors} />
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <GroupSection errors={methods.formState.errors} />
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

