import React from "react";
import PhoneInput from "react-phone-input-2";
import { Controller } from "react-hook-form";
import { useTheme, TextField, Typography } from "@mui/material";

interface PhoneNumberInputProps {
    control: any;
    setValue: (name: string, value: any) => void;
    name: string;
    label: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ control, setValue, name, label }) => {
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <Typography variant="h6" color={theme.palette.text.primary}>
                        {label}
                    </Typography>
                    <PhoneInput
                        {...field}
                        country={"br"}
                        onlyCountries={["br", "us", "es", "cn"]}
                        countryCodeEditable={false}
                        containerStyle={{
                            margin: 'normal',
                            width: '100%',
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`
                        }}
                        inputStyle={{
                            width: '100%',
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary
                        }}
                        buttonStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`
                        }}
                        inputProps={{
                            name: 'phoneNumber',
                            required: true,
                            autoFocus: false
                        }}
                        specialLabel="Número do Celular"
                        onChange={(value) => setValue(name, value)}
                    />
                </>
            )}
        />
    );
};

export default PhoneNumberInput;
