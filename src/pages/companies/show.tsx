import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const CompanyShow = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["category"],
    },
  });

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"companyName"}
        </Typography>
        <TextField value={record?.companyName} />

        <Typography variant="body1" fontWeight="bold">
          {"description"}
        </Typography>
        <MarkdownField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          {"Status"}
        </Typography>
        <TextField value={record?.status} />
        <Typography variant="body1" fontWeight="bold">
          {"CreatedAt"}
        </Typography>
        <DateField value={record?.createdAt} />
      </Stack>
    </Show>
  );
};
