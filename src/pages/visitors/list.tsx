import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

export const VisitorList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    meta: {
      populate: ["visitors"],
    },
  });

  const visitorIds = dataGridProps?.rows?.map((item: any) => item?.id).filter(Boolean) ?? [];
  const { data: visitorData, isLoading: visitorIsLoading } = useMany({
    resource: "visitors",
    ids: visitorIds,
    queryOptions: {
      enabled: visitorIds.length > 0,
    },
  });

  useEffect(() => {
    console.log("dataGridProps", dataGridProps);
    console.log("visitorData", visitorData);
  }, [dataGridProps, visitorData]);

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "personType",
        flex: 1,
        headerName: "Person Type",
        minWidth: 150,
        valueGetter: (params) => params.row.personType || "-",
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 150,
        valueGetter: (params) => params.row.name || "-",
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

  if (visitorIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        rows={(visitorData?.data ?? []).map((visitor: any) => ({
          id: visitor.id,
          ...visitor, // Ajuste para garantir que os atributos estejam diretamente acessíveis
        }))}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
