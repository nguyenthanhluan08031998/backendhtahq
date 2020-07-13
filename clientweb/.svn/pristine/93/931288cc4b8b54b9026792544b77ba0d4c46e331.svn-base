import React from "react";
import DatePicker from "@/components/DatePicker/RenderDatePicker";
import TextField from "@material-ui/core/TextField";


export default React.memo(function renderTextField({
    input: { value, name, ...rest },
    meta: { touched, submitFailed, error },
    required,
    label,
    disabled,
    readOnly,
    ...custom
}) {
    return (
        <DatePicker
            fullWidth
            error={submitFailed && error != null}
            helperText={submitFailed && error}
            custominput={
                <TextField
                    size="small"
                    disabled={disabled}
                    autoComplete="off"
                    // inputProps={{ "aria-label": "input-date-picker" }}
                    fullWidth
                    label={required ? `${label} *` : label}
                    error={touched && error != null}
                    helperText={touched && error}
                    InputProps={{
                        "aria-label": "input-date-picker",
                        readOnly: readOnly || false,
                    }}
                    {...rest}
                />
            }
            value={value || null}
            name={name || ""}
            {...rest}
            {...custom}
        />
    );
});
