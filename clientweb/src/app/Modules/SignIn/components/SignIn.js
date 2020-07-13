import React from 'react'
import { Field, reduxForm } from "redux-form";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RenderTextField from "@/components/ReduxFormField/TextField";
import { useItem } from "../hooks/SignInHook"

const SignIn = (props) => {
    const { t } = useTranslation()
    const { history, handleSubmit, notification } = props;
    const {
        addOrUpdate
    } = useItem({ history, notification })
    return <form noValidate>
        <Grid container justify="center">
            <Paper style={{ marginLeft: 300, marginRight: 300, marginTop: 20, padding: 20 }}>
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="error">{t("Đăng kí")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Email"
                            label="Email"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Name"
                            label="Tên người dùng"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Password"
                            type="password"
                            label="Mật khẩu"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="ConfirmPassword"
                            type="password"
                            label="Nhập lại mật khẩu"
                            component={RenderTextField}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit(addOrUpdate)}>{t("Đăng kí")}</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </form>
}

export default reduxForm({
    form: "SignInForm"
})(React.memo(SignIn));