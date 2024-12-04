import { Edit } from "@refinedev/mui";
import {
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IResourceComponentsProps, useTranslate, useOne } from "@refinedev/core";
import { useEffect } from "react";

export const VisitorEdit: React.FC<IResourceComponentsProps> = ({ id }) => {
    const translate = useTranslate();
    const { saveButtonProps, register, control, formState: { errors }, setValue } = useForm();

    const { data, isLoading } = useOne({
        resource: "visitors",
        id,
    });

    const visitorData = data?.data;

    useEffect(() => {
        if (visitorData) {
            setValue("personType", visitorData.personType);
            setValue("name", visitorData.name);
            setValue("registration", visitorData.registration);
            setValue("idNumber", visitorData.idNumber);
            setValue("email", visitorData.email);
            setValue("phoneDDI", visitorData.phoneDDI);
            setValue("phoneNumber", visitorData.phoneNumber);
            setValue("notes", visitorData.notes);
            setValue("isOperator", visitorData.isOperator);
            setValue("visitorStartDate", visitorData.visitorStartDate);
            setValue("visitorEndDate", visitorData.visitorEndDate);
        }
    }, [visitorData, setValue]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("personType", { required: "This field is required" })}
                    error={!!errors.personType}
                    helperText={errors.personType?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.personType")}
                />
                <TextField
                    {...register("name", { required: "This field is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.name")}
                />
                <TextField
                    {...register("registration", { required: "This field is required" })}
                    error={!!errors.registration}
                    helperText={errors.registration?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.registration")}
                />
                <TextField
                    {...register("idNumber", { required: "This field is required" })}
                    error={!!errors.idNumber}
                    helperText={errors.idNumber?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.idNumber")}
                />
                <TextField
                    {...register("email", { required: "This field is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.email")}
                />
                <TextField
                    {...register("phoneDDI", { required: "This field is required" })}
                    error={!!errors.phoneDDI}
                    helperText={errors.phoneDDI?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.phoneDDI")}
                />
                <TextField
                    {...register("phoneNumber", { required: "This field is required" })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.phoneNumber")}
                />
                <TextField
                    {...register("notes")}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.notes")}
                />
                <Controller
                    control={control}
                    name="isOperator"
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("visitors.fields.isOperator")}
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
                    {...register("visitorStartDate", { required: "This field is required" })}
                    error={!!errors.visitorStartDate}
                    helperText={errors.visitorStartDate?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.visitorStartDate")}
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    {...register("visitorEndDate", { required: "This field is required" })}
                    error={!!errors.visitorEndDate}
                    helperText={errors.visitorEndDate?.message}
                    margin="normal"
                    fullWidth
                    label={translate("visitors.fields.visitorEndDate")}
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
        </Edit>
    );
};
