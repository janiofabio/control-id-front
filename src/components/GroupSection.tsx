import React, { useState, useEffect, useMemo } from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { fetchGroups } from "../services/groupService";

interface Group {
  id: number;
  attributes: {
    description: string;
  };
}

const GroupSection = () => {
    const { control } = useFormContext();
    const [allGroups, setAllGroups] = useState<Group[]>([]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await fetchGroups();
                if (data && data.length > 0) {
                    setAllGroups(data);
                    console.log("Grupos carregados da API:", data);
                }
            } catch (error) {
                console.error("Erro ao carregar os grupos:", error);
            }
        };
        loadGroups();
    }, []);

    const groupOptions = useMemo(() => 
        allGroups.map(group => group.attributes.description),
        [allGroups]
    );

    return (
        <Box sx={{ p: 2 }}>
            <Controller
                name="groups"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        multiple
                        options={groupOptions}
                        value={value}
                        onChange={(_, newValue) => {
                            // Remove duplicatas
                            const uniqueGroups = Array.from(new Set(newValue));
                            onChange(uniqueGroups);
                            console.log("Grupos selecionados:", uniqueGroups);
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
                        renderOption={(props, option) => (
                            <li {...props} key={option}>
                                {option}
                            </li>
                        )}
                    />
                )}
            />
        </Box>
    );
};

export default GroupSection;