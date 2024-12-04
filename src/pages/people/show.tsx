import React from "react";
import { useShow, useTranslate } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { 
    Box, 
    Typography, 
    Grid, 
    Tab, 
    Tabs, 
    Paper, 
    Card, 
    CardContent, 
    Avatar,
    Divider
  } from "@mui/material";
  import { Person as PersonIcon } from "@mui/icons-material";
import GeralSectionShow from "@components/GeralSectionShow";
import AddInfoSectionShow from "@components/AddInfoSectionShow";
import DocumentSectionShow from "@components/DocumentSectionShow";
import GroupSectionShow from "@components/GroupSectionShow";

export const PersonShow: React.FC = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const [tabValue, setTabValue] = React.useState(0);

    const record = data?.data;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body1">{value || "Não especificado"}</Typography>
        </Box>
    );

    return (
        <Show isLoading={isLoading}>
            <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <Box display="flex" justifyContent="center">
                                {record?.personPhoto ? (
                                    <Avatar
                                        src={record.personPhoto}
                                        alt="Foto de Perfil"
                                        sx={{ width: 150, height: 150 }}
                                    />
                                ) : (
                                    <Avatar sx={{ width: 150, height: 150 }}>
                                        <PersonIcon sx={{ fontSize: 100 }} />
                                    </Avatar>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography variant="h4" gutterBottom>
                                {record?.name}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InfoItem label="E-mail" value={record?.email} />
                                    <InfoItem label="Matrícula" value={record?.registration} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InfoItem label="Telefone" value={record?.phoneNumber} />
                                    <InfoItem label="Observações" value={record?.notes} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card elevation={3}>
                <CardContent>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange} 
                        aria-label="person details tabs"
                        variant="fullWidth"
                    >
                        <Tab label="Geral" />
                        <Tab label="Informações Adicionais" />
                        <Tab label="Documentos" />
                        <Tab label="Grupos" />
                    </Tabs>

                    <Box sx={{ mt: 3 }}>
                        <TabPanel value={tabValue} index={0}>
                            <GeralSectionShow data={record} />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <AddInfoSectionShow data={record} />
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <DocumentSectionShow documents={record} />
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <GroupSectionShow groups={record?.groups || []} />
                        </TabPanel>
                    </Box>
                </CardContent>
            </Card>
        </Show>
    );
};

const TabPanel: React.FC<{ children?: React.ReactNode; value: number; index: number }> = (props) => {
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
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default PersonShow;