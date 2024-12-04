import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
    EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";

export const PersonList = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("people.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("people.fields.name"),
                minWidth: 200,
            },
            {
                field: "personphoto",
                flex: 1,
                headerName: translate("people.fields.personphoto"),
                minWidth: 250,
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("people.fields.updatedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "publishedAt",
                flex: 1,
                headerName: translate("people.fields.publishedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "locale",
                flex: 1,
                headerName: translate("people.fields.locale"),
                minWidth: 200,
            },
            {
                field: "birthDate",
                flex: 1,
                headerName: translate("people.fields.birthDate"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "admissionDate",
                flex: 1,
                headerName: translate("people.fields.admissionDate"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "email",
                flex: 1,
                headerName: translate("people.fields.email"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "phoneDDI",
                flex: 1,
                headerName: translate("people.fields.phoneDDI"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "phoneNumber",
                flex: 1,
                headerName: translate("people.fields.phoneNumber"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "registration",
                flex: 1,
                headerName: translate("people.fields.registration"),
                minWidth: 200,
            },
            {
                field: "registrationName",
                flex: 1,
                headerName: translate("people.fields.registrationName"),
                minWidth: 200,
            },
            {
                field: "personType",
                flex: 1,
                headerName: translate("people.fields.personType"),
                minWidth: 200,
            },
            {
                field: "professionalRole",
                flex: 1,
                headerName: translate("people.fields.professionalRole"),
                minWidth: 200,
            },
            {
                field: "fathersName",
                flex: 1,
                headerName: translate("people.fields.fathersName"),
                minWidth: 200,
            },
            {
                field: "mothersName",
                flex: 1,
                headerName: translate("people.fields.mothersName"),
                minWidth: 200,
            },
            {
                field: "nacionality",
                flex: 1,
                headerName: translate("people.fields.nacionality"),
                minWidth: 200,
            },
            {
                field: "naturality",
                flex: 1,
                headerName: translate("people.fields.naturality"),
                minWidth: 200,
            },
            {
                field: "address",
                flex: 1,
                headerName: translate("people.fields.address"),
                minWidth: 200,
            },
            {
                field: "neighborhood",
                flex: 1,
                headerName: translate("people.fields.neighborhood"),
                minWidth: 200,
            },
            {
                field: "city",
                flex: 1,
                headerName: translate("people.fields.city"),
                minWidth: 200,
            },
            {
                field: "zipCode",
                flex: 1,
                headerName: translate("people.fields.zipCode"),
                minWidth: 200,
            },
            {
                field: "visitedPersonName",
                flex: 1,
                headerName: translate("people.fields.visitedPersonName"),
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
