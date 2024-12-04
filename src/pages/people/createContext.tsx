// src/pages/create.tsx
import React from 'react';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import AddInfoSection from '../components/AddInfoSection';
import DocumentSection from '../components/DocumentSection';
import GroupSection from '../components/GroupSection';
import { FormProviderWrapper } from '../components/FormContext'; // Importando o contexto do formulário

const Create: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <FormProviderWrapper>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Informações Adicionais" />
          <Tab label="Documentos" />
          <Tab label="Grupos" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <AddInfoSection />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DocumentSection />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <GroupSection />
        </TabPanel>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </FormProviderWrapper>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default Create;
