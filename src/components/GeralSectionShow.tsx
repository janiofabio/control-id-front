import React from 'react';
import { Grid, Typography } from '@mui/material';
import { TextFieldComponent as TextField, DateField } from "@refinedev/mui";

interface GeralSectionShowProps {
  data?: {
    birthDate?: string;
    gender?: string;
    iDSecureAccess?: boolean;
    blockList?: boolean;
    deviceAdmin?: boolean;
    accessProfile?: string;
  };
}

const GeralSectionShow: React.FC<GeralSectionShowProps> = ({ data = {} }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">
          Data de Nascimento
        </Typography>
        <DateField value={data?.birthDate} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">
          Gênero
        </Typography>
        <TextField value={data?.gender || 'Não especificado'} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">
          Acesso ao iDSecure
        </Typography>
        <TextField value={data?.iDSecureAccess ? "Sim" : "Não"} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">
          Lista de Bloqueio
        </Typography>
        <TextField value={data?.blockList ? "Sim" : "Não"} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">
          Administrador do Dispositivo
        </Typography>
        <TextField value={data?.deviceAdmin ? "Sim" : "Não"} />
      </Grid>
      {data?.deviceAdmin && (
        <Grid item xs={12} md={6}>
          <Typography variant="body1" fontWeight="bold">
            Perfil de Acesso
          </Typography>
          <TextField value={data?.accessProfile || 'Não especificado'} />
        </Grid>
      )}
    </Grid>
  );
};

export default GeralSectionShow;