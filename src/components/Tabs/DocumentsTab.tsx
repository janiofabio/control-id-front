import React from "react";
import { Grid, TextField } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UseTranslate } from "@refinedev/core";

interface DocumentsTabProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    translate: UseTranslate;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ register, errors, translate }) => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("cpf", { required: "This field is required" })}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.cpf")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("rg")}
                error={!!errors.rg}
                helperText={errors.rg?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.rg")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("issuingAuthority")}
                error={!!errors.issuingAuthority}
                helperText={errors.issuingAuthority?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.issuingAuthority")}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                {...register("issueDate")}
                error={!!errors.issueDate}
                helperText={errors.issueDate?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={translate("people.fields.issueDate")}
                type="date"
            />
        </Grid>
    </Grid>
);

export default DocumentsTab;
