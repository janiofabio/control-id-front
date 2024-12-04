import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { DateField } from "@refinedev/mui";

interface AddInfoSectionShowProps {
  data?: {
    releasePeriodStart?: string;
    releasePeriodEnd?: string;
    occupation?: string;
    admissionDate?: string;
    mobileNumber?: string;
    extensionNumber?: string;
    socialName?: string;
    registryName?: string;
    fatherName?: string;
    motherName?: string;
    birthDate?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    naturalness?: string;
    rg?: string;
    cpf?: string;
    passport?: string;
  };
}

const AddInfoSectionShow: React.FC<AddInfoSectionShowProps> = ({ data = {} }) => {
  const renderField = (label: string, value: string | undefined) => (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value || 'Não especificado'}
      </Typography>
    </Grid>
  );

  const renderDateField = (label: string, value: string | undefined) => (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <DateField value={value} />
    </Grid>
  );

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Período de Liberação
          </Typography>
        </Grid>
        {renderDateField("Início da Liberação", data.releasePeriodStart)}
        {renderDateField("Fim da Liberação", data.releasePeriodEnd)}

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            PROFISSIONAL
          </Typography>
        </Grid>
        {renderField("Ocupação", data.occupation)}
        {renderDateField("Data de Admissão", data.admissionDate)}
        {renderField("Número de Celular", data.mobileNumber)}
        {renderField("Ramal", data.extensionNumber)}

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            PESSOAL
          </Typography>
        </Grid>
        {renderField("Nome Social", data.socialName)}
        {renderField("Nome de Registro", data.registryName)}
        {renderField("Nome do Pai", data.fatherName)}
        {renderField("Nome da Mãe", data.motherName)}
        {renderDateField("Data de Nascimento", data.birthDate)}
        {renderField("Gênero", data.gender)}
        {renderField("Estado Civil", data.maritalStatus)}
        {renderField("Nacionalidade", data.nationality)}
        {renderField("Naturalidade", data.naturalness)}
        {renderField("RG", data.rg)}
        {renderField("CPF", data.cpf)}
        {renderField("Passaporte", data.passport)}
      </Grid>
    </Paper>
  );
};

export default AddInfoSectionShow;

