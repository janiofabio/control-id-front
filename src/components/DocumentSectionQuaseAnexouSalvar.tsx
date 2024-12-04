import React, { useState, useContext, createContext, useEffect } from "react";
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
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useForm, FormProvider, Controller } from "react-hook-form";

interface Document {
    id: string;
    type: 'RG' | 'CPF';
    number: string;
    date: string;
    file?: File;
    fileName?: string;
}

const defaultDocument: Document = {
    id: '',
    type: 'CPF',
    number: '',
    date: '',
};

const DocumentContext = createContext<{
    documents: Document[];
    setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}>({
    documents: [],
    setDocuments: () => {},
});

const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
    const [documents, setDocuments] = useState<Document[]>(() => {
        const savedDocuments = sessionStorage.getItem("documents");
        return savedDocuments ? JSON.parse(savedDocuments) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("documents", JSON.stringify(documents));
    }, [documents]);

    return (
        <DocumentContext.Provider value={{ documents, setDocuments }}>
            {children}
        </DocumentContext.Provider>
    );
};

const DocumentForm = ({ open, handleClose, editIndex }: { open: boolean; handleClose: () => void; editIndex: number | null; }) => {
    const { documents, setDocuments } = useContext(DocumentContext);
    const methods = useForm<Document>({ defaultValues: defaultDocument });
    const { handleSubmit, reset, setValue, control } = methods;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onSubmit = (data: Document) => {
        if (selectedFile) {
            data.file = selectedFile;
            data.fileName = selectedFile.name;
        }

        if (editIndex !== null) {
            const updatedDocuments = [...documents];
            updatedDocuments[editIndex] = { ...data, id: documents[editIndex].id };
            setDocuments(updatedDocuments);
        } else {
            setDocuments([...documents, { ...data, id: Date.now().toString() }]);
        }

        handleClose();
        reset();
        setSelectedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 0) {
                setSelectedFile(file);
            } else {
                console.error("O arquivo selecionado está vazio");
                // Você pode adicionar uma notificação para o usuário aqui
            }
        }
    };

    useEffect(() => {
        if (editIndex !== null) {
            const doc = documents[editIndex];
            setValue("type", doc.type);
            setValue("number", doc.number);
            setValue("date", doc.date);
            setSelectedFile(doc.file || null);
        }
    }, [editIndex, documents, setValue]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{editIndex !== null ? "Editar Documento" : "Adicionar Documento"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>Tipo de Documento</InputLabel>
                                        <Select {...field}>
                                            <MenuItem value="CPF">CPF</MenuItem>
                                            <MenuItem value="RG">RG</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="number"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Número do Documento" fullWidth />
                                )}
                            />
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Data" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                )}
                            />
                            <Button variant="contained" component="label">
                                Buscar Documento
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                            {selectedFile && (
                                <Typography>
                                    Arquivo selecionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                                </Typography>
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">
                            {editIndex !== null ? "Salvar Alterações" : "Adicionar"}
                        </Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
};

const DocumentTable = () => {
    const { documents, setDocuments } = useContext(DocumentContext);
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setOpen(true);
    };

    const handleDeleteClick = (index: number) => {
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocuments);
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                Adicionar Documento
            </Button>
            <DocumentForm open={open} handleClose={() => { setOpen(false); setEditIndex(null); }} editIndex={editIndex} />
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
                        {documents.map((doc, index) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.type}</TableCell>
                                <TableCell>{doc.number}</TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell>{doc.fileName || 'Nenhum arquivo'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(index)}>
                                        <EditIcon />
                                    </IconButton>
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
        <DocumentProvider>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Gerenciar Documentos</Typography>
                </Grid>
                <Grid item xs={12}>
                    <DocumentTable />
                </Grid>
            </Grid>
        </DocumentProvider>
    );
};

export default DocumentSection;