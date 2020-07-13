import React from "react";

import Select from "@/components/Input/MuiAutoComplete";

export default function renderSelectField({
   input: { name, value, onChange },
   multiple,
   isMulti,
   label,
   required,
   disabled,
   meta: { submitFailed, error },
   ...custom
}) {
   const { dataSource, dataText, dataValue, width, renderOption, ...restCustom } = custom;
   return (
      <Select
         disabled={disabled}
         required={required}
         multiple={multiple}
         isMulti={isMulti}
         label={label}
         dataText={dataText}
         dataValue={dataValue}
         width={width ? width : "100%"}
         dataSource={dataSource}
         error={submitFailed && error != null}
         helperText={submitFailed && error}
         name={name ? name : ""}
         //textFieldProps={{ ...rest }}
         value={value}
         renderOption={renderOption}
         reduxFieldChange={onChange}
         {...restCustom}
      />
   );
}
