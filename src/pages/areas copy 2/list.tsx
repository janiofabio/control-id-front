/*import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const AreaList = () => {
  return <MuiListInferencer />;
};
*/
import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const AreaList = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("areas.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("areas.fields.createdAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("areas.fields.updatedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("areas.fields.name"),
                minWidth: 200,
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("areas.fields.description"),
                minWidth: 200,
            },
            {
                field: "capacity",
                flex: 1,
                headerName: translate("areas.fields.capacity"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "externalArea",
                headerName: translate("areas.fields.externalArea"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "informZoneCapacity",
                headerName: translate("areas.fields.informZoneCapacity"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "publishedAt",
                flex: 1,
                headerName: translate("areas.fields.publishedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
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
