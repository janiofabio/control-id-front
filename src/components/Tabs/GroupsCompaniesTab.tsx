import React from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UseTranslate } from "@refinedev/core";

interface GroupsCompaniesTabProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    translate: UseTranslate;
    groups: { id: number; name: string }[];
    companies: { id: number; name: string }[];
}

const GroupsCompaniesTab: React.FC<GroupsCompaniesTabProps> = ({ register, errors, translate, groups, companies }) => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <Autocomplete
                options={groups}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...register("group")}
                        error={!!errors.group}
                        helperText={errors.group?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={translate("people.fields.group")}
                    />
                )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Autocomplete
                options={companies}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...register("company")}
                        error={!!errors.company}
                        helperText={errors.company?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={translate("people.fields.company")}
                    />
                )}
            />
        </Grid>
    </Grid>
);

export default GroupsCompaniesTab;
