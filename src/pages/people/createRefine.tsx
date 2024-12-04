import React from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
//import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import DocumentSection from "@components/DocumentSection";
import GroupSection from "@components/GroupSection";
import GeralSection from "@components/GeralSection";
import AddInfoSection from "@components/AddInfoSection";
import { Controller } from "react-hook-form";

export const PersonCreate: React.FC = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        control,
        register,
        setValue,
        watch,
        formState: { errors },
        getValues,
    } = useForm();

    const [tabValue, setTabValue] = React.useState(0);
    const preview = watch("personPhoto") ? URL.createObjectURL(getValues("personPhoto")) : "";

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue("personPhoto", file);
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {translate("titles.new_person", "Nova Pessoa")}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
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
                                        borderRadius: "50%",
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
                                    {...register("name", { required: translate("errors.required", "Este campo é obrigatório") })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    label={translate("fields.name", "Nome")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("email", { required: translate("errors.required", "Este campo é obrigatório") })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    fullWidth
                                    label={translate("fields.email", "E-mail")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration", { required: translate("errors.required", "Este campo é obrigatório") })}
                                    error={!!errors.registration}
                                    helperText={errors.registration?.message}
                                    margin="normal"
                                    fullWidth
                                    label={translate("fields.registration", "Matrícula")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color={theme.palette.text.primary}>
                                    {translate("fields.phone_number", "Número do Celular")}
                                </Typography>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            {...field}
                                            country={"br"}
                                            onlyCountries={["br", "us", "es", "cn"]}
                                            countryCodeEditable={false}
                                            inputProps={{ required: true }}
                                            specialLabel={translate("fields.phone_number", "Número do Celular")}
                                            containerStyle={{
                                                width: "100%",
                                                backgroundColor: theme.palette.background.paper,
                                                border: `1px solid ${theme.palette.divider}`,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label={translate("tabs.general", "Geral")} />
                        <Tab label={translate("tabs.additional_info", "Informações Adicionais")} />
                        <Tab label={translate("tabs.documents", "Documentos")} />
                        <Tab label={translate("tabs.groups", "Grupos")} />
                    </Tabs>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TabPanel value={tabValue} index={0}>
                        <GeralSection control={control} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <AddInfoSection control={control} />
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
    );
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <Box role="tabpanel" hidden={value !== index} sx={{ display: value === index ? "block" : "none" }}>
        {value === index && <Box p={3}>{children}</Box>}
    </Box>
);
