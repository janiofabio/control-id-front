/*import { MuiShowInferencer } from "@refinedev/inferencer/mui";

export const ScheduleShow = () => {
  return <MuiShowInferencer />;
};
*/

import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
    BooleanField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ScheduleShow = () => {
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
                    Sunday Start
                </Typography>
                <TextField value={record?.sundayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Sunday End
                </Typography>
                <TextField value={record?.sundayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Monday Start
                </Typography>
                <TextField value={record?.mondayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Monday End
                </Typography>
                <TextField value={record?.mondayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Tuesday Start
                </Typography>
                <TextField value={record?.tuesdayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Tuesday End
                </Typography>
                <TextField value={record?.tuesdayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Wednesday Start
                </Typography>
                <TextField value={record?.wednesdayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Wednesday End
                </Typography>
                <TextField value={record?.wednesdayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Thursday Start
                </Typography>
                <TextField value={record?.thursdayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Thursday End
                </Typography>
                <TextField value={record?.thursdayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Friday Start
                </Typography>
                <TextField value={record?.fridayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Friday End
                </Typography>
                <TextField value={record?.fridayEnd} />
                <Typography variant="body1" fontWeight="bold">
                    Saturday Start
                </Typography>
                <TextField value={record?.saturdayStart} />
                <Typography variant="body1" fontWeight="bold">
                    Saturday End
                </Typography>
                <TextField value={record?.saturdayEnd} />
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
                <Typography variant="body1" fontWeight="bold">
                    Is Enabled
                </Typography>
                <BooleanField value={record?.isEnabled} />
            </Stack>
        </Show>
    );
};
