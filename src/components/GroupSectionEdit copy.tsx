import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { fetchGroups } from "../services/groupService"; // Função para buscar todos os grupos

interface Group {
  id: number;
  attributes: {
    description: string;
  };
}

const GroupSectionEdit = () => {
  const { control, setValue } = useFormContext();
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [personGroups, setPersonGroups] = useState<Group[]>([]); // Grupos já salvos para a pessoa

  useEffect(() => {
    // Carregar todos os grupos disponíveis
    const loadGroups = async () => {
      try {
        const data = await fetchGroups();
        if (data) {
          setAllGroups(data);
        }
      } catch (error) {
        console.error("Erro ao carregar os grupos:", error);
      }
    };

    // Carregar os dados salvos da pessoa (exemplo: ID dos grupos salvos)
    // Suponha que os grupos salvos sejam um array de ids, por exemplo:
    const savedGroups = [{ id: 1, description: "Grupo 1" }, { id: 2, description: "Grupo 2" }];
    setPersonGroups(savedGroups); // Carrega os grupos salvos da pessoa

    loadGroups();
  }, []);

  // Criar um array com as descrições de grupos disponíveis e já associados
  const availableGroups = allGroups.filter(
    (group) => !personGroups.some((savedGroup) => savedGroup.id === group.id)
  );

  // Função para garantir que o group.attributes.description existe
  const getDescription = (group: Group) => {
    return group?.attributes?.description || ""; // Retorna uma string vazia se não houver descrição
  };

  return (
    <Box sx={{ p: 2 }}>
      <Controller
        name="groups"
        control={control}
        defaultValue={personGroups.map((group) => group.id)} // Preenche com os ids dos grupos já associados
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={availableGroups.map((group) => getDescription(group))} // Exibe os grupos disponíveis
            value={personGroups.map((group) => getDescription(group))} // Exibe os grupos já associados
            onChange={(_, newValue) => {
              // Atualiza os grupos selecionados
              const selectedGroups = allGroups.filter((group) =>
                newValue.includes(getDescription(group))
              );
              setPersonGroups(selectedGroups); // Atualiza os grupos salvos
              onChange(selectedGroups.map((group) => group.id)); // Atualiza os ids no formulário
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Grupos"
                placeholder="Selecione ou digite para buscar"
                variant="outlined"
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
          />
        )}
      />
    </Box>
  );
};

export default GroupSectionEdit;
