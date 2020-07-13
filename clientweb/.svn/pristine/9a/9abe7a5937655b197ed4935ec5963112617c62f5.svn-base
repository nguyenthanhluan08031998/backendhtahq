import React from "react";
import InputEditor from "@/components/Input/InputEditor";

export default function renderEditorField({ input, label, meta: { touched, error }, ...custom }) {
    return (
        <InputEditor
            label={label}
            error={touched && error != null}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );
}
