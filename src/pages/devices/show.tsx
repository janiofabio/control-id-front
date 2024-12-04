/*import { MuiShowInferencer } from "@refinedev/inferencer/mui";

export const DeviceShow = () => {
  return <MuiShowInferencer />;
};
*/

import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const DeviceShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Device Model Type
                </Typography>
                <TextField value={record?.deviceModelType} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Serial
                </Typography>
                <TextField value={record?.serial} />
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    Updated At
                </Typography>
                <DateField value={record?.updatedAt} />
                <Typography variant="body1" fontWeight="bold">
                    Published At
                </Typography>
                <DateField value={record?.publishedAt} />
                <Typography variant="body1" fontWeight="bold">
                    Locale
                </Typography>
                <TextField value={record?.locale} />
            </Stack>
        </Show>
    );
};
