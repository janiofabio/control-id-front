import React, { useState } from "react";
import { useTranslate, useCreate, useNotification, useNavigation, OpenNotificationParams, HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Grid, Typography, Tab, Tabs, useTheme } from "@mui/material";
import { FormProvider } from "react-hook-form";
import GeralSection from "../../components/GeralSection";
import AddInfoSection from "../../components/AddInfoSection";
import DocumentSection from "../../components/DocumentSection";
import GroupSection from "../../components/GroupSection";
import { PhotoCamera } from '@mui/icons-material';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LoadingButton } from "@mui/lab";

interface PersonFormData {
  name: string;
  email: string;
  registration: string;
  phoneNumber: string;
  notes: string;
  personPhoto: string;
  documents: Array<{
    attachmentNumber: string;
    attachmentType: string;
    attachmentUrl?: string;
    attachmentId?: string;
    file?: File | null;
  }>;
  iDSecureAccess: boolean;
  deviceAdmin: boolean;
  blockList: boolean;
}

const uploadFileToStrapi = async (file: File): Promise<{ url: string; id: string }> => {
  // Implementação simulada do upload
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file), id: Math.random().toString(36).substr(2, 9) });
    }, 1000);
  });
};

export const PersonCreate: React.FC = () => {
  const translate = useTranslate();
  const { mutate: createPerson } = useCreate();
  const { open = () => {} } = useNotification();
  const { push } = useNavigation();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const safeOpen = (params: OpenNotificationParams) => {
    if (open) {
      open(params);
    } else {
      console.warn('Notification function is not available');
    }
  };

  const methods = useForm<PersonFormData>({
    defaultValues: {
      iDSecureAccess: false,
      deviceAdmin: false,
      blockList: false,
      personPhoto: "",
      documents: [],
    }
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = methods;

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
        setValue("personPhoto", base64data);
      }
    } catch (error) {
      console.error("Falha no upload", error);
      safeOpen({
        type: "error",
        message: error instanceof Error ? error.message : "Erro ao fazer upload do arquivo.",
      });
    } finally {
      setIsUploadLoading(false);
    }
  };

  const onSubmit = async (data: PersonFormData) => {
    try {
      setIsUploadLoading(true);

      const documents = data.documents || [];
      console.log("Documentos a serem enviados:", documents);

      const uploadedDocuments = await Promise.all(documents.map(async (doc) => {
        if (doc.file) {
          try {
            console.log(`Iniciando upload do documento ${doc.attachmentNumber}`);
            const uploadedFile = await uploadFileToStrapi(doc.file);
            console.log(`Upload bem-sucedido para o documento ${doc.attachmentNumber}:`, uploadedFile);
          
            return {
              attachmentNumber: doc.attachmentNumber,
              attachmentType: doc.attachmentType,
              attachmentUrl: uploadedFile.url,
              attachmentId: uploadedFile.id
            };
          } catch (error) {
            console.error(`Erro ao fazer upload do documento ${doc.attachmentNumber}:`, error);
            safeOpen({
              type: "error",
              message: `Falha ao fazer upload do documento ${doc.attachmentNumber}. Por favor, tente novamente.`,
            });
            return null;
          }
        }
        return doc;
      }));

      data.documents = uploadedDocuments.filter((doc): doc is NonNullable<typeof doc> => doc !== null);

      console.log("Dados finais enviados para o backend:", data);
      
      createPerson({
        resource: "people",
        values: data,
      }, {
        onSuccess: () => {
          safeOpen({
            type: "success",
            message: "Pessoa criada com sucesso!",
          });
          push("/people");
        },
        onError: (error: HttpError) => {
          console.error("Erro ao salvar pessoa:", error);
          safeOpen({
            type: "error",
            message: error.message || "Erro ao salvar pessoa. Por favor, tente novamente.",
          });
        }
      });

    } catch (error) {
      console.error("Erro ao salvar pessoa e anexar documentos:", error);
      safeOpen({
        type: "error",
        message: error instanceof Error ? error.message : "Erro ao processar a solicitação. Por favor, tente novamente.",
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
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Este campo é obrigatório" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Nome"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Este campo é obrigatório" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="e-mail"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="registration"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Matrícula"
                      />
                    )}
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
                <Grid item xs={12} md={6}>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={translate("Observações")}
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

const TabPanel: React.FC<{ children?: React.ReactNode; value: number; index: number }> = (props) => {
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