import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { fetchGroups } from "../services/groupService";

const GroupSection = () => {
    const { control } = useFormContext();
    const [allGroups, setAllGroups] = useState([]);

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

    return (
        <Box sx={{ p: 2 }}>
            <Controller
                name="groups"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        multiple
                        options={allGroups}
                        getOptionLabel={(option) => option.attributes?.description || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, newValue) => {
                            field.onChange(newValue);
                            console.log("Grupos selecionados:", newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Grupos"
                                placeholder="Selecione ou digite para buscar"
                                variant="outlined"
                            />
                        )}
                    />
                )}
            />
        </Box>
    );
};

export default GroupSection;