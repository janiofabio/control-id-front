import { useShow, useTranslate } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
    EmailField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PersonShow = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.id")}
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.name")}
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.createdAt")}
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.updatedAt")}
                </Typography>
                <DateField value={record?.updatedAt} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.publishedAt")}
                </Typography>
                <DateField value={record?.publishedAt} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.locale")}
                </Typography>
                <TextField value={record?.locale} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.birthDate")}
                </Typography>
                <DateField value={record?.birthDate} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.admissionDate")}
                </Typography>
                <DateField value={record?.admissionDate} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.email")}
                </Typography>
                <EmailField value={record?.email} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.phoneDDI")}
                </Typography>
                <NumberField value={record?.phoneDDI ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.phoneNumber")}
                </Typography>
                <NumberField value={record?.phoneNumber ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.registration")}
                </Typography>
                <TextField value={record?.registration} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.registrationName")}
                </Typography>
                <TextField value={record?.registrationName} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.personType")}
                </Typography>
                <TextField value={record?.personType} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.professionalRole")}
                </Typography>
                <TextField value={record?.professionalRole} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.fathersName")}
                </Typography>
                <TextField value={record?.fathersName} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.mothersName")}
                </Typography>
                <TextField value={record?.mothersName} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.nacionality")}
                </Typography>
                <TextField value={record?.nacionality} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.naturality")}
                </Typography>
                <TextField value={record?.naturality} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.address")}
                </Typography>
                <TextField value={record?.address} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.neighborhood")}
                </Typography>
                <TextField value={record?.neighborhood} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.city")}
                </Typography>
                <TextField value={record?.city} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.zipCode")}
                </Typography>
                <TextField value={record?.zipCode} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("people.fields.visitedPersonName")}
                </Typography>
                <TextField value={record?.visitedPersonName} />
            </Stack>
        </Show>
    );
};
