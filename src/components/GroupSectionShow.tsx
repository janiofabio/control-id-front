import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface GroupSectionShowProps {
  groups: string[];
}

const GroupSectionShow: React.FC<GroupSectionShowProps> = ({ groups }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Grupos Associados
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {groups.map((group, index) => (
          <Chip key={index} label={group} color="primary" />
        ))}
      </Box>
      {(!groups || groups.length === 0) && (
        <Typography>Nenhum grupo associado.</Typography>
      )}
    </Box>
  );
};

export default GroupSectionShow;