import React, { useState } from "react";
import { useTranslate, useCreate, useNotification, useNavigation } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Button, TextField, Box, Grid, Typography, Tab, Tabs, useTheme } from "@mui/material";
import { FormProvider } from "react-hook-form";
import GeralSection from "@components/GeralSection";
import AddInfoSection from "@components/AddInfoSection";
import DocumentSection from "@components/DocumentSection";
import GroupSection from "@components/GroupSection";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller } from "react-hook-form";
import { uploadFileToStrapi } from "../../utils/api";

export const PersonCreate = () => {
    const translate = useTranslate();
    const { mutate: createPerson } = useCreate();
    const { open } = useNotification();
    const { push } = useNavigation();
    const methods = useForm({
        defaultValues: {
            iDSecureAccess: false,
            deviceAdmin: false,
            blockList: false,
            personPhoto: "",
            documents: [],
        }
    });

    const {
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
    const imageInput = watch("personPhoto");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const convertBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result as string);
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
                setValue("personPhoto", base64data, { shouldValidate: true });
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
    
            // Seção de anexar documentos
            const documents = data.documents || [];
    
            const uploadedDocuments = await Promise.all(documents.map(async (doc: any) => {
                if (doc.file) {
                    try {
                        console.log(`Iniciando upload do documento ${doc.number}`);
                        const uploadedFile = await uploadFileToStrapi(doc.file);
                        console.log(`Upload bem-sucedido para o documento ${doc.number}:`, uploadedFile);
                        
                        // Aqui apenas salva as referências (URL e ID) para enviar ao backend
                        return {
                            ...doc, // Mantém as outras propriedades do documento
                            attachmentUrl: uploadedFile.url,
                            attachmentId: uploadedFile.id,
                            file: undefined  // Remove o arquivo do envio, já que só precisamos das referências
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
                // Se não houver arquivo, mantém o documento como está
                return doc;
            }));
    
            // Filtrar documentos válidos (que não falharam no upload)
            data.documents = uploadedDocuments.filter(doc => doc !== null);
    
            // Verifica se os dados dos documentos estão corretos
            console.log("Dados finais com documentos:", data.documents);
    
            // Envia os dados para o backend
            createPerson({
                resource: "people",
                values: data,
            }, {
                onSuccess: () => {
                    open({
                        type: "success",
                        message: "Pessoa criada com sucesso!",
                    });
                    push("/people");
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
                                {errors.personPhoto && (
                                    <Typography variant="caption" color="error">
                                        {errors.personPhoto?.message?.toString()}
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
                                        src={imageInput}
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