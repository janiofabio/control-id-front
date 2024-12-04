/*import { MuiShowInferencer } from "@refinedev/inferencer/mui";

export const AreaShow = () => {
  return <MuiShowInferencer />;
};
*/

import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    DateField,
    TextFieldComponent as TextField,
    BooleanField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const AreaShow = () => {
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
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    Updated At
                </Typography>
                <DateField value={record?.updatedAt} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Description
                </Typography>
                <TextField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    Capacity
                </Typography>
                <NumberField value={record?.capacity ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    External Area
                </Typography>
                <BooleanField value={record?.externalArea} />
                <Typography variant="body1" fontWeight="bold">
                    Inform Zone Capacity
                </Typography>
                <BooleanField value={record?.informZoneCapacity} />
                <Typography variant="body1" fontWeight="bold">
                    Published At
                </Typography>
                <DateField value={record?.publishedAt} />
            </Stack>
        </Show>
    );
};
