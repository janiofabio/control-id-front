/*import { MuiShowInferencer } from "@refinedev/inferencer/mui";

export const GroupShow = () => {
  return <MuiShowInferencer />;
};
*/
import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    BooleanField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const GroupShow = () => {
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
                    Description
                </Typography>
                <TextField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    Type
                </Typography>
                <TextField value={record?.type} />
                <Typography variant="body1" fontWeight="bold">
                    Maximum Time
                </Typography>
                <TextField value={record?.maximumTime} />
                <Typography variant="body1" fontWeight="bold">
                    Double Entry
                </Typography>
                <BooleanField value={record?.doubleEntry} />
                <Typography variant="body1" fontWeight="bold">
                    Credit
                </Typography>
                <BooleanField value={record?.credit} />
                <Typography variant="body1" fontWeight="bold">
                    Blacklist
                </Typography>
                <BooleanField value={record?.blacklist} />
                <Typography variant="body1" fontWeight="bold">
                    Company Name
                </Typography>
                <TextField value={record?.companyName} />
                <Typography variant="body1" fontWeight="bold">
                    Trade Name
                </Typography>
                <TextField value={record?.tradeName} />
                <Typography variant="body1" fontWeight="bold">
                    Igonre Anti Double Entry
                </Typography>
                <BooleanField value={record?.igonreAntiDoubleEntry} />
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    Updated At
                </Typography>
                <DateField value={record?.updatedAt} />
            </Stack>
        </Show>
    );
};
