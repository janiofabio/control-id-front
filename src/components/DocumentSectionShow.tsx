import React from 'react';
import { Grid, Typography, Button, Box, Card, CardContent, Chip } from '@mui/material';
import { DateField } from "@refinedev/mui";
import { FileDownload as FileDownloadIcon, Visibility as VisibilityIcon } from "@mui/icons-material";

interface DocumentSectionShowProps {
  documents?: {
    cpf_number?: string;
    cpf_date?: string;
    cpf_file?: string;
    cpf_file_name?: string;
    rg_number?: string;
    rg_date?: string;
    rg_file?: string;
    rg_file_name?: string;
  };
}

const DocumentSectionShow: React.FC<DocumentSectionShowProps> = ({ documents = {} }) => {
  const handleViewDocument = (base64Data: string | undefined, fileName: string) => {
    if (base64Data) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<iframe src="${base64Data}" width="100%" height="100%"></iframe>`);
      }
    } else {
      alert("Documento não disponível para visualização.");
    }
  };

  const renderDocument = (title: string, number: string | undefined, date: string | undefined, file: string | undefined, fileName: string | undefined) => (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Número
            </Typography>
            <Typography variant="body1">{number || 'Não especificado'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Data de Emissão
            </Typography>
            <DateField value={date} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Arquivo
            </Typography>
            {file ? (
              <Chip
                label={fileName || 'Documento'}
                onClick={() => handleViewDocument(file, fileName || 'Documento')}
                onDelete={() => handleViewDocument(file, fileName || 'Documento')}
                deleteIcon={<VisibilityIcon />}
              />
            ) : (
              <Typography variant="body1">Nenhum arquivo</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {renderDocument("CPF", documents.cpf_number, documents.cpf_date, documents.cpf_file, documents.cpf_file_name)}
      {renderDocument("RG", documents.rg_number, documents.rg_date, documents.rg_file, documents.rg_file_name)}
    </Box>
  );
};

export default DocumentSectionShow;