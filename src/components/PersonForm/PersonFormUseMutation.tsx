import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Typography, Tabs, Tab } from "@mui/material";
import { useTranslate } from "@refinedev/core";

import FileUpload from "@components/PersonForm/FileUpload";
import PhoneNumberInput from "@components/PersonForm/PhoneNumberInput";
import GeneralTab from "@components/Tabs/GeneralTab";
import AdditionalInfoTab from "@components/Tabs/AdditionalInfoTab";
import DocumentsTab from "@components/Tabs/DocumentsTab";
import GroupsCompaniesTab from "@components/Tabs/GroupsCompaniesTab";

interface PersonFormProps {
    onSubmit: (data: any) => void;
    formLoading: boolean;
}

const PersonForm: React.FC<PersonFormProps> = ({ onSubmit, formLoading }) => {
    const translate = useTranslate();
    const { handleSubmit, control, register, setValue, formState: { errors } } = useForm();
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState("");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFileChange = (file: File) => {
        setPreview(URL.createObjectURL(file));
        setValue("personPhoto", file);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Adicionar Nova Pessoa
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <FileUpload onFileChange={handleFileChange} preview={preview} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <GeneralTab register={register} errors={errors} translate={translate} />
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Geral" />
                        <Tab label="Informações Adicionais" />
                        <Tab label="Documentos" />
                        <Tab label="Grupos e Empresas" />
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && (
                        <GeneralTab register={register} errors={errors} translate={translate} />
                    )}
                    {tabValue === 1 && (
                        <AdditionalInfoTab register={register} errors={errors} translate={translate} />
                    )}
                    {tabValue === 2 && (
                        <DocumentsTab />
                    )}
                    {tabValue === 3 && (
                        <GroupsCompaniesTab />
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default PersonForm;
