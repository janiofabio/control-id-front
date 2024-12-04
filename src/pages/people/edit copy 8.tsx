import React, { useState, useEffect } from "react";
import { useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  IconButton,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import GeralSectionEdit from "@components/GeralSectionEdit";
import AddInfoSectionEdit from "@components/AddInfoSectionEdit";
import DocumentSection from "@components/DocumentSection";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PersonEdit = () => {
  const translate = useTranslate();
  const methods = useForm({
    defaultValues: {
      documents: [],
    }
  });
  const {
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    getValues,
    watch,
    handleSubmit,
  } = methods;

  const theme = useTheme();
  const { saveButtonProps, refineCore: { queryResult } } = methods;
  const peopleData = queryResult?.data?.data;

  const [tabValue, setTabValue] = useState(0);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [preview, setPreview] = useState<string>(peopleData?.personphoto || "");

  useEffect(() => {
    if (peopleData) {
      if (peopleData.personphoto) {
        setPreview(peopleData.personphoto);
        setValue("personphoto", peopleData.personphoto);
      }
      if (peopleData.documents) {
        setValue("documents", peopleData.documents);
      }
      // Adicione outros campos conforme necessário
    }
  }, [peopleData, setValue]);

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

      const target = event.target;
      const file: File = (target.files as FileList)[0];

      const base64 = await convertBase64(file);

      setPreview(base64 as string);
      setValue("personphoto", base64 as string, { shouldValidate: true });

      setIsUploadLoading(false);
    } catch (error) {
      setError("personphoto", { message: "Upload failed. Please try again." });
      setIsUploadLoading(false);
    }
  };

  const handleDelete = () => {
    setPreview("");
    setValue("personphoto", "");
  };

  const handleApprove = () => {
    console.log("Imagem aprovada:", preview);
  };

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      personphoto: data.personphoto || "",
      documents: data.documents || [],
    };
    console.log("Form data to submit:", formData);
  };

  return (
    <FormProvider {...methods}>
      <Edit saveButtonProps={saveButtonProps} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            {translate("Editar Pessoa")}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <PhotoUpload
                preview={preview}
                handleFileChange={handleFileChange}
                handleDelete={handleDelete}
                handleApprove={handleApprove}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <PersonFormFields register={register} errors={errors} peopleData={peopleData} getValues={getValues} />
            </Grid>
          </Grid>

          <TabSection tabValue={tabValue} handleTabChange={handleTabChange}>
            <TabPanel value={tabValue} index={0}>
              <GeralSectionEdit peopleData={peopleData} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <AddInfoSectionEdit errors={methods.formState.errors} peopleData={peopleData} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <DocumentSection />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              {/* Grupos */}
            </TabPanel>
          </TabSection>
        </Box>
      </Edit>
    </FormProvider>
  );
};

const PhotoUpload = ({ preview, handleFileChange, handleDelete, handleApprove }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #ddd",
      padding: 2,
      borderRadius: 1,
      mb: 2,
      backgroundColor: "background.paper",
    }}
  >
    {preview ? (
      <>
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
            borderRadius: "50%",
            mt: 2,
          }}
          alt="Foto da pessoa"
          src={preview}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, width: '100%' }}>
          <IconButton color="secondary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleApprove}>
            <CheckIcon />
          </IconButton>
          <IconButton color="default" component="label">
            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            <EditIcon />
          </IconButton>
        </Box>
      </>
    ) : (
      <>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
          <PhotoCamera />
        </IconButton>
        <Typography variant="body2">Adicionar Foto</Typography>
      </>
    )}
  </Box>
);

const PersonFormFields = ({ register, errors, peopleData, getValues }) => (
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
        defaultValue={peopleData?.name}
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
        label={"e-mail"}
        defaultValue={peopleData?.email}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        {...register("registration")}
        margin="normal"
        fullWidth
        InputLabelProps={{ shrink: true }}
        label={"Matrícula"}
        defaultValue={peopleData?.registration}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h6">Número do Celular</Typography>
      <PhoneInput
        country={"br"}
        onlyCountries={["br", "us", "es", "cn"]}
        countryCodeEditable={false}
        value={getValues("phoneNumber") || peopleData?.phoneNumber}
        onChange={(value) => setValue("phoneNumber", value)}
        containerStyle={{ margin: "normal", width: "100%" }}
        inputStyle={{ width: "100%" }}
        inputProps={{ name: "phoneNumber", required: true }}
        specialLabel="Número do Celular"
      />
    </Grid>
  </Grid>
);

const TabSection = ({ tabValue, handleTabChange, children }) => (
  <>
    <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Geral" />
        <Tab label="Informações Adicionais" />
        <Tab label="Documentos" />
        <Tab label="Grupos" />
      </Tabs>
    </Box>
    {children}
  </>
);

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`tab-panel-${index}`} aria-labelledby={`tab-${index}`}>
    {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
  </div>
);

