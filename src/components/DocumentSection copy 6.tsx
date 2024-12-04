import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    TableContainer,
    Link,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useForm, useFormContext, Controller } from "react-hook-form";

interface Document {
    type: 'RG' | 'CPF';
    number: string;
    date: string;
    file: string; // base64
    fileName: string;
}

const DocumentForm = ({ open, handleClose }: { open: boolean; handleClose: () => void; }) => {
    const { control, handleSubmit, reset, watch, setValue } = useForm<Document>();
    const { getValues, setValue: setParentValue } = useFormContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [availableDocTypes, setAvailableDocTypes] = useState<('RG' | 'CPF')[]>(['RG', 'CPF']);

    const documentType = watch("type");

    useEffect(() => {
        const documents = getValues("documents") || [];
        const existingTypes = documents.map(doc => doc.type);
        setAvailableDocTypes(['RG', 'CPF'].filter(type => !existingTypes.includes(type)));
    }, [getValues]);

    const onSubmit = async (data: Document) => {
        if (selectedFile) {
            const base64 = await convertToBase64(selectedFile);
            data.file = base64;
            data.fileName = selectedFile.name;
        }

        const documents = getValues("documents") || [];
        documents.push(data);
        setParentValue("documents", documents);
        handleClose();
        reset();
        setSelectedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 0) {
                setSelectedFile(file);
                setValue("fileName", file.name);
            } else {
                console.error("O arquivo selecionado está vazio");
            }
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Adicionar Documento</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Tipo de documento é obrigatório" }}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Tipo de Documento</InputLabel>
                                    <Select {...field}>
                                        {availableDocTypes.map((type) => (
                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="number"
                            control={control}
                            rules={{ required: "Número do documento é obrigatório" }}
                            render={({ field }) => (
                                <TextField {...field} label="Número do Documento" fullWidth />
                            )}
                        />
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: "Data do documento é obrigatória" }}
                            render={({ field }) => (
                                <TextField {...field} label="Data" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                            )}
                        />
                        <Button variant="contained" component="label">
                            Buscar Documento
                            <input type="file" hidden onChange={handleFileChange} accept="image/*,application/pdf" />
                        </Button>
                        {selectedFile && (
                            <Typography>
                                Documento: {selectedFile.name}
                            </Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Adicionar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const DocumentTable = () => {
    const { getValues, setValue } = useFormContext();
    const [open, setOpen] = useState(false);

    const handleDeleteClick = (index: number) => {
        const documents = getValues("documents") || [];
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setValue("documents", updatedDocuments);
    };

    const documents = getValues("documents") || [];

    const handleViewDocument = (base64Data: string, fileName: string) => {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`<iframe src="${base64Data}" width="100%" height="100%"></iframe>`);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }} disabled={documents.length >= 2}>
                Adicionar Documento
            </Button>
            <DocumentForm open={open} handleClose={() => setOpen(false)} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Número</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Arquivo</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((doc: Document, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{doc.type}</TableCell>
                                <TableCell>{doc.number}</TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => handleViewDocument(doc.file, doc.fileName)}
                                    >
                                        {doc.fileName}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const DocumentSection = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Gerenciar Documentos</Typography>
            </Grid>
            <Grid item xs={12}>
                <DocumentTable />
            </Grid>
        </Grid>
    );
};

export default DocumentSection;

