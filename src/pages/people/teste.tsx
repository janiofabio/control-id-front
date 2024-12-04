// mudança no create
import DocumentSection from "@components/DocumentSection";

export const PersonCreate = () => {
    // Outros estados e métodos...

    const handleSubmitForm = async (data) => {
        // Chamar o salvamento de documentos antes de enviar o formulário
        await documentSectionRef.current.handleSaveAll();

        // Agora você pode enviar os dados completos do formulário, incluindo os documentos
        console.log("Dados enviados para o backend:", data);
        saveButtonProps?.onClick?.();
    };

    return (
        <FormProvider {...methods}>
            <Create saveButtonProps={{ onClick: handleSubmit(handleSubmitForm) }}>
                {/* Outros elementos do formulário */}
                <DocumentSection ref={documentSectionRef} />
                {/* Outros elementos do formulário */}
            </Create>
        </FormProvider>
    );
};

//Mudança no DocumentSection

import React, { useRef, useState, 
    useImperativeHandle, forwardRef 
} from "react";
import { Box, Button, Typography, 
    IconButton, List, ListItem, 
    ListItemIcon, ListItemText 
} from "@mui/material";
import { Delete, FileCopy } from "@mui/icons-material";
import axios from "axios";

const DocumentSection = forwardRef((props, ref) => {
    const [documents, setDocuments] = useState<File[]>([]);
    const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]); // URLs for uploaded files
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Exposing handleSaveAll function to be called from parent (create.tsx)
    useImperativeHandle(ref, () => ({
        handleSaveAll: async () => {
            return await handleUpload();
        }
    }));

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setDocuments([...documents, ...Array.from(files)]);
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (documents.length === 0) return; // No documents to upload
        const uploadPromises = documents.map(async (doc) => {
            const formData = new FormData();
            formData.append("files", doc);

            try {
                const response = await axios.post(
                    "http://localhost:1337/api/upload", // Strapi upload URL
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const uploadedFile = response.data[0]; // Adjust as per your API response structure
                setUploadedDocuments((prev) => [...prev, uploadedFile.url]);
                return uploadedFile.url;
            } catch (error) {
                console.error("Error uploading document:", error);
                throw error;
            }
        });

        try {
            await Promise.all(uploadPromises); // Wait for all uploads to finish
        } catch (error) {
            console.error("Failed to upload all documents");
        }
    };

    // Handle document removal
    const handleRemove = (index: number) => {
        const newDocuments = [...documents];
        newDocuments.splice(index, 1);
        setDocuments(newDocuments);
    };

    return (
        <Box>
            <Typography variant="h6">Documentos</Typography>
            <Button variant="contained" component="label">
                Adicionar Documento
                <input
                    type="file"
                    hidden
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </Button>

            <List>
                {documents.map((doc, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <FileCopy />
                        </ListItemIcon>
                        <ListItemText primary={doc.name} />
                        <IconButton edge="end" onClick={() => handleRemove(index)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {uploadedDocuments.length > 0 && (
                <Box>
                    <Typography variant="subtitle1">Documentos carregados:</Typography>
                    <List>
                        {uploadedDocuments.map((url, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={url} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
});

export default DocumentSection;
