/*import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const DeviceList = () => {
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

export const DeviceList = () => {
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
                field: "deviceModelType",
                flex: 1,
                headerName: "Device Model Type",
                minWidth: 200,
            },
            {
                field: "name",
                flex: 1,
                headerName: "Name",
                minWidth: 200,
            },
            {
                field: "serial",
                flex: 1,
                headerName: "Serial",
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
                field: "routeControlled",
                flex: 1,
                headerName: "Route Controlled",
                type: "number",
                minWidth: 200,
            },
            {
                field: "readers",
                headerName: "Readers",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "deviceMasterId",
                headerName: "Device Master",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "deviceMasterOrder",
                headerName: "Device Master Order",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "exceptionMode",
                flex: 1,
                headerName: "Exception Mode",
                type: "number",
                minWidth: 200,
            },
            {
                field: "iDFaceOne",
                headerName: "I DFace One",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "iDFaceTwo",
                headerName: "I DFace Two",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "statusDevice",
                flex: 1,
                headerName: "Status Device",
                type: "number",
                minWidth: 200,
            },
            {
                field: "deviceOutput",
                flex: 1,
                headerName: "Device Output",
                minWidth: 200,
            },
            {
                field: "syncStatus",
                headerName: "Sync Status",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "lastConnection",
                headerName: "Last Connection",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "lastSync",
                headerName: "Last Sync",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "deviceCode",
                headerName: "Device Code",
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "advancedDeviceConfig",
                headerName: "Advanced Device Config",
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
