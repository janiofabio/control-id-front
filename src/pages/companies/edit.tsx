/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, useAutocomplete } from "@refinedev/mui";
import {
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
    Autocomplete,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const CompanyEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        // refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    // const companiesData = queryResult?.data?.data;
    const tenantAutocompleteProps = useAutocomplete({
      resource: "tenants",
    }).autocompleteProps;
    const employeesAutocompleteProps = useAutocomplete({
      resource: "users",
    }).autocompleteProps;
    const companyAddressAutocompleteProps = useAutocomplete({
      resource: "company-addresses",
    }).autocompleteProps;
    console.log(companyAddressAutocompleteProps.options)
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
                    label={translate("companies.fields.id")}
                    name="id"
                    disabled
                />
                <Controller
                    control={control}
                    name="status"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("companies.fields.status")}
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
                    {...register("cnpj", {
                        required: "This field is required",
                        valueAsNumber: false,
                    })}
                    error={!!(errors as any)?.cnpj}
                    helperText={(errors as any)?.cnpj?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("companies.fields.cnpj")}
                    name="cnpj"
                />
                <TextField
                    {...register("inscricaoEstadual", {
                        required: "This field is required",
                        valueAsNumber: false,
                    })}
                    error={!!(errors as any)?.inscricaoEstadual}
                    helperText={(errors as any)?.inscricaoEstadual?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("companies.fields.inscricaoEstadual")}
                    name="inscricaoEstadual"
                />
                <TextField
                    {...register("inscricaoMunicipal", {
                        required: "This field is required",
                        valueAsNumber: false,
                    })}
                    error={!!(errors as any)?.inscricaoMunicipal}
                    helperText={(errors as any)?.inscricaoMunicipal?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("companies.fields.inscricaoMunicipal")}
                    name="inscricaoMunicipal"
                />
                <TextField
                    {...register("razaoSocial", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.razaoSocial}
                    helperText={(errors as any)?.razaoSocial?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("companies.fields.razaoSocial")}
                    name="razaoSocial"
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
                    label={translate("companies.fields.companyName")}
                    name="companyName"
                />
                <Controller
                    control={control}
                    name="tenant"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...tenantAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    tenantAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("companies.fields.tenant")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.tenant?.title}
                                    helperText={
                                        (errors as any)?.tenant?.title?.message
                                    }
                                    required
                                    disabled
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="creator_user"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[] as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...employeesAutocompleteProps}
                            {...field}

                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    employeesAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.username ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("companies.fields.creator_user")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.creator_user}
                                    helperText={
                                        (errors as any)?.creator_user?.message
                                    }
                                required
                                disabled
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="employees"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[] as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...employeesAutocompleteProps}
                            {...field}
                            multiple={true}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    employeesAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.username ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("companies.fields.employees")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.employees}
                                    helperText={
                                        (errors as any)?.employees?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="company_addresses"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[] as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...companyAddressAutocompleteProps}
                            {...field}
                            multiple={true}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    companyAddressAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.address ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("companies.fields.companyAddress")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.company_addresses}
                                    helperText={
                                        (errors as any)?.company_addresses?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
