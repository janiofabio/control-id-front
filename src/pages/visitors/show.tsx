import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const VisitorShow = () => {
  const { queryResult } = useShow({
    resource: "visitors",
    id: "1", // substitua pelo id do visitante que você quer mostrar
  });

  const { data, isLoading } = queryResult;

  const record = data?.data?.attributes;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={data?.data?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Person Type"}
        </Typography>
        <TextField value={record?.personType} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Registration"}
        </Typography>
        <TextField value={record?.registration} />

        <Typography variant="body1" fontWeight="bold">
          {"ID Number"}
        </Typography>
        <TextField value={record?.idNumber} />

        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          {"Phone DDI"}
        </Typography>
        <TextField value={record?.phoneDDI} />

        <Typography variant="body1" fontWeight="bold">
          {"Phone Number"}
        </Typography>
        <TextField value={record?.phoneNumber} />

        <Typography variant="body1" fontWeight="bold">
          {"Notes"}
        </Typography>
        <MarkdownField value={record?.notes} />

        <Typography variant="body1" fontWeight="bold">
          {"Visitor Start Date"}
        </Typography>
        <DateField value={record?.visitorStartDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Visitor End Date"}
        </Typography>
        <DateField value={record?.visitorEndDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Created At"}
        </Typography>
        <DateField value={record?.createdAt} />

        <Typography variant="body1" fontWeight="bold">
          {"Updated At"}
        </Typography>
        <DateField value={record?.updatedAt} />

        <Typography variant="body1" fontWeight="bold">
          {"Published At"}
        </Typography>
        <DateField value={record?.publishedAt} />

        <Typography variant="body1" fontWeight="bold">
          {"Locale"}
        </Typography>
        <TextField value={record?.locale} />
      </Stack>
    </Show>
  );
};
