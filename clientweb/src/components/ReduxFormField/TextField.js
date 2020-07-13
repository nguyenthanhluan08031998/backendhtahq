import React from "react";
import InputText from "@/components/Input/InputText";

export default React.memo(function renderTextField({
   input: { onBlur, onFocus, ...restInput },
   label,
   multiline,
   meta: { submitFailed, error },
   ...custom
}) {
   return (
      <InputText
         multiline={multiline}
         //rows={multiline ? rows || 3 : undefined }
         fullWidth
         label={label}
         error={submitFailed && error != null}
         helperText={submitFailed && error}
         {...restInput}
         {...custom}
      />
   );
});
