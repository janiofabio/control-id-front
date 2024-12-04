/*import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

export const DeviceCreate = () => {
  return <MuiCreateInferencer />;
};
*/

import { Create } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const DeviceCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("deviceModelType", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.deviceModelType}
                    helperText={(errors as any)?.deviceModelType?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Device Model Type"
                    name="deviceModelType"
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
                    {...register("serial", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.serial}
                    helperText={(errors as any)?.serial?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Serial"
                    name="serial"
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
                <Controller
                    control={control}
                    name="isEnabled"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Is Enabled"
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
                    {...register("routeControlled", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.routeControlled}
                    helperText={(errors as any)?.routeControlled?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Route Controlled"
                    name="routeControlled"
                />
                <Controller
                    control={control}
                    name="readers"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Readers"
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
                    name="deviceMasterId"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Device Master"
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
                    name="deviceMasterOrder"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Device Master Order"
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
                    {...register("exceptionMode", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.exceptionMode}
                    helperText={(errors as any)?.exceptionMode?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Exception Mode"
                    name="exceptionMode"
                />
                <Controller
                    control={control}
                    name="iDFaceOne"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="I DFace One"
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
                    name="iDFaceTwo"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="I DFace Two"
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
                    {...register("statusDevice", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.statusDevice}
                    helperText={(errors as any)?.statusDevice?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Status Device"
                    name="statusDevice"
                />
                <TextField
                    {...register("deviceOutput", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.deviceOutput}
                    helperText={(errors as any)?.deviceOutput?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Device Output"
                    name="deviceOutput"
                />
                <Controller
                    control={control}
                    name="syncStatus"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Sync Status"
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
                    name="lastConnection"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Last Connection"
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
                    name="lastSync"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Last Sync"
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
                    name="deviceCode"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Device Code"
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
                    name="advancedDeviceConfig"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Advanced Device Config"
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
            </Box>
        </Create>
    );
};

