/* eslint-disable react/prop-types */
import React from "react";
import { useTranslation } from "react-i18next";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";

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

function renderRow(props) {
   const { data, index, style } = props;

   return React.cloneElement(data[index], {
      style: {
         overflow: "hidden",
         textOverflow: "ellipsis",
         whiteSpace: "nowrap",
         display: "block",
         ...style
      }
   });
}

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
   const { children, ...other } = props;
   const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
   const itemCount = Array.isArray(children) ? children.length : 0;
   const itemSize = 36;

   const outerElementType = React.useMemo(() => {
      return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div ref={ref}>
         <FixedSizeList
            style={{ padding: 0, height: Math.min(8, itemCount) * itemSize, maxHeight: "auto", overflowX: "hidden" }}
            itemData={children}
            height={250}
            width="100%"
            outerElementType={outerElementType}
            innerElementType="ul"
            itemSize={itemSize}
            overscanCount={5}
            itemCount={itemCount}
         >
            {renderRow}
         </FixedSizeList>
      </div>
   );
});

const useStyles = (width) =>
   makeStyles((theme) => ({
      listbox: {
         "& ul": {
            padding: 0,
            margin: 0
         }
      },
      paper:
         width > 0
            ? {
               width
            }
            : {}
      // paper: {
      //    zIndex: theme.zIndex.modal + 1
      // }
   }));

function MuiAutoComplete(props) {
   const {
      hasTooltip,
      label,
      filter,
      name,
      dataText,
      dataValue,
      dataSource,
      onChange,
      value,
      error,
      helperText,
      textFieldProps,
      isMulti,
      multiple,
      disabled,
      required,
      onInputChange,
      width,
      renderOption,
      reduxFieldChange,
      paperWidth,
      filterOptions,
      variant,
      ...custom
   } = props;
   const classes = useStyles(paperWidth)();
   const { t } = useTranslation();

   const [autoCompleteValue, setAutoCompleteValue] = React.useState(isMulti || multiple ? [] : null);

   React.useEffect(() => {
      if (isMulti || multiple) {
         setAutoCompleteValue(getMultiOptionValue());
      } else {
         setAutoCompleteValue(getOptionValue());
      }
   }, [value, dataSource]); // eslint-disable-line react-hooks/exhaustive-deps

   const getDataSource = () => {
      if (!dataSource) return [];
      if (filter != "none") {
         return dataSource.filter((x) => isNullOrEmpty(x[filter]) || (!isNullOrEmpty(x[filter]) && x[filter]));
      }
      return [...dataSource];
   };

   const getOptionValue = () => {
      let newVal = null;
      if (Array.isArray(dataSource)) {
         let selected = dataSource.find((x) => x[dataValue] == value);
         if (selected != undefined) newVal = selected;
      }
      return newVal;
   };

   const getMultiOptionValue = () =>
      Array.isArray(dataSource) && dataSource.length > 0
         ? dataSource.filter(
            (x) =>
               !isNullOrEmpty(x) &&
               !isNullOrEmpty(x[dataValue]) &&
               Array.isArray(value) &&
               value.some((y) => y == x[dataValue])
         )
         : [];

   const getValue = (selectedOption) => (selectedOption != undefined ? selectedOption[dataValue] : null);

   const getMultiValue = (selectedOption) =>
      Array.isArray(selectedOption) && selectedOption.length > 0
         ? selectedOption.map((x) => (!isNullOrEmpty(x) ? x[dataValue] : ""))
         : null;

   const handleChange = (e, newValue) => {
      let selectedValue = isMulti || multiple ? getMultiValue(newValue) : getValue(newValue);
      if (onChange) onChange({ target: { name, value: selectedValue } });
      else if (reduxFieldChange) reduxFieldChange(selectedValue);
   };

   return (
      <Autocomplete
         disabled={disabled}
         style={{ width }}
         loadingText={t("Đang tải...")}
         noOptionsText={t("Nhập từ khoá")}
         disableCloseOnSelect={isMulti || multiple}
         multiple={isMulti || multiple}
         size="small"
         //size={isMulti || multiple ? "small" : "small"}
         filterOptions={createFilterOptions({
            trim: true,
            ...filterOptions
         })}
         getOptionLabel={(option) => {
            return !isNullOrEmpty(option) ? (!isNullOrEmpty(option[dataText]) ? option[dataText].toString() : "") : "";
         }}
         value={autoCompleteValue}
         //value={isMulti || multiple ? getMultiOptionValue() : getOptionValue()}
         disableListWrap
         classes={classes}
         ListboxComponent={renderOption ? "ul" : ListboxComponent}
         options={getDataSource()}
         renderTags={
            disabled
               ? (value, getTagProps) =>
                  value.map((option, index) => <Chip disabled label={option[dataText]} {...getTagProps({ index })} />)
               : null
         }
         renderOption={renderOption || null}
         renderInput={(params) => {
            let { InputProps, ...restTextFieldProps } = textFieldProps || {};
            let propsFromInput = InputProps ? InputProps : {};
            let title = params.inputProps ? params.inputProps.value : "";
            let input = (
               <TextField
                  {...params}
                  variant={variant || "standard"}
                  label={label}
                  fullWidth
                  required={required}
                  error={error}
                  helperText={helperText}
                  InputProps={{
                     ...params.InputProps,
                     ...propsFromInput
                  }}
                  {...restTextFieldProps}
               />
            );
            return hasTooltip ? <Tooltip title={title}>{input}</Tooltip> : input;
         }}
         onInputChange={(e, inputVal) => {
            if (onInputChange) onInputChange(inputVal);
         }}
         onChange={handleChange}
         {...custom}
      />
   );
}

MuiAutoComplete.propTypes = {
   dataSource: PropTypes.array.isRequired
};

MuiAutoComplete.defaultProps = {
   dataSource: [],
   filter: "Activate",
   dataText: "Name",
   dataValue: "Id"
};

export default React.memo(MuiAutoComplete);
