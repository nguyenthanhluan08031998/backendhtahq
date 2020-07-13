import React from "react";
import InputNumber from "@/components/Input/InputNumber";

export default React.memo(function renderNumberField({
   input: { onChange, onBlur, value, name },
   label,
   meta: { submitFailed, error },
   thousandSeparator,
   ...custom
}) {
   return (
      <InputNumber
         name={name}
         thousandSeparator={thousandSeparator}
         error={submitFailed && error != null}
         helperText={submitFailed && error}
         style={{ width: "100%" }}
         label={label}
         onChange={onChange}
         onBlur={onBlur}
         value={value}
         {...custom}
         isReduxForm
      />
   );
});
