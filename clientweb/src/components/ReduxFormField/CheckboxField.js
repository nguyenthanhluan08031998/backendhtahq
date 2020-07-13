import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckBox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

export default function checkboxField({
   readOnly,
   disabled,
   input,
   meta: { submitFailed, error },
   label,
   dataSource,
   row,
   color,
   labelPlacement
}) {
   const handleChange = (dataValue) => (e) => {
      const { checked } = e.target;
      let checkedValue = [];
      if (checked) {
         checkedValue = [...input.value.split(","), dataValue];
      } else {
         checkedValue = [...input.value.split(",")].filter((x) => x !== dataValue);
      }
      input.onChange(checkedValue.filter((x) => x !== "").toString());
   };
   return (
      <>
         {dataSource ? (
            <FormControl component="fieldset" error={submitFailed && error != null}>
               {label && (
                  <FormLabel component="legend">
                     <Typography variant="caption">{label}</Typography>
                  </FormLabel>
               )}
               <FormGroup row={row}>
                  {dataSource.map((data, index) => {
                     if (!data["value"] || !data["label"]) return null;
                     return (
                        <FormControlLabel
                           style={data.label ? {} : { marginRight: 0 }}
                           disabled={disabled}
                           labelPlacement={labelPlacement || "end"}
                           key={index}
                           control={
                              <CheckBox
                                 inputProps={{ "aria-labelledby": `checkbox-${index}` }}
                                 disabled={disabled}
                                 color={color || "secondary"}
                                 checked={
                                    input.value && input.value.indexOf(",") > -1
                                       ? input.value.split(",").some((x) => x === data.value)
                                       : [input.value].some((x) => x === data.value)
                                 }
                                 value={data.value}
                                 onChange={readOnly ? null : handleChange(data.value)}
                              />
                           }
                           label={data.label}
                        />
                     );
                  })}
               </FormGroup>
               {submitFailed && error && (
                  <FormHelperText style={{ marginTop: 0 }}>{submitFailed && error}</FormHelperText>
               )}
            </FormControl>
         ) : (
               <FormControlLabel
                  style={label ? {} : { marginRight: 0 }}
                  disabled={disabled}
                  labelPlacement={labelPlacement || "end"}
                  control={
                     <CheckBox
                        inputProps={{ "aria-labelledby": `checkbox-${new Date().getTime()}` }}
                        disabled={disabled}
                        color={color || "secondary"}
                        checked={Boolean(input.value)}
                        onChange={(e) => (readOnly ? null : input.onChange(e.target.checked))}
                     />
                  }
                  label={label}
               />
            )}
      </>
   );
}
