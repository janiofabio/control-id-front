import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchGroups } from "../services/groupService";
import { styled } from "@mui/system";

// Estilizando o botão principal
const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    padding: "10px 20px",
    fontWeight: "bold",
}));

// Estilizando as células da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const GroupSection = () => {
    const [open, setOpen] = useState(false); // Estado para controlar o diálogo de vinculação
    const [allGroups, setAllGroups] = useState([]); // Estado para armazenar todos os grupos disponíveis
    const [linkedGroups, setLinkedGroups] = useState([]); // Estado para armazenar os grupos vinculados
    const [documentGroups, setDocumentGroups] = useState([]); // Estado para armazenar os grupos adicionados ao documento

    // Abre o diálogo de vinculação
    const handleOpen = () => {
        console.log("Abrindo diálogo de vinculação");
        setOpen(true);
    };

    // Fecha o diálogo de vinculação
    const handleClose = () => {
        console.log("Fechando diálogo de vinculação");
        setOpen(false);
    };

    // Efeito para carregar os grupos da API quando o componente é montado
    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await fetchGroups(); // Busca os grupos da API
                if (data && data.length > 0) {
                    setAllGroups(data); // Define os grupos disponíveis no estado
                    console.log("Grupos carregados da API:", data);
                }
            } catch (error) {
                console.error("Erro ao carregar os grupos:", error);
            }
        };
        loadGroups();

        // Restaurando grupos vinculados e documentGroups do localStorage
        const savedLinkedGroups = JSON.parse(localStorage.getItem("linkedGroups") || "[]");
        const savedDocumentGroups = JSON.parse(localStorage.getItem("documentGroups") || "[]");
        setLinkedGroups(savedLinkedGroups); // Define os grupos vinculados no estado
        setDocumentGroups(savedDocumentGroups); // Define os grupos dos documentos no estado
        console.log("Grupos vinculados restaurados do localStorage:", savedLinkedGroups);
        console.log("Grupos de documentos restaurados do localStorage:", savedDocumentGroups);
    }, []);

    // Função para atualizar o localStorage com novos dados
    const updateLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value)); // Armazena os dados no localStorage
        console.log(`LocalStorage atualizado: ${key} ->`, value);
    };

    // Filtra os grupos disponíveis removendo os já vinculados
    const getAvailableGroups = () => {
        const availableGroups = allGroups.filter(
            (group) => !linkedGroups.some((linkedGroup) => linkedGroup.id === group.id)
        );
        console.log("Grupos disponíveis filtrados:", availableGroups);
        return availableGroups;
    };

    // Função para vincular um grupo
    const handleLinkGroup = (group) => {
        const updatedLinkedGroups = [...linkedGroups, group]; // Adiciona o grupo aos vinculados
        setLinkedGroups(updatedLinkedGroups); // Atualiza o estado dos grupos vinculados
        updateLocalStorage("linkedGroups", updatedLinkedGroups); // Atualiza o localStorage
        console.log("Grupo vinculado:", group);
        console.log("Estado dos grupos vinculados atualizado:", updatedLinkedGroups);
    };

    // Função para desvincular um grupo
    const handleUnlinkGroup = (group) => {
        const updatedLinkedGroups = linkedGroups.filter(g => g.id !== group.id); // Remove o grupo dos vinculados
        setLinkedGroups(updatedLinkedGroups); // Atualiza o estado dos grupos vinculados
        updateLocalStorage("linkedGroups", updatedLinkedGroups); // Atualiza o localStorage
        console.log("Grupo desvinculado:", group);
        console.log("Estado dos grupos vinculados atualizado:", updatedLinkedGroups);
    };

    // Adiciona todos os grupos vinculados aos documentos
    const handleAddAllToDocuments = () => {
        const newDocumentGroups = [...documentGroups, ...linkedGroups]; // Adiciona todos os grupos vinculados aos documentos
        setDocumentGroups(newDocumentGroups); // Atualiza o estado dos grupos de documentos
        setLinkedGroups([]); // Limpa a lista de grupos vinculados
        updateLocalStorage("documentGroups", newDocumentGroups); // Atualiza o localStorage com os grupos de documentos
        updateLocalStorage("linkedGroups", []); // Limpa os grupos vinculados no localStorage
        handleClose(); // Fecha o diálogo
        console.log("Todos os grupos vinculados foram adicionados aos documentos:", newDocumentGroups);
    };

    // Remove um grupo dos documentos e o retorna aos grupos vinculados
    const handleRemoveFromDocuments = (groupId) => {
        const groupToRemove = documentGroups.find(group => group.id === groupId); // Encontra o grupo a ser removido
        setDocumentGroups(documentGroups.filter(group => group.id !== groupId)); // Remove o grupo dos documentos
        setLinkedGroups([...linkedGroups, groupToRemove]); // Adiciona o grupo removido de volta aos vinculados
        updateLocalStorage("documentGroups", documentGroups.filter(group => group.id !== groupId)); // Atualiza o localStorage
        console.log("Grupo removido dos documentos e devolvido aos vinculados:", groupToRemove);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Grupos Adicionados aos Documentos</Typography>
                <List>
                    {documentGroups.length > 0 ? (
                        documentGroups.map((group) => (
                            <ListItem key={group.id}>
                                <ListItemText
                                    primary={group.attributes?.description || "Nome não disponível"}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromDocuments(group.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>Nenhum grupo adicionado</Typography>
                    )}
                </List>
            </Grid>

            <Grid item xs={12}>
                <StyledButton variant="contained" onClick={handleOpen}>
                    Vincular Grupo
                </StyledButton>
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Vincular Grupos</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6">Grupos Disponíveis</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {getAvailableGroups().length > 0 ? (
                                            getAvailableGroups().map((group) => (
                                                <TableRow key={group.id}>
                                                    <StyledTableCell>
                                                        {group.attributes?.description || "Nome não disponível"}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <IconButton onClick={() => handleLinkGroup(group)}>
                                                            <ArrowForwardIcon fontSize="large" />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <StyledTableCell colSpan={2}>
                                                    <Typography>Nenhum grupo disponível</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Grupos Vinculados</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {linkedGroups.length > 0 ? (
                                            linkedGroups.map((group) => (
                                                <TableRow key={group.id}>
                                                    <StyledTableCell>
                                                        {group.attributes?.description || "Nome não disponível"}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <IconButton onClick={() => handleUnlinkGroup(group)}>
                                                            <ArrowBackIcon fontSize="large" />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <StyledTableCell colSpan={2}>
                                                    <Typography>Nenhum grupo vinculado</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddAllToDocuments} color="primary">
                        Adicionar Todos aos Documentos
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default GroupSection;
