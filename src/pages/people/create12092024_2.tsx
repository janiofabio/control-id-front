import React, { useState, useEffect } from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { TextField, Box, Grid, Typography, Button, IconButton, Tab, Tabs, useTheme, Switch, FormControlLabel, FormGroup, MenuItem, DialogTitle, FormControl, InputLabel,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SaveButtonProps, useSaveButton } from "@refinedev/mui";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import DocumentSection from "@components/DocumentSection"; 
import GroupSection from "@components/GroupSection"; 
import GeralSection from "@components/GeralSection"; 
import AddInfoSection from "@components/AddInfoSection"; 

export const PersonCreate = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const { saveButtonProps, refineCore: { formLoading }, control, register, formState: { errors }, handleSubmit, setValue, watch, trigger } = useForm();
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState("");
    const [documents, setDocuments] = useState<IDocument[]>([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue("personPhoto", file);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitDocument = (data: IDocument) => {
        setDocuments([...documents, data]);
        handleClose();
    };

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

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("files", data.personPhoto);

        const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (uploadResponse.status === 200) {
            const photoId = uploadResponse.data[0].id;
            data.personPhoto = photoId;
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/people`, data);
    };
    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Nova Pessoa
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                        {...register("name", { required: "This field is required" })}
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
                                        {...register("email", { required: "This field is required" })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label={"e-mail"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("registration", { required: "This field is required" })}
                                        error={!!errors.registration}
                                        helperText={errors.registration?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label={"Matrícula"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("idNumber")}
                                        error={!!errors.idNumber}
                                        helperText={errors.idNumber?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label={"ID"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("notes")}
                                        error={!!errors.notes}
                                        helperText={errors.notes?.message}
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        label={"Observações"}
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
                                            autoFocus: false
                                        }}
                                        specialLabel="Número do Celular"
                                        onChange={(value) => {
                                            setValue("phoneNumber", value);
                                        }}
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
                             {/* 
                            <Tab label="Senhas" />
                            <Tab label="Cartões" />
                            <Tab label="Digitais" />
                            <Tab label="Facial" />
                            <Tab label="QR Code" />
                            */}
                        </Tabs>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {tabValue === 0 && (
                            <Grid container spacing={0}>
                                <GeralSection
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    watch={watch}
                                    trigger={trigger}
                                />
                            </Grid>
                        )}
                        {tabValue === 1 && (
                            <Grid container spacing={1}>
                                 <AddInfoSection
                                  register={register}
                                  setValue={setValue}
                                   errors={errors}
                                 />
                            </Grid>
                        )}
                        {tabValue === 2 && (
                         <Grid container spacing={2}>
                             <DocumentSection />
                         </Grid>
                        )}
                        {tabValue === 3 && (
                         <Grid container spacing={3}>
                             <GroupSection />
                         </Grid>
                        )}
                    </Box>
                </form>
            </Box>
        </Create>
    );
};
