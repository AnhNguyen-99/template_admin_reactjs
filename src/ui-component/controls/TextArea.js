import React from "react";
import { TextareaAutosize } from "@mui/material";

export default function TextArea(props) {
    const { minRows, maxRows, value, error = null, placeholder, onChange, ...other} = props;
    return (
        <TextareaAutosize 
            variant="standard"
            value={value}
            maxRows={maxRows}
            minRows={minRows}
            onChange={onChange}
            placeholder={placeholder || ''}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}