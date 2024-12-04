import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

export const CompanyList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    meta: {
      populate: ["companies"],
    },
  });

  const { data: companyData, isLoading: companyIsLoading } = useMany({
    resource: "companies",
    ids: dataGridProps?.rows?.map((item: any) => item?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  useEffect(() => {
    console.log("dataGridProps", dataGridProps);
    console.log("companyData", companyData);
  }, [dataGridProps, companyData]);

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "companyName",
        flex: 1,
        headerName: "Company Name",
        minWidth: 200,
        valueGetter: (params) => {
          const companyName = params.row.attributes?.companyName || "-";
          console.log("companyName", companyName);
          return companyName;
        },
      },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
        minWidth: 250,
        renderCell: ({ value }) => {
          if (!value) return "-";
          const description = value?.slice(0, 80) + "..." || "";
          console.log("description", description);
          return <MarkdownField value={description} />;
        },
        valueGetter: (params) => {
          const description = params.row.attributes?.description || "-";
          console.log("description", description);
          return description;
        },
      },
      {
        field: "type",
        flex: 1,
        headerName: "Type",
        minWidth: 300,
        valueGetter: (params) => {
          const type = params.row.attributes?.type || "-";
          console.log("type", type);
          return type;
        },
        renderCell: ({ value }) => {
          console.log("type render", value);
          return value || "-";
        },
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        valueGetter: (params) => {
          const createdAt = params.row.attributes?.createdAt || "-";
          console.log("createdAt", createdAt);
          return createdAt;
        },
        renderCell: ({ value }) => {
          console.log("createdAt render", value);
          return <DateField value={value} />;
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
    []
  );

  if (companyIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        rows={(companyData?.data ?? []).map((row: any) => ({
          id: row.id,
          attributes: row, 
        }))}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
