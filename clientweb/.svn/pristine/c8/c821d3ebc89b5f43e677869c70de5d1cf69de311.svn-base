import React from "react";
import TimePicker from "@/components/TimePicker/RenderTimePicker";


export default React.memo(function renderTimePickerField({
    input: { value, name, ...rest },
    meta: { submitFailed, error },
    label,
    disabled,
    readOnly,
    ...custom
}) {
    return (
        <TimePicker
            fullWidth
            label={label}
            error={submitFailed && error != null}
            helperText={submitFailed && error}
            value={value || null}
            name={name || ""}
            disabled={disabled}
            {...rest}
            {...custom}
        />
    );
});
