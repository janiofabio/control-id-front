/*import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

export const ScheduleCreate = () => {
  return <MuiCreateInferencer />;
};
*/

import { Create } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const ScheduleCreate = () => {
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
                    {...register("sundayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.sundayStart}
                    helperText={(errors as any)?.sundayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Sunday Start"
                    name="sundayStart"
                />
                <TextField
                    {...register("sundayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.sundayEnd}
                    helperText={(errors as any)?.sundayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Sunday End"
                    name="sundayEnd"
                />
                <TextField
                    {...register("mondayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.mondayStart}
                    helperText={(errors as any)?.mondayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Monday Start"
                    name="mondayStart"
                />
                <TextField
                    {...register("mondayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.mondayEnd}
                    helperText={(errors as any)?.mondayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Monday End"
                    name="mondayEnd"
                />
                <TextField
                    {...register("tuesdayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.tuesdayStart}
                    helperText={(errors as any)?.tuesdayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Tuesday Start"
                    name="tuesdayStart"
                />
                <TextField
                    {...register("tuesdayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.tuesdayEnd}
                    helperText={(errors as any)?.tuesdayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Tuesday End"
                    name="tuesdayEnd"
                />
                <TextField
                    {...register("wednesdayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.wednesdayStart}
                    helperText={(errors as any)?.wednesdayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Wednesday Start"
                    name="wednesdayStart"
                />
                <TextField
                    {...register("wednesdayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.wednesdayEnd}
                    helperText={(errors as any)?.wednesdayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Wednesday End"
                    name="wednesdayEnd"
                />
                <TextField
                    {...register("thursdayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.thursdayStart}
                    helperText={(errors as any)?.thursdayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Thursday Start"
                    name="thursdayStart"
                />
                <TextField
                    {...register("thursdayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.thursdayEnd}
                    helperText={(errors as any)?.thursdayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Thursday End"
                    name="thursdayEnd"
                />
                <TextField
                    {...register("fridayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fridayStart}
                    helperText={(errors as any)?.fridayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Friday Start"
                    name="fridayStart"
                />
                <TextField
                    {...register("fridayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fridayEnd}
                    helperText={(errors as any)?.fridayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Friday End"
                    name="fridayEnd"
                />
                <TextField
                    {...register("saturdayStart", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.saturdayStart}
                    helperText={(errors as any)?.saturdayStart?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Saturday Start"
                    name="saturdayStart"
                />
                <TextField
                    {...register("saturdayEnd", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.saturdayEnd}
                    helperText={(errors as any)?.saturdayEnd?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Saturday End"
                    name="saturdayEnd"
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
            </Box>
        </Create>
    );
};
