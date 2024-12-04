import { Create, useAutocomplete } from "@refinedev/mui";
import {
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";

export const CompanyCreate = () => {
    const translate = useTranslate();
    const {
        handleSubmit,
        saveButtonProps,
        formState: { isSubmitting, errors },
        register,
        control,
    } = useForm();

    const { autocompleteProps: companyAutocompleteProps } = useAutocomplete({
        resource: "companies",
    });

    const onSubmit = async (data: any) => {
        try {
            // Aqui você pode adicionar lógica para salvar a empresa
            console.log("Dados do formulário:", data);
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };

    return (
        <Create isLoading={isSubmitting} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Description"
                    name="description"
                />
                <TextField
                    {...register("type", {
                        required: "This field is required",
                    })}
                    error={!!errors.type}
                    helperText={errors.type?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Type"
                    name="type"
                />
                
                <Controller
                    control={control}
                    name="blackList"
                    defaultValue={false}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("companies.fields.blackList")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />

                <TextField
                    {...register("companyName", {
                        required: "This field is required",
                    })}
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("companies.fields.companyName")}
                    name="companyName"
                />

                <TextField
                    {...register("totalPersons", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!errors.totalPersons}
                    helperText={errors.totalPersons?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("companies.fields.totalPersons")}
                    name="totalPersons"
                />
            </Box>
        </Create>
    );
};
