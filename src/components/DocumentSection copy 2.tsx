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
} from "@mui/material";
import { Download as DownloadIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useForm, FormProvider, Controller } from "react-hook-form";

// Tipo de Documento
interface Document {
    file: File | null;
    fileName: string | null;
    idType: string;
    idNumber: string;
    date: string;
}

// Estado inicial para um documento
const defaultDocument: Document = {
    file: null,
    fileName: null,
    idType: "CPF",
    idNumber: "",
    date: "",
};

// Criando o contexto de documentos
export const DocumentContext = createContext<{
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

// Componente do formulário de documentos
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
            updatedDocuments[editIndex] = data;
            setDocuments(updatedDocuments);
        } else {
            setDocuments([...documents, data]);
        }

        handleClose();
        reset();
        setSelectedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (editIndex !== null) {
            const doc = documents[editIndex];
            setValue("idType", doc.idType);
            setValue("idNumber", doc.idNumber);
            setValue("date", doc.date);
        }
    }, [editIndex, documents, setValue]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{editIndex !== null ? "Editar Documento" : "Adicionar Documento"}</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            <Controller
                                name="idType"
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
                                name="idNumber"
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
                                Upload Documento
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                            {selectedFile && <Typography>Arquivo selecionado: {selectedFile.name}</Typography>}
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

// Tabela de documentos
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

    const handleDownloadClick = (file: File | null) => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        link.click();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Adicionar Documento</Button>
            <DocumentForm open={open} handleClose={() => setOpen(false)} editIndex={editIndex} />
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Arquivo</TableCell>
                            <TableCell>Tipo de Documento</TableCell>
                            <TableCell>Número</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((doc, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {doc.fileName ? (
                                        <Button onClick={() => handleDownloadClick(doc.file)}>
                                            {doc.fileName}
                                        </Button>
                                    ) : (
                                        "Nenhum arquivo"
                                    )}
                                </TableCell>
                                <TableCell>{doc.idType}</TableCell>
                                <TableCell>{doc.idNumber}</TableCell>
                                <TableCell>{doc.date}</TableCell>
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
            </Paper>
        </>
    );
};

// Componente principal da seção de documentos
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
