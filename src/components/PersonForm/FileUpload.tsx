import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface FileUploadProps {
    onFileChange: (file: File) => void;
    preview: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, preview }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };

    return (
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
    );
};

export default FileUpload;
