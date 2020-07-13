import React from "react";

import { withTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";

class InputText extends React.PureComponent {
   render() {
      const { t, tReady, i18n, label, helperText, inputProps, ...custom } = this.props;
      return <TextField {...custom} size="small" label={t(label)} helperText={typeof helperText === "string" ? t(helperText) : helperText} inputProps={{ "aria-label": "input-text", ...inputProps }} />;
   }
}

export default withTranslation()(InputText);
