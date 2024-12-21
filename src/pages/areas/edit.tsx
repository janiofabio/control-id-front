import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useHistory } from "../../hooks/useHistory";

const EditArea: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const { formatHistoryEntry } = useHistory();

  // Simulando dados da área para renderizar o histórico
  const areaData = {
    data: {
      nome: "Área de Teste",
      historico: [
        {
          alteradoPor: "João Silva",
          alteradoEm: "2024-12-06T12:34:56Z",
          tipo: "criação", // Corrigido para corresponder ao tipo esperado
          entidade: "Área",
        },
        {
          alteradoPor: "Maria Oliveira",
          alteradoEm: "2024-12-07T14:22:10Z",
          tipo: "edição", // Corrigido para corresponder ao tipo esperado
          entidade: "Área",
        },
      ],
    },
  };

  return (
    <Box component="form" {...saveButtonProps}>
      <Stack spacing={2}>
        <Typography variant="h5">Editar Área</Typography>

        <TextField
          {...register("nome", { required: "Nome é obrigatório" })}
          label="Nome"
          error={!!errors.nome}
          helperText={errors.nome?.message as React.ReactNode} {/* Caraia de erro dos inferno */}
        />

        {/* Renderizado o histórico */}
        {areaData?.data?.historico && areaData.data.historico.length > 0 && (
          <Box>
            <Typography variant="h6">Histórico</Typography>
            <List>
              {areaData.data.historico.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={formatHistoryEntry(item)} />
                  </ListItem>
                  {index < areaData.data.historico.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};

export default EditArea;
