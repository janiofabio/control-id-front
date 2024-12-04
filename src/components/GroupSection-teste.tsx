import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import {
    useDataGrid,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const GroupSection = () => {
    const [open, setOpen] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const { dataGridProps } = useDataGrid(); // Hook para trazer os grupos
    const translate = useTranslate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Adicionar grupos selecionados
    const handleAddGroup = (group) => {
        if (!selectedGroups.includes(group)) {
            setSelectedGroups([...selectedGroups, group]);
        }
    };

    // Remover grupos selecionados
    const handleRemoveGroup = (groupId) => {
        setSelectedGroups(selectedGroups.filter((group) => group.id !== groupId));
    };

    // Colunas da tabela (somente a descrição do grupo)
    const columns: GridColDef[] = [
        {
            field: "description", // Alterado para 'description'
            headerName: translate("groups.fields.description"),
            flex: 1,
            minWidth: 200,
        },
        {
            field: "actions",
            headerName: "",
            renderCell: ({ row }) => (
                <IconButton onClick={() => handleAddGroup(row)}>
                    <ArrowRightAltIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Vincular Grupos
                </Button>
            </Grid>

            {/* Dialog para selecionar grupos */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md"> {/* Aumenta a área do diálogo */}
                <DialogTitle>Vincular Grupos</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Lista de grupos disponíveis */}
                        <Grid item xs={6}>
                            <Typography variant="h6">Grupos Disponíveis</Typography>
                            <List>
                                <DataGrid {...dataGridProps} columns={columns} autoHeight />
                            </List>
                        </Grid>

                        {/* Lista de grupos vinculados */}
                        <Grid item xs={6}>
                            <Typography variant="h6">Grupos Vinculados</Typography>
                            {selectedGroups.length > 0 ? (
                                selectedGroups.map((group) => (
                                    <Grid
                                        container
                                        key={group.id}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography>{group.description}</Typography>
                                        <IconButton onClick={() => handleRemoveGroup(group.id)}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Grid>
                                ))
                            ) : (
                                <Typography>Nenhum grupo vinculado</Typography>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default GroupSection;
