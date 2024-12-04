import React, { useState } from "react";
import { useTranslate, useCreate, useNotification } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm, FormProvider } from "@refinedev/react-hook-form";
import { Button, TextField, Box, Grid, Typography, Tab, Tabs, useTheme } from "@mui/material";
import GeralSection from "@components/GeralSection";
import AddInfoSection from "@components/AddInfoSection";
import DocumentSection from "@components/DocumentSection";
import GroupSection from "@components/GroupSection";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller } from "react-hook-form";
import { uploadFileToStrapi } from "../utils/api";

export const PersonCreate = () => {
    const translate = useTranslate();
    const { mutate: createPerson } = useCreate();
    const { open } = useNotification();
    const methods = useForm();
    const {
        saveButtonProps,
        register,
        control,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        watch,
    } = methods;

    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const imageInput = watch("personphoto");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setIsUploadLoading(true);

            const file = event.target.files?.[0];
            if (file) {
                if (file.size === 0) {
                    throw new Error("O arquivo selecionado está vazio.");
                }
                const base64data = await convertBase64(file);
                setValue("personphoto", base64data as string, { shouldValidate: true });
                setValue("personphotoFile", file);
            }
        } catch (error) {
            console.error("Falha no upload", error);
            open({
                type: "error",
                message: error instanceof Error ? error.message : "Erro ao fazer upload do arquivo.",
            });
        } finally {
            setIsUploadLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            setIsUploadLoading(true);

            // Anexar documentos
            const documents = data.documents || [];
            console.log("Documentos a serem enviados:", documents);

            const uploadedDocuments = await Promise.all(documents.map(async (doc: any) => {
                if (doc.file) {
                    try {
                        console.log(`Iniciando upload do documento ${doc.number}`);
                        const uploadedFile = await uploadFileToStrapi(doc.file);
                        console.log(`Upload bem-sucedido para o documento ${doc.number}:`, uploadedFile);
                        return {
                            ...doc,
                            attachmentUrl: uploadedFile.url,
                            file: undefined
                        };
                    } catch (error) {
                        console.error(`Erro ao fazer upload do documento ${doc.number}:`, error);
                        open({
                            type: "error",
                            message: `Falha ao fazer upload do documento ${doc.number}. Por favor, tente novamente.`,
                        });
                        return null;
                    }
                }
                return doc;
            }));

            // Filtra documentos que falharam no upload
            data.documents = uploadedDocuments.filter(doc => doc !== null);

            // Upload da foto da pessoa
            if (data.personphotoFile) {
                try {
                    const uploadedPhoto = await uploadFileToStrapi(data.personphotoFile);
                    data.personphoto = uploadedPhoto.url;
                } catch (error) {
                    console.error("Erro ao fazer upload da foto da pessoa:", error);
                    open({
                        type: "error",
                        message: "Falha ao fazer upload da foto. Por favor, tente novamente.",
                    });
                }
            }

            delete data.personphotoFile;

            console.log("Dados finais enviados para o backend:", data);
            
            createPerson({
                resource: "people",
                values: data,
            }, {
                onSuccess: () => {
                    open({
                        type: "success",
                        message: "Pessoa criada com sucesso!",
                    });
                },
                onError: (error) => {
                    console.error("Erro ao salvar pessoa:", error);
                    open({
                        type: "error",
                        message: "Erro ao salvar pessoa. Por favor, tente novamente.",
                    });
                }
            });

        } catch (error) {
            console.error("Erro ao salvar pessoa e anexar documentos:", error);
            open({
                type: "error",
                message: "Erro ao processar a solicitação. Por favor, tente novamente.",
            });
        } finally {
            setIsUploadLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <Create saveButtonProps={{ onClick: handleSubmit(onSubmit), disabled: isUploadLoading }}>
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
                                        endIcon={<PhotoCamera />}
                                        variant="contained"
                                        component="span"
                                    >
                                        Adicionar Foto
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
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        render={({ field }) => (
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
                                                {...field}
                                            />
                                        )}
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
                            <AddInfoSection />
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <DocumentSection />
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <GroupSection />
                        </TabPanel>
                    </Box>
                </Box>
            </Create>
        </FormProvider>
    );
};

const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
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