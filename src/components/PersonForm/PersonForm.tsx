import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, Typography, Tabs, Tab, TextField } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import PhoneInput from "react-phone-input-2";
import { useTheme } from "@mui/material/styles";

import FileUpload from "@components/PersonForm/FileUpload";
import GeneralTab from "@components/Tabs/GeneralTab";
import AdditionalInfoTab from "@components/Tabs/AdditionalInfoTab";
import DocumentsTab from "@components/Tabs/DocumentsTab";
import GroupsCompaniesTab from "@components/Tabs/GroupsCompaniesTab";

interface PersonFormProps {
    onSubmit: (data: any) => void;
    formLoading: boolean;
    onFileChange: (file: File) => void;
    preview: string;
    control: any;
    setValue: (name: string, value: any) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ onSubmit, formLoading, onFileChange, preview, control, setValue }) => {
    const translate = useTranslate();
    const theme = useTheme();
    const { handleSubmit, register, formState: { errors }, watch, trigger } = useForm();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Typography variant="h6" gutterBottom>
                Nova Pessoa
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <FileUpload onFileChange={onFileChange} preview={preview} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("name", { required: translate("This field is required") })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("Nome")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("email", { required: translate("This field is required") })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("e-mail")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration", { required: translate("This field is required") })}
                                    error={!!errors.registration}
                                    helperText={errors.registration?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={translate("Matrícula")}
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
                                    label={translate("ID")}
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
                                    label={translate("Observações")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color={theme.palette.text.primary}>
                                    {translate("Número do Celular")}
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
                                    specialLabel={translate("Número do Celular")}
                                    onChange={(value) => {
                                        setValue("phoneNumber", value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="person form tabs">
                        <Tab label="Geral" />
                        <Tab label="Informações Adicionais" />
                        <Tab label="Documentos" />
                        <Tab label="Grupos/Empresas" />
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && <GeneralTab register={register} errors={errors} translate={translate} control={control} setValue={setValue} watch={watch} trigger={trigger} />}
                    {tabValue === 1 && <AdditionalInfoTab register={register} errors={errors} translate={translate} control={control} setValue={setValue} />}
                    {tabValue === 2 && <DocumentsTab register={register} errors={errors} translate={translate} control={control} setValue={setValue} />}
                    {tabValue === 3 && <GroupsCompaniesTab register={register} errors={errors} translate={translate} control={control} setValue={setValue} />}
                </Box>
            </form>
        </Box>
    );
};

export default PersonForm;