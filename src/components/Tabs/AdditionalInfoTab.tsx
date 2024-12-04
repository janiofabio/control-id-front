import React from "react";
import { Grid, TextField } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UseTranslate } from "@refinedev/core";

interface AdditionalInfoTabProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    translate: UseTranslate;
}

const AdditionalInfoTab: React.FC<AdditionalInfoTabProps> = ({ register, errors, translate }) => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("birthdate", { required: "This field is required" })}
                error={!!errors.birthdate}
                helperText={errors.birthdate?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.birthdate")}
                type="date"
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("gender")}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.gender")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.address")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.city")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.state")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("zipcode")}
                error={!!errors.zipcode}
                helperText={errors.zipcode?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.zipcode")}
            />
        </Grid>
    </Grid>
);

export default AdditionalInfoTab;
