import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslate } from "@refinedev/core";

export const PersonEdit = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const peopleData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("people.fields.id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.name")}
                    name="name"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.createdAt}
                    helperText={(errors as any)?.createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("people.fields.createdAt")}
                    name="createdAt"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("updatedAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.updatedAt}
                    helperText={(errors as any)?.updatedAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("people.fields.updatedAt")}
                    name="updatedAt"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("publishedAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.publishedAt}
                    helperText={(errors as any)?.publishedAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("people.fields.publishedAt")}
                    name="publishedAt"
                />
                <TextField
                    {...register("locale", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.locale}
                    helperText={(errors as any)?.locale?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.locale")}
                    name="locale"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("birthDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.birthDate}
                    helperText={(errors as any)?.birthDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("people.fields.birthDate")}
                    name="birthDate"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("admissionDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.admissionDate}
                    helperText={(errors as any)?.admissionDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("people.fields.admissionDate")}
                    name="admissionDate"
                />
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.email}
                    helperText={(errors as any)?.email?.message}
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
                    error={!!(errors as any)?.phoneDDI}
                    helperText={(errors as any)?.phoneDDI?.message}
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
                    error={!!(errors as any)?.phoneNumber}
                    helperText={(errors as any)?.phoneNumber?.message}
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
                    error={!!(errors as any)?.registration}
                    helperText={(errors as any)?.registration?.message}
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
                    error={!!(errors as any)?.registrationName}
                    helperText={(errors as any)?.registrationName?.message}
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
                    error={!!(errors as any)?.personType}
                    helperText={(errors as any)?.personType?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.personType")}
                    name="personType"
                />
                <TextField
                    {...register("fathersName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fathersName}
                    helperText={(errors as any)?.fathersName?.message}
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
                    error={!!(errors as any)?.mothersName}
                    helperText={(errors as any)?.mothersName?.message}
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
                    error={!!(errors as any)?.nacionality}
                    helperText={(errors as any)?.nacionality?.message}
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
                    error={!!(errors as any)?.naturality}
                    helperText={(errors as any)?.naturality?.message}
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
                    error={!!(errors as any)?.address}
                    helperText={(errors as any)?.address?.message}
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
                    error={!!(errors as any)?.neighborhood}
                    helperText={(errors as any)?.neighborhood?.message}
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
                    error={!!(errors as any)?.city}
                    helperText={(errors as any)?.city?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.city")}
                    name="city"
                />
                <TextField
                    {...register("zipCode", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.zipCode}
                    helperText={(errors as any)?.zipCode?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("people.fields.zipCode")}
                    name="zipCode"
                />
            </Box>
        </Edit>
    );
};
