import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import numeral from "numeral";

export function isNullOrEmpty(data) {
   if (data === null) {
      return true;
   }
   if (data === "") {
      return true;
   }
   if (data === undefined) {
      return true;
   }
   if (typeof data === "undefined") {
      return true;
   }
   return false;
}
const styles = (theme) => ({
   formControl: {
      margin: theme.spacing()
   }
});

// function NumberFormatCustom(props) {
//    const { inputRef, onChange, isReduxForm, ...other } = props;
//    const { name } = other;
//    const handleChange = (values) => {
//       if (isReduxForm) {
//          onChange(values.floatValue);
//       } else {
//          onChange({
//             target: {
//                name,
//                values,
//                value: values.floatValue
//             }
//          });
//       }
//    };
//    return (
//       <NumberFormat
//          getInputRef={inputRef}
//          {...other}
//          thousandSeparator
//          allowNegative={false}
//          onValueChange={handleChange}
//       />
//    );
// }

// NumberFormatCustom.propTypes = {
//    inputRef: PropTypes.func.isRequired,
//    onChange: PropTypes.func.isRequired
// };

class FormattedInputs extends React.PureComponent {
   //inputEl = null;
   handleChange = (values) => {
      const { onChange, isReduxForm, name } = this.props;
      if (isReduxForm) {
         onChange(values.floatValue >= 0 ? values.floatValue : null);
      } else if (onChange) {
         onChange({
            target: {
               name,
               values,
               value: values.floatValue >= 0 ? values.floatValue : null
            }
         });
      }
   };
   handleBlur = (e) => {
      const { onBlur, isReduxForm, name } = this.props;
      let numberVal = numeral(e.target.value).value();
      numberVal = isNullOrEmpty(numberVal) ? null : numberVal;
      if (isReduxForm) {
         onBlur(numberVal);
      } else if (onBlur) {
         onBlur({
            target: {
               name,
               values: {
                  value: e.target.value,
                  floatValue: numberVal
               },
               value: numberVal
            }
         });
      }
   };
   render() {
      const {
         t,
         label,
         name,
         value,
         defaultValue,
         required,
         helperText,
         error,
         thousandSeparator,
         decimalScale,
         format,
         mask,
         prefix,
         suffix,
         placeholder,
         disabled,
         style,
         onFocus,
         onKeyUp,
         onKeyDown,
         onKeyPress,
         autoFocus,
         min,
         max,
         InputProps
      } = this.props;

      return (
         // eslint-disable-next-line
         <NumberFormat
            size="small"
            autoComplete="off"
            fullWidth
            disabled={disabled}
            inputProps={{
               "aria-label": "input-number",
               style: { textAlign: (style && style.textAlign) || "left" }
            }}
            style={style}
            placeholder={typeof placeholder === "string" ? t(placeholder) : placeholder}
            required={required}
            error={error}
            helperText={typeof helperText === "string" ? t(helperText) : helperText}
            label={t(label)}
            value={value}
            defaultValue={defaultValue}
            allowNegative={false}
            onValueChange={this.handleChange}
            name={name}
            customInput={TextField}
            thousandSeparator={thousandSeparator != null && thousandSeparator != undefined ? thousandSeparator : true}
            decimalScale={decimalScale || 0}
            format={format}
            mask={mask}
            prefix={prefix}
            suffix={suffix}
            onBlur={this.handleBlur}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            autoFocus={autoFocus}
            isAllowed={(values) => {
               const { floatValue } = values;
               if (!min && !floatValue) return true;
               if (!min && max) {
                  return floatValue <= max;
               } else if (min && !max) {
                  return floatValue >= min;
               } else if (min && max) {
                  return floatValue >= min && floatValue <= max;
               }
               return true;
            }}

            InputProps={InputProps}
         />
      );
   }
}

FormattedInputs.propTypes = {
   classes: PropTypes.object.isRequired
};

FormattedInputs.defaultProps = {
   max: 2000000000
};

export default withStyles(styles)(withTranslation()(connect(null, null, null, { forwardRef: true })(FormattedInputs)));
