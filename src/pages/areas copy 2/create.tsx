import React, { useState } from "react";
import { useTranslate, useCreate, useNotification, useNavigation } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Controller } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera, Add, Remove } from "@mui/icons-material";
import { useHistory } from "../../hooks/useHistory";

export const AreaCreate: React.FC = () => {
  const translate = useTranslate();
  const { mutate: createArea } = useCreate();
  const { open } = useNotification();
  const { push } = useNavigation();
  const { addHistoryEntry, formatHistoryEntry, isLoadingUser } = useHistory();
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      externalArea: false,
      informZoneCapacity: false,
      capacity: 0,
      photoArea: "",
      historico: [],
    },
  });

  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const watchControlarCapacidade = watch("informZoneCapacity");

  const converterParaBase64 = (arquivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => resolve(leitor.result as string);
      leitor.onerror = (erro) => reject(erro);
    });
  };

  const handleMudancaArquivo = async (evento: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadLoading(true);
      const arquivo = evento.target.files?.[0];
      if (arquivo) {
        const dadosBase64 = await converterParaBase64(arquivo);
        setValue("photoArea", dadosBase64);
      }
    } catch (erro) {
      console.error("Falha no upload", erro);
      open({
        type: "error",
        message: "Erro ao fazer upload do arquivo. Por favor, tente novamente.",
      });
    } finally {
      setIsUploadLoading(false);
    }
  };

  const onSubmit = async (dados: any) => {
    try {
      if (isLoadingUser) {
        open({
          type: "error",
          message: "Informações do usuário ainda não estão disponíveis. Por favor, tente novamente.",
        });
        return;
      }

      const novoHistorico = addHistoryEntry([], 'criação', 'área');
      const dadosArea = {
        ...dados,
        historico: novoHistorico,
      };

      createArea(
        {
          resource: "areas",
          values: dadosArea,
        },
        {
          onSuccess: () => {
            open({
              type: "success",
              message: "Área criada com sucesso!",
            });
            push("/areas");
          },
          onError: (erro) => {
            console.error("Erro ao salvar área:", erro);
            open({
              type: "error",
              message: "Erro ao salvar área. Por favor, tente novamente.",
            });
          },
        }
      );
    } catch (erro) {
      console.error("Erro ao processar solicitação:", erro);
      open({
        type: "error",
        message: "Erro ao processar solicitação. Por favor, tente novamente.",
      });
    }
  };

  return (
    <Create saveButtonProps={{ onClick: handleSubmit(onSubmit) }}>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Controller
                    name="photoArea"
                    control={control}
                    render={({ field }) => (
                      <>
                        {field.value ? (
                          <Box
                            component="img"
                            sx={{
                              width: "100%",
                              height: "auto",
                              maxWidth: "3cm",
                              maxHeight: "3cm",
                              objectFit: "cover",
                            }}
                            src={field.value}
                            alt="Foto da Área"
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "3cm",
                              height: "3cm",
                              border: "1px dashed grey",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Sem Imagem
                          </Box>
                        )}
                      </>
                    )}
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleMudancaArquivo}
                  />
                  <label htmlFor="icon-button-file">
                    <LoadingButton
                      loading={isUploadLoading}
                      loadingPosition="start"
                      startIcon={<PhotoCamera />}
                      variant="contained"
                      component="span"
                      sx={{ mt: 2 }}
                    >
                      Selecionar Arquivo
                    </LoadingButton>
                  </label>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Este campo é obrigatório" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Nome da Área"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="externalArea"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} onChange={onChange} />}
                      label="Área Externa"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Descrição" fullWidth multiline rows={4} />
                  )}
                />
              </Grid>
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={6}>
                  <Controller
                    name="informZoneCapacity"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} onChange={onChange} />}
                        label="Controlar Capacidade da Área"
                      />
                    )}
                  />
                </Grid>
                {watchControlarCapacidade && (
                  <Grid item xs={6}>
                    <Controller
                      name="capacity"
                      control={control}
                      rules={{ min: 0 }}
                      render={({ field: { onChange, value } }) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton onClick={() => onChange(Math.max(0, value - 1))}>
                            <Remove />
                          </IconButton>
                          <TextField
                            value={value}
                            onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                            label="Capacidade"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                          <IconButton onClick={() => onChange(value + 1)}>
                            <Add />
                          </IconButton>
                        </Box>
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};