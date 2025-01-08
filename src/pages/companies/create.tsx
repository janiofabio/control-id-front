import React from "react";
import { Box, Grid, TextField, Switch, FormControlLabel, Button, Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask"; // Importando a biblioteca de máscara

export const CompanyCreate = () => {
  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="white">📁 Cadastros</Typography>
        <Link to="/companies" style={{ color: 'white' }}>🏢 Companies</Link>
        <Typography color="textPrimary">Create</Typography>
      </Breadcrumbs>

      {/* Pular 2 linhas após o caminho */}
      <Box mt={4} />

      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Create Company
      </Typography>

      {/* Pular 3 linhas após o título */}
      <Box mt={6} />

      <Grid container spacing={2}>
        {/* Linha 1: CNPJ e Razão Social */}
        <Grid item xs={12} md={6}>
          <InputMask mask="99.999.999/9999-99" maskChar=" " >
            {(inputProps: any) => (
              <TextField 
                {...inputProps} 
                fullWidth 
                label="CNPJ" 
                variant="outlined" 
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Razão Social" variant="outlined" />
        </Grid>

        {/* Linha 2: Nome Fantasia */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Nome Fantasia" variant="outlined" />
        </Grid>

        {/* Linha 2: Botão Ignorar Anti-Dupla Entrada e Número de Funcionários */}
        <Grid item xs={12} md={3}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Ignorar Anti-Dupla Entrada"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Número de Funcionários" variant="outlined" type="number" />
        </Grid>

        {/* Linha 3: Endereço e Tipo de Empresa */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Endereço" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Tipo de Empresa" variant="outlined" />
        </Grid>

        {/* Linha Final: Botão de ação */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
