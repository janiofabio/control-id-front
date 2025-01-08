import React, { useEffect } from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
    Box,
    Link,
} from "@mui/material";
import { useFormContext, Controller, FieldErrors } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { Visibility, Delete } from "@mui/icons-material";

interface DocumentSectionEditProps {
    peopleData: any;
}

const DocumentSectionEdit: React.FC<DocumentSectionEditProps> = ({ peopleData }) => {
    const { control, watch, setValue } = useFormContext();
    const cpfFile = watch("cpf_file");
    const rgFile = watch("rg_file");

    useEffect(() => {
        if (peopleData) {
            setValue("cpf_number", peopleData.cpf_number || "");
            setValue("cpf_date", peopleData.cpf_date ? new Date(peopleData.cpf_date) : null);
            setValue("cpf_file", peopleData.cpf_file || null);
            setValue("cpf_file_name", peopleData.cpf_file_name || "");

            setValue("rg_number", peopleData.rg_number || "");
            setValue("rg_date", peopleData.rg_date ? new Date(peopleData.rg_date) : null);
            setValue("rg_file", peopleData.rg_file || null);
            setValue("rg_file_name", peopleData.rg_file_name || "");
        }
    }, [peopleData, setValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setValue(fieldName, base64String);
                setValue(`${fieldName}_name`, file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteFile = (fieldName: string) => {
        setValue(fieldName, null);
        setValue(`${fieldName}_name`, "");
    };

    const handleViewFile = (fileData: string, fileName: string) => {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`<iframe src="${fileData}" width="100%" height="100%"></iframe>`);
        }
    };

    const renderFileActions = (fieldName: string, file: string | null, fileName: string) => (
        <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained" component="label">
                {file ? "Trocar" : "Adicionar"}
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, fieldName)}
                />
            </Button>
            {file && (
                <>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleViewFile(file, fileName)}
                    >
                        {fileName}
                    </Link>
                    <IconButton onClick={() => handleViewFile(file, fileName)}>
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteFile(fieldName)}>
                        <Delete />
                    </IconButton>
                </>
            )}
        </Box>
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Documentos</Typography>
                </Grid>

                {/* Linha do CPF */}
                <Grid item xs={12} md={3}>
                    <Controller
                        name="cpf_number"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Número do CPF" fullWidth variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Controller
                        name="cpf_date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Data de Emissão do CPF"
                                value={field.value || null}
                                onChange={(newValue) => field.onChange(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderFileActions("cpf_file", cpfFile, watch("cpf_file_name"))}
                </Grid>

                {/* Linha do RG */}
                <Grid item xs={12} md={3}>
                    <Controller
                        name="rg_number"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Número do RG" fullWidth variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Controller
                        name="rg_date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Data de Emissão do RG"
                                value={field.value || null}
                                onChange={(newValue) => field.onChange(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderFileActions("rg_file", rgFile, watch("rg_file_name"))}
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default DocumentSectionEdit;