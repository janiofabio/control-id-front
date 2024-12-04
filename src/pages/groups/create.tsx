import React from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, TextField, Switch, FormControlLabel, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';

export const GroupCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, onFinish },
        register,
        control,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm({
        defaultValues: {
            description: "",
            type: "Persons",
            doubleEntry: false,
            credit: false,
            blacklist: false,
            ignoreAntiDoubleEntry: false,
            maximumTime: "00:00:00.000",
            companyName: "",
            tradeName: ""
        }
    });

    const navigate = useNavigate();

    const handleClear = () => {
        reset({ description: "", ignoreAntiDoubleEntry: false });
    };

    const handleCancel = () => {
        navigate("/groups");
    };

    const onSubmit = async (data: any) => {
        // Ensure maximumTime is in the correct format
        if (data.maximumTime === "") {
            data.maximumTime = "00:00:00.000";
        }
        await onFinish(data);
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={{
            ...saveButtonProps,
            onClick: handleSubmit(onSubmit)
        }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...register("description", {
                                required: "Este campo é obrigatório",
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label="Descrição"
                            name="description"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Controller
                            control={control}
                            name="ignoreAntiDoubleEntry"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                    }
                                    label="Ignorar Anti Dupla Entrada"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* Campos ocultos */}
                <input type="hidden" {...register("type")} />
                <input type="hidden" {...register("doubleEntry")} />
                <input type="hidden" {...register("credit")} />
                <input type="hidden" {...register("blacklist")} />
                <input type="hidden" {...register("maximumTime")} />
                <input type="hidden" {...register("companyName")} />
                <input type="hidden" {...register("tradeName")} />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        onClick={handleClear}
                        startIcon={<ClearIcon />}
                        variant="outlined"
                    >
                        Limpar
                    </Button>
                    <Button
                        onClick={handleCancel}
                        startIcon={<CancelIcon />}
                        variant="outlined"
                    >
                        Cancelar
                    </Button>
                    <Button
                        {...saveButtonProps}
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Create>
    );
};