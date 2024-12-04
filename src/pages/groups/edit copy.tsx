import React, { useEffect, useState } from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/core";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useGetIdentity } from "@refinedev/core";

export const GroupEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, onFinish },
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const groupData = queryResult?.data?.data;
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogSelectedPeople, setDialogSelectedPeople] = useState<string[]>([]);
  const [dialogSearchTerm, setDialogSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const { data: identity } = useGetIdentity<{ id: string }>();

  const { tableQueryResult } = useTable({
    resource: "people",
    pagination: { mode: 'server' },
  });

  const allPeople = tableQueryResult.data?.data || [];
  const groupPeople = allPeople.filter(person => selectedPeople.includes(person.id));
  const nonGroupPeople = allPeople.filter(person => !selectedPeople.includes(person.id));

  useEffect(() => {
    if (groupData) {
      reset(groupData);
      setSelectedPeople(groupData.people?.map((person: any) => person.id) || []);
    }
  }, [groupData, reset]);

  const handleClear = () => {
    reset({ description: groupData?.description || "", ignoreAntiDoubleEntry: groupData?.ignoreAntiDoubleEntry || false });
  };

  const handleCancel = () => {
    navigate("/groups");
  };

  const handlePersonToggle = (personId: string) => {
    setSelectedPeople(prev =>
      prev.includes(personId)
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handlePersonRemove = (personId: string) => {
    setSelectedPeople(prev => prev.filter(id => id !== personId));
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setDialogSelectedPeople([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogSearchTerm("");
  };

  const handleDialogSave = () => {
    setSelectedPeople(prev => [...new Set([...prev, ...dialogSelectedPeople])]);
    handleDialogClose();
  };

  const handleDialogPersonToggle = (personId: string) => {
    setDialogSelectedPeople(prev =>
      prev.includes(personId)
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleDialogSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDialogSelectedPeople(nonGroupPeople.map(person => person.id));
    } else {
      setDialogSelectedPeople([]);
    }
  };

  const onSubmit = async (data: any) => {
    if (data.maximumTime === "") {
      data.maximumTime = "00:00:00.000";
    }
    await onFinish({ ...data, people: selectedPeople });
  };

  const filteredGroupPeople = groupPeople.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNonGroupPeople = nonGroupPeople.filter(person =>
    person.name.toLowerCase().includes(dialogSearchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(dialogSearchTerm.toLowerCase())
  );

  const paginatedNonGroupPeople = filteredNonGroupPeople.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Edit saveButtonProps={{
      ...saveButtonProps,
      onClick: handleSubmit(onSubmit)
    }}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("description", {
                required: "Este campo é obrigatório",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Descrição"
              name="description"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Controller
              control={control}
              name="ignoreAntiDoubleEntry"
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Ignorar Anti Dupla Entrada"
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Campos ocultos */}
        <input type="hidden" {...register("type")} />
        <input type="hidden" {...register("doubleEntry")} />
        <input type="hidden" {...register("credit")} />
        <input type="hidden" {...register("blacklist")} />
        <input type="hidden" {...register("maximumTime")} />
        <input type="hidden" {...register("companyName")} />
        <input type="hidden" {...register("tradeName")} />

        <Box mt={4}>
          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Grid item>
              <Typography variant="h6">Pessoas nas quais o Grupo está associada</Typography>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                startIcon={<AddIcon />}
                onClick={handleDialogOpen}
                variant="contained"
                sx={{ ml: 2 }}
              >
                Adicionar Pessoa
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Matrícula</TableCell>
                  <TableCell>Número de Telefone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGroupPeople.map((person: any) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.registration}</TableCell>
                    <TableCell>{person.phoneNumber}</TableCell>
                    <TableCell>{person.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handlePersonRemove(person.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={handleClear}
            startIcon={<ClearIcon />}
            variant="outlined"
          >
            Limpar
          </Button>
          <Button
            onClick={handleCancel}
            startIcon={<CancelIcon />}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            {...saveButtonProps}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Salvar
          </Button>
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Adicionar Pessoas ao Grupo</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dialogSelectedPeople.length === nonGroupPeople.length}
                  onChange={handleDialogSelectAll}
                  indeterminate={dialogSelectedPeople.length > 0 && dialogSelectedPeople.length < nonGroupPeople.length}
                />
              }
              label="Todas as pessoas"
            />
            <TextField
              size="small"
              placeholder="Pesquisar"
              value={dialogSearchTerm}
              onChange={(e) => setDialogSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 2 }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Matrícula</TableCell>
                  <TableCell>Número de Telefone</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedNonGroupPeople.map((person: any) => (
                  <TableRow key={person.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={dialogSelectedPeople.includes(person.id)}
                        onChange={() => handleDialogPersonToggle(person.id)}
                      />
                    </TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.registration}</TableCell>
                    <TableCell>{person.phoneNumber}</TableCell>
                    <TableCell>{person.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography>
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredNonGroupPeople.length)} de {filteredNonGroupPeople.length}
            </Typography>
            <Box>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Anterior
              </Button>
              <Button
                disabled={currentPage * itemsPerPage >= filteredNonGroupPeople.length}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Próxima
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleDialogSave} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Edit>
  );
};