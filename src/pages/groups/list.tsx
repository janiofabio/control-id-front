/* import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const GroupList = () => {
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
import { useTranslate, useMany } from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const GroupList = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: groupData, isLoading: groupIsLoading } = useMany({
        resource: "groups",
        ids: dataGridProps?.rows?.map((item: any) => item?.groupID) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("groups.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("groups.fields.description"),
                minWidth: 200,
            },
            {
                field: "type",
                flex: 1,
                headerName: translate("groups.fields.type"),
                minWidth: 200,
            },
            {
                field: "maximumTime",
                flex: 1,
                headerName: translate("groups.fields.maximumTime"),
                minWidth: 200,
            },
            {
                field: "doubleEntry",
                headerName: translate("groups.fields.doubleEntry"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "credit",
                headerName: translate("groups.fields.credit"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "blacklist",
                headerName: translate("groups.fields.blacklist"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "companyID",
                flex: 1,
                headerName: translate("groups.fields.companyID"),
                minWidth: 300,
            },
            {
                field: "companyName",
                flex: 1,
                headerName: translate("groups.fields.companyName"),
                minWidth: 200,
            },
            {
                field: "tradeName",
                flex: 1,
                headerName: translate("groups.fields.tradeName"),
                minWidth: 200,
            },
            {
                field: "igonreAntiDoubleEntry",
                headerName: translate("groups.fields.igonreAntiDoubleEntry"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("groups.fields.createdAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("groups.fields.updatedAt"),
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
        [translate, groupData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
