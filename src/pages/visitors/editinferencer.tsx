import { Edit } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const VisitorEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const visitorsData = queryResult?.data?.data;

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
                    label="Id"
                    name="id"
                    disabled
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
                    label="Person Type"
                    name="personType"
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
                    label="Name"
                    name="name"
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
                    label="Registration"
                    name="registration"
                />
                <TextField
                    {...register("idNumber", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.idNumber}
                    helperText={(errors as any)?.idNumber?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Id Number"
                    name="idNumber"
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
                    label="Email"
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
                    label="Phone DDI"
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
                    label="Phone Number"
                    name="phoneNumber"
                />
                <TextField
                    {...register("notes", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.notes}
                    helperText={(errors as any)?.notes?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Notes"
                    name="notes"
                />
                <Controller
                    control={control}
                    name="isOperator"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Is Operator"
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
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("visitorStartDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.visitorStartDate}
                    helperText={(errors as any)?.visitorStartDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Visitor Start Date"
                    name="visitorStartDate"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("visitorEndDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.visitorEndDate}
                    helperText={(errors as any)?.visitorEndDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Visitor End Date"
                    name="visitorEndDate"
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
                    label="Created At"
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
                    label="Updated At"
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
                    label="Published At"
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
                    label="Locale"
                    name="locale"
                />
            </Box>
        </Edit>
    );
};
