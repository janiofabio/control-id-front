import React, { useState } from "react";
import { useTranslate, useNavigation } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress } from "@mui/material";
import { Create } from "@refinedev/mui";
import PersonForm from "@components/PersonForm/PersonForm";
import axios from "axios";
import QueryClientProviderWrapper from '@utils/QueryClientProviderWrapper';

export const PersonCreate: React.FC = () => {
    const { goBack } = useNavigation();
    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm();
    const translate = useTranslate();
    const [preview, setPreview] = useState("");
    const [formLoading, setFormLoading] = useState(false); // Variável adicionada

    const handleFileChange = (file: File) => {
        setPreview(URL.createObjectURL(file));
        setValue("personPhoto", file);
    };

    const onSubmit = async (data: any) => {
        try {
            setFormLoading(true); // Inicia o carregamento do formulário
            const formData = new FormData();
            formData.append("files", data.personPhoto);

            const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (uploadResponse.status === 200) {
                const photoId = uploadResponse.data[0].id;
                data.personPhoto = photoId;
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/people`, data);
            goBack();
        } catch (error) {
            console.error(error);
        } finally {
            setFormLoading(false); // Finaliza o carregamento do formulário
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={{ onClick: handleSubmit(onSubmit), disabled: isSubmitting }}>
            <QueryClientProviderWrapper>
                <Box sx={{ padding: 0 }}>
                    <PersonForm 
                        onSubmit={handleSubmit(onSubmit)} 
                        formLoading={isSubmitting} 
                        onFileChange={handleFileChange}
                        preview={preview}
                        control={control}
                        setValue={setValue}
                    />
                </Box>
            </QueryClientProviderWrapper>
        </Create>
    );
};

export default PersonCreate;
