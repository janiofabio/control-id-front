import React from "react";
import { useShow, useTranslate } from "@refinedev/core";
import { Show, NumberField, TextFieldComponent as TextField, DateField } from "@refinedev/mui";
import { Box, Typography, Grid, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";

export const PersonShow: React.FC = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const [tabValue, setTabValue] = React.useState(0);

    const record = data?.data;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleViewDocument = (base64Data: string, fileName: string) => {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`<iframe src="${base64Data}" width="100%" height="100%"></iframe>`);
        }
    };

    return (
        <Show isLoading={isLoading}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Visualizar Pessoa
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ddd',
                                padding: 2,
                                borderRadius: 1,
                                mb: 2,
                                backgroundColor: 'background.paper'
                            }}
                        >
                            <img
                                src={record?.personphoto}
                                alt="Foto de Perfil"
                                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                            />
                        
</Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.name")}
                                </Typography>
                                <TextField value={record?.name} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.email")}
                                </Typography>
                                <TextField value={record?.email} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.registration")}
                                </Typography>
                                <TextField value={record?.registration} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.phoneNumber")}
                                </Typography>
                                <TextField value={record?.phoneNumber} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="person details tabs">
                        <Tab label="Geral" />
                        <Tab label="Informações Adicionais" />
                        <Tab label="Documentos" />
                        <Tab label="Grupos" />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.birthDate")}
                            </Typography>
                            <DateField value={record?.birthDate} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.gender")}
                            </Typography>
                            <TextField value={record?.gender} />
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.address")}
                            </Typography>
                            <TextField value={record?.address} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.city")}
                            </Typography>
                            <TextField value={record?.city} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.state")}
                            </Typography>
                            <TextField value={record?.state} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("people.fields.country")}
                            </Typography>
                            <TextField value={record?.country} />
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Número</TableCell>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Arquivo</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {record?.documents?.map((doc: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{doc.type}</TableCell>
                                        <TableCell>{doc.number}</TableCell>
                                        <TableCell><DateField value={doc.date} /></TableCell>
                                        <TableCell>{doc.fileName}</TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={<FileDownloadIcon />}
                                                onClick={() => handleViewDocument(doc.file, doc.fileName)}
                                            >
                                                Visualizar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    {/* Implementar a exibição de grupos aqui */}
                    <Typography>Informações sobre grupos serão exibidas aqui.</Typography>
                </TabPanel>
            </Box>
        </Show>
    );
};

const TabPanel = (props: { children?: React.ReactNode; value: number; index: number }) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`person-tabpanel-${index}`}
            aria-labelledby={`person-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

