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
            //{
              //  field: "id",
                //headerName: "ID",
                //type: "number",
                //minWidth: 50,
            //},
            {
                field: "name",
                flex: 1,
                headerName: "Nome",
                minWidth: 200,
            },
            //{
              //  field: "personphoto",
                //flex: 1,
                //headerName: "Foto - Teste Base64",
                //minWidth: 250,
            //},
            {
                field: "notes",
                flex: 1,
                headerName: "Observações",
                minWidth: 250,
            },
            {
                field: "registration",
                flex: 1,
                headerName: "Matrícula",
                minWidth: 200,
            },
            {
                field: "email",
                flex: 1,
                headerName: "e-mail",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
           
            {
                field: "phoneNumber",
                flex: 1,
                headerName: "Fone",
                type: "number",
                minWidth: 200,
                align: "center",
                headerAlign: "center",
            },

            {
                field: "actions",
                headerName: translate("Ações"),
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
