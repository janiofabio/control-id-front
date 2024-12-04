/*import { MuiEditInferencer } from "@refinedev/inferencer/mui";

export const GroupEdit = () => {
  return <MuiEditInferencer />;
};
*/

import { Edit } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const GroupEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const groupsData = queryResult?.data?.data;

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
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.description}
                    helperText={(errors as any)?.description?.message}
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
                    error={!!(errors as any)?.type}
                    helperText={(errors as any)?.type?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Type"
                    name="type"
                />
                <TextField
                    {...register("maximumTime", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.maximumTime}
                    helperText={(errors as any)?.maximumTime?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Maximum Time"
                    name="maximumTime"
                />
                <Controller
                    control={control}
                    name="doubleEntry"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Double Entry"
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
                <Controller
                    control={control}
                    name="credit"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Credit"
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
                <Controller
                    control={control}
                    name="blacklist"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Blacklist"
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
                    error={!!(errors as any)?.companyName}
                    helperText={(errors as any)?.companyName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Company Name"
                    name="companyName"
                />
                <TextField
                    {...register("tradeName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.tradeName}
                    helperText={(errors as any)?.tradeName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Trade Name"
                    name="tradeName"
                />
                <Controller
                    control={control}
                    name="igonreAntiDoubleEntry"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Igonre Anti Double Entry"
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
            </Box>
        </Edit>
    );
};
