import React from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const PersonCreate = () => {
    const translate = useTranslate();
    const { saveButtonProps, refineCore: { formLoading }, control, register, formState: { errors } } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.name")}
                    name="name"
                />
                <Controller
                    name="createdAt"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label={translate("people.fields.createdAt")}
                                {...field}
                                slotProps={{ textField: { fullWidth: true, margin: "normal", InputLabelProps: { shrink: true }, error: !!errors.createdAt, helperText: errors.createdAt?.message } }}
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="updatedAt"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label={translate("people.fields.updatedAt")}
                                {...field}
                                slotProps={{ textField: { fullWidth: true, margin: "normal", InputLabelProps: { shrink: true }, error: !!errors.updatedAt, helperText: errors.updatedAt?.message } }}
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="publishedAt"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label={translate("people.fields.publishedAt")}
                                {...field}
                                slotProps={{ textField: { fullWidth: true, margin: "normal", InputLabelProps: { shrink: true }, error: !!errors.publishedAt, helperText: errors.publishedAt?.message } }}
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="birthDate"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label={translate("people.fields.birthDate")}
                                {...field}
                                slotProps={{ textField: { fullWidth: true, margin: "normal", InputLabelProps: { shrink: true }, error: !!errors.birthDate, helperText: errors.birthDate?.message } }}
                            />
                        </LocalizationProvider>
                    )}
                />
                <TextField
                    {...register("admissionDate", {
                        required: "This field is required",
                    })}
                    error={!!errors.admissionDate}
                    helperText={errors.admissionDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    label={translate("people.fields.admissionDate")}
                    name="admissionDate"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                />
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label={translate("people.fields.email")}
                    name="email"
                />
                <TextField
                    {...register("phoneDDI", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!errors.phoneDDI}
                    helperText={errors.phoneDDI?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("people.fields.phoneDDI")}
                    name="phoneDDI"
                />
                <TextField
                    {...register("phoneNumber", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("people.fields.phoneNumber")}
                    name="phoneNumber"
                />
                <TextField
                    {...register("registration", {
                        required: "This field is required",
                    })}
                    error={!!errors.registration}
                    helperText={errors.registration?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.registration")}
                    name="registration"
                />
                <TextField
                    {...register("registrationName", {
                        required: "This field is required",
                    })}
                    error={!!errors.registrationName}
                    helperText={errors.registrationName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.registrationName")}
                    name="registrationName"
                />
                <TextField
                    {...register("personType", {
                        required: "This field is required",
                    })}
                    error={!!errors.personType}
                    helperText={errors.personType?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.personType")}
                    name="personType"
                />
                <TextField
                    {...register("professionalRole", {
                        required: "This field is required",
                    })}
                    error={!!errors.professionalRole}
                    helperText={errors.professionalRole?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.professionalRole")}
                    name="professionalRole"
                />
                <TextField
                    {...register("fathersName", {
                        required: "This field is required",
                    })}
                    error={!!errors.fathersName}
                    helperText={errors.fathersName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.fathersName")}
                    name="fathersName"
                />
                <TextField
                    {...register("mothersName", {
                        required: "This field is required",
                    })}
                    error={!!errors.mothersName}
                    helperText={errors.mothersName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.mothersName")}
                    name="mothersName"
                />
                <TextField
                    {...register("nacionality", {
                        required: "This field is required",
                    })}
                    error={!!errors.nacionality}
                    helperText={errors.nacionality?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.nacionality")}
                    name="nacionality"
                />
                <TextField
                    {...register("naturality", {
                        required: "This field is required",
                    })}
                    error={!!errors.naturality}
                    helperText={errors.naturality?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.naturality")}
                    name="naturality"
                />
                <TextField
                    {...register("address", {
                        required: "This field is required",
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.address")}
                    name="address"
                />
                <TextField
                    {...register("neighborhood", {
                        required: "This field is required",
                    })}
                    error={!!errors.neighborhood}
                    helperText={errors.neighborhood?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.neighborhood")}
                    name="neighborhood"
                />
                <TextField
                    {...register("city", {
                        required: "This field is required",
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.city")}
                    name="city"
                />
                <TextField
                    {...register("federativeUnit", {
                        required: "This field is required",
                    })}
                    error={!!errors.federativeUnit}
                    helperText={errors.federativeUnit?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.federativeUnit")}
                    name="federativeUnit"
                />
                <TextField
                    {...register("zipCode", {
                        required: "This field is required",
                    })}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.zipCode")}
                    name="zipCode"
                />
            </Box>
        </Create>
    );
};
