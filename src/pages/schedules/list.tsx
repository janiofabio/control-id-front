/*import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const ScheduleList = () => {
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
import { Checkbox } from "@mui/material";

export const ScheduleList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "description",
                flex: 1,
                headerName: "Description",
                minWidth: 200,
            },
            {
                field: "sundayStart",
                flex: 1,
                headerName: "Sunday Start",
                minWidth: 200,
            },
            {
                field: "sundayEnd",
                flex: 1,
                headerName: "Sunday End",
                minWidth: 200,
            },
            {
                field: "mondayStart",
                flex: 1,
                headerName: "Monday Start",
                minWidth: 200,
            },
            {
                field: "mondayEnd",
                flex: 1,
                headerName: "Monday End",
                minWidth: 200,
            },
            {
                field: "tuesdayStart",
                flex: 1,
                headerName: "Tuesday Start",
                minWidth: 200,
            },
            {
                field: "tuesdayEnd",
                flex: 1,
                headerName: "Tuesday End",
                minWidth: 200,
            },
            {
                field: "wednesdayStart",
                flex: 1,
                headerName: "Wednesday Start",
                minWidth: 200,
            },
            {
                field: "wednesdayEnd",
                flex: 1,
                headerName: "Wednesday End",
                minWidth: 200,
            },
            {
                field: "thursdayStart",
                flex: 1,
                headerName: "Thursday Start",
                minWidth: 200,
            },
            {
                field: "thursdayEnd",
                flex: 1,
                headerName: "Thursday End",
                minWidth: 200,
            },
            {
                field: "fridayStart",
                flex: 1,
                headerName: "Friday Start",
                minWidth: 200,
            },
            {
                field: "fridayEnd",
                flex: 1,
                headerName: "Friday End",
                minWidth: 200,
            },
            {
                field: "saturdayStart",
                flex: 1,
                headerName: "Saturday Start",
                minWidth: 200,
            },
            {
                field: "saturdayEnd",
                flex: 1,
                headerName: "Saturday End",
                minWidth: 200,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: "Updated At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "publishedAt",
                flex: 1,
                headerName: "Published At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "locale",
                flex: 1,
                headerName: "Locale",
                minWidth: 200,
            },
            {
                field: "isEnabled",
                headerName: "Is Enabled",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
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
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
