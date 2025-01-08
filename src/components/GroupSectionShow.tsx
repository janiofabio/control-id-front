import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useOne } from "@refinedev/core";

interface Group {
  id: number;
  description: string;
}

interface GroupSectionShowProps {
  groups?: Group[];
}

const GroupSectionShow: React.FC<GroupSectionShowProps> = ({ groups = [] }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Grupos Associados
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <Chip 
              key={group.id} 
              label={group.description} 
              color="primary"
              variant="outlined"
            />
          ))
        ) : (
          <Typography color="text.secondary">
            Nenhum grupo associado.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GroupSectionShow;

