import React, { useState, useEffect } from 'react';
import { useForm } from '@refinedev/react-hook-form';
import { useCreate, useUpdate, useOne } from '@refinedev/core';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function UnifiedCRUDForm({ id }) {
  const [mode, setMode] = useState(id ? 'view' : 'create');
  const { register, handleSubmit, reset } = useForm();
  
  const { mutate: create } = useCreate();
  const { mutate: update } = useUpdate();
  const { data, isLoading } = useOne({
    resource: 'posts',
    id: id,
    queryOptions: {
      enabled: !!id,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data]);

  const onSubmit = (formData) => {
    if (mode === 'create') {
      create({
        resource: 'posts',
        values: formData,
      });
    } else if (mode === 'edit') {
      update({
        resource: 'posts',
        id: id,
        values: formData,
      });
    }
    setMode('view');
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box>
      <Typography variant="h6">
        {mode === 'view' ? 'Visualizar' : mode === 'edit' ? 'Editar' : 'Criar'} Post
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('title')}
          label="Título"
          fullWidth
          margin="normal"
          disabled={mode === 'view'}
        />
        <TextField
          {...register('content')}
          label="Conteúdo"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          disabled={mode === 'view'}
        />
        {mode === 'view' && (
          <Button onClick={() => setMode('edit')} variant="contained" color="primary">
            Editar
          </Button>
        )}
        {(mode === 'edit' || mode === 'create') && (
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        )}
      </form>
    </Box>
  );
}