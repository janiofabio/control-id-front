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

interface GroupSectionEditProps {
  peopleData: any;
}

const GroupSectionEdit: React.FC<GroupSectionEditProps> = ({ peopleData }) => {
    const { control, setValue, watch } = useFormContext();
    const [allGroups, setAllGroups] = useState<Group[]>([]);
    const watchGroups = watch('groups');

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
        allGroups.map(group => group.attributes?.description).filter(Boolean),
        [allGroups]
    );

    useEffect(() => {
        if (peopleData?.groups && !watchGroups) {
            let groups = peopleData.groups;
            if (typeof groups === 'string') {
                try {
                    groups = JSON.parse(groups);
                } catch (error) {
                    console.error("Erro ao analisar os grupos existentes:", error);
                    groups = [];
                }
            }
            if (Array.isArray(groups)) {
                const groupDescriptions = groups.filter(group => typeof group === 'string');
                setValue('groups', groupDescriptions);
            }
        }
    }, [peopleData, setValue, watchGroups]);

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
                        options={groupOptions}
                        value={field.value || []}
                        onChange={(_, newValue) => {
                            const uniqueGroups = Array.from(new Set(newValue));
                            field.onChange(uniqueGroups);
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

export default GroupSectionEdit;