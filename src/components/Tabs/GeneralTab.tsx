import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseTranslate,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface GeneralTabProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  translate: UseTranslate;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
  trigger: (name?: string | string[]) => Promise<boolean>;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  register,
  errors,
  translate,
  control,
  setValue,
  watch,
  trigger,
}) => {
  const iDSecureAccess = watch("iDSecureAccess");
  const deviceAdmin = watch("deviceAdmin");

  useEffect(() => {
    console.log("iDSecureAccess changed:", iDSecureAccess);
    if (iDSecureAccess) {
      setValue("iDSecurePassword", "");
    }
    trigger("iDSecurePassword");
  }, [iDSecureAccess, setValue, trigger]);

  useEffect(() => {
    console.log("deviceAdmin changed:", deviceAdmin);
    if (deviceAdmin) {
      setValue("accessProfile", "");
    }
    trigger("accessProfile");
  }, [deviceAdmin, setValue, trigger]);

  return (
    <>
      <Grid container spacing={2}>
        {/* Coluna direita */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Conta
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="iDSecureAccess"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={!!field.value}
                      onChange={(event) =>
                        field.onChange(event.target.checked ? true : null)
                      }
                    />
                  )}
                />
              }
              label="Pessoa terá acesso ao iDSecure?"
            />
          </FormGroup>
         
            <TextField
              {...register("iDSecurePassword", {
                required: "Senha de Acesso ao iDSecure é obrigatória",
              })}
              error={!!errors.iDSecurePassword}
              helperText={errors.iDSecurePassword?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Senha de Acesso ao iDSecure"
              type="password"
            />

        </Grid>
        {/* Coluna esquerda */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Permissões
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="blockList"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={!!field.value}
                      onChange={(event) =>
                        field.onChange(event.target.checked ? true : null)
                      }
                    />
                  )}
                />
              }
              label="Lista de Bloqueio"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="deviceAdmin"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={!!field.value}
                      onChange={(event) =>
                        field.onChange(event.target.checked ? true : null)
                      }
                    />
                  )}
                />
              }
              label="Pessoa terá acesso de Administrador do Dispositivo?"
            />
          </FormGroup>
          
            <TextField
              {...register("accessProfile", {
                required: "Perfil de Acesso é obrigatório",
              })}
              error={!!errors.accessProfile}
              helperText={errors.accessProfile?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Perfil de Acesso"
            />

        </Grid>
      </Grid>
    </>
  );
};

export default GeneralTab;
